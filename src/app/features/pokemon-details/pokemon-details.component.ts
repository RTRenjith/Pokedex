import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  name: string | null = null;
  pokemon: Pokemon | undefined;
  evolutions: string[] = [];

  evolutionPokemons: Pokemon[] = [];
  images: string[] = [];

  pokemonSpeciesSubsctiption!: Subscription;
  pokemonEvolutionSubsctiption!: Subscription;
  pokemonDetailsSubsctiption!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}
  ngOnDestroy(): void {
    this.pokemonSpeciesSubsctiption.unsubscribe();
    this.pokemonDetailsSubsctiption.unsubscribe();
    this.pokemonEvolutionSubsctiption.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.name = params.get('pokemonName');
      },
    });
    this.getPokemonDetails();
    this.getEvlotionDetails();
  }

  getEvlotionDetails() {
    if (this.name != null) {
      this.pokemonSpeciesSubsctiption = this.pokemonService
        .getSpecies(this.name)
        .subscribe({
          next: (response) => {
            const url = response.evolution_chain.url;
            this.pokemonService.getEvolution(url).subscribe({
              next: (res) => {
                this.extractEvolutions(res.chain);
              },
            });
          },
        });

      console.log(this.evolutions);
    }
  }
  extractEvolutions(chain: any) {
    this.evolutions.push(chain.species.name);
    this.pokemonEvolutionSubsctiption = this.pokemonService
      .getPokemonDetails(chain.species.name)
      .subscribe({
        next: (res) => {
          var pokemon: Pokemon = {
            experience: res.base_experience,
            name: res.name,
            id: res.id,
            abilities: res.abilities.map((abil: any) => abil.ability.name),
            height: res.height,
            weight: res.weight,
            frontImgUrl: res.sprites.front_shiny,
            backImgUrl: res.sprites.back_shiny,
            moves: res.moves.map((move: any) => move.move.name),
            types: res.types.map((type: any) => type.type.name),
          };
          this.evolutionPokemons.push(pokemon);
        },
      });

    if (chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        this.extractEvolutions(evolution);
      }
    }
  }

  getPokemonDetails() {
    if (this.name != null) {
      this.pokemonDetailsSubsctiption = this.pokemonService
        .getPokemonDetails(this.name)
        .subscribe({
          next: (res) => {
            this.pokemon = {
              experience: res.base_experience,
              name: res.name,
              id: res.id,
              abilities: res.abilities.map((abil: any) => abil.ability.name),
              height: res.height,
              weight: res.weight,
              frontImgUrl: res.sprites.front_shiny,
              backImgUrl: res.sprites.back_shiny,
              moves: res.moves.map((move: any) => move.move.name),
              types: res.types.map((type: any) => type.type.name),
            };
            this.images.push(res.sprites.front_shiny);
            this.images.push(res.sprites.back_shiny);
          },
        });
    }
  }
}
