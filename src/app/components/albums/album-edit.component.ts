import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";

import { AlbumService } from "../../services/album.service";
import { Album } from "../../models/album";

@Component({
    selector: "album-edit",
    templateUrl: "../../views/albums/album-edit.html",
    providers: [AlbumService]
})

export class AlbumEditComponent implements OnInit{
    public titulo: string;
    public album: Album;
    public errorMensaje: string;
    public loading: boolean; 
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = "Editar Album";
    }

    ngOnInit(){
        console.log("albums-edit.component.ts cargado");
        this.album = new Album("","");
        this.getAlbum();
    }

    getAlbum(){
        this.loading = true;
        this._route.params.forEach((params: Params)=>{
            let id = params["id"];

            this._albumService.getAlbum(id).subscribe(
                result =>{
                    
                    if (!this.album) {
                        this._router.navigate(["/"])
                    } else{
                        this.album = result.album;
                        this.loading = false;
                    }                    
                },
                error =>{
                    this.errorMensaje = <any>error;
                    if(this.errorMensaje != null){
                        console.log(this.errorMensaje);
                    }
                }
            )
        });
    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id = params["id"];
            this._albumService.editAlbum(id, this.album).subscribe(
                res =>{
                    if (!res.album) {
                        alert("Error en el servidor");
                    } else {
                        this._router.navigate(["/album", id]);
                    }
                }, 
                error =>{
                    this.errorMensaje = <any>error;
                    if (this.errorMensaje != null){
                        console.log(this.errorMensaje);
                    }
                }
            );
        });
    }


}

