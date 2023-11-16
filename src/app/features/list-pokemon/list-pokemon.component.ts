import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit{

  pokemons: Pokemon[] = [];
  next: string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.next).subscribe({
      next: (response) =>{
        this.next= response.next;
        response.results.forEach((result: any )=> {
          // poki.id = poki.url.split('/').slice(-2, -1)[0];
          this.pokemonService.getPokemonDetails(result.name).subscribe({
            next: (res) =>{
              var pokemon: Pokemon = {
                name: res.name,
                id: res.id,
                abilities: res.abilities.map((abil: any) => abil.ability.name),
                height: res.height,
                weight: res.weight,
                frontImgUrl: res.sprites.front_shiny,
                backImgUrl: res.sprites.back_shiny,
                moves: res.moves.map((move: any) => move.move.name),
                types: res.types.map((type: any)=> type.type.name)
              };
              this.pokemons.push(pokemon);
            }
          });
          // this.pokemons.push(poki);
          // console.log(poki);
        });
      }
    });
  }

}
