import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  constructor(private firestore: AngularFirestore) {}

  async agregarProducto(actor: Producto) {
    const colUsuarios = this.firestore.collection('productos');
    const documento = colUsuarios.doc();
    actor.setId(documento.ref.id);
    return await documento.set({ ...actor.devolverEnFormaDeObj() });
  }
  getProductos() {
    const col = this.firestore.collection('productos');
    return col;
  }
}
