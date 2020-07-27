import { AutoplacementCdn } from "../app/autoplacement/AutoplacementCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Autoplacement",
  component: AutoplacementCdn,
  decorators: [
    moduleMetadata({
      declarations: [AutoplacementCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: AutoplacementCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/autoplacement/AutoplacementCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-AutoplacementCdn></app-AutoplacementCdn>
    </section>
  `,
});
