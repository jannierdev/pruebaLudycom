import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Fields } from 'src/app/interfaces/fields';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public form!: FormGroup;
  @Input() fields: Fields[] = [];
  @Input() data: [] = [];
  @Input() edit: boolean = false;
  @Output() reloadTable = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();

    if (this.edit && this.data) {
      this.form.patchValue(this.data);
    }
  }

  buildForm() {
    let campos: { [key: string]: FormControl } = {};
    this.fields.forEach((item) => {
      campos[item.field] = new FormControl('');
    });
    this.form = this.fb.group({
      ...campos
    });
    this.validaciones();
  }

  private validaciones() {
    this.fields.forEach((item) => {
      return this.form.controls[item.field].setValidators(
        item.requerido ? [Validators.required, Validators.maxLength(item.maxLength!), Validators.pattern(item.pattern!)] : []
      );
    });

    console.log(this.form);

  }

  onSubmit() {
    this.reloadTable.emit(this.form.value);
  }
}
