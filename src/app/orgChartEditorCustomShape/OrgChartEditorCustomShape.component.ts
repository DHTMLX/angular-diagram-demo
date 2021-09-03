import { Component, ViewChild, OnDestroy, ElementRef, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

import { medicalWorkers } from "../../../public/static/data";

@Component({
  selector: "app-OrgChartEditorCustomShape",
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
  styleUrls: ["../app.component.css", "./OrgChartEditorCustomShape.css"],
  encapsulation: ViewEncapsulation.None,
})
export class OrgChartEditorCustomShape implements OnDestroy {
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

  template({ photo, name, post, phone, mail }) {
    return `
        <div class="dhx_diagram_template_a_box dhx_diagram_template_a">
          <div class="dhx_diagram_template_a__inside">
            <div class="dhx_diagram_template_a__picture" style="background-image: url(${photo});"></div>
            <div class="dhx_diagram_template_a__body">
              <div class="dhx_diagram_template_a__title">${name}</div>
              <div class="dhx_diagram_template_a__row">
                <span class="dhx_diagram_template_a__text">${post}</span>
              </div>
              <div class="dhx_diagram_template_a__row">
                <span class="dhx_diagram_template_a__icon mdi mdi-cellphone-android"></span>
                <span class="dhx_diagram_template_a__text">${phone}</span>
              </div>
              <div class="dhx_diagram_template_a__row">
                <span class="dhx_diagram_template_a__icon mdi mdi-email-outline"></span>
                <span class="dhx_diagram_template_a__text">
                  <a class="dhx_diagram_template_a__link" href="mailto:${mail}" target="_blank">${mail}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement, {
        type: "org",
        defaultShapeType: "template",
      });

      this.editor = new dhx.DiagramEditor(this.containerEditor.nativeElement, {
        type: "org",
        shapeType: "template",
      });

      this.diagram.addShape("template", {
        template: this.template,
        defaults: {
          height: 115,
          width: 330,
        },
      });

      this.editor.diagram.addShape("template", {
        template: this.template,
        defaults: {
          name: "Name and First name",
          post: "Position held",
          phone: "(405) 000-00-00",
          mail: "some@mail.com",
          photo: "../common/big_img/big-avatar-1.jpg",

          height: 115,
          width: 330,
        },
        properties: [
          { type: "position" },
          { type: "size" },
          { type: "text", label: "Name", property: "name" },
          { type: "text", label: "Post", property: "post" },
          { type: "text", label: "Phone", property: "phone" },
          { type: "text", label: "Mail", property: "mail" },
          { type: "img", label: "Photo", property: "photo" },
        ],
      });

      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });

      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
  
      this.diagram.data.parse(medicalWorkers);
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
