import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScreenService } from "./../screen.service";
import { NativeImage, Rectangle } from "electron";
import { ElectronService } from "../../../common/electron/service";
import { MainPanelService } from "../../../app.service";
import { Rect } from "./utils";
import { Service } from "./service";
import * as fs from 'fs';

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
      if (valid) {this.clearDrag();}
      else {this.router.navigate(["/", ]);}
    } else if (event.which == 1) {
      this.dragging = false;
    }
  }

  handleMouseDownEvent(event: MouseEvent) {
    if (event.which != 1) return;
    if (this.validhlarea() && this.insidehlarea(event)) {
      this.saveImg();
      this.clearDrag();
      this.router.navigate(["/", ]);
    }
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
    if (!area) { return false; }
    if (area.br.x == area.lt.x || area.lt.y == area.br.y) { return false; }
    return true;
  }

  insidehlarea(event: MouseEvent) {
    if (!this.validhlarea()) return false;
    let area = this.hlarea;
    let x = event.screenX;
    let y = event.screenY;
    if ((area.lt.x < x && area.br.x > x) && (area.lt.y < y && area.br.y > y)) {return true;}
    return false;
  }

  saveImg() {
    if (!this.validhlarea()) return;
    let croped = (<NativeImage>this.img.thumbnail).crop(
      {x: this.hlarea.lt.x, y: this.hlarea.lt.y, height: this.hlarea.br.y - this.hlarea.lt.y, width: this.hlarea.br.x - this.hlarea.lt.x}
    );
    let buff = croped.toPNG();
    fs.writeFile("./data/img.png", buff, error => console.log(error));
  }
}