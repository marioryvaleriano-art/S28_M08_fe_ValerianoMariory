import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JuegoService {
  private apiUrl = 'http://localhost:3000/api/juegos';

  constructor(private http: HttpClient) { }

  obtenerJuegos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  guardarJuego(juego: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, juego);
  }

  actualizarJuego(id: number, juego: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, juego);
  }

  eliminarJuego(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}