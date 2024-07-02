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

  private _diagram: DiagramEditor | null = null;

  ngOnInit() {
    const data = getData();
    this._diagram = new DiagramEditor(this.diagramContainer.nativeElement, { type: "default" } as IDefaultEditorConfig);
    this._diagram.parse(data);
  }

  ngOnDestroy(): void {
    this._diagram?.destructor();
  }
}
