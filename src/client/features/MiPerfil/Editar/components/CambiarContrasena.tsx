import React from 'react'

export interface CambiarContrasenaProps {
    closeCallback: () => void;
}


export const CambiarContrasena = (props: CambiarContrasenaProps) => {
  
    console.log(props);
    
    return (
    <div>CambiarContrasena</div>
  )
}
