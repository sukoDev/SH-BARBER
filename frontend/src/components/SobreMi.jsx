import CeilingLights from './CeilingLights';

function SobreMi() {
  return (
    <section className="route-page about-page">
      <div className="page-hero page-hero-split">
        <CeilingLights compact />
        <div>
          <p className="eyebrow">Sobre mi</p>
          <h1>Una barberia precisa, limpia y con identidad propia.</h1>
          <p>
            SH-BARBER nace para que cada corte tenga una forma clara, un acabado cuidado y
            una experiencia sencilla desde la reserva hasta el ultimo detalle.
          </p>
        </div>

        <div className="barber-scene" aria-hidden="true">
          <div className="scene-mirror" />
          <div className="scene-cabinet" />
          <div className="scene-chair" />
        </div>
      </div>

      <div className="about-story">
        <article>
          <span>01</span>
          <h2>Trabajo de detalle</h2>
          <p>
            Cortes bien definidos, barba perfilada y asesoramiento para mantener el estilo
            fuera de la barberia.
          </p>
        </article>

        <article>
          <span>02</span>
          <h2>Imagen urbana</h2>
          <p>
            Un espacio oscuro, limpio y reconocible, con el verde SH como acento y las luces
            del techo como firma visual.
          </p>
        </article>

        <article>
          <span>03</span>
          <h2>Reserva facil</h2>
          <p>
            Las citas se gestionan desde la app oficial para que puedas elegir hora sin
            llamadas ni esperas.
          </p>
        </article>
      </div>
    </section>
  );
}

export default SobreMi;
