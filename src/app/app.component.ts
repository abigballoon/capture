import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ElectronService } from './common/electron/service';
import { MainPanelService } from './app.service';
import { ipcRenderer } from 'electron';
import { ScreenService } from './pages/screenshot/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  show: boolean = true;
  toolbar: boolean = true;

  constructor (
    private electron: ElectronService,
    private panelService: MainPanelService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private screenService: ScreenService,
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

  ngOnInit() {
    ipcRenderer.on("img-window-display", (event, arg) => {
      this.router.navigate(["/display", ])
      this.screenService.setData(arg);
    });
  }

  close() {
    this.electron.closeWin();
  }
}
