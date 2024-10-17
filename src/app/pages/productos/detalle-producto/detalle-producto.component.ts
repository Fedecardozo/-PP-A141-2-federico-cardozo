import { Component, inject, Input } from '@angular/core';
import { Producto } from '../../../models/producto';
import { FireService } from '../../../services/fire.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css',
})
export class DetalleProductoComponent {
  @Input() producto?: Producto;
  fire: FireService = inject(FireService);
}
