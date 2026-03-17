import React from 'react';
import { css, keyframes } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

import { RawPanelDisbursementData, RawPanelCollectionData } from '../types';

interface Props {
    disbursementData: RawPanelDisbursementData[];
    collectionData: RawPanelCollectionData[];
}

const getStyles = (theme: any) => {
    const highlightColor = '#0099FF';
    const cellBg = 'rgba(0, 153, 255, 0.05)';

    // Corner bracket implementation using gradients
    const bracketSize = '8px';
    const bracketThickness = '2px';
    const bracketColor = highlightColor;

    const fadeIn = keyframes`
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    `;

    return {
        wrapper: css`
            width: 100%;
            height: 100%;
            overflow: auto;
            font-family: "Open Sans", Helvetica, Arial, sans-serif;
            /* Đồng bộ background với các panel khác */
            background: ${theme.colors.background || '#0f1113'};
            padding: 12px 16px;
            display: flex;
            flex-direction: row;
            gap: 32px;
            /* Responsive: bảng sẽ tự co giãn, không căn giữa */
            justify-content: flex-start;
            align-items: stretch;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.02);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
        `,
        table: css`
            min-width: 350px;
            flex: 1 1 0;
            border-collapse: separate;
            border-spacing: 10px;
            color: ${theme.colors.text.primary};
            /* Use transparent table so wrapper background is continuous */
            background: transparent;
            padding: 0;
            border-radius: 0;
            border: none;
            box-shadow: none;
        `,
        thGroup: css`
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 16px;
            color: ${highlightColor};
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 8px rgba(0, 153, 255, 0.4);
        `,
        th: css`
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 14px;
            color: ${theme.colors.text.secondary};
        `,
        // Label cell: no brackets, just aligned text
        tdLabel: css`
            padding: 15px;
            text-align: left;
            font-weight: bold;
            color: ${highlightColor};
            font-size: 15px;
            border: none;
            border-bottom: 1px solid rgba(0, 153, 255, 0.1);
            width: 150px; /* Reduced width as requested */
            min-width: 120px;
            
            animation: ${fadeIn} 0.5s ease-out both;
        `,
        // Number cell: futuristic brackets + glow + animation
        tdNum: css`
            position: relative;
            padding: 15px;
            text-align: center;
            color: ${theme.colors.text.primary};
            font-size: 18px;
            font-weight: bold;
            background-color: ${cellBg};
            
            /* Text Glow */
            text-shadow: 0 0 5px ${highlightColor};

            /* The Corner Brackets */
            background-image: 
                linear-gradient(to right, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to bottom, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to left, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to bottom, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to right, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to top, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to left, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness}),
                linear-gradient(to top, ${bracketColor} ${bracketThickness}, transparent ${bracketThickness});

            background-position: 
                0 0, 0 0, /* Top Left */
                100% 0, 100% 0, /* Top Right */
                0 100%, 0 100%, /* Bottom Left */
                100% 100%; /* Bottom Right */

            background-repeat: no-repeat;
            background-size: ${bracketSize} ${bracketSize};
            
            font-family: 'Roboto Mono', monospace;
            
            animation: ${fadeIn} 0.5s ease-out both;
            /* Stagger animation slightly for columns if desired, but keeping it simple for now */
        `
    };
};


// Giả định rows có dạng: [{ label, disbursementTotal, disbursementIn10m, collectionTotal, collectionIn10m, type }]
// type: 'disbursement' | 'collection'


// Helper để lấy các metric có giá trị và tên cột
function getDisbursementMetrics(row: RawPanelDisbursementData) {
    const metrics = [];
    for (let i = 1; i <= 4; i++) {
        const value = row[`disMetric${i}` as keyof RawPanelDisbursementData];
        const name = row[`nameDisMetric${i}` as keyof RawPanelDisbursementData];
        if (value !== undefined) {
            metrics.push({
                value,
                name: name || `Metric ${i}`
            });
        }
    }
    return metrics;
}

function getCollectionMetrics(row: RawPanelCollectionData) {
    const metrics = [];
    for (let i = 1; i <= 4; i++) {
        const value = row[`colMetric${i}` as keyof RawPanelCollectionData];
        const name = row[`nameColMetric${i}` as keyof RawPanelCollectionData];
        if (value !== undefined) {
            metrics.push({
                value,
                name: name || `Metric ${i}`
            });
        }
    }
    return metrics;
}

export const MainPanel: React.FC<Props> = ({ disbursementData, collectionData }) => {
    const styles = useStyles2(getStyles);

    // Xác định số lượng cột tối đa và tên cột cho mỗi bảng
    const disMetricNames: string[] = [];
    for (let i = 1; i <= 4; i++) {
        // Tìm tên cột đầu tiên có giá trị ở bất kỳ row nào
        let name = '';
        for (const row of disbursementData) {
            const value = row[`disMetric${i}` as keyof RawPanelDisbursementData];
            const n = row[`nameDisMetric${i}` as keyof RawPanelDisbursementData];
            if (value !== undefined) {
                name = n !== undefined ? String(n) : `Metric ${i}`;
                break;
            }
        }
        if (name) disMetricNames.push(name);
    }

    const colMetricNames: string[] = [];
    for (let i = 1; i <= 4; i++) {
        let name = '';
        for (const row of collectionData) {
            const value = row[`colMetric${i}` as keyof RawPanelCollectionData];
            const n = row[`nameColMetric${i}` as keyof RawPanelCollectionData];
            if (value !== undefined) {
                name = n !== undefined ? String(n) : `Metric ${i}`;
                break;
            }
        }
        if (name) colMetricNames.push(name);
    }

    // Nếu không có dữ liệu
    if ((!disbursementData || disbursementData.length === 0) && (!collectionData || collectionData.length === 0)) {
        return <div>No data</div>;
    }

    return (
        <div className={styles.wrapper}>
            {/* Bảng Chi hộ */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th} style={{ width: '150px' }}></th>
                        <th className={styles.thGroup} colSpan={disMetricNames.length}>CHI HỘ</th>
                    </tr>
                    <tr>
                        <th className={styles.th}></th>
                        {disMetricNames.map((name, idx) => (
                            <th className={styles.th} key={idx}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {disbursementData.map((row, rowIdx) => {
                        const metrics = getDisbursementMetrics(row);
                        return (
                            <tr key={row.id || rowIdx}>
                                <td className={styles.tdLabel} style={{ animationDelay: `${rowIdx * 0.1}s` }}>{row.label}</td>
                                {metrics.map((m, colIdx) => (
                                    <td className={styles.tdNum} key={colIdx} style={{ animationDelay: `${rowIdx * 0.1 + (colIdx + 1) * 0.1}s` }}>{m.value}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Bảng Thu hộ */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th} style={{ width: '150px' }}></th>
                        <th className={styles.thGroup} colSpan={colMetricNames.length}>THU HỘ</th>
                    </tr>
                    <tr>
                        <th className={styles.th}></th>
                        {colMetricNames.map((name, idx) => (
                            <th className={styles.th} key={idx}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {collectionData.map((row, rowIdx) => {
                        const metrics = getCollectionMetrics(row);
                        return (
                            <tr key={row.id || rowIdx}>
                                <td className={styles.tdLabel} style={{ animationDelay: `${rowIdx * 0.1}s` }}>{row.label}</td>
                                {metrics.map((m, colIdx) => (
                                    <td className={styles.tdNum} key={colIdx} style={{ animationDelay: `${rowIdx * 0.1 + (colIdx + 1) * 0.1}s` }}>{m.value}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
