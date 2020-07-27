import { VerticaldecisionTreeCdn } from "../app/verticaldecisionTree/VerticaldecisionTreeCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Vertical decision Tree",
  component: VerticaldecisionTreeCdn,
  decorators: [
    moduleMetadata({
      declarations: [VerticaldecisionTreeCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: VerticaldecisionTreeCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/verticaldecisionTree/VerticaldecisionTreeCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-VerticaldecisionTreeCdn></app-VerticaldecisionTreeCdn>
    </section>
  `,
});
