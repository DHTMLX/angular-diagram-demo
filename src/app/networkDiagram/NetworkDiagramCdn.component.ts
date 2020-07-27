import { Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

const defaults = {
  width: 160,
  height: 160,
  img: "../common/img/network_image/desktop.svg",
  text: "Network Card",
  ip: "138.68.41.78",
  preview: {
    scale: 0.8,
  },
};

@Component({
  selector: "app-NetworkDiagramCdn",
  template: `
    <div class="dhx-container_inner">
      <div class="dhx_sample-controls" [style.display]="collapsed ? 'flex' : 'none'">
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="runEditor()">
          Edit
        </button>
      </div>
      <div class="dhx_sample-container__without-editor" [style.display]="collapsed ? 'block' : 'none'">
        <div #diagram class="dhx_sample-container__widget overflow_hidden"></div>
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
  styleUrls: ["../app.component.css", "./NetworkDiagramCdn.css"],
  encapsulation: ViewEncapsulation.None,
})
export class NetworkDiagramCdn implements OnDestroy {
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

  template(config) {
    return `
      <section class="dhx-diagram-demo_network-card">
        <img src="${config.img}" alt="${config.text}"></img>
        <span>${config.text}</span>
        <span>${config.ip}</span>
      </section>
    `;
  }

  @Output() ready: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        lineGap: 20,
      });
      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        controls: { autoLayout: false },
        shapeSections: {
          "network shape": ["networkCard"],
          "flowchart shapes": [true],
        },
        lineGap: 20,
      });
      this.diagram.addShape("networkCard", {
        template: this.template,
        defaults,
      });
      this.editor.diagram.addShape("networkCard", {
        template: this.template,
        defaults,
        properties: [{ type: "arrange" }, { type: "img", label: "photo" }, { type: "text" }, { type: "text", label: "IP", property: "ip" }],
      });
      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });
      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
      this.diagram.data.load("./static/networkDiagram.json");
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
