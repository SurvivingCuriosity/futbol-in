export enum WorkStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE',
}

export interface IWorkItem {
    name: string;	
    description: string;
    status: WorkStatus;
}

export const WorkItems:IWorkItem[] = [
    {
        name: 'Autenticación',
        description: 'El usuario debe poder iniciar sesión, registrarse y cerrar sesión.',
        status: WorkStatus.DONE,
    },
    {
        name: 'Mapa',
        description: 'El usuario debe poder ver marcadores básicos en el mapa.',
        status: WorkStatus.DONE,
    },
    {
        name: 'Autenticación google',
        description: 'El usuario debe poder iniciar sesión y registrarse con google',
        status: WorkStatus.DOING,
    },
    {
        name: 'Formulario nuevo futbolin',
        description: 'El usuario debe poder rellenar un formulario para agregar un nuevo futbolin',
        status: WorkStatus.TODO,
    },
    
]
