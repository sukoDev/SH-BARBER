import { useEffect, useMemo, useState } from 'react';

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  imagenUrl: '',
};

const initialCredentials = {
  email: '',
  password: '',
};

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const storageKey = 'sh_admin_session';

const getStoredAuth = () => {
  const storedAuth = sessionStorage.getItem(storageKey);

  if (!storedAuth) {
    return null;
  }

  try {
    return JSON.parse(storedAuth);
  } catch {
    sessionStorage.removeItem(storageKey);
    return null;
  }
};

function AdminProductos() {
  const [auth, setAuth] = useState(getStoredAuth);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [form, setForm] = useState(initialForm);
  const [productos, setProductos] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const isLoggedIn = Boolean(auth?.token);

  const canLogin = useMemo(() => {
    return credentials.email.trim() && credentials.password && !authLoading;
  }, [authLoading, credentials.email, credentials.password]);

  const canSubmit = useMemo(() => {
    return form.nombre.trim() && form.precio && isLoggedIn && !loading;
  }, [form.nombre, form.precio, isLoggedIn, loading]);

  const cargarProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/productos`);
      const data = await response.json();
      setProductos(Array.isArray(data) ? data : data.productos || []);
    } catch {
      setStatus({
        type: 'error',
        message: 'No se pudo cargar el catalogo actual.',
      });
    }
  };

  useEffect(() => {
    let ignore = false;

    const cargarCatalogoInicial = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/productos`);
        const data = await response.json();

        if (!ignore) {
          setProductos(Array.isArray(data) ? data : data.productos || []);
        }
      } catch {
        if (!ignore) {
          setStatus({
            type: 'error',
            message: 'No se pudo cargar el catalogo actual.',
          });
        }
      }
    };

    cargarCatalogoInicial();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!canLogin) {
      setStatus({
        type: 'error',
        message: 'Introduce email y contrasena.',
      });
      return;
    }

    setAuthLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo iniciar sesion.');
      }

      const session = {
        token: data.token,
        user: data.user,
      };

      sessionStorage.setItem(storageKey, JSON.stringify(session));
      setAuth(session);
      setCredentials(initialCredentials);
      setStatus({
        type: 'success',
        message: 'Sesion iniciada correctamente.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(storageKey);
    setAuth(null);
    setStatus({
      type: 'success',
      message: 'Sesion cerrada.',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus({
        type: 'error',
        message: 'Completa nombre y precio con una sesion admin activa.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${apiUrl}/api/admin/productos`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          descripcion: form.descripcion.trim() || null,
          precio: Number(form.precio),
          imagenUrl: form.imagenUrl.trim() || null,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem(storageKey);
        setAuth(null);
      }

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo crear el producto.');
      }

      setForm(initialForm);
      setStatus({
        type: 'success',
        message: 'Producto creado correctamente.',
      });
      await cargarProductos();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Panel privado</p>
            <h1>Productos SH-BARBER</h1>
            <p>Gestiona el catalogo que despues se mostrara en la web publica.</p>
          </div>

          <div className="admin-actions">
            {isLoggedIn && (
              <div className="admin-user">
                <span>{auth.user?.email}</span>
                <strong>{auth.user?.role}</strong>
                <button className="button button-secondary" type="button" onClick={handleLogout}>
                  Salir
                </button>
              </div>
            )}
            <a className="button button-secondary" href="/">
              Ver web
            </a>
          </div>
        </header>

        <div className="admin-grid">
          {!isLoggedIn ? (
            <form className="admin-form admin-login" onSubmit={handleLogin}>
              <div className="admin-form-intro admin-full">
                <h2>Entrar como admin</h2>
                <p>Solo los usuarios con rol admin pueden crear productos.</p>
              </div>

              <label className="admin-full">
                Email
                <input
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleCredentialsChange}
                  placeholder="admin@shbarber.local"
                  autoComplete="username"
                />
              </label>

              <label className="admin-full">
                Contrasena
                <input
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleCredentialsChange}
                  placeholder="Tu contrasena"
                  autoComplete="current-password"
                />
              </label>

              {status.message && (
                <p className={`admin-message admin-message-${status.type}`}>{status.message}</p>
              )}

              <button className="button button-primary admin-submit" type="submit" disabled={!canLogin}>
                {authLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          ) : (
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-intro admin-full">
                <h2>Nuevo producto</h2>
                <p>Se guardara como producto activo y saldra en el catalogo publico.</p>
              </div>

              <label>
                Nombre
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Pomada mate"
                />
              </label>

              <label>
                Precio
                <input
                  name="precio"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="14.90"
                />
              </label>

              <label className="admin-full">
                Imagen URL
                <input
                  name="imagenUrl"
                  value={form.imagenUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </label>

              <label className="admin-full">
                Descripcion
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Descripcion breve del producto"
                />
              </label>

              {status.message && (
                <p className={`admin-message admin-message-${status.type}`}>{status.message}</p>
              )}

              <button className="button button-primary admin-submit" type="submit" disabled={!canSubmit}>
                {loading ? 'Creando...' : 'Crear producto'}
              </button>
            </form>
          )}

          <aside className="admin-list">
            <div className="admin-list-header">
              <span>Catalogo actual</span>
              <strong>{productos.length}</strong>
            </div>

            <div className="admin-products">
              {productos.map((producto) => (
                <article className="admin-product" key={producto.id}>
                  <div>
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion || 'Sin descripcion'}</p>
                  </div>
                  <strong>{producto.precio} EUR</strong>
                </article>
              ))}

              {!productos.length && <p className="admin-empty">Aun no hay productos visibles.</p>}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default AdminProductos;
