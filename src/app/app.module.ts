import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ListPokemonComponent } from './features/list-pokemon/list-pokemon.component';
import { PokemonDetailsComponent } from './features/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
