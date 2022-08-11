import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing , RoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './services/usuario.service';
import { InicioComponent } from './inicio/inicio.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    NgxTrimDirectiveModule
  ],
  providers: [
    RoutingProviders,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
