import { Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

const defaults = {
  rectangle: {
    fill: "#44B3FC",
    stroke: "#44B3FC",
  },
  circle: {
    fill: "#3DA0E3",
    stroke: "#3DA0E3",
  },
  endpoint: {
    fill: "#307DB0",
    stroke: "#307DB0",
  },
};

@Component({
  selector: "app-DecisionTreeCdn",
  template: `
    <div class="dhx-container_inner">
      <div class="dhx_sample-controls" [style.display]="collapsed ? 'flex' : 'none'">
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="runEditor()">
          Edit
        </button>
      </div>
      <div class="dhx_sample-container__without-editor" [style.display]="collapsed ? 'block' : 'none'">
        <div #diagram class="dhx_sample-widget"></div>
      </div>
      <div class="dhx_sample-container__with-editor" [style.display]="collapsed ? 'none' : 'block'">
        <div #editor class="dhx_sample-widget"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .invisible {
        display: none;
      }
    `,
  ],
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class DecisionTreeCdn implements OnDestroy {
  @ViewChild("diagram", { read: ElementRef })
  containerDiagram: ElementRef;

  @ViewChild("editor", { read: ElementRef })
  containerEditor: ElementRef;

  diagram: any;
  editor: any;
  collapsed: boolean = true;
  wait: Promise<void>;

  runEditor() {
    this.collapsed = false;
    this.editor.import(this.diagram);
  }

  applyButton() {
    this.collapsed = true;
    this.diagram.data.parse(this.editor.serialize());
  }

  resetButton() {
    this.collapsed = true;
  }

  @Output() ready: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        lineGap: 40,
        defaults,
      });
      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        controls: { autoLayout: false },
      });

      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });
      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
      this.diagram.data.load("./static/decisionTree.json");
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
