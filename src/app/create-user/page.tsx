"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateUserPage() {
  // Estados para los campos del formulario y para mensajes
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

    const router = useRouter()

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Realiza la petición POST a tu endpoint
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Usuario creado con éxito.');
        // Opcional: limpiar el formulario
        setName('');
        setEmail('');
        router.push('/users')
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Crear Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Usuario
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
