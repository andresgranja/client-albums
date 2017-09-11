import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";

import { AlbumService } from "../../services/album.service";
import { Album } from "../../models/album";

@Component({
    selector: "album-detail",
    templateUrl: "../../views/albums/album-detail.html",
    providers: [AlbumService]
})

export class AlbumDetailComponent implements OnInit{
    public album: Album;
    public errorMensaje: string;
    public loading: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        //this.titulo = "Listado de Albums"
    }

    ngOnInit(){
        console.log("album-detail.component.ts cargado");
        this.getAlbum();
    }

    getAlbum(){
        this.loading = true;
        this._route.params.forEach((params: Params)=>{
            let id = params["id"];

            this._albumService.getAlbum(id).subscribe(
                result =>{
                    if (!result.album) {
                        this._router.navigate(["/"])
                    }else{
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


}

