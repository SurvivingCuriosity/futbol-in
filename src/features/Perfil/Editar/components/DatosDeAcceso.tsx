import { Colapsable } from "@/packages/components/Colapsable";
import { UserDTO } from "@/shared/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { useState } from "react";
import { CambiarContrasena } from "./CambiarContrasena";
import { CambiarEmail } from "./CambiarEmail";

export const DatosDeAcceso = ({ user }: { user: UserDTO }) => {
  const [contenido, setContenido] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 space-y-4 flex flex-col gap-2">
      {!isOpen && (
        <span className="flex items-center gap-2">
          <Button
            onClick={() => {
              setIsOpen(true);
              setContenido(
                <CambiarEmail
                  emailActual={user.email}
                  closeCallback={() => setIsOpen(false)}
                />
              );
            }}
            label="Cambiar email"
            variant="neutral-outline"
            size="sm"
          />
          <Button
            onClick={() => {
              setIsOpen(true);
              setContenido(
                <CambiarContrasena closeCallback={() => setIsOpen(false)} />
              );
            }}
            label="Cambiar contraseña"
            variant="neutral-outline"
            size="sm"
          />
        </span>
      )}
      <Colapsable
        visibleContent={null}
        open={isOpen}
        containerClassName=""
        extraContent={contenido}
      />
    </div>
  );
};
