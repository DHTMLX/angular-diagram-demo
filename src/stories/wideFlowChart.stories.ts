import { WideFlowChartCdn } from "../app/wideFlowChart/WideFlowChartCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Wide Flow Chart",
  component: WideFlowChartCdn,
  decorators: [
    moduleMetadata({
      declarations: [WideFlowChartCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: WideFlowChartCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/wideFlowChart/WideFlowChartCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-WideFlowChartCdn></app-WideFlowChartCdn>
    </section>
  `,
});
