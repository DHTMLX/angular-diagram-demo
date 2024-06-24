import { DiagramEditor } from "@dhx/trial-diagram";
import { getData } from "./data";

import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { IDefaultEditorConfig } from "@dhx/trial-diagram/codebase/types/ts-diagram-editor";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "diagram",
  styleUrls: ["./diagram.component.css"],
  template: `<div #here class="widget"></div>`,
})
export class DiagramComponent implements OnInit, OnDestroy {
  @ViewChild("here", { static: true }) diagramContainer!: ElementRef;

  private _diagram: any;

  ngOnInit() {
    const data = getData();
    let diagram = new DiagramEditor(this.diagramContainer.nativeElement, { type: "default" } as IDefaultEditorConfig);
    diagram.parse(data);
    this._diagram = diagram;
  }

  ngOnDestroy(): void {
    this._diagram.destructor();
  }
}
