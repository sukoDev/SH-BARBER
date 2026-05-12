import { useEffect, useState } from 'react';
import CeilingLights from './CeilingLights';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const productosBase = [
  {
    nombre: 'Pomada mate',
    tipo: 'Cabello',
    precio: '14.90',
    descripcion: 'Fijacion flexible y acabado natural para uso diario.',
    etiqueta: 'Hair',
    color: 'lime',
  },
  {
    nombre: 'Aceite de barba',
    tipo: 'Barba',
    precio: '11.90',
    descripcion: 'Suaviza, hidrata y deja la barba con aspecto cuidado.',
    etiqueta: 'Beard',
    color: 'onyx',
  },
  {
    nombre: 'Champu profesional',
    tipo: 'Cuidado',
    precio: '12.50',
    descripcion: 'Limpieza equilibrada para mantener el corte fresco.',
    etiqueta: 'Care',
    color: 'steel',
  },
];

const formatPrecio = (precio) => {
  const number = Number(precio);

  if (Number.isNaN(number)) {
    return 'Consultar';
  }

  return `${number.toFixed(2).replace('.', ',')} EUR`;
};

function Productos() {
  const [productos, setProductos] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    const cargarProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/productos`);
        const data = await response.json();

        if (!ignore && response.ok) {
          setProductos(Array.isArray(data) ? data : data.productos || []);
        }
      } catch {
        if (!ignore) {
          setStatus('No se pudo cargar el catalogo del backend.');
        }
      }
    };

    cargarProductos();

    return () => {
      ignore = true;
    };
  }, []);

  const productosVisibles = productos.length ? productos : productosBase;

  return (
    <section className="route-page products-page">
      <div className="page-hero page-hero-wide">
        <CeilingLights compact />
        <p className="eyebrow">Cuidado profesional</p>
        <h1>Productos para mantener tu corte y barba.</h1>
        <p>
          Catalogo visual, conectado al backend y preparado para que puedas vender o recibir
          consultas por WhatsApp mientras montas el carrito completo.
        </p>
      </div>

      {status && <p className="catalog-status">{status}</p>}

      <div className="product-grid">
        {productosVisibles.map((producto, index) => (
          <article className="product-card" key={producto.id || producto.nombre}>
            <div className={`product-shot product-${producto.color || ['lime', 'onyx', 'steel'][index % 3]}`}>
              {producto.imagenUrl ? (
                <img src={producto.imagenUrl} alt={producto.nombre} />
              ) : (
                <span>{producto.etiqueta || producto.nombre.slice(0, 2)}</span>
              )}
            </div>
            <div className="product-copy">
              <p>{producto.tipo || 'Producto SH'}</p>
              <h3>{producto.nombre}</h3>
              <span>{producto.descripcion || 'Cuidado profesional recomendado en barberia.'}</span>
              <strong>{formatPrecio(producto.precio)}</strong>
            </div>
            <a href="/contacto">Consultar</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Productos;
