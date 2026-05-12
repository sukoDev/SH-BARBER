import CeilingLights from './CeilingLights';

const servicios = [
  {
    nombre: 'Corte',
    detalle: 'Degradado, tijera o estilo clasico con acabado limpio y forma equilibrada.',
    precio: 'desde 12 EUR',
  },
  {
    nombre: 'Barba',
    detalle: 'Perfilado, arreglo y acabado con producto profesional para piel y barba.',
    precio: 'desde 8 EUR',
  },
  {
    nombre: 'Corte + barba',
    detalle: 'Servicio completo para salir listo en una sola visita.',
    precio: 'desde 18 EUR',
  },
  {
    nombre: 'Color y matiz',
    detalle: 'Tonos controlados, asesoramiento y acabado natural.',
    precio: 'consultar',
  },
];

function Servicios() {
  return (
    <section className="route-page services-page">
      <div className="page-hero">
        <CeilingLights compact />
        <p className="eyebrow">Servicios</p>
        <h1>Corte actual, barba cuidada y acabado de estudio.</h1>
        <p>
          Una carta simple y directa, con servicios pensados para reservar rapido y entender
          desde el primer vistazo que resultado vas a conseguir.
        </p>
      </div>

      <div className="service-list">
        {servicios.map((servicio) => (
          <article className="service-item" key={servicio.nombre}>
            <div>
              <h3>{servicio.nombre}</h3>
              <p>{servicio.detalle}</p>
            </div>
            <strong>{servicio.precio}</strong>
          </article>
        ))}
      </div>

      <div className="faq-strip">
        <article>
          <span>Duracion</span>
          <p>Servicios organizados para trabajar con detalle sin hacerte esperar de mas.</p>
        </article>
        <article>
          <span>Asesoramiento</span>
          <p>Recomendacion de estilo segun cabello, barba y mantenimiento diario.</p>
        </article>
        <article>
          <span>Reserva</span>
          <p>Elige hora desde la app y llega con tu cita ya preparada.</p>
        </article>
      </div>
    </section>
  );
}

export default Servicios;
