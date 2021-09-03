import { Component, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { autoPlaceData } from "../../../public/static/data";

@Component({
  selector: "app-DefaultEditorAutoplacement",
  template: `
    <div class="dhx_sample-container">
      <div #editor class="dhx_sample-widget"></div>
    </div>
  `,
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultEditorAutoplacement {
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
        type: "default",
        autoplacement: {
          mode: "direct",
        },
      });

      this.editor.parse(autoPlaceData);
    });
  }
}
