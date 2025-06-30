import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent  implements OnInit {
expression: boolean = true;
  @Input() peliculas: Pelicula[] = [];
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  async verDetalle(id: number){
    const modal= await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

  desplazarIzquierda() {
    const contenedor = document.querySelector('.peliculas-container') as HTMLElement;
    contenedor.scrollLeft -= 250;  // Cambia 250 según el tamaño de los elementos
  }

}
