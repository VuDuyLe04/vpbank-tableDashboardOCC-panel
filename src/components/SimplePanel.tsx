import React from 'react';
import { PanelProps } from '@grafana/data';
import { Options as TopologyOptions } from '../config/panelCfg';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { MainPanel } from './MainPanel';
import { transformToTableRows } from '../utils/dataUtils';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<TopologyOptions> { }

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const rows = transformToTableRows(data);

  return (
    <div className={styles.wrapper}>
      <MainPanel title={options.title} rows={rows} />
    </div>
  );
};
