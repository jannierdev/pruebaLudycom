import { Component } from '@angular/core';
import { AreasService } from 'src/app/service/areas.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalUsuarios: any[] = [];
  totalAreas: any[] = [];
  totalUsuarioxArea: any[] = [];

  constructor(
    private _usuariosSerices: UsuariosService,
    private _areasSerices: AreasService
  ) { }
  ngOnInit(): void {
    this.obtenerTotalUsuarios();
    this.obtenerTotalAreas();
    this.obtenerTotalUsuariosxArea();
  }

  obtenerTotalUsuarios() {
    this._usuariosSerices.obtenerTotalUsuarios().
      subscribe({
        next: (response) => {
          // this.loading = false;
          this.totalUsuarios = response;
        },
        error: async (err: any) => {
          // this.loading = false;
          // localStorage.clear();
          // this.count += 1;
          // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
        }
      });
  }

  obtenerTotalAreas() {
    this._areasSerices.obtenerTotalAreas().
      subscribe({
        next: (response) => {
          // this.loading = false;
          this.totalAreas = response;
        },
        error: async (err: any) => {
          // this.loading = false;
          // localStorage.clear();
          // this.count += 1;
          // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
        }
      });
  }

  obtenerTotalUsuariosxArea() {
    this._areasSerices.obtenerTotalUsuariosxArea().
      subscribe({
        next: (response) => {
          // this.loading = false;
          this.totalUsuarioxArea = response;
        },
        error: async (err: any) => {
          // this.loading = false;
          // localStorage.clear();
          // this.count += 1;
          // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
        }
      });
  }

}
