import { Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter, ViewEncapsulation } from "@angular/core";
import fromCDN from "from-cdn";

@Component({
  selector: "app-AutoplacementCdn",
  template: `
    <div class="dhx-container_inner">
      <div class="dhx_sample-controls">
        <label
          class="dhx_form-group dhx_radiobutton dhx_form-group--inline dhx_form-group--no-message-holder dhx_form-group dhx_sample-input__wrapper--pl-16"
        >
          <input id="direct" type="radio" name="radio" value="direct" class="dhx_radiobutton__input" (change)="runDirect()" />
          <span class="dhx_radiobutton__visual-input"></span>
          <span class="dhx_label">Auto layout in direct mode</span>
        </label>
        <label
          class="dhx_form-group dhx_radiobutton dhx_form-group--inline dhx_form-group--no-message-holder dhx_sample-input__wrapper--pl-16"
        >
          <input id="edges" type="radio" name="radio" value="edges" class="dhx_radiobutton__input" (change)="runEdges()" />
          <span class="dhx_radiobutton__visual-input"></span>
          <span class="dhx_label">Auto layout in edges mode</span>
        </label>
      </div>
      <div class="dhx_sample-container">
        <div class="dhx_sample-container__widget" #diagram></div>
      </div>
    </div>
  `,
  styleUrls: ["../app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AutoplacementCdn implements OnDestroy {
  @ViewChild("diagram", { read: ElementRef })
  containerDiagram: ElementRef;

  diagram: any;
  wait: Promise<void>;

  runDirect() {
    this.diagram.autoPlace({
      mode: "direct",
    });
  }

  runEdges() {
    this.diagram.autoPlace({
      mode: "edges",
    });
  }

  @Output() ready: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.wait = fromCDN([
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
      "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
    ]).then(() => {
      this.diagram = new dhx.Diagram(this.containerDiagram.nativeElement);

      this.diagram.data.load("./static/autoplacement.json");
    });
  }

  ngOnDestroy() {
    this.diagram && this.diagram.destructor();
  }
}
