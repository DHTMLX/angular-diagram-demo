import { Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

@Component({
  selector: "app-HospitalOrgChartCdn",
  template: `
    <div class="dhx-container_inner">
      <div class="dhx_sample-controls" [style.display]="collapsed ? 'flex' : 'none'">
        <button class="dhx_sample-btn dhx_sample-btn--flat" (click)="runEditor()">
          Edit
        </button>
      </div>
      <div class="dhx_sample-container__without-editor" [style.display]="collapsed ? 'block' : 'none'">
        <div #diagram class="dhx_sample-container__widget"></div>
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
  styleUrls: ["../app.component.css", "./HospitalOrgChartCdn.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HospitalOrgChartCdn implements OnDestroy {
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

  template({ photo, name, post, phone, mail }) {
    return `
      <div class="dhx-diagram-demo_personal-card">
        <div class="dhx-diagram-demo_personal-card__container dhx-diagram-demo_personal-card__img-container">
          <img src="${photo}" alt="${name}-${post}"></img>
        </div>
        <div class="dhx-diagram-demo_personal-card__container">
          <h3>${name}</h3>
          <p>${post}</p>
          <span class="dhx-diagram-demo_personal-card__info">
            <i class="material-icons">phone_android</i>
            <p>${phone}</p>
          </span>
          <span class="dhx-diagram-demo_personal-card__info">
            <i class="material-icons">email</i>
            <a href="mailto:${mail}" target="_blank">${mail}</a>
          </span>
        </div>
      </div>
      `;
  }

  @Output() ready: EventEmitter<any> = new EventEmitter();

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
          { type: "text", label: "name", property: "name" },
          { type: "text", label: "post", property: "post" },
          { type: "text", label: "phone", property: "phone" },
          { type: "text", label: "email", property: "mail" },
          { type: "img", label: "photo", property: "photo" },
        ],
      });
      this.editor.events.on("ApplyButton", () => {
        this.applyButton();
      });
      this.editor.events.on("ResetButton", () => {
        this.resetButton();
      });
      this.diagram.data.load("./static/medCardShape.json");
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
