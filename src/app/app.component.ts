import { Component, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from './common/electron/service';
import { MainPanelService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show: boolean = true;
  toolbar: boolean = true;

  constructor (
    private electron: ElectronService,
    private panelService: MainPanelService,
    private cdr: ChangeDetectorRef,
  ) {
    this.panelService.showEvent.subscribe(val => {
      this.show = val;
      this.cdr.detectChanges();
    });
    this.panelService.showToolBarEvent.subscribe(val => {
      this.toolbar = val;
      this.cdr.detectChanges();
    });
  }

  close() {
    this.electron.closeWin();
  }
}
