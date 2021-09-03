import { Component, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { workers } from "../../../public/static/data";

@Component({
  selector: "app-OrgChartEditor",
  template: `
    <div class="dhx_sample-container">
      <div #editor class="dhx_sample-widget"></div>
    </div>
  `,
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class OrgChartEditor {
  @ViewChild("editor", { read: ElementRef })
  containerEditor: ElementRef;

  editor: any;
  wait: Promise<void>;

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        type: "org",
        shapeType: "img-card",
      });

      this.editor.parse(workers);
    });
  }
}
