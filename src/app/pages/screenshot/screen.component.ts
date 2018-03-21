import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "../../common/electron/service";
import { NativeImage, ipcRenderer } from "electron";
import { ScreenService } from "./screen.service";
import { MainPanelService } from "../../app.service";

@Component({
  templateUrl: "./screen.component.html",
})
export class ScreenShotComponent {
  constructor (
    private electron: ElectronService,
    private dataService: ScreenService,
    private panelService: MainPanelService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.electron.resizeWindow({width: 140, height: 83});
    this.showWindow();
  }

  hideWindow() {
    this.panelService.setShow(false);
    this.electron.hide(true);
  }

  showWindow() {
    this.electron.hide(false);
    this.panelService.setShow(true);
    this.panelService.setShowToolBar(true);
  }

  capture() {
    this.hideWindow();
    setTimeout(() => this.snap(), 0);
  }

  snap() {
    this.electron.capture().then(
      img => {
        this.displayImg(img.thumbnail.toDataURL());
        this.showWindow();
      }
    );
  }

  displayImg(img: any) {
    // this.dataService.setData(img).then(() => this.router.navigate(["/display", ]));
    this.electron.newWindow();
    ipcRenderer.send("img-window-ready", img);
    // ipcMain.on("img-window-ready", (event, arg) => {
    //   event.sender.send("img-window-display", img);
    // });
  }
}