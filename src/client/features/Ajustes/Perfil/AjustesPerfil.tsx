import { Switch } from '@/packages/components/Switch'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'futbol-in-ui'
import { Ajuste } from '../components/Ajuste'
import { ContainerAjustes } from '../components/ContainerAjustes'

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
        <Button label="Eliminar mi cuenta" variant="danger-outline" size='sm'/>
    </ContainerAjustes>
  )
}
