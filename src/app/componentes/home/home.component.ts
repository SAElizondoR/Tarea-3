import { Cita } from './../../modelos/cita';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  direccion: string = 'https://thesimpsonsquoteapi.glitch.me/quotes';
  modoPersonaje: boolean = true;
  citaActual: Cita = {} as Cita;
  listaCitas: Cita[] = [];

  constructor(private servicio: HomeService) { }

  ngOnInit(): void {
    this.obtenerUnaCita();
    this.obtenerMultiplesCitas('5');
  }

  async obtenerUnaCita(): Promise<void> {
    const respuesta: Response = await fetch(this.direccion, {
      'method': 'GET'
    });
    const datos: Cita[] = await respuesta.json();
    this.citaActual = datos[0];
  }

  async obtenerMultiplesCitas(numero: string): Promise<void> {
    const respuesta: Response = await fetch(`${this.direccion}?count=${numero}`, {
      'method': 'GET'
    });
    this.listaCitas = await respuesta.json();
  }

  enObtenerMultiplesCitas() {
    const numero: string | null = prompt('¿Cuántas citas quiere ver? (máximo 10)');
    if(numero != null) {
      this.obtenerMultiplesCitas(numero);
    }
  }

  cambiarModo() {
    this.modoPersonaje = !this.modoPersonaje;
  }

}
