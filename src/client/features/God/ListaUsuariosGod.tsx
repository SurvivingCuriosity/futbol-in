import { UserDTO } from '@/server/models/User/UserDTO'

export const ListaUsuariosGod = ({usuarios}:{usuarios:Array<UserDTO&{code:string|undefined}>}) => {
  return (
    <ul className="flex flex-col gap-2 mt-2">
    {usuarios.map((f) => (
      <div
        key={f.id}
        className="border flex items-center justify-between border-neutral-800 p-1 bg-neutral-900"
      >
        <div className="flex flex-col">
          <p>{f.name}</p>
          <p>{f.email}</p>
          <p>{f.code}</p>
        </div>
      </div>
    ))}
  </ul>
  )
}
