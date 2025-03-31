import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideNgIconsConfig } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideNgIconsConfig({
      size: "1.5em",
    }), 
    provideFirebaseApp(() => 
      initializeApp({
        "projectId":"app-productos-7b391",
        "appId":"1:1036724028268:web:4339d388528a57f140e949",
        "storageBucket":"app-productos-7b391.firebasestorage.app",
        "apiKey":"AIzaSyDCMlQyoU3o_-Jjbyiwj8vlsmZ1P6-S1Ng",
        "authDomain":"app-productos-7b391.firebaseapp.com",
        "messagingSenderId":"1036724028268",
      })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
