import { LifeCycleDiagramWithStickyNotesCdn } from "../app/lifeCycleDiagramWithStickyNotes/LifeCycleDiagramWithStickyNotesCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Life Cycle Diagram With Sticky Notes",
  component: LifeCycleDiagramWithStickyNotesCdn,
  decorators: [
    moduleMetadata({
      declarations: [LifeCycleDiagramWithStickyNotesCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: LifeCycleDiagramWithStickyNotesCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/lifeCycleDiagramWithStickyNotes/LifeCycleDiagramWithStickyNotesCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-LifeCycleDiagramWithStickyNotesCdn></app-LifeCycleDiagramWithStickyNotesCdn>
    </section>
  `,
});
