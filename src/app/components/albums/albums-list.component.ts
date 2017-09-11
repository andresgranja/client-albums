import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";

import { AlbumService } from "../../services/album.service";
import { Album } from "../../models/album";

@Component({
    selector: "albums-list",
    templateUrl: "../../views/albums/albums-list.html",
    providers: [AlbumService]
})

export class AlbumsListComponent implements OnInit{
    public titulo: string;
    public albums: Album[];
    public errorMensaje: string;
    public loading: boolean;
    public confirmado: null;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = "Listado de Albums"
    }

    ngOnInit(){
        console.log("albums-list.component.ts cargado");
        this.getAlbums();
    }

    getAlbums(){
        this.loading = true;
        
        this._albumService.getAlbums().subscribe(
            result =>{
                this.albums = result.albums;

                if (!this.albums) {
                    alert("Error en el servidor");
                }

                this.loading = false;
                
            },
            error =>{
                this.errorMensaje = <any>error;
                if(this.errorMensaje != null){
                    console.log(this.errorMensaje);
                }
            }
        )
    }

    onDeleteConfirm(id){
        this.confirmado = id;
    }

    onCancelAlbum(){
        this.confirmado = null;
    }

    onDeleteAlbum(id){
        this._albumService.deleteAlbum(id).subscribe(
            res =>{
                if (!res.album) {
                    alert("error en la petición");                    
                }else{
                    this.getAlbums();
                }
            },
            error =>{
                this.errorMensaje = <any>error;
                if(this.errorMensaje != null){
                    console.log(this.errorMensaje);
                }
            }
        );
    }

}

