import { Component, ViewChild, OnDestroy, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { mindmapData } from "../../../public/static/data";

@Component({
  selector: "app-MindmapEditor",
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
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MindmapEditor implements OnDestroy {
  @ViewChild("diagram", { read: ElementRef })
  containerDiagram: ElementRef;

  @ViewChild("editor", { read: ElementRef })
  containerEditor: ElementRef;

  diagram: any;
  editor: any;
  collapsed: boolean = true;
  expanded: boolean = false;
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

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        type: "mindmap",
      });

      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        type: "mindmap",
      });
 
      this.diagram.data.parse(mindmapData);
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
