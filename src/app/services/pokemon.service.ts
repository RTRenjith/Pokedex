import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(next: string): Observable<any>{
    return this.http.get<any>(next);
  }

  getPokemonDetails(name: string): Observable<any>{
    return this.http.get(`${environment.apiBaseUrl}/pokemon/${name}`);
  }

  getSpecies(name: string): Observable<any>{
    return this.http.get(`${environment.apiBaseUrl}/pokemon-species/${name}`);

  }

  getEvolution(url: string): Observable<any>{
    return this.http.get(url);

  }


}
