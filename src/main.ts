import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideHttpClient } from '@angular/common/http'; // <--- 1. AGREGAR ESTO

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <--- 2. AGREGAR ESTO (Es el motor del CRUD)
  ]
}).catch((err) => console.error(err));