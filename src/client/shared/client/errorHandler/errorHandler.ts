import { ErrorData } from "futbol-in-core/types";

export const getErrorMessageClient = (err: unknown, field: string) => {
  if (isFetchError(err)) {
    console.log("isFetcu");
    if (err.data.type === "VALIDATION_ERROR") {
      console.log(err.data.errors);
      const matchedError = err.data.errors.find((issue) =>
        issue.path?.includes(field)
      );
      return matchedError?.message ?? "Error de validación desconocido";
    } else {
      console.log(err.data.error);
      return err.data.error || "Error de servidor";
    }
  }
  return "Error desconocido";
};

export const getErrorClient = (err: unknown) => {
  if (isFetchError(err)) {
    if (err.data.type === "VALIDATION_ERROR") {
      return err.data.errors[0].message;
    } else {
      return err.data.error || "Error de servidor";
    }
  }
  return "Error desconocido";
};

export function getErrorsClient(err: unknown): Record<string, string> | undefined {
  if (isFetchError(err)) {
    const { data } = err;
    if (data.type === "VALIDATION_ERROR" && "errors" in data) {
      return data.errors.reduce((acc, e) => {
        const key = e.path?.join('.') || '';
        acc[key] = e.message;
        return acc;
      }, {} as Record<string, string>);
    } 
    return { '': data.error || "Error de servidor" };
  }
  return undefined;
}


function isFetchError(
  err: unknown
): err is { status: number; data: ErrorData } {
  if (typeof err !== "object" || err === null) return false;

  return "status" in err && "data" in err;
}
