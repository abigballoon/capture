import { Routes, RouterModule } from "@angular/router";

import { ScreenShotComponent } from "./screen.component";
import { ScreenDisplay } from "./display/display.component";

const routes: Routes = [
  { path: '', component: ScreenShotComponent, },
  { path: 'display', component: ScreenDisplay, },
];

export const routings = RouterModule.forChild(routes);