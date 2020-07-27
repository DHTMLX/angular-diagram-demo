import { AutoplacementWithEditorCdn } from "../app/autoplacementWithEditor/AutoplacementWithEditorCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Autoplacement With Editor",
  component: AutoplacementWithEditorCdn,
  decorators: [
    moduleMetadata({
      declarations: [AutoplacementWithEditorCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: AutoplacementWithEditorCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/autoplacementWithEditor/AutoplacementWithEditorCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-AutoplacementWithEditorCdn></app-AutoplacementWithEditorCdn>
    </section>
  `,
});
