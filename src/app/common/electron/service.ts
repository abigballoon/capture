import { Injectable } from "@angular/core";
import { BrowserWindow, desktopCapturer, remote, screen } from "electron";
import * as path from "path";

@Injectable()
export class ElectronService {
  hided_windows = [];

  closeWin() {
    var window = remote.getCurrentWindow();
    window.close();
  }

  currentWindow() {
    return remote.getCurrentWindow();
  }

  capture(): Promise<any> {
    let size = this.screenImgSize();
    let options = {types: ['screen'], thumbnailSize: size};

    return new Promise((resolve, reject) => 
      {
        desktopCapturer.getSources(options, (error, sources) => {
          if (error) reject(error);
          sources.forEach((source) => {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
              resolve(source);
            }
          });
        });
      }
    );
  }

  screenImgSize() {
    let screenSize = screen.getPrimaryDisplay().workAreaSize;
    let maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
      width: maxDimension * window.devicePixelRatio,
      height: maxDimension * window.devicePixelRatio,
    };
  }

  screenSize() {
    return screen.getPrimaryDisplay().size;
  }

  resizeWindow(size) {
    this.currentWindow().setResizable(true);
    this.currentWindow().setSize(size.width, size.height);
    this.currentWindow().setResizable(false);
  }

  fullscreen(flag: boolean) {
    this.currentWindow().setFullScreen(flag);
  }

  alwaysOnTop(flag: boolean) {
    this.currentWindow().setAlwaysOnTop(flag);
  }

  setPos(pos: {x: number, y: number}) {
    this.currentWindow().setPosition(pos.x, pos.y);
  }

  hide(flag: boolean) {
    if (flag) {
      let win = this.currentWindow();
      win.hide();
      this.hided_windows.push(win);
    } else {
      let win = this.hided_windows.pop();
      while (win) {
        win.show();
        win = this.hided_windows.pop();
      }
    }
  }
}