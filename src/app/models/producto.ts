import { Pais } from './pais';

export class Producto {
  id: string;
  codigo: string;
  descripcion: string;
  precio: string;
  stock: string;
  pais: Pais;
  private clase: string;

  constructor(
    codigo: string,
    descripcion: string,
    precio: string,
    stock: string,
    pais: Pais
  ) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.pais = pais;
    this.id = '';
    this.clase = 'list-group-item d-flex justify-content-between lh-sm';
  }

  setId(id: string) {
    this.id = id;
  }

  setClase(clase: string) {
    this.clase = clase;
  }

  getClase() {
    return this.clase;
  }

  devolverEnFormaDeObj() {
    return {
      id: this.id,
      codigo: this.codigo,
      descripcion: this.descripcion,
      stock: this.stock,
      precio: this.precio,
      pais: {
        nombre: this.pais.nombre,
        region: this.pais.region,
        bandera: this.pais.bandera,
      },
    };
  }
}
