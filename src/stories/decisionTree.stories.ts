import { DecisionTreeCdn } from "../app/decisionTree/DecisionTreeCdn.component";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Decision Tree",
  component: DecisionTreeCdn,
  decorators: [
    moduleMetadata({
      declarations: [DecisionTreeCdn],
      imports: [CommonModule],
    }),
  ],
};

export const Base = () => ({
  component: DecisionTreeCdn,
  template: `
    <section class="dhx-container">
      <div class="dhx-container_header">
        <h3>Basic initialization</h3>
        <a
          class="source-link"
          href="https://github.com/DHTMLX/angular-diagram-demo/blob/master/src/app/decisionTree/DecisionTreeCdn.component.ts"
          target="_blank"
        >
          Source code
        </a>
      </div>
      <app-DecisionTreeCdn></app-DecisionTreeCdn>
    </section>
  `,
});
