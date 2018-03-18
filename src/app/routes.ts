import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./pages/screenshot/screen.module#ScreenModule", },
  { path: "**", redirectTo: "", }
];

export const routings = RouterModule.forRoot(routes, {useHash: true});