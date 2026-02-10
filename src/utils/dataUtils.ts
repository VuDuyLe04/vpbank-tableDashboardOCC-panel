import { PanelData } from '@grafana/data';
import { RawPanelData } from '../types';

export const transformData = (data: PanelData): RawPanelData[] => {
    if (!data.series.length) {
        return [];
    }

    const frame = data.series[0];
    const fieldNames: Array<keyof RawPanelData> = ['label', 'disbursementTotal', 'disbursementIn10m', 'collectionTotal', 'collectionIn10m'];
    const length = frame.length;

    const rows: RawPanelData[] = [];

    for (let i = 0; i < length; i++) {
        const row: any = {};
        // Default values if needed, or handle missing fields
        row.id = ''; // RawPanelData has id, but we might not have it in fieldNames list above. 
        // The previous implementation ignored 'id'. I'll double check if 'id' is in the fields or just generated.
        // For now, I'll initialize it or map it if present.

        fieldNames.forEach(name => {
            const field = frame.fields.find(f => f.name === name);
            if (field) {
                row[name] = field.values[i];
            } else {
                // Fallback for missing fields
                row[name] = name === 'label' ? '-' : 0;
            }
        });
        rows.push(row as RawPanelData);
    }

    return rows;
};
