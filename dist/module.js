/* [create-plugin] version: 6.8.4 */
/* [create-plugin] plugin: vpbank-tableDashboardOCC-panel@1.0.0 */
define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","module","react"],(e,t,n,r,a,o)=>(()=>{"use strict";var i={89(t){t.exports=e},781(e){e.exports=t},531(e){e.exports=n},7(e){e.exports=r},308(e){e.exports=a},959(e){e.exports=o}},s={};function l(e){var t=s[e];if(void 0!==t)return t.exports;var n=s[e]={exports:{}};return i[e](n,n.exports,l),n.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="public/plugins/vpbank-tableDashboardOCC-panel/";var c={};l.r(c),l.d(c,{plugin:()=>k});var d=l(308),p=l.n(d);l.p=p()&&p().uri?p().uri.slice(0,p().uri.lastIndexOf("/")+1):"public/plugins/vpbank-tableDashboardOCC-panel/";var u=l(781),m=l(959),f=l.n(m),g=l(89),b=l(7);const h=e=>{const t="#0099FF",n="2px",r=t,a=g.keyframes`
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    `;return{wrapper:g.css`
            width: 100%;
            height: 100%;
            overflow: auto;
            font-family: "Open Sans", Helvetica, Arial, sans-serif;
            background: ${e.colors.background||"#0f1113"};
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.02);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
        `,table:g.css`
            width: 100%;
            border-collapse: separate;
            border-spacing: 10px;
            color: ${e.colors.text.primary};
            background: transparent;
            padding: 0;
            border-radius: 0;
            border: none;
            box-shadow: none;
        `,thGroup:g.css`
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 16px;
            color: ${t};
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 8px rgba(0, 153, 255, 0.4);
        `,th:g.css`
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 14px;
            color: ${e.colors.text.secondary};
        `,tdLabel:g.css`
            padding: 15px;
            text-align: left;
            font-weight: bold;
            color: ${t};
            font-size: 15px;
            border: none;
            border-bottom: 1px solid rgba(0, 153, 255, 0.1);
            width: 150px;
            min-width: 120px;
            
            animation: ${a} 0.5s ease-out both;
        `,tdNum:g.css`
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
                linear-gradient(to right, ${r} ${n}, transparent ${n}),
                linear-gradient(to bottom, ${r} ${n}, transparent ${n}),
                linear-gradient(to left, ${r} ${n}, transparent ${n}),
                linear-gradient(to bottom, ${r} ${n}, transparent ${n}),
                linear-gradient(to right, ${r} ${n}, transparent ${n}),
                linear-gradient(to top, ${r} ${n}, transparent ${n}),
                linear-gradient(to left, ${r} ${n}, transparent ${n}),
                linear-gradient(to top, ${r} ${n}, transparent ${n});

            background-position: 
                0 0, 0 0, /* Top Left */
                100% 0, 100% 0, /* Top Right */
                0 100%, 0 100%, /* Bottom Left */
                100% 100%; /* Bottom Right */

            background-repeat: no-repeat;
            background-size: ${"8px"} ${"8px"};
            
            font-family: 'Roboto Mono', monospace;
            
            animation: ${a} 0.5s ease-out both;
        `}},x=({title:e,rows:t})=>{const n=(0,b.useStyles2)(h),r=t.length>0?t[0].metrics.map(e=>e.name):[];return 0===t.length?f().createElement("div",null,"No data"):f().createElement("div",{className:n.wrapper},f().createElement("table",{className:n.table},f().createElement("thead",null,f().createElement("tr",null,f().createElement("th",{className:n.th,style:{width:"150px"}}),e&&f().createElement("th",{className:n.thGroup,colSpan:r.length},e)),f().createElement("tr",null,f().createElement("th",{className:n.th}),r.map((e,t)=>f().createElement("th",{className:n.th,key:t},e)))),f().createElement("tbody",null,t.map((e,t)=>f().createElement("tr",{key:e.id||t},f().createElement("td",{className:n.tdLabel,style:{animationDelay:.1*t+"s"}},e.label),e.metrics.map((e,r)=>f().createElement("td",{className:n.tdNum,key:r,style:{animationDelay:.1*t+.1*(r+1)+"s"}},e.value)))))))};function v(e,t){return e.fields.find(e=>e.name.toLowerCase().startsWith(t.toLowerCase()))}const $=e=>{if(null!=e){if("number"==typeof e)return e;if("string"==typeof e){const t=e.replace(/[^0-9.-]/g,""),n=parseFloat(t);return isNaN(n)?void 0:n}}},y=e=>{if(null==e)return;const t=String(e).trim();return""!==t&&"NULL"!==t.toUpperCase()?t:void 0};function w(e){const t=e.fields.some(e=>"metric"===e.name.toLowerCase()),n=e.fields.some(e=>"value"===e.name.toLowerCase());return t&&n}function C(e){if(!e.series||0===e.series.length)return[];return e.series.some(e=>w(e))?function(e){const t=Date.now()-6e5,n=new Date;n.setHours(0,0,0,0);const r=n.getTime(),a=new Map;for(const n of e.series){if(!w(n))continue;const e=n.fields.find(e=>"time"===e.name.toLowerCase()||"time"===e.type),i=n.fields.find(e=>"metric"===e.name.toLowerCase()),s=n.fields.find(e=>"value"===e.name.toLowerCase());if(i&&s)for(let l=0;l<n.length;l++){var o;const n=String(null!==(o=i.values[l])&&void 0!==o?o:"").trim();if(!n)continue;const c=$(s.values[l]);if(void 0===c)continue;let d;if(e){const t=e.values[l];d="number"==typeof t?t:new Date(t).getTime()}a.has(n)||a.set(n,{daily:0,tenMin:0});const p=a.get(n);(void 0===d||d>=r)&&(p.daily+=c),(void 0===d||d>=t)&&(p.tenMin+=c)}}const i=[];let s=0;return a.forEach((e,t)=>{i.push({id:`elk-${s}`,label:t,metrics:[{name:"Trong ngày",value:e.daily},{name:"10 phút",value:e.tenMin}]}),s++}),i}(e):function(e){const t=[];return e.series&&0!==e.series.length?(e.series.forEach(e=>{const n=v(e,"id"),r=v(e,"label");if(n||r)for(let a=0;a<e.length;a++){const o={id:n?String(n.values[a]):`node-${a}`,label:r?String(r.values[a]):`Node ${a}`};for(let t=1;t<=4;t++){const n=v(e,`colMetric${t}`),r=v(e,`nameColMetric${t}`);if(n){const e=$(n.values[a]);void 0!==e&&(1===t?o.colMetric1=e:2===t?o.colMetric2=e:3===t?o.colMetric3=e:4===t&&(o.colMetric4=e))}if(r){const e=y(r.values[a]);void 0!==e&&(1===t?o.nameColMetric1=e:2===t?o.nameColMetric2=e:3===t?o.nameColMetric3=e:4===t&&(o.nameColMetric4=e))}}const i=[];for(let e=1;e<=4;e++){const t=o[`colMetric${e}`],n=o[`nameColMetric${e}`];void 0!==t&&i.push({name:n||`Metric ${e}`,value:t})}i.length>0&&t.push({id:o.id,label:o.label,metrics:i})}}),t):t}(e)}var M=l(531);const E=()=>({wrapper:g.css`
      font-family: Open Sans;
      position: relative;
    `,svg:g.css`
      position: absolute;
      top: 0;
      left: 0;
    `,textBox:g.css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `}),k=new u.PanelPlugin(({options:e,data:t,width:n,height:r,fieldConfig:a,id:o})=>{const i=(0,b.useStyles2)(E);if(0===t.series.length)return f().createElement(M.PanelDataErrorView,{fieldConfig:a,panelId:o,data:t,needsStringField:!0});const s=C(t);return f().createElement("div",{className:i.wrapper},f().createElement(x,{title:e.title,rows:s}))}).useFieldConfig({disableStandardOptions:Object.values(u.FieldConfigProperty).filter(e=>e!==u.FieldConfigProperty.Links)}).setPanelOptions((e,t)=>{e.addTextInput({path:"title",name:"Table Title",description:"Tên bảng hiển thị (ví dụ: CHI HỘ, THU HỘ)",defaultValue:""})});return c})());
//# sourceMappingURL=module.js.map