import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegoService } from '../services/juego.service'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listaJuegos: any[] = [];
  editando: boolean = false;
  // Asegúrate de que estos nombres coincidan con tus columnas en SQL
  juegoActual: any = { id: 0, titulo: '', categoria: '', imagen: '', descripcion: '' };

  constructor(private _juegoService: JuegoService) {}

  ngOnInit(): void {
    this.obtenerJuegos();
  }

  obtenerJuegos(): void {
    this._juegoService.obtenerJuegos().subscribe({
      next: (data: any) => { 
        this.listaJuegos = data; 
        console.log("Datos cargados de SQL:", data);
      },
      error: (e: any) => console.error("Error al cargar:", e)
    });
  }

  guardar(): void {
    if (!this.juegoActual.titulo || !this.juegoActual.categoria) {
      alert("Por favor, llena el título y la categoría.");
      return;
    }

    if (this.editando) {
      this._juegoService.actualizarJuego(this.juegoActual.id, this.juegoActual).subscribe({
        next: () => {
          alert('¡Susto actualizado en SQL Server! 🔄');
          this.limpiar();
        },
        error: (err: any) => alert("Error al conectar con el servidor")
      });
    } else {
      this._juegoService.guardarJuego(this.juegoActual).subscribe({
        next: () => {
          alert('¡Susto guardado en SQL Server! 💀');
          this.limpiar();
        },
        error: (err: any) => alert("Error: ¿Encendiste el backend (node server.js)?")
      });
    }
  }

  prepararEdicion(juego: any): void {
    this.editando = true;
    this.juegoActual = { ...juego };
  }

  eliminar(id: any): void {
    if (confirm('¿Segura que quieres borrar este registro de la base de datos?')) {
      this._juegoService.eliminarJuego(id).subscribe({
        next: () => {
          this.obtenerJuegos(); // Recarga la tabla
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  limpiar(): void {
    this.editando = false;
    this.juegoActual = { id: 0, titulo: '', categoria: '', imagen: '', descripcion: '' };
    this.obtenerJuegos(); // Refresca la lista
  }
}