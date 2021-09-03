import { Component, ViewChild, OnDestroy, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { simlaneExport } from "../../../public/static/data";

@Component({
  selector: "app-DefaultEditorSwimlane",
  template: `
    <div class="dhx-container_inner" [ngClass]="{'dhx_sample-container__with-editor': expanded, 'dhx_sample-container__without-editor': collapsed }">
      <div class="dhx_sample-controls" [style.display]="collapsed ? 'flex' : 'none'">
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="runEditor()">Edit</button>
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="exportPng()">Export PNG</button>
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="exportPdf()">Export PDF</button>
      </div>
      <div #diagram class="dhx_sample-widget" [style.display]="collapsed ? 'block' : 'none'"></div>
      <div #editor class="dhx_sample-widget" [style.display]="collapsed ? 'none' : 'block'"></div>
    </div>
  `,
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultEditorSwimlane implements OnDestroy {
  @ViewChild("diagram", { read: ElementRef })
  containerDiagram: ElementRef;

  @ViewChild("editor", { read: ElementRef })
  containerEditor: ElementRef;

  diagram: any;
  editor: any;
  collapsed: boolean = true;
  expanded: boolean = false;
  defaults: {[key: string]: any} = {
    start: {
      fill: "#F35A4F",
      stroke: "#F35A4F",
      fontColor: "#FFFFFF",
      strokeWidth: 2,
    },
    circle: {
      fill: "#F35A4F",
      stroke: "#F35A4F",
      fontColor: "#FFFFFF",
      strokeWidth: 2,
    },
    rectangle: {
      fill: "#FFFFFF",
      stroke: "#F35A4F",
      fontColor: "#4C4C4C",
      strokeWidth: 2,
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

  exportPdf() {
    this.diagram.export.pdf();
  }

  exportPng() {
    this.diagram.export.png();
  }

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        type: "default",
        defaults: this.defaults,
      });

      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        type: "default",
      });

      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });

      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
  
      this.diagram.data.parse(simlaneExport);
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
