import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { NativeImage } from "electron";

@Injectable()
export class ScreenService {
  img: any;

  setData(data): Promise<any> {
    this.img = data;
    this.img.base64 = (<NativeImage>data.thumbnail).toDataURL();
    return new Promise((resolve, reject) => resolve(true));
  }

  getData() {
    return this.img;
  }
}