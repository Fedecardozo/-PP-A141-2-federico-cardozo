import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pais } from '../../models/pais';
import { Producto } from '../../models/producto';
import { Alert } from '../../models/alert';
import { FireService } from '../../services/fire.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css',
})
export class AltaProductoComponent {
  user: UserService = inject(UserService);
  private fire: FireService = inject(FireService);
  listaPaises: Pais[] = [];
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  paisSelecionada?: Pais;
  guardar: boolean = false;
  sub?: Subscription;
  private apiRest: ApiService = inject(ApiService);

  constructor() {
    this.fg = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.sub = this.apiRest.getPaises().subscribe((paises: any) => {
      paises.map((auxPais: any) => {
        let pais: Pais = new Pais(
          auxPais.name.common,
          auxPais.region,
          auxPais.flags.svg
        );

        this.listaPaises.push(pais);
      });
      this.listaPaises.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  acceder() {
    this.guardar = true;
    if (this.fg.valid && this.paisSelecionada) {
      this.fire
        .agregarProducto(
          new Producto(
            this.fg.controls['codigo'].value,
            this.fg.controls['descripcion'].value,
            this.fg.controls['precio'].value,
            this.fg.controls['stock'].value,
            this.paisSelecionada
          )
        )
        .then(() => {
          Alert.bien('Se cargo con exito!');
          this.fg.reset();
        })
        .catch((res) => {
          Alert.mal(
            'No se pudo cargar a la base de datos!',
            'Intentelo más tarde.'
          );
          console.log(res);
        });
    }
  }

  selectPais(pais: Pais) {
    if (this.paisSelecionada) {
      this.paisSelecionada.clase =
        'list-group-item d-flex justify-content-between lh-sm';
    }
    this.paisSelecionada = pais;
    this.paisSelecionada.clase = this.paisSelecionada.clase + ' ' + 'bg-info';
  }
}
