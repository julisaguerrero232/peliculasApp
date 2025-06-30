import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {
  @Input() id: any;
  pelicula: PeliculaDetalle={};
  actores: Cast[] = [];
  oculto= 150;
  estrella= 'star-outline';

  constructor(private moviesService: MoviesService,private modalCrtl:ModalController, private dataLocal:DataLocalService) { }

  ngOnInit() {
    //console.log('ID',this.id)

    this.dataLocal.existePelicula(this.id)
      .then( existe => this.estrella = (existe) ? 'star' : 'star-outline');

    this.moviesService.getPeliculaDetalle(this.id)
    .subscribe(resp => {
      console.log(resp);
      this.pelicula= resp;
    })
    this.moviesService.getActoresPelicula(this.id)
    .subscribe(resp => {
      console.log(resp);
      this.actores=resp.cast;
    })
  }

  regresar(){
    this.modalCrtl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
      this.estrella = (existe) ? 'star' : 'star-outline';

  }

  desplazarIzquierda() {
    const contenedor = document.querySelector('.actores-container') as HTMLElement;
    contenedor.scrollLeft -= 250;  // Ajusta el valor según el tamaño de los elementos
  }

}
