import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";

import { ImageService } from "../../services/image.service";
import { Image } from "../../models/image";

@Component({
    selector: "image-edit",
    templateUrl: "../../views/images/image-add.html",
    providers: [ImageService]
})

export class ImageEditComponent implements OnInit{
    public titulo: string;
    public image: Image;
    public errorMensaje: string;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ){
        this.titulo = "Editar imagen";
        this.is_edit = true;
    }

    ngOnInit(){
        console.log("image-edit.component.ts cargado");
        this.image = new Image("","","");
    }

    getImage(){
        this._route.params.forEach((params: Params) => {
            let id = params["id"];
            this._imageService.getImage(id).subscribe(
                res=>{
                    this.image = res.image;
                    if (!res.image){
                        this._router.navigate(["/"]);
                    }
                },
                error=>{
                    this.errorMensaje = <any>error;
                    if(this.errorMensaje != null){
                        console.log(this.errorMensaje);
                    }
                }
            );
        });
    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id = params["id"];
            
            this._imageService.editImage(id, this.image).subscribe(
                res =>{
                    if (!res.image) {
                        alert("Error en el servidor");
                    } else {
                        this.image = res.image;
                        this._router.navigate(["/album", this.image.album]);
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

