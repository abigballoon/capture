import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class Service {
  private hlarea = new Subject<any>();
  hlarea$ = this.hlarea.asObservable();

  pipe(val: any) {
    this.hlarea.next(val);
  }
}