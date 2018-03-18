import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class MainPanelService {
  private ifshow = new Subject<boolean>();
  showEvent = this.ifshow.asObservable();

  private iftoolbar = new Subject<boolean>();
  showToolBarEvent = this.iftoolbar.asObservable();

  setShow(val: boolean) {
    this.ifshow.next(val);
  }

  setShowToolBar(val: boolean) {
    this.iftoolbar.next(val);
  }
}