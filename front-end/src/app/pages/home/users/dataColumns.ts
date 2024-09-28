export const columnasUsuarios = [
    {
        columnDef: 'estado',
        header: 'Estado',
        style: 'text-center',
        type: 'estado',
        setBackground: (data: any) => {
            let background: string = "";
            switch (data.estado) {
                case "A":
                    background = "semaforo-verde";
                    break;
                case "I":
                    background = "semaforo-rojo";
                    break;
                default:
                    break;
            }
            return background;
        }
    },
    {
        columnDef: 'numeroDocumento',
        header: 'N° de documento',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'nombres',
        header: 'Nombres',
        style: '',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'apellidos',
        header: 'Apellidos',
        style: '',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'fechaNacimiento',
        header: 'Fecha de nacimiento',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'email',
        header: 'Email',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'nombreArea',
        header: 'Area',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'salario',
        header: 'Salario',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    }
];

export const fieldForm = [
    {
        field: 'numeroDocumento',
        typeField: 'input',
        type: 'number',
        name: 'Numero de documento',
        requerido: true,
        className: 'col-md-4',
        maxLength: 7,
        messageError: 'Numero de documento es obligatorio'
    },
    {
        field: 'nombres',
        typeField: 'input',
        type: 'text',
        name: 'Nombre',
        requerido: true,
        className: 'col-md-4',
        maxLength: 50,
        messageError: 'Nombre es obligatorio'
    },
    {
        field: 'apellidos',
        typeField: 'input',
        type: 'text',
        name: 'Apellidos',
        requerido: true,
        className: 'col-md-4',
        maxLength: 50,
        messageError: 'Nombre es obligatorio'
    },
    {
        field: 'fechaNacimiento',
        typeField: 'input',
        type: 'date',
        name: 'Fecha de nacimiento',
        requerido: true,
        className: 'col-md-4',
        messageError: 'Nombre es obligatorio'
    },
    {
        field: 'email',
        typeField: 'input',
        type: 'text',
        name: 'Email',
        requerido: true,
        className: 'col-md-4',
        maxLength: 50,
        pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
        messageError: 'Nombre es obligatorio'
    },
    {
        field: 'salario',
        typeField: 'input',
        type: 'number',
        name: 'Salario',
        requerido: true,
        className: 'col-md-4',
        maxLength: 10,
        messageError: 'Nombre es obligatorio'
    },
    {
        field: 'estado',
        typeField: 'select',
        type: 'date',
        name: 'Estado',
        requerido: true,
        className: 'col-md-4',
        messageError: 'Nombre es obligatorio',
        options: [
            { value: 'A', descripcion: 'Activo' },
            { value: 'I', descripcion: 'Inactivo' },
        ]
    }
]