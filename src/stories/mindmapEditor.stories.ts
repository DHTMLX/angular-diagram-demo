import { MindmapEditor } from "../app/mindmapEditor/MindmapEditor.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Mindmap Editor",
  component: MindmapEditor,
  decorators: [
    moduleMetadata({
      declarations: [MindmapEditor],
      imports: [CommonModule],
    }),
  ],
};

export const Emotions = () => ({
  component: MindmapEditor,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Diagram with Editor in mindmap mode</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/mindmapEditor/MindmapEditor.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-MindmapEditor></app-MindmapEditor>
    </section>
  `,
});
