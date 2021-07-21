import { ProductosService } from './../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from './../../modelo/producto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  producto: Producto = new Producto();

  imgData: string;
  imgURL: string;

  constructor(private route: ActivatedRoute, private router: Router, private productoService: ProductosService) { 
    route.queryParams.subscribe(params => {
      console.log(params)
      this.producto = new Producto();
      //this.persona = params.contacto;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.producto = this.router.getCurrentNavigation().extras.queryParams.contacto;
        console.log(this.producto);
      }
    })
  }

  ngOnInit() {
  }

  guardar(){
    console.log(this.producto);
    this.productoService.save(this.producto);
    this.router.navigate(['listado']);
  }


  imageSeleccionada(data: string) {
    this.imgData = data;
  }

  uploadFinished(data) {
    this.producto.image = data;
  }
}
