import { Component, ViewChild, OnDestroy, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { networkData } from "../../../public/static/data";

@Component({
  selector: "app-DefaultEditorCustomShape",
  template: `
    <div class="dhx-container_inner" [ngClass]="{'dhx_sample-container__with-editor': expanded, 'dhx_sample-container__without-editor': collapsed }">
      <div class="dhx_sample-controls" [style.display]="collapsed ? 'flex' : 'none'">
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="runEditor()">
          Edit
        </button>
      </div>
      <div #diagram class="dhx_sample-widget" [style.display]="collapsed ? 'block' : 'none'"></div>
      <div #editor class="dhx_sample-widget" [style.display]="collapsed ? 'none' : 'block'"></div>
    </div>
  `,
  styleUrls: ["../app.component.css", "DefaultEditorCustomShape.css"],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultEditorCustomShape implements OnDestroy {
  @ViewChild("diagram", { read: ElementRef })
  containerDiagram: ElementRef;

  @ViewChild("editor", { read: ElementRef })
  containerEditor: ElementRef;

  diagram: any;
  editor: any;
  collapsed: boolean = true;
  expanded: boolean = false;
  path: string = "./common/img/network/";
  defaults: {[key: string]: any} = {
    width: 160,
    height: 160,
    img: "./common/img/network/desktop.svg",
    text: "Network Card",
    ip: "138.68.41.78",
    preview: {
      scale: 0.8,
    },
  };
  wait: Promise<void>;

  runEditor() {
    this.collapsed = false;
    this.expanded = !this.collapsed;
    this.editor.import(this.diagram);
  }

  applyButton() {
    this.collapsed = true;
    this.expanded = !this.collapsed;
    this.diagram.data.parse(this.editor.serialize());
  }

  resetButton() {
    this.collapsed = true;
    this.expanded = !this.collapsed;
  }

  template({ img, text, ip }) {
    return `
        <section class="dhx-diagram-demo_network-card">
          <img src="${img}" alt="${text}"></img>
          <span>${text}</span>
          <span>${ip}</span>
        </section>
      `;
  }

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      const core = { type: "networkCard", img: this.path + "core.svg" };
      const server = { type: "networkCard", img: this.path + "server.svg" };
      const cloud = { type: "networkCard", img: this.path + "cloud.svg" };
      const user = { type: "networkCard", img: this.path + "fieldworker.svg" };
      const desktop = { type: "networkCard", img: this.path + "desktop.svg" };

      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        type: "default",
        lineGap: 20,
      });

      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        controls: { autoLayout: false },
        shapeSections: {
          "Network Shapes": [core, server, cloud, user, desktop],
        },
        shapeBarWidth: 320,
        lineGap: 20,
      });

      this.diagram.addShape("networkCard", {
        template: this.template,
        defaults: this.defaults,
      });

      this.editor.diagram.addShape("networkCard", {
        template: this.template,
        defaults: this.defaults,
        properties: [
          { type: "arrange" },
          { type: "img", label: "Photo" },
          { type: "text" },
          { type: "text", label: "IP", property: "ip" }
        ]
      });

      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });

      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
  
      this.diagram.data.parse(networkData);
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
