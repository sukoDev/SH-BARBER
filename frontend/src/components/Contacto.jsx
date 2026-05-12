import CeilingLights from './CeilingLights';

const bookingUrl = 'https://apps.apple.com/es/app/sh-barber/id6758207531';

function Contacto() {
  return (
    <section className="route-page contact-page">
      <div className="page-hero">
        <CeilingLights compact />
        <p className="eyebrow">Contacto</p>
        <h1>Ubicacion, horario y reserva en un solo sitio.</h1>
        <p>
          La web debe resolver rapido las dudas importantes: donde estas, cuando abres y como
          se pide cita.
        </p>
      </div>

      <div className="contact-grid">
        <article className="info-panel" id="citas">
          <span>Citas</span>
          <h3>Reserva en SH Barber</h3>
          <p>Las citas se gestionan desde la app oficial en App Store.</p>
          <a
            className="button button-primary"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir app SH Barber en App Store"
          >
            Abrir App Store
          </a>
        </article>

        <article className="info-panel">
          <span>Ubicacion</span>
          <h3>Direccion del estudio</h3>
          <p>Anade aqui la calle real para conectar despues Google Maps y rutas.</p>
          <a className="button button-secondary" href="https://maps.google.com" target="_blank" rel="noreferrer">
            Como llegar
          </a>
        </article>

        <article className="info-panel">
          <span>Contacto</span>
          <h3>WhatsApp e Instagram</h3>
          <p>Zona preparada para enlazar tus canales reales cuando los tengas definidos.</p>
          <a className="button button-secondary" href="mailto:hola@sh-barber.com">
            Escribir
          </a>
        </article>
      </div>

      <div className="hours-panel">
        <div>
          <p className="eyebrow">Horario</p>
          <h2>Semana organizada para reservar sin dudas.</h2>
        </div>
        <ul>
          <li><span>Lunes a Viernes</span><strong>10:00 - 14:00 / 16:00 - 20:00</strong></li>
          <li><span>Sabado</span><strong>10:00 - 14:00</strong></li>
          <li><span>Domingo</span><strong>Cerrado</strong></li>
        </ul>
      </div>
    </section>
  );
}

export default Contacto;
