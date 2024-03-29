import { Producto } from './../modelo/producto';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public afs: AngularFirestore) { }

   // Guardar y Actualizar Tabla
   save(producto: Producto){
    const refProductos = this.afs.collection("productos"); // Hace referencia a la tabla a la que se va a insertar o actualizar los datos

    if (producto.uid == null) {
      producto.uid = this.afs.createId();
      producto.activo = true;
    }

    refProductos.doc(producto.uid).set(Object.assign({}, producto));
  }

  //Obtener  las datos de una tabla
  getProductos(): Observable<any[]>{
    return this.afs.collection("productos", 
        ref => ref.where("activo", "==", true)).valueChanges();
  }

 

  async getProducto(uid: string) {
    try {
      let aux = await this.afs
        .collection("productos", (ref) => ref.where("nombre", "==", uid))
        .valueChanges()
        .toPromise()
        .then((doc) => {
          return doc;
        })
        .catch((error) => {
          throw error;
        });
      if (aux == null) return {};
      return aux[0];
    } catch (error) {
      console.error("no hay", error);
      throw error;
    }
  }

}
