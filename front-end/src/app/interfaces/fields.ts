export interface Fields {
    field: string;
    typeField: string;
    requerido: boolean;
    name: string;
    type: string;
    className: string;
    messageError: string;
    maxLength?: number;
    pattern?: string;
    options?: Options[];
}

export interface Options {
    value: string;
    descripcion: string;
}