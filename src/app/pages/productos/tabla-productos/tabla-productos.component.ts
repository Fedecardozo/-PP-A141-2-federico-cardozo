import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.css',
})
export class TablaProductosComponent {
  @Input() productoSeleccionada?: Producto;
  @Output() avisarSeleccion = new EventEmitter<Producto>();
  @Input() listaProductos: Producto[] = [];

  seleccionProducto(producto: Producto) {
    const classStyle = producto.getClase();
    producto.setClase(classStyle + ' bg-info');
    if (this.productoSeleccionada) {
      this.productoSeleccionada.setClase(classStyle);
    }
    this.productoSeleccionada = producto;
    this.avisarSeleccion.emit(producto);
  }
}
