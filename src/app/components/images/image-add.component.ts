import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";

import { ImageService } from "../../services/image.service";
import { Image } from "../../models/image";

@Component({
    selector: "image-add",
    templateUrl: "../../views/images/image-add.html",
    providers: [ImageService]
})

export class ImageAddComponent implements OnInit{
    public titulo: string;
    public image: Image;
    public errorMensaje: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ){
        this.titulo = "Añadir imagen";
    }

    ngOnInit(){
        console.log("image-add.component.ts cargado");
        this.image = new Image("","","");
    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let album_id = params["album"];
            this.image.album = album_id;

            console.log(album_id);
            
            this._imageService.addImage(this.image).subscribe(
                res =>{
                    if (!res.image) {
                        alert("Error en el servidor");
                    } else {
                        this.image = res.image;
                        this._router.navigate(["/editar-imagen", res.image._id]);
                    }
                }, 
                error =>{
                    this.errorMensaje = <any>error;
                    if(this.errorMensaje != null){
                        console.log(this.errorMensaje);
                    }
                }
            );
        });
    }


}

