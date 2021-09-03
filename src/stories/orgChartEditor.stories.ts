import { OrgChartEditor } from "../app/orgChartEditor/OrgChartEditor.component";
import { OrgChartEditorCustomShape } from "../app/orgChartEditorCustomShape/OrgChartEditorCustomShape.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Org Chart Editor",
  component: OrgChartEditor,
  decorators: [
    moduleMetadata({
      declarations: [OrgChartEditor, OrgChartEditorCustomShape],
      imports: [CommonModule],
    }),
  ],
};

export const ImgCard = () => ({
  component: OrgChartEditor,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in org chart mode</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/orgChartEditor/OrgChartEditor.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-OrgChartEditor></app-OrgChartEditor>
    </section>
  `,
});

export const CustomShape = () => ({
  component: OrgChartEditorCustomShape,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in org chart mode. Custom shapes</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/orgChartEditorCustomShape/OrgChartEditorCustomShape.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-OrgChartEditorCustomShape></app-OrgChartEditorCustomShape>
    </section>
  `,
});

