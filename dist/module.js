/* [create-plugin] version: 6.8.4 */
/* [create-plugin] plugin: vpbank-quannv3-panel@1.0.0 */
define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","module","react"],(e,t,r,a,n,o)=>(()=>{"use strict";var i={89(t){t.exports=e},781(e){e.exports=t},531(e){e.exports=r},7(e){e.exports=a},308(e){e.exports=n},959(e){e.exports=o}},s={};function l(e){var t=s[e];if(void 0!==t)return t.exports;var r=s[e]={exports:{}};return i[e](r,r.exports,l),r.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="public/plugins/vpbank-quannv3-panel/";var c={};l.r(c),l.d(c,{plugin:()=>w});var d=l(308),p=l.n(d);l.p=p()&&p().uri?p().uri.slice(0,p().uri.lastIndexOf("/")+1):"public/plugins/vpbank-quannv3-panel/";var u=l(781),m=l(959),g=l.n(m),f=l(89),b=l(7);const h=e=>{const t="#0099FF",r="2px",a=t,n=f.keyframes`
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    `;return{wrapper:f.css`
            width: 100%;
            height: 100%;
            overflow: auto;
            font-family: "Open Sans", Helvetica, Arial, sans-serif;
            /* Đồng bộ background với các panel khác */
            background: ${e.colors.background||"#0f1113"};
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
        `,table:f.css`
            min-width: 350px;
            flex: 1 1 0;
            border-collapse: separate;
            border-spacing: 10px;
            color: ${e.colors.text.primary};
            /* Use transparent table so wrapper background is continuous */
            background: transparent;
            padding: 0;
            border-radius: 0;
            border: none;
            box-shadow: none;
        `,thGroup:f.css`
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 16px;
            color: ${t};
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 8px rgba(0, 153, 255, 0.4);
        `,th:f.css`
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 14px;
            color: ${e.colors.text.secondary};
        `,tdLabel:f.css`
            padding: 15px;
            text-align: left;
            font-weight: bold;
            color: ${t};
            font-size: 15px;
            border: none;
            border-bottom: 1px solid rgba(0, 153, 255, 0.1);
            width: 150px; /* Reduced width as requested */
            min-width: 120px;
            
            animation: ${n} 0.5s ease-out both;
        `,tdNum:f.css`
            position: relative;
            padding: 15px;
            text-align: center;
            color: ${e.colors.text.primary};
            font-size: 18px;
            font-weight: bold;
            background-color: ${"rgba(0, 153, 255, 0.05)"};
            
            /* Text Glow */
            text-shadow: 0 0 5px ${t};

            /* The Corner Brackets */
            background-image: 
                linear-gradient(to right, ${a} ${r}, transparent ${r}),
                linear-gradient(to bottom, ${a} ${r}, transparent ${r}),
                linear-gradient(to left, ${a} ${r}, transparent ${r}),
                linear-gradient(to bottom, ${a} ${r}, transparent ${r}),
                linear-gradient(to right, ${a} ${r}, transparent ${r}),
                linear-gradient(to top, ${a} ${r}, transparent ${r}),
                linear-gradient(to left, ${a} ${r}, transparent ${r}),
                linear-gradient(to top, ${a} ${r}, transparent ${r});

            background-position: 
                0 0, 0 0, /* Top Left */
                100% 0, 100% 0, /* Top Right */
                0 100%, 0 100%, /* Bottom Left */
                100% 100%; /* Bottom Right */

            background-repeat: no-repeat;
            background-size: ${"8px"} ${"8px"};
            
            font-family: 'Roboto Mono', monospace;
            
            animation: ${n} 0.5s ease-out both;
            /* Stagger animation slightly for columns if desired, but keeping it simple for now */
        `}};const x=({disbursementData:e,collectionData:t})=>{const r=(0,b.useStyles2)(h),a=[];for(let t=1;t<=4;t++){let r="";for(const a of e){const e=a[`disMetric${t}`],n=a[`nameDisMetric${t}`];if(void 0!==e){r=void 0!==n?String(n):`Metric ${t}`;break}}r&&a.push(r)}const n=[];for(let e=1;e<=4;e++){let r="";for(const a of t){const t=a[`colMetric${e}`],n=a[`nameColMetric${e}`];if(void 0!==t){r=void 0!==n?String(n):`Metric ${e}`;break}}r&&n.push(r)}return e&&0!==e.length||t&&0!==t.length?g().createElement("div",{className:r.wrapper},g().createElement("table",{className:r.table},g().createElement("thead",null,g().createElement("tr",null,g().createElement("th",{className:r.th,style:{width:"150px"}}),g().createElement("th",{className:r.thGroup,colSpan:a.length},"CHI HỘ")),g().createElement("tr",null,g().createElement("th",{className:r.th}),a.map((e,t)=>g().createElement("th",{className:r.th,key:t},e)))),g().createElement("tbody",null,e.map((e,t)=>{const a=function(e){const t=[];for(let r=1;r<=4;r++){const a=e[`disMetric${r}`],n=e[`nameDisMetric${r}`];void 0!==a&&t.push({value:a,name:n||`Metric ${r}`})}return t}(e);return g().createElement("tr",{key:e.id||t},g().createElement("td",{className:r.tdLabel,style:{animationDelay:.1*t+"s"}},e.label),a.map((e,a)=>g().createElement("td",{className:r.tdNum,key:a,style:{animationDelay:.1*t+.1*(a+1)+"s"}},e.value)))}))),g().createElement("table",{className:r.table},g().createElement("thead",null,g().createElement("tr",null,g().createElement("th",{className:r.th,style:{width:"150px"}}),g().createElement("th",{className:r.thGroup,colSpan:n.length},"THU HỘ")),g().createElement("tr",null,g().createElement("th",{className:r.th}),n.map((e,t)=>g().createElement("th",{className:r.th,key:t},e)))),g().createElement("tbody",null,t.map((e,t)=>{const a=function(e){const t=[];for(let r=1;r<=4;r++){const a=e[`colMetric${r}`],n=e[`nameColMetric${r}`];void 0!==a&&t.push({value:a,name:n||`Metric ${r}`})}return t}(e);return g().createElement("tr",{key:e.id||t},g().createElement("td",{className:r.tdLabel,style:{animationDelay:.1*t+"s"}},e.label),a.map((e,a)=>g().createElement("td",{className:r.tdNum,key:a,style:{animationDelay:.1*t+.1*(a+1)+"s"}},e.value)))})))):g().createElement("div",null,"No data")};function $(e,t){return e.fields.find(e=>e.name.toLowerCase().startsWith(t.toLowerCase()))}const v=e=>{if(null!=e){if("number"==typeof e)return e;if("string"==typeof e){const t=e.replace(/[^0-9.-]/g,""),r=parseFloat(t);return isNaN(r)?void 0:r}}},y=e=>{if(null==e)return;const t=String(e).trim();return""!==t&&"NULL"!==t.toUpperCase()?t:void 0};var M=l(531);const E=()=>({wrapper:f.css`
      font-family: Open Sans;
      position: relative;
    `,svg:f.css`
      position: absolute;
      top: 0;
      left: 0;
    `,textBox:f.css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `}),w=new u.PanelPlugin(({options:e,data:t,width:r,height:a,fieldConfig:n,id:o})=>{const i=(0,b.useStyles2)(E);if(0===t.series.length)return g().createElement(M.PanelDataErrorView,{fieldConfig:n,panelId:o,data:t,needsStringField:!0});const s=(e=>{const t=[];return e.series&&0!==e.series.length?(e.series.forEach(e=>{const r=$(e,"id"),a=$(e,"label");if(r||a)for(let n=0;n<e.length;n++){const o={id:r?String(r.values[n]):`node-${n}`,label:a?String(a.values[n]):`Node ${n}`};for(let t=1;t<=4;t++){const r=$(e,`disMetric${t}`),a=$(e,`nameDisMetric${t}`);if(r){const e=v(r.values[n]);void 0!==e&&(1===t?o.disMetric1=e:2===t?o.disMetric2=e:3===t?o.disMetric3=e:4===t&&(o.disMetric4=e))}if(a){const e=y(a.values[n]);void 0!==e&&(1===t?o.nameDisMetric1=e:2===t?o.nameDisMetric2=e:3===t?o.nameDisMetric3=e:4===t&&(o.nameDisMetric4=e))}}t.push(o)}}),t):t})(t),l=(e=>{const t=[];return e.series&&0!==e.series.length?(e.series.forEach(e=>{const r=$(e,"id"),a=$(e,"label");if(r||a)for(let n=0;n<e.length;n++){const o={id:r?String(r.values[n]):`node-${n}`,label:a?String(a.values[n]):`Node ${n}`};for(let t=1;t<=4;t++){const r=$(e,`colMetric${t}`),a=$(e,`nameColMetric${t}`);if(r){const e=v(r.values[n]);void 0!==e&&(1===t?o.colMetric1=e:2===t?o.colMetric2=e:3===t?o.colMetric3=e:4===t&&(o.colMetric4=e))}if(a){const e=y(a.values[n]);void 0!==e&&(1===t?o.nameColMetric1=e:2===t?o.nameColMetric2=e:3===t?o.nameColMetric3=e:4===t&&(o.nameColMetric4=e))}}t.push(o)}}),t):t})(t);return g().createElement("div",{className:i.wrapper},g().createElement(x,{disbursementData:s,collectionData:l}))}).useFieldConfig({disableStandardOptions:Object.values(u.FieldConfigProperty).filter(e=>e!==u.FieldConfigProperty.Links)}).setPanelOptions((e,t)=>{});return c})());
//# sourceMappingURL=module.js.map