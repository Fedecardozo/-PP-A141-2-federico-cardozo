import { Component, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { FireService } from '../../services/fire.service';
import { Subscription } from 'rxjs';
import { Pais } from '../../models/pais';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { DetallePaisComponent } from './detalle-pais/detalle-pais.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    TablaProductosComponent,
    DetalleProductoComponent,
    DetallePaisComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  productos: Producto[] = [];
  productoseleccionada: Producto[] = [];
  fire: FireService = inject(FireService);
  sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.fire
      .getProductos()
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Producto[];
        aux.forEach((item) => {
          const auxPais = new Pais(
            item.pais.nombre,
            item.pais.region,
            item.pais.bandera
          );
          this.productos.push(
            new Producto(
              item.codigo,
              item.descripcion,
              item.precio,
              item.stock,
              auxPais
            )
          );
        });
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getSeleccionPelicula() {
    this.productoseleccionada[0];
  }
}
