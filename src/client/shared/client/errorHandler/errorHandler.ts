import { ErrorData } from "@/core/types/Error/Error";


export const getErrorMessageClient = (err: unknown, field: string) => {
  if (isFetchError(err)) {
    if (err.data.type === "VALIDATION_ERROR") {
      const matchedError = err.data.errors.find((issue) => 
        issue.path?.includes(field)
      );
      return matchedError?.message ?? "Error de validación desconocido";
    } else {
      return err.data.error || "Error de servidor";
    }
  }
  return "Error desconocido";
};

export const getErrorClient = (err: unknown) => {
  if (isFetchError(err)) {
    if (err.data.type === "VALIDATION_ERROR") {
      console.log(err.data.errors)
      return err.data.errors[0].message
    } else {
      return err.data.error || "Error de servidor";
    }
  }
  return "Error desconocido";
};


function isFetchError(err: unknown): err is { status: number; data: ErrorData } {
    if (typeof err !== "object" || err === null) return false;
  
    return "status" in err && "data" in err;
  }
