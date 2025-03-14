export interface CambiarEmailRequest {
    idUser: string;
    password: string;
    nuevoEmail: string;
}

export interface CambiarEmailResponse {
    success: boolean;
}