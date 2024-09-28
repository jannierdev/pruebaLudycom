export const columnasAreas = [
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
        columnDef: 'codigo',
        header: 'Codigo',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'nombre',
        header: 'Nombre',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    },
    {
        columnDef: 'nombreLider',
        header: 'Lider',
        style: 'text-center',
        type: 'text',
        setBackground: (data: any) => {
            return '';
        }
    }
];

export const fieldForm = [
    {
        field: 'codigo',
        typeField: 'input',
        type: 'number',
        name: 'Codigo',
        requerido: true,
        className: 'col-md-4',
        maxLength: 2,
        messageError: 'Nombre es obligatorio'
    },
    {
        field: 'nombre',
        typeField: 'input',
        type: 'text',
        name: 'nombre',
        requerido: true,
        className: 'col-md-4',
        maxLength: 50,
        messageError: 'Numero de documento es obligatorio'
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