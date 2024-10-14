import { DiagramEditor } from "@dhx/trial-diagram";
import { IDefaultEditorConfig } from "@dhx/trial-diagram/codebase/types/ts-diagram-editor";
import { getData } from "./data";

import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "diagram-editor",
  styleUrls: ["./diagram-editor.component.css"],
  template: `<div #container class="widget"></div>`,
})

export class DiagramEditorComponent implements OnInit, OnDestroy {
  @ViewChild("container", { static: true }) editor_container!: ElementRef;

  private _diagram_editor!: DiagramEditor;

  ngOnInit() {
    const data = getData();
    this._diagram_editor = new DiagramEditor(this.editor_container.nativeElement, { type: "default" } as IDefaultEditorConfig);
    this._diagram_editor.parse(data);
  }

  ngOnDestroy(): void {
    this._diagram_editor?.destructor();
  }
}
