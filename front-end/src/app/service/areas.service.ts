import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Areas } from '../interfaces/areas';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(
    private _httpService: HttpService
  ) { }

  obtenerAreas() {
    return this._httpService.get('/areas');
  }

  obtenerTotalAreas() {
    return this._httpService.get('/areas/total');
  }

  obtenerTotalUsuariosxArea() {
    return this._httpService.get('/areas/totalUsuarioArea');
  }

  crearArea(data: Areas) {
    return this._httpService.post('/areas', data);
  }

  actualizarArea(data: Areas) {
    return this._httpService.put('/areas/' + data.codigo, data);
  }
}
