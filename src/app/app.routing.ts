import { ModuleWithProviders } from "@angular/core";
import { Routes , RouterModule } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { UsuarioComponent } from "./usuario/usuario.component";

/* Importar componentes
import {  } from "";
*/

const routes: Routes = [
  {path: '' , component:InicioComponent},
  {path: 'inicio' , component:InicioComponent},
  {path: 'usuario' , component:UsuarioComponent},
  {path: '**' , component:InicioComponent}
];

export const RoutingProviders:any[] = [];

export const routing:ModuleWithProviders<any> = RouterModule.forRoot(routes);
