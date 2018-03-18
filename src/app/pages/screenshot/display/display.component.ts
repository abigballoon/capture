import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScreenService } from "./../screen.service";
import { NativeImage } from "electron";
import { ElectronService } from "../../../common/electron/service";
import { MainPanelService } from "../../../app.service";
import { Rect } from "./utils";
import { Service } from "./service";

@Component({
  templateUrl: './display.html',
})
export class ScreenDisplay implements OnInit {
  img: any;
  base64img = '';

  dragging: boolean = false;
  hlarea: Rect;

  constructor (
    private dataService: ScreenService,
    private electron: ElectronService,
    private panelService: MainPanelService,
    private router: Router,
    private internalService: Service,
  ) {}

  ngOnInit() {
    this.setImg();
  }

  setImg() {
    this.img = this.dataService.getData();
    this.base64img = this.img.base64;
    this.panelService.setShowToolBar(false);
    this.electron.resizeWindow(this.electron.screenSize());
    // this.electron.alwaysOnTop(true);
    this.electron.setPos({x: 0, y: 0});
  }

  handleMouseUpEvent(event: MouseEvent) {
    if (event.which == 3) {
      let valid = this.validhlarea();
      console.log(valid);
      if (valid) {this.clearDrag();}
      else {this.router.navigate(["/", ]);}
    } else if (event.which == 1) {
      this.dragging = false;
    }
  }

  handleMouseDownEvent(event: MouseEvent) {
    if (event.which != 1) return;
    let x: number = event.screenX;
    let y: number = event.screenY;
    this.hlarea = {lt: {x: x, y: y}, br: {x: x, y: y}};
    this.dragging = true;
  }

  handleMouseMoveEvent(event: MouseEvent) {
    if (!this.dragging) {return;}
    this.hlarea.br.x = event.screenX;
    this.hlarea.br.y = event.screenY;
    this.internalService.pipe(this.hlarea);
  }

  clearDrag() {
    this.hlarea = null;
    this.dragging = false;
    this.internalService.pipe(this.hlarea);
  }

  validhlarea() {
    let area = this.hlarea;
    console.log(area);
    if (!area) { return false; }
    if (area.br.x == area.lt.x || area.lt.y == area.br.y) { return false; }
    return true;
  }
}