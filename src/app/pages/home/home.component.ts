import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sub?: Subscription;
  private apiRest: ApiService = inject(ApiService);
  nombre: string = '';
  foto: string = '';

  ngOnInit(): void {
    this.sub = this.apiRest.getGit().subscribe((git: any) => {
      console.log(git);

      this.foto = git.avatar_url;
      this.nombre = git.name;
    });
  }
}
