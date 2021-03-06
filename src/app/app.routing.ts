import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

import { AlbumsListComponent } from "./components/albums/albums-list.component";
import { AlbumAddComponent } from "./components/albums/album-add.component";
import { AlbumDetailComponent } from "./components/albums/album-detail.component"
import { AlbumEditComponent} from "./components/albums/album-edit.component";

import { ImageAddComponent} from "./components/images/image-add.component";
import { ImageEditComponent} from "./components/images/image-edit.component";


const appRoutes: Routes = [
    {path: "", component: AlbumsListComponent},
    {path:"album/:id", component: AlbumDetailComponent},
    {path:"crear-album", component: AlbumAddComponent},
    {path: "editar-album/:id",component: AlbumEditComponent},
    
    {path: "crear-imagen/:album", component: ImageAddComponent},
    {path: "editar-imagen/:id", component: ImageEditComponent},
    
    {path:"**", component: AlbumsListComponent}


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
