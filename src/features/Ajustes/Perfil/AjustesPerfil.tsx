import React from 'react'
import { ContainerAjustes } from '../components/ContainerAjustes'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Ajuste } from '../components/Ajuste'
import { Switch } from '@/packages/components/Switch'

export const AjustesPerfil = () => {
  return (
    <ContainerAjustes
        titulo='Perfil'
        icono={faUser}
    >
        <Ajuste 
            titulo='Mostrar mi email'
            descripcion='Si activas esta opción otros usuarios podrán ver tu email'
        >
            <Switch label='' checked={true} onChange={() => {}} />
        </Ajuste>
        <Ajuste 
            titulo='Mostrar mis medallas'
            descripcion='Si activas esta opción otros usuarios podrán ver las medallas que has conseguido'
        >
            <Switch label='' checked={true} onChange={() => {}} />
        </Ajuste>
    </ContainerAjustes>
  )
}
