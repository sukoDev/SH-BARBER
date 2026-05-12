import CeilingLights from './CeilingLights';

const bookingUrl = 'https://apps.apple.com/es/app/sh-barber/id6758207531';
const logoUrl = '/200x200bb-75.webp';

function Reservas() {
  return (
    <section className="route-page booking-page">
      <div className="page-hero page-hero-split">
        <CeilingLights compact />
        <div>
          <p className="eyebrow">Reserva</p>
          <h1>Tu cita, directa desde la app oficial.</h1>
          <p>
            La web presenta el estilo, los servicios y los productos. La reserva se cierra en
            SH Barber para que el calendario quede siempre ordenado.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={bookingUrl} target="_blank" rel="noreferrer">
              Abrir app SH Barber
            </a>
            <a className="button button-secondary" href="/servicios">
              Ver servicios
            </a>
          </div>
        </div>

        <aside className="booking-card">
          <img src={logoUrl} alt="SH Barber" />
          <span>Citas online</span>
          <strong>SH Barber</strong>
          <p>Reserva desde App Store y llega con tu hora lista.</p>
        </aside>
      </div>

      <div className="booking-steps">
        <article>
          <span>01</span>
          <h2>Elige servicio</h2>
          <p>Corte, barba o pack completo segun lo que necesites.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Selecciona hora</h2>
          <p>La app muestra disponibilidad real para evitar esperas.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Ven preparado</h2>
          <p>Tu cita queda organizada y la experiencia empieza antes de entrar.</p>
        </article>
      </div>
    </section>
  );
}

export default Reservas;
