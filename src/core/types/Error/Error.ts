/**
 * Cuando es un error de validación:
 */
export interface ValidationErrorData {
    type: "VALIDATION_ERROR";
    errors: {
      // path típicamente es un array con strings o numbers
      // según la estructura que devuelva Zod
      path?: Array<string | number>;
      message: string;
    }[];
  }
  
  /**
   * Cuando es un error genérico/servidor:
   */
  export interface ServerErrorData {
    type: "SERVER_ERROR";
    error: string;
  }
  
  /**
   * Unión que engloba todas las posibilidades de error
   * que pueden llegar desde el servidor:
   */
  export type ErrorData = ValidationErrorData | ServerErrorData;
  