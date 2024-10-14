import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DiagramEditorComponent } from "./diagram-editor/diagram-editor.component";

@NgModule({
  declarations: [AppComponent, DiagramEditorComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
