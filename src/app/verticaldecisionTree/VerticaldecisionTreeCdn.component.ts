import { Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

@Component({
  selector: "app-VerticaldecisionTreeCdn",
  template: `
    <div class="dhx-container_inner">
      <div class="dhx_sample-controls" [style.display]="collapsed ? 'flex' : 'none'">
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="runEditor()">
          Edit
        </button>
      </div>
      <div class="dhx_sample-container__without-editor" [style.display]="collapsed ? 'block' : 'none'">
        <div #diagram dhx_sample-container__widget></div>
      </div>
      <div class="dhx_sample-container__with-editor" [style.display]="collapsed ? 'none' : 'block'">
        <div #editor class="dhx_sample-widget"></div>
      </div>
    </div>
  `,
  styles: [".invisible {display: none;}"],
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class VerticaldecisionTreeCdn implements OnDestroy {
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
        scale: 0.8,
      });
      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        controls: { autoLayout: false },
        scale: 0.8,
      });
      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });
      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
      this.diagram.data.load("./static/verticalTree.json");
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
