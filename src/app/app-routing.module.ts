import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPokemonComponent } from './features/list-pokemon/list-pokemon.component';
import { PokemonDetailsComponent } from './features/pokemon-details/pokemon-details.component';

const routes: Routes = [
  {
    path: '',
    component: ListPokemonComponent,
  },
  {
    path: 'details/:pokemonName',
    component: PokemonDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
