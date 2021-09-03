import { DefaultEditorAutoplacement } from "../app/defaultEditorAutoplacement/DefaultEditorAutoplacement.component";
import { DefaultEditorCustomShape } from "../app/defaultEditorCustomShape/DefaultEditorCustomShape.component";
import { DefaultEditorSwimlane } from "../app/defaultEditorSwimlane/DefaultEditorSwimlane.component";
import { DefaultEditorGroup } from "../app/defaultEditorGroup/DefaultEditorGroup.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Default Editor",
  component: DefaultEditorAutoplacement,
  decorators: [
    moduleMetadata({
      declarations: [DefaultEditorAutoplacement, DefaultEditorCustomShape, DefaultEditorSwimlane, DefaultEditorGroup],
      imports: [CommonModule],
    }),
  ],
};

export const Autoplacement = () => ({
  component: DefaultEditorAutoplacement,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in default mode. Auto layout button</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/defaultEditorAutoplacement/DefaultEditorAutoplacement.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-DefaultEditorAutoplacement></app-DefaultEditorAutoplacement>
    </section>
  `,
});

export const CustomShape = () => ({
  component: DefaultEditorCustomShape,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in default mode. Custom shapes</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/defaultEditorCustomShape/DefaultEditorCustomShape.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-DefaultEditorCustomShape></app-DefaultEditorCustomShape>
    </section>
  `,
});

export const Group = () => ({
  component: DefaultEditorGroup,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in default mode. Groups to organize shapes</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/defaultEditorGroup/DefaultEditorGroup.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-DefaultEditorGroup></app-DefaultEditorGroup>
    </section>
  `,
});

export const Swimlane = () => ({
  component: DefaultEditorSwimlane,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in default mode. Swimlane and export to pdf/png</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/defaultEditorSwimlane/DefaultEditorSwimlane.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-DefaultEditorSwimlane></app-DefaultEditorSwimlane>
    </section>
  `,
});
