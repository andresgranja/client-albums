import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from "./app.routing";

import { AlbumDetailComponent } from "./components/albums/album-detail.component";
import { AlbumsListComponent } from "./components/albums/albums-list.component";
import { AlbumAddComponent } from "./components/albums/album-add.component";
import { AlbumEditComponent } from "./components/albums/album-edit.component";

import { ImageAddComponent } from "./components/images/image-add.component";
import { ImageEditComponent } from "./components/images/image-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    AlbumDetailComponent,
    AlbumsListComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    ImageAddComponent,
    ImageEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
