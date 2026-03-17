
import { DataFrame, Field, PanelData } from '@grafana/data';
import { RawPanelDisbursementData, RawPanelCollectionData } from '../types';

function findField(frame: DataFrame, fieldName: string): Field | undefined {
    return frame.fields.find(f => f.name.toLowerCase().startsWith(fieldName.toLowerCase()));
}

const parseMetricValue = (value: any): number | undefined => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        const clean = value.replace(/[^0-9.-]/g, '');
        const num = parseFloat(clean);
        return isNaN(num) ? undefined : num;
    }
    return undefined;
};

const parseMetricName = (value: any): string | undefined => {
    if (value === null || value === undefined) return undefined;
    const s = String(value).trim();
    if (s === '' || s.toUpperCase() === 'NULL') return undefined;
    return s;
};

export const transformDisbursementData = (data: PanelData): RawPanelDisbursementData[] => {
    const rows: RawPanelDisbursementData[] = [];

    if (!data.series || data.series.length === 0) return rows;

    // Lặp qua từng series giống manguon.ts
    data.series.forEach((series) => {
        // Kiểm tra presence của id/label để biết đây có phải series node hay không
        const idField = findField(series, 'id');
        const labelField = findField(series, 'label');

        if (!idField && !labelField) {
            return; // skip non-node series
        }

        for (let i = 0; i < series.length; i++) {
            const item: RawPanelDisbursementData = {
                id: idField ? String(idField.values[i]) : `node-${i}`,
                label: labelField ? String(labelField.values[i]) : `Node ${i}`,
            } as RawPanelDisbursementData;

            // Lấy metric và name metric từng cột
            for (let m = 1; m <= 4; m++) {
                const metricField = findField(series, `disMetric${m}`);
                const nameField = findField(series, `nameDisMetric${m}`);

                if (metricField) {
                    const v = parseMetricValue(metricField.values[i]);
                    if (v !== undefined) {
                        if (m === 1) item.disMetric1 = v;
                        else if (m === 2) item.disMetric2 = v;
                        else if (m === 3) item.disMetric3 = v;
                        else if (m === 4) item.disMetric4 = v;
                    }
                }

                if (nameField) {
                    const n = parseMetricName(nameField.values[i]);
                    if (n !== undefined) {
                        if (m === 1) item.nameDisMetric1 = n;
                        else if (m === 2) item.nameDisMetric2 = n;
                        else if (m === 3) item.nameDisMetric3 = n;
                        else if (m === 4) item.nameDisMetric4 = n;
                    }
                }
            }

            rows.push(item);
        }
    });

    return rows;
};

export const transformCollectionData = (data: PanelData): RawPanelCollectionData[] => {
    const rows: RawPanelCollectionData[] = [];

    if (!data.series || data.series.length === 0) return rows;

    data.series.forEach((series) => {
        const idField = findField(series, 'id');
        const labelField = findField(series, 'label');

        if (!idField && !labelField) return;

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
                        if (m === 1) item.colMetric1 = v;
                        else if (m === 2) item.colMetric2 = v;
                        else if (m === 3) item.colMetric3 = v;
                        else if (m === 4) item.colMetric4 = v;
                    }
                }

                if (nameField) {
                    const n = parseMetricName(nameField.values[i]);
                    if (n !== undefined) {
                        if (m === 1) item.nameColMetric1 = n;
                        else if (m === 2) item.nameColMetric2 = n;
                        else if (m === 3) item.nameColMetric3 = n;
                        else if (m === 4) item.nameColMetric4 = n;
                    }
                }
            }

            rows.push(item);
        }
    });

    return rows;
};
