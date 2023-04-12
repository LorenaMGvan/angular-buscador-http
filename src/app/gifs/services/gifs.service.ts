import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient) {
    // solo se ejecuta solo una vez
    // los ervicios  fucionan como un singleton

    this._historial = JSON.parse(localStorage.getItem('historial') !) || []; // si historial  regresa null, entonces regresa un array vacío
    this.resultados = JSON.parse(localStorage.getItem('resultados') !) || [];
    // this._historial = localStorage.getItem('historial');

    // if( localStorage.getItem('historial') ) {
    //   this.historial = JSON.parse( localStorage.getItem('historial'));
    // }
   }
  
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private limiteItems = '10'; // si lo dejo en numero debe pasarlo a string  en el params ejemplo: limiteItems.toString()
  private apiKey: string = 'Y6Zv7lVsBIUtp4MaoxqRJW9hJX3QORIy';
  private _historial: string[] = [];
  public resultados: Gif[] = []; // el Gif se declara en la interface, por eso lo podemos usar

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string) {
    query = query.trim().toLocaleLowerCase();
 
    if ( !this._historial.includes( query ) ) {
        this._historial.unshift( query );
        this._historial = this._historial.splice(0,10);
        localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    console.log('guardando', JSON.stringify(this._historial));

    const  parametros = new HttpParams()
              .set('api_key', this.apiKey) 
              .set('limit', this.limiteItems) 
              .set('q', query); 

    console.log(parametros.toString());

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: parametros })
        .subscribe( resp => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
          console.log(resp);
        })
  }

}
