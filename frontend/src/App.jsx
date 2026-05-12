import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Productos from './components/Productos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import AdminProductos from './components/AdminProductos';
import SobreMi from './components/SobreMi';
import Reservas from './components/Reservas';
import AutoGallery from './components/AutoGallery';
import Resenas from './components/Resenas';

const routeCards = [
  {
    href: '/servicios',
    eyebrow: 'Servicios',
    title: 'Corte, barba y acabado profesional.',
    text: 'Servicios claros, pensados para salir con una imagen limpia y facil de mantener.',
  },
  {
    href: '/productos',
    eyebrow: 'Productos',
    title: 'Cuidado para casa con criterio de barberia.',
    text: 'Catalogo conectado al backend para mostrar lo que tengas disponible.',
  },
  {
    href: '/galeria',
    eyebrow: 'Galeria',
    title: 'El ambiente del local en movimiento.',
    text: 'Una zona visual para mostrar silla, luces, producto y detalles del estudio.',
  },
];

const normalizePath = (path) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.replace(/\/$/, '');
};

function Inicio() {
  return (
    <>
      <Hero />

      <AutoGallery />

      <Resenas />

      <section className="home-routes">
        <div className="section-heading">
          <p className="eyebrow">Experiencia SH</p>
          <h2>Una web rapida de entender, pero con presencia.</h2>
        </div>

        <div className="route-card-grid">
          {routeCards.map((card) => (
            <a className="route-card" href={card.href} key={card.href}>
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="signature-band">
        <div>
          <p className="eyebrow">Firma visual</p>
          <h2>Luces hexagonales, negro limpio y verde SH.</h2>
        </div>
        <p>
          El estilo toma la energia del techo iluminado y el mueble verde de tu barberia para
          que la web se reconozca como tuya sin parecer una plantilla mas.
        </p>
      </section>
    </>
  );
}

const routes = {
  '/': <Inicio />,
  '/servicios': <Servicios />,
  '/productos': <Productos />,
  '/sobre-mi': <SobreMi />,
  '/galeria': <AutoGallery page />,
  '/reservas': <Reservas />,
  '/contacto': <Contacto />,
};

export default function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminProductos />;
  }

  const currentPath = normalizePath(window.location.pathname);
  const currentPage = routes[currentPath] || routes['/'];

  return (
    <>
      <Navbar currentPath={currentPath} />
      <main className="site-main">
        {currentPage}
      </main>
      <Footer />
    </>
  );
}
