import { UmlClassDiagramCdn } from "../app/umlClassDiagram/UmlClassDiagramCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "UML Class Diagram",
  component: UmlClassDiagramCdn,
  decorators: [
    moduleMetadata({
      declarations: [UmlClassDiagramCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: UmlClassDiagramCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/umlClassDiagram/UmlClassDiagramCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-UmlClassDiagramCdn></app-UmlClassDiagramCdn>
    </section>
  `,
});
