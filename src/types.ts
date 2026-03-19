
// Unified row for table rendering (both ELK time-series and structured data)
export interface TableRow {
  id: string;
  label: string;
  metrics: { name: string; value: number }[];
}

// Structured data format (used for Thu hộ / Collection)
export interface RawPanelCollectionData {
  id: string;
  label: string;
  colMetric1?: number;
  colMetric2?: number;
  colMetric3?: number;
  colMetric4?: number;
  nameColMetric1?: string;
  nameColMetric2?: string;
  nameColMetric3?: string;
  nameColMetric4?: string;
}
