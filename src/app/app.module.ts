import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { routings } from './routes';
import { ElectronService } from './common/electron/service';
import { MainPanelService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routings,
  ],
  providers: [
    ElectronService,
    MainPanelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
