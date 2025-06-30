import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  textoBuscar = '';
  ideas: string[] = ['Spiderman','Como entrenar a tu dragon','John Wick','Superman'];
  peliculas: Pelicula[]=[];
  buscando=false;

  constructor(private moviesService: MoviesService, private modalClrt:ModalController) {}

  buscar(event: any) {
    const valor: string = event.detail.value;

    if(valor.length === 0){
      this.buscando= false;
      this.peliculas= [];
      return;
    }

    //console.log(valor);
    this.buscando=true;
    this.moviesService.buscarPeliculas(valor)
    .subscribe((resp: any) => { // Aquí tratamos a 'resp' como un objeto de cualquier tipo
      console.log(resp);
      this.peliculas = resp['results']; // Puedes seguir usando la notación de índice
      this.buscando=false;
    });
  }

  selectIdea(idea: string) {
    this.textoBuscar = idea;
    // Disparar el evento de búsqueda manualmente
    this.buscar({ detail: { value: idea } });
  }

  async detalle(id:number){
    const modal= await this.modalClrt.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
