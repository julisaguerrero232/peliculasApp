import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,private toastCtrl: ToastController) {
    this.init();
    this.cargarFavoritos();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration:1500
    });
    toast.present();
  }

  // Inicialización del almacenamiento
  private async init() {
    await this.storage.create();
    console.log('Base de datos creada');
  }

  // Método para guardar película
  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe=false;
    let mensaje = "";
    for(const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe=true;
        break;
      }
    }
    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje= 'Removido de favoritos';
    }else{
       this.peliculas.push(pelicula);
       mensaje= 'Agregado a favoritos';
    }
    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return  !existe;
  }

  async cargarFavoritos(){

    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;

  }
  async existePelicula( id : any){


    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id);

    return(existe) ? true : false;
  }
}
