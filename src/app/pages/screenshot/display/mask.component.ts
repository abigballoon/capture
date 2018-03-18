import { Component, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Rect } from "./utils";
import { Service } from "./service";

@Component({
  selector: "mask",
  template: `<div style="position: relative;">
               <div #highlight></div>
             </div>`,
})
export class MaskComponent implements AfterViewInit {
  private _hlarea: Rect;
  @Input() set hlarea(hlarea: Rect) {
    if (!hlarea) {this._hlarea = {lt: {x: 0, y: 0}, br: {x: 0, y: 0}};}
    else {this._hlarea = hlarea;}
    this.setHL();
  }
  get hlarea() {
    return this._hlarea;
  }

  @ViewChild("highlight") el: ElementRef;

  constructor (
    private service: Service,
  ) {
    this.service.hlarea$.subscribe(
      val => this.hlarea = val
    )
  }

  initStyle() {
    this.el.nativeElement.style["position"] = "absolute";
    this.setHL();
    this.el.nativeElement.style["box-shadow"] = "0px 0px 0px 9999px rgba(0, 0, 0, 0.4)";
  }

  getArea() {
    return this.hlarea || {lt: {x: 0, y: 0}, br: {x: 0, y: 0}};
  }

  setHL() {
    let hlarea = this.getArea();
    this.el.nativeElement.style["top"] = hlarea.lt.y + "px";
    this.el.nativeElement.style["left"] = hlarea.lt.x + "px";
    this.el.nativeElement.style["width"] = (hlarea.br.x - hlarea.lt.x) + "px";
    this.el.nativeElement.style["height"] = (hlarea.br.y - hlarea.lt.y) + "px";
  }

  ngAfterViewInit() {
    this.initStyle();
  }
}