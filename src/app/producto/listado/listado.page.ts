import { Producto } from './../../modelo/producto';
import { NavigationExtras, Router } from '@angular/router';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  productos: any;
  producto: Producto = new Producto();

  constructor(private router: Router, private productoService: ProductosService) { }

  ngOnInit() {
    this.productos = this.productoService.getProductos();
  }

  editar(producto:any){
    let params: NavigationExtras = {
      queryParams: {
        producto: producto
      }
    }
    this.router.navigate(['/registro'], params)
  }

  crear(){
    this.router.navigate(['/registro']);
  }

  buscar(){
    
  }
}
