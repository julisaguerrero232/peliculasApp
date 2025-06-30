import { Component, OnInit } from '@angular/core';
import { Pelicula,RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,

})
export class Tab1Page implements OnInit {

  peliculaRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  constructor(private moviesServices: MoviesService) {}

  ngOnInit(): void {
    this.moviesServices.getFeature()
      .subscribe((resp: RespuestaMDB) => {
        this.peliculaRecientes = resp.results;
      });
      this.getPopulares();
  }


  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesServices.getPopulares()
    .subscribe(resp => {
      //console.log('Populares',resp);
      const arrTem = [...this.populares,...resp.results];
      this.populares=arrTem;
    })
  }
}



