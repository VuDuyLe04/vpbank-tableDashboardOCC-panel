
import { DataFrame, Field, PanelData } from '@grafana/data';
import { TableRow, RawPanelCollectionData } from '../types';

function findField(frame: DataFrame, fieldName: string): Field | undefined {
    return frame.fields.find(f => f.name.toLowerCase().startsWith(fieldName.toLowerCase()));
}

const parseMetricValue = (value: any): number | undefined => {
    if (value === null || value === undefined) { return undefined; }
    if (typeof value === 'number') { return value; }
    if (typeof value === 'string') {
        const clean = value.replace(/[^0-9.-]/g, '');
        const num = parseFloat(clean);
        return isNaN(num) ? undefined : num;
    }
    return undefined;
};

const parseMetricName = (value: any): string | undefined => {
    if (value === null || value === undefined) { return undefined; }
    const s = String(value).trim();
    if (s === '' || s.toUpperCase() === 'NULL') { return undefined; }
    return s;
};

// ============================================================
// Mode detection: ELK time-series vs Structured collection data
// ============================================================

/**
 * Check if data looks like ELK time-series format:
 * Fields: Time (timestamp), Metric (string), Value (number)
 */
function isElkTimeSeries(series: DataFrame): boolean {
    const hasMetric = series.fields.some(f =>
        f.name.toLowerCase() === 'metric'
    );
    const hasValue = series.fields.some(f =>
        f.name.toLowerCase() === 'value'
    );
    return hasMetric && hasValue;
}

// ============================================================
// Mode 1: ELK time-series → TableRow[]
// Groups by Metric name, calculates "Trong ngày" and "10 phút"
// ============================================================

function transformElkTimeSeries(data: PanelData): TableRow[] {
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;

    // Start of today (local timezone)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayStartMs = todayStart.getTime();

    // Accumulate per metric: { metricName: { daily: number, tenMin: number } }
    const metricMap = new Map<string, { daily: number; tenMin: number }>();

    for (const series of data.series) {
        if (!isElkTimeSeries(series)) { continue; }

        const timeField = series.fields.find(f =>
            f.name.toLowerCase() === 'time' || f.type === 'time'
        );
        const metricField = series.fields.find(f =>
            f.name.toLowerCase() === 'metric'
        );
        const valueField = series.fields.find(f =>
            f.name.toLowerCase() === 'value'
        );

        if (!metricField || !valueField) { continue; }

        for (let i = 0; i < series.length; i++) {
            const metricName = String(metricField.values[i] ?? '').trim();
            if (!metricName) { continue; }

            const rawValue = parseMetricValue(valueField.values[i]);
            if (rawValue === undefined) { continue; }

            let timestamp: number | undefined;
            if (timeField) {
                const tv = timeField.values[i];
                timestamp = typeof tv === 'number' ? tv : new Date(tv).getTime();
            }

            if (!metricMap.has(metricName)) {
                metricMap.set(metricName, { daily: 0, tenMin: 0 });
            }
            const entry = metricMap.get(metricName)!;

            // "Trong ngày": sum all values from today
            if (timestamp === undefined || timestamp >= todayStartMs) {
                entry.daily += rawValue;
            }

            // "10 phút": sum values in last 10 minutes
            if (timestamp === undefined || timestamp >= tenMinutesAgo) {
                entry.tenMin += rawValue;
            }
        }
    }

    // Convert to TableRow[]
    const rows: TableRow[] = [];
    let idx = 0;
    metricMap.forEach((values, metricName) => {
        rows.push({
            id: `elk-${idx}`,
            label: metricName,
            metrics: [
                { name: 'Trong ngày', value: values.daily },
                { name: '10 phút', value: values.tenMin },
            ],
        });
        idx++;
    });

    return rows;
}

// ============================================================
// Mode 2: Structured collection data → TableRow[]
// ============================================================

function transformStructuredData(data: PanelData): TableRow[] {
    const rows: TableRow[] = [];

    if (!data.series || data.series.length === 0) { return rows; }

    data.series.forEach((series) => {
        const idField = findField(series, 'id');
        const labelField = findField(series, 'label');

        if (!idField && !labelField) { return; }

        for (let i = 0; i < series.length; i++) {
            const item: RawPanelCollectionData = {
                id: idField ? String(idField.values[i]) : `node-${i}`,
                label: labelField ? String(labelField.values[i]) : `Node ${i}`,
            } as RawPanelCollectionData;

            for (let m = 1; m <= 4; m++) {
                const metricField = findField(series, `colMetric${m}`);
                const nameField = findField(series, `nameColMetric${m}`);

                if (metricField) {
                    const v = parseMetricValue(metricField.values[i]);
                    if (v !== undefined) {
                        if (m === 1) { item.colMetric1 = v; }
                        else if (m === 2) { item.colMetric2 = v; }
                        else if (m === 3) { item.colMetric3 = v; }
                        else if (m === 4) { item.colMetric4 = v; }
                    }
                }

                if (nameField) {
                    const n = parseMetricName(nameField.values[i]);
                    if (n !== undefined) {
                        if (m === 1) { item.nameColMetric1 = n; }
                        else if (m === 2) { item.nameColMetric2 = n; }
                        else if (m === 3) { item.nameColMetric3 = n; }
                        else if (m === 4) { item.nameColMetric4 = n; }
                    }
                }
            }

            // Convert to TableRow
            const metrics: { name: string; value: number }[] = [];
            for (let m = 1; m <= 4; m++) {
                const value = item[`colMetric${m}` as keyof RawPanelCollectionData] as number | undefined;
                const name = item[`nameColMetric${m}` as keyof RawPanelCollectionData] as string | undefined;
                if (value !== undefined) {
                    metrics.push({ name: name || `Metric ${m}`, value });
                }
            }

            if (metrics.length > 0) {
                rows.push({
                    id: item.id,
                    label: item.label,
                    metrics,
                });
            }
        }
    });

    return rows;
}

// ============================================================
// Main entry: auto-detect data format and transform
// ============================================================

export function transformToTableRows(data: PanelData): TableRow[] {
    if (!data.series || data.series.length === 0) { return []; }

    // Check if any series is ELK time-series format
    const hasElk = data.series.some(s => isElkTimeSeries(s));

    if (hasElk) {
        return transformElkTimeSeries(data);
    }

    return transformStructuredData(data);
}
