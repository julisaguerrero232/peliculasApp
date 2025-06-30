import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage = 0;
  generos: Genre[] = []; // Tipado como Genre[] en lugar de any[]

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&language=es&api_key=${apiKey}`;

    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;
    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes.toString();
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.popularPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  // Cambié la tipificación de la promesa de any[] a Genre[]
  cargarGeneros(): Promise<Genre[]> {
    return new Promise<Genre[]>((resolve, reject) => {
      this.ejecutarQuery<{ genres: Genre[] }>('/genre/movie/list?=1') // Especificamos que la respuesta tiene una propiedad 'genres' de tipo Genre[]
        .subscribe({
          next: (resp) => {
            this.generos = resp.genres;
            console.log(this.generos); // Almacenamos los géneros en generos
            resolve(this.generos);
          },
          error: (err) => {
            console.error('Error al cargar géneros:', err);
            reject(err);
          }
        });
    });
  }
}
