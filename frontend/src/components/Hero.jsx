import CeilingLights from './CeilingLights';

const bookingUrl = 'https://apps.apple.com/es/app/sh-barber/id6758207531';

function Hero() {
  return (
    <section className="hero-section">
      <CeilingLights />

      <div className="hero-content">
        <p className="eyebrow">SH Barber Premium</p>
        <h1>Estilo limpio bajo una luz propia.</h1>
        <p className="hero-lead">
          Corte, barba y cuidado masculino en una barberia oscura, elegante y
          reconocible por sus luces geometricas y su verde SH.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="/reservas">
            Reservar cita
          </a>
          <a className="button button-secondary" href="/servicios">
            Ver servicios
          </a>
        </div>

        <div className="hero-points">
          <span>Degradados</span>
          <span>Barba</span>
          <span>Producto profesional</span>
        </div>
      </div>

      <div className="hero-studio" aria-hidden="true">
        <div className="studio-wall">
          <span />
          <span />
        </div>
        <div className="studio-cabinet" />
        <div className="studio-chair" />
        <div className="studio-floor" />
      </div>

      <a className="hero-status" href={bookingUrl} target="_blank" rel="noreferrer">
        <span>Citas online</span>
        <strong>App SH Barber</strong>
      </a>
    </section>
  );
}

export default Hero;
