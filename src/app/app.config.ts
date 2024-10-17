import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({"projectId":"parcial-labo-4-882c9","appId":"1:32247411812:web:1603a06b2ebc039314db71","storageBucket":"parcial-labo-4-882c9.appspot.com","apiKey":"AIzaSyAyeUbvz6TTJtX17III0SRhI-02o56f85k","authDomain":"parcial-labo-4-882c9.firebaseapp.com","messagingSenderId":"32247411812"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
