import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SeoService } from './core/seo.service';
import { WindowRefService } from './core/window-ref.service';
// FIREBASE MODULES
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SidenavService } from './core/sidenav.service';
import { DatabaseService } from './core/database.service';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'merakisolutionsweb'),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    MatNativeDateModule
  ],
  providers: [
    SeoService,
    WindowRefService,
    SidenavService,
    DatabaseService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
