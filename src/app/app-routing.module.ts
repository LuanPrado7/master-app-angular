import { Routes, RouterModule } from '@angular/router/';
import { NgModule } from '@angular/core';

import { JogoComponent } from './jogo/jogo.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RoomPageComponent } from './room-page/room-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'room', component: RoomPageComponent },
    {path: 'login', component: LoginPageComponent},
    {path: 'jogo', component: JogoComponent},
    {path: '**', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
