const galleryItems = [
  {
    title: 'Luces del estudio',
    text: 'La firma visual del techo marca el ambiente nada mas entrar.',
    visual: 'lights',
  },
  {
    title: 'Zona de corte',
    text: 'Silla principal, espejo limpio y espacio preparado para trabajar el detalle.',
    visual: 'chair',
  },
  {
    title: 'Verde SH',
    text: 'El mueble verde crea contraste y hace reconocible la barberia.',
    visual: 'cabinet',
  },
  {
    title: 'Acabado profesional',
    text: 'Producto, herramienta y orden para mantener una imagen premium.',
    visual: 'tools',
  },
];

function AutoGallery({ page = false }) {
  return (
    <section className={page ? 'route-page gallery-page' : 'auto-gallery-section'}>
      <div className={page ? 'page-hero page-hero-wide' : 'section-heading gallery-heading'}>
        <p className="eyebrow">Galeria</p>
        <h1>{page ? 'Un vistazo al ambiente SH-BARBER.' : 'El estudio tambien se siente en movimiento.'}</h1>
        <p>
          Una galeria automatica inspirada en tu local: luces geometricas, silla negra,
          superficie limpia y el verde SH como punto de identidad.
        </p>
      </div>

      <div className="gallery-slider" aria-label="Galeria automatica SH Barber">
        <div className="gallery-track">
          {[...galleryItems, ...galleryItems].map((item, index) => (
            <article className="gallery-card" key={`${item.title}-${index}`}>
              <div className={`gallery-visual gallery-visual-${item.visual}`}>
                <span />
                <span />
                <span />
              </div>
              <div className="gallery-copy">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AutoGallery;
