import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre, Pelicula } from '../interfaces/interfaces'; // Asegúrate de que las interfaces estén importadas correctamente
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  peliculas: Pelicula[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = []; // Se inicia como un array vacío

  constructor(private dataLocal: DataLocalService,
              private moviesService: MoviesService) {}

  ngOnInit() {
    // Este método se usa solo para inicialización, si es necesario cargar datos, hazlo en ionViewWillEnter
  }

  async ionViewWillEnter() {
    // Cargar películas
    const peliculasDetalle: PeliculaDetalle[] = await this.dataLocal.cargarFavoritos();
    if (peliculasDetalle && peliculasDetalle.length) {
      this.peliculas = peliculasDetalle.map(this.convertirPeliculaDetalleAPelicula);
    } else {
      console.log('No se encontraron películas favoritas');
    }

    // Cargar géneros
    this.generos = await this.moviesService.cargarGeneros();
    if (this.generos && this.generos.length) {
      this.pelisPorGenero(this.generos, this.peliculas);
    } else {
      console.log('No se encontraron géneros');
    }
  }

  pelisPorGenero(generos: Genre[], peliculas: Pelicula[]): void {
    this.favoritoGenero = []; // Limpiamos la lista actual

    if (generos && peliculas) {
      generos.forEach(genero => {
        const peliculasPorGenero = peliculas.filter(peli => peli.genre_ids.includes(genero.id));

        // Solo agregar si se encuentran películas para ese género
        if (peliculasPorGenero.length > 0) {
          this.favoritoGenero.push({
            genero: genero.name,
            pelis: peliculasPorGenero,
          });
        }
      });
    }

    console.log(this.favoritoGenero); // Imprimimos el resultado para verificar
  }

  // Función para convertir PeliculaDetalle a Pelicula
  convertirPeliculaDetalleAPelicula(peliculaDetalle: PeliculaDetalle): Pelicula {
    return {
      vote_count: peliculaDetalle.vote_count || 0,
      id: peliculaDetalle.id || 0,
      video: peliculaDetalle.video || false,
      vote_average: peliculaDetalle.vote_average || 0,
      title: peliculaDetalle.title || '',
      popularity: peliculaDetalle.popularity || 0,
      poster_path: peliculaDetalle.poster_path || '',
      original_language: peliculaDetalle.original_language || '',
      original_title: peliculaDetalle.original_title || '',
      genre_ids: peliculaDetalle.genres ? peliculaDetalle.genres.map(genre => genre.id) : [], // Convertimos 'genres' en 'genre_ids'
      backdrop_path: peliculaDetalle.backdrop_path || '',
      adult: peliculaDetalle.adult || false,
      overview: peliculaDetalle.overview || '',
      release_date: peliculaDetalle.release_date || '',
    };
  }
}
