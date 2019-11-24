import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EditionComponent } from './edition/edition.component';
import { DokumentComponent } from './dokument/dokument.component';
import { SucheComponent } from './suche/suche.component';
import { AktuellesComponent } from './aktuelles/aktuelles.component';
import { ProjektComponent } from './projekt/projekt.component';

const appRoutes: Routes = [
  { path: 'aktuelles', component: AktuellesComponent },
  { path: 'edition', component: EditionComponent },
  { path: 'projekt', component: ProjektComponent },
  { path: 'suche', component: SucheComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'dokument',
    component: DokumentComponent,
    data: { title: 'Gotthelf-Edition: 1 Dokument' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EditionComponent,
    DokumentComponent,
    SucheComponent,
    AktuellesComponent,
    ProjektComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
