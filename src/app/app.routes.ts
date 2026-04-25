import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },           // 🏠 Tu página principal (Landing)
  { path: 'explorar', component: CoursesComponent }, // 🎮 Vista de catálogo
  { path: 'admin', component: AdminComponent },      // 🛠️ Tu nuevo CRUD (Gestión)
  
  // IMPORTANTE: El '**' atrapa errores de escritura en la URL, siempre va al final.
  { path: '**', redirectTo: '' } 
];