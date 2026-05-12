import { useState } from 'react';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/productos', label: 'Productos' },
  { href: '/sobre-mi', label: 'Sobre mi' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/reservas', label: 'Reserva' },
  { href: '/contacto', label: 'Contacto' },
];

const logoUrl = '/200x200bb-75.webp';

function Navbar({ currentPath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar${menuOpen ? ' is-open' : ''}`}>
      <a className="brand" href="/" aria-label="Ir al inicio" onClick={handleCloseMenu}>
        <img className="brand-logo" src={logoUrl} alt="SH Barber" />
        <span className="brand-copy">
          <strong>SH-BARBER</strong>
          <small>Barber studio</small>
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={handleToggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="nav-links" id="main-navigation" aria-label="Navegacion principal">
        {links.map((link) => (
          <a
            className={currentPath === link.href ? 'is-active' : ''}
            key={link.href}
            href={link.href}
            onClick={handleCloseMenu}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="/reservas" onClick={handleCloseMenu}>
        Reservar
      </a>
    </header>
  );
}

export default Navbar;
