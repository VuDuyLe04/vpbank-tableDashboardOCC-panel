import { FieldConfigProperty, PanelPlugin } from '@grafana/data';
import { SimplePanel } from './components/SimplePanel';
import { Options as TopologyOptions } from './config/panelCfg';

export const plugin = new PanelPlugin<TopologyOptions>(SimplePanel)
  .useFieldConfig({
    disableStandardOptions: Object.values(FieldConfigProperty).filter((v) => v !== FieldConfigProperty.Links),
  })
  .setPanelOptions((builder, context) => {
  });
