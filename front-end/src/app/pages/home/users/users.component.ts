import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ColumButton, Column } from 'src/app/interfaces/column';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { columnasUsuarios, fieldForm } from './dataColumns';
import { Usuarios } from '../../../interfaces/usuarios';
import { Fields, Options } from 'src/app/interfaces/fields';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AreasService } from 'src/app/service/areas.service';
import * as moment from 'moment';
import { Areas } from 'src/app/interfaces/areas';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  @ViewChild("content", { static: false }) content!: TemplateRef<any>;
  private closeResult = '';

  public loading: boolean = false;
  public edit: boolean = false;
  public dataRows: Usuarios[] = [];
  private arraySearch: Usuarios[] = [];
  public dataColumns: Array<Column> = columnasUsuarios;
  public dataFields: Array<Fields> = [];
  public areas: Options[] = [];
  data: any = {};

  public buttonsTable: Array<ColumButton> = [
    {
      // icon: 'nc-simple-add',
      classButton: 'btn btn-success',
      text: 'Editar',
      action: (data: Usuarios) => {
        this.edit = true;
        data.fechaNacimiento = moment(data.fechaNacimiento).format('YYYY-MM-DD')
        this.data = data;
        this.open(this.content)
      }
    }
  ]

  constructor(
    private _usuariosSerices: UsuariosService,
    private _areasSerices: AreasService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerAreas();
  }

  obtenerUsuarios() {
    this._usuariosSerices.obtenerUsuarios().
      subscribe({
        next: (response: Usuarios[]) => {
          this.loading = false;
          this.dataRows = response;
          this.arraySearch = response;
        },
        error: async (err: any) => {
          this.loading = false;
          // localStorage.clear();
          // this.count += 1;
          // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
        }
      });
  }

  obtenerAreas() {
    this._areasSerices.obtenerAreas().
      subscribe({
        next: (response: Options[]) => {
          this.loading = false;
          this.areas = response;
          this.dataFields.push(
            ...fieldForm,
            {
              field: 'idArea',
              typeField: 'select',
              type: 'date',
              name: 'Area',
              requerido: true,
              className: 'col-md-4',
              messageError: 'Campo obligatorio',
              options: response
            }
          )
        },
        error: async (err: any) => {
          this.loading = false;
          // localStorage.clear();
          // this.count += 1;
          // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
        }
      });
  }

  open(content: any, size: string = 'xl') {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  reloadData(data: any) {
    if (this.edit)
      this._usuariosSerices.actualizarUsuario(data).
        subscribe({
          next: (response) => {
            this.loading = false;
            this.modalService.dismissAll();
            this.obtenerUsuarios();
          },
          error: async (err: any) => {
            this.loading = false;
            localStorage.clear();
            // this.count += 1;
            // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
          }
        });
    else
      this._usuariosSerices.crearUsuario(data).
        subscribe({
          next: (response) => {
            this.loading = false;
            this.modalService.dismissAll();
            this.obtenerUsuarios();
          },
          error: async (err: any) => {
            this.loading = false;
            localStorage.clear();
            // this.count += 1;
            // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
          }
        });
  }
}
