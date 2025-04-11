import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";

const page = () => {
  return (
    <GoBackLayout href="/">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Política de Privacidad
          </h1>
          <p className="text-center text-sm text-neutral-600">
            Última actualización: 11/04/2025
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introducción</h2>
          <p className="text-justify">
            En Futbolin App (en adelante, “la Aplicación”), nos comprometemos a
            proteger y respetar tu privacidad. En este documento se detalla cómo
            se recogen, utilizan, protegen y, en su caso, conservan tus datos
            personales.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. Datos Personales Recogidos
          </h2>
          <p className="mb-2">
            Al registrarte y utilizar nuestra Aplicación se podrán recoger los
            siguientes datos:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Nombre de la persona (opcional):</strong> Para
              identificártelo en función de tus preferencias.
            </li>
            <li>
              <strong>Nombre de usuario:</strong> Para que otros usuarios puedan
              reconocerte en la plataforma.
            </li>
            <li>
              <strong>Correo electrónico y contraseña:</strong> Requeridos para
              el registro y el acceso a la Aplicación.
            </li>
            <li>
              <strong>Número de teléfono (opcional):</strong> Para participar en
              torneos y permitir que el operador pueda contactarte.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Finalidades del Tratamiento de Datos
          </h2>
          <p className="text-justify">
            Los datos personales recogidos se utilizarán para:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              Realizar el proceso de registro e identificación dentro de la
              Aplicación.
            </li>
            <li>
              Facilitar la participación en torneos y competiciones organizadas.
            </li>
            <li>
              Permitir que el operador de la Aplicación pueda contactarte, si
              fuese necesario.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. No Compartición de Datos
          </h2>
          <p className="text-justify">
            Los datos personales que se recogen en la Aplicación{" "}
            <strong>no se comparten con terceros</strong> para fines comerciales
            u otros, manteniendo su uso restringido a los fines aquí descritos.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Medidas de Seguridad
          </h2>
          <p className="text-justify">
            La protección de tus datos se basa en las medidas de seguridad
            implementadas por los servicios que utilizamos, como:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>MongoDB Atlas</strong> y{" "}
              <strong>Google Cloud Storage</strong> para el almacenamiento
              seguro.
            </li>
            <li>Las contraseñas se almacenan de forma encriptada.</li>
            <li>Se utilizan cookies para gestionar las sesiones de usuario.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            6. Uso de Cookies y Tecnologías Similares
          </h2>
          <p className="text-justify">
            Nuestra Aplicación utiliza cookies para gestionar y mantener las
            sesiones de usuario. Estas cookies son esenciales para el correcto
            funcionamiento de la aplicación.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            7. Herramientas de Analítica
          </h2>
          <p className="text-justify">
            Para conocer el rendimiento y analizar el tráfico de la Aplicación,
            utilizamos Search Console. No se utilizan otras herramientas de
            analítica o seguimiento.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Usuarios Menores de Edad
          </h2>
          <p className="text-justify">
            La Aplicación está abierta a usuarios de todas las edades. Aunque
            los menores de edad pueden registrarse, se han implementado medidas
            para asegurar que no se maneje contenido sensible.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            9. Derechos de Acceso, Rectificación y Supresión
          </h2>
          <p className="text-justify">
            Los usuarios podrán acceder, rectificar o eliminar sus datos
            personales de forma permanente en cualquier momento. Para ello,
            pueden:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Acceder a la sección de ajustes dentro de la Aplicación.</li>
            <li>
              Pedir asistencia mediante correo electrónico a:{" "}
              <a
                className="text-blue-600 hover:underline"
                href="mailto:soporte@futbolin.app"
              >
                soporte@futbolin.app
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            10. Conservación de los Datos
          </h2>
          <p className="text-justify">
            Los datos personales se conservarán de forma indefinida mientras la
            cuenta esté activa y se encuentren en uso, salvo que el usuario
            decida rectificar o eliminar sus datos.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            11. Actualizaciones de la Política de Privacidad
          </h2>
          <p className="text-justify">
            En caso de que se realicen cambios en esta Política de Privacidad,
            se notificará a los usuarios a través de la cuenta oficial de
            Instagram de la Aplicación.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            12. Jurisdicción y Legislación Aplicable
          </h2>
          <p className="text-justify">
            Actualmente, no se ha especificado una jurisdicción concreta en esta
            política. Se recomienda consultar esta sección periódicamente para
            conocer las actualizaciones o modificaciones.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">13. Consentimiento</h2>
          <p className="text-justify">
            Al registrarte en la Aplicación, confirmas que has leído, entendido
            y aceptas las condiciones descritas en esta Política de Privacidad.
            Durante el proceso de registro, se requiere que aceptes los términos
            y condiciones de uso.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            14. Transferencias Internacionales de Datos
          </h2>
          <p className="text-justify">
            Es posible que los datos se almacenen en servidores ubicados en
            otros países, por ejemplo, en MongoDB Atlas en AWS. Esto se realiza
            sin fines explícitos de transferencia, sino en función de la
            infraestructura de los proveedores de servicios.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">15. Control de Acceso</h2>
          <p className="text-justify">
            La aplicación cuenta con mecanismos de autenticación, autorización y
            roles de usuario para asegurar que el acceso a los datos se realice
            de forma controlada.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            16. Servicios de Terceros
          </h2>
          <p className="text-justify">
            La Aplicación utiliza servicios de terceros que cuentan con sus
            propias políticas de privacidad, entre los que se incluyen:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Google Maps API</li>
            <li>Google Cloud Storage</li>
            <li>MongoDB con MongoDB Atlas (free tier shared cluster)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            17. Limitaciones y Notificaciones de Incidentes
          </h2>
          <p className="text-justify">
            Actualmente, la Aplicación no cuenta con un procedimiento formal
            para notificar a los usuarios o autoridades en caso de una violación
            de seguridad. Sin embargo, se implementan las medidas de seguridad
            fundamentales ofrecidas por los proveedores de servicios.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">18. Contacto</h2>
          <p className="text-justify">
            Para cualquier duda o solicitud relacionada con la presente Política
            de Privacidad o el tratamiento de tus datos personales, por favor
            contacta con nosotros:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              Correo electrónico:{" "}
              <a
                className="text-blue-600 hover:underline"
                href="mailto:soporte@futbolin.app"
              >
                soporte@futbolin.app
              </a>
            </li>
            <li>Sección de ajustes en la Aplicación</li>
            <li>
              Nuestras redes sociales (por ejemplo, cuenta de Instagram oficial)
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            19. Aceptación de la Política de Privacidad
          </h2>
          <p className="text-justify">
            Al registrarte en Futbolin App, aceptas los términos establecidos en
            esta Política de Privacidad y autorizas el tratamiento de tus datos
            personales conforme a lo aquí descrito.
          </p>
        </section>

        <section>
          <p className="text-sm text-neutral-300 text-center bg-neutral-800/50">
            Esta política está sujeta a cambios. Se recomienda revisar
            periódicamente para estar al tanto de las actualizaciones.
          </p>
        </section>
      </div>
    </GoBackLayout>
  );
};

export default page;
