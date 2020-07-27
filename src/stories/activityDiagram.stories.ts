import { ActivityDiagramCdn } from "../app/activityDiagram/ActivityDiagramCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Activity Diagram",
  component: ActivityDiagramCdn,
  decorators: [
    moduleMetadata({
      declarations: [ActivityDiagramCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: ActivityDiagramCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/activityDiagram/ActivityDiagramCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-ActivityDiagramCdn></app-ActivityDiagramCdn>
    </section>
  `,
});
