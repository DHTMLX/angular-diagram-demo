import { NetworkDiagramCdn } from "../app/networkDiagram/NetworkDiagramCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Network Diagram",
  component: NetworkDiagramCdn,
  decorators: [
    moduleMetadata({
      declarations: [NetworkDiagramCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: NetworkDiagramCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/networkDiagram/NetworkDiagramCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-NetworkDiagramCdn></app-NetworkDiagramCdn>
    </section>
  `,
});
