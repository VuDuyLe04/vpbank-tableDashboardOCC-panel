import React from 'react';
import { css, keyframes } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

interface Props {
    rows: any[];
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
            background: transparent;
        `,
        table: css`
            width: 100%;
            border-collapse: separate;
            border-spacing: 10px; /* Space between cells for the bracket effect */
            color: ${theme.colors.text.primary};
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

export const MainPanel: React.FC<Props> = ({ rows }) => {
    const styles = useStyles2(getStyles);

    if (!rows || rows.length === 0) {
        return <div>No data</div>;
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th} style={{ width: '150px' }}></th>
                        <th className={styles.thGroup} colSpan={2}>Disbursement</th>
                        <th className={styles.thGroup} colSpan={2}>Collection</th>
                    </tr>
                    <tr>
                        <th className={styles.th}></th>
                        <th className={styles.th}>Total</th>
                        <th className={styles.th}>10m</th>
                        <th className={styles.th}>Total</th>
                        <th className={styles.th}>10m</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className={styles.tdLabel} style={{ animationDelay: `${index * 0.1}s` }}>{row.label}</td>
                            <td className={styles.tdNum} style={{ animationDelay: `${index * 0.1 + 0.1}s` }}>{row.disbursementTotal}</td>
                            <td className={styles.tdNum} style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>{row.disbursementIn10m}</td>
                            <td className={styles.tdNum} style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>{row.collectionTotal}</td>
                            <td className={styles.tdNum} style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>{row.collectionIn10m}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
