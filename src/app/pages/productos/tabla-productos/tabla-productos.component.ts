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
  @Input() productoSeleccionada: Producto[] = [];
  @Output() avisarSeleccion = new EventEmitter<void>();
  @Input() listaProductos: Producto[] = [];

  seleccionProducto(producto: Producto) {
    const classStyle = producto.getClase();
    producto.setClase(classStyle + ' bg-info');
    if (this.productoSeleccionada[0]) {
      this.productoSeleccionada[0].setClase(classStyle);
    }
    this.productoSeleccionada[0] = producto;
    this.avisarSeleccion.emit();
  }
}
