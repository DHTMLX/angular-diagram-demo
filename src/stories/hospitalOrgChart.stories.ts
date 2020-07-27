import { HospitalOrgChartCdn } from "../app/hospitalOrgChart/HospitalOrgChartCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Hospital Org Chart",
  component: HospitalOrgChartCdn,
  decorators: [
    moduleMetadata({
      declarations: [HospitalOrgChartCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: HospitalOrgChartCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/hospitalOrgChart/HospitalOrgChartCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-HospitalOrgChartCdn></app-HospitalOrgChartCdn>
    </section>
  `,
});
