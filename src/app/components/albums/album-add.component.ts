import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";

import { AlbumService } from "../../services/album.service";
import { Album } from "../../models/album";

@Component({
    selector: "album-add",
    templateUrl: "../../views/albums/album-add.html",
    providers: [AlbumService]
})

export class AlbumAddComponent implements OnInit{
    public titulo: string;
    public album: Album;
    public errorMensaje: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = "Crear nuevo Album";
    }

    ngOnInit(){
        console.log("album-add.component.ts cargado");
        this.album = new Album("","");
    }

    onSubmit(){
        this._albumService.addAlbum(this.album).subscribe(
            res =>{
                if (!res.album) {
                    alert("Error en el servidor");
                } else {
                    this.album = res.album;
                    this._router.navigate(["/"]);
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

