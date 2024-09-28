import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _httpService: HttpService
  ) { }

  obtenerUsuarios() {
    return this._httpService.get('/usuarios');
  }

  obtenerTotalUsuarios() {
    return this._httpService.get('/usuarios/total');
  }


  crearUsuario(data: Usuarios) {
    return this._httpService.post('/usuarios', data);
  }

  actualizarUsuario(data: Usuarios) {
    return this._httpService.put('/usuarios/' + data.numeroDocumento, data);
  }
}
