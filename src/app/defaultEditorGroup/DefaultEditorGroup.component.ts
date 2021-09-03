import { Component, ViewChild, OnDestroy, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { groupData } from "../../../public/static/data";

@Component({
  selector: "app-DefaultEditorGroup",
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
  styleUrls: ["../app.component.css", "DefaultEditorGroup.css"],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultEditorGroup implements OnDestroy {
  @ViewChild("diagram", { read: ElementRef })
  containerDiagram: ElementRef;

  @ViewChild("editor", { read: ElementRef })
  containerEditor: ElementRef;

  diagram: any;
  editor: any;
  collapsed: boolean = true;
  expanded: boolean = false;
  defaults: {[key: string]: any} = {
    template: {
      width: 115,
      height: 120,
      text: "description",
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

  template({ img, text }) {
    return `
        <div class="dhx-diagram-demo_group">
          <div class="dhx-diagram-demo_group__image" style="background-image:url(${img});"></div>
          <div class="dhx-diagram-demo_group__text">${text}</div>
        </div>
      `;
  }

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      const path = "./common/img/it/";
      const extension = ".png";

      const it_01 = { type: "template", img: path + "it_01" + extension, ...this.defaults.template };
      const it_02 = { type: "template", img: path + "it_02" + extension, ...this.defaults.template };
      const it_03 = { type: "template", img: path + "it_03" + extension, ...this.defaults.template };
      const it_04 = { type: "template", img: path + "it_04" + extension, ...this.defaults.template };
      const it_05 = { type: "template", img: path + "it_05" + extension, ...this.defaults.template };
      const it_06 = { type: "template", img: path + "it_06" + extension, ...this.defaults.template };
      const it_07 = { type: "template", img: path + "it_07" + extension, ...this.defaults.template };
      const it_08 = { type: "template", img: path + "it_08" + extension, ...this.defaults.template };
      const it_09 = { type: "template", img: path + "it_09" + extension, ...this.defaults.template };
      const it_10 = { type: "template", img: path + "it_10" + extension, ...this.defaults.template };
      const it_11 = { type: "template", img: path + "it_11" + extension, ...this.defaults.template };
      const it_12 = { type: "template", img: path + "it_12" + extension, ...this.defaults.template };
      const it_13 = { type: "template", img: path + "it_13" + extension, ...this.defaults.template };
      const it_14 = { type: "template", img: path + "it_14" + extension, ...this.defaults.template };

      const generalGroup = {
        type: "$group",
        width: 390,
        height: 350,
        header: {
          text: "General group",
          closable: true,
          fontColor: "#FFF",
          iconColor: "#FFF",
          fill: "#333",
        },
      };

      const regularGroup = {
        type: "$group",
        width: 390,
        height: 350,
        header: {
          text: "Regular group",
          closable: true,
        },
      };

      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        type: "default",
      });

      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        type: "default",
        shapeBarWidth: 330,
        scalePreview: 0.7,
        shapeSections: {
          "Architecture items": [
            it_01, it_02, it_03,
            it_04, it_05, it_06,
            it_07, it_08, it_09,
            it_10, it_11, it_12,
            it_13, it_14,
          ],
          "Groups": [
            generalGroup,
            regularGroup
          ],
        },
      });

      this.diagram.addShape("template", {
        template: this.template,
        defaults: this.defaults,
      });

      this.editor.diagram.addShape("template", {
        template: this.template,
        defaults: this.defaults,
        properties: [
          { type: "arrange" },
          { type: "text" },
        ]
      });

      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });

      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
  
      this.diagram.data.parse(groupData);
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
