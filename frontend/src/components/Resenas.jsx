import { useEffect, useMemo, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const fallbackReviews = [
  {
    id: 'fallback-1',
    author: 'Cliente SH',
    rating: 5,
    text: 'Corte muy limpio, buen trato y el acabado dura. Se nota que cuidan los detalles.',
    relativeTime: 'Resena de ejemplo',
  },
  {
    id: 'fallback-2',
    author: 'Cliente habitual',
    rating: 5,
    text: 'El degradado queda perfecto y la reserva por la app hace todo mucho mas comodo.',
    relativeTime: 'Resena de ejemplo',
  },
  {
    id: 'fallback-3',
    author: 'Primera visita',
    rating: 5,
    text: 'Ambiente elegante, puntualidad y asesoramiento claro para mantener el peinado.',
    relativeTime: 'Resena de ejemplo',
  },
];

const renderStars = (rating) => {
  const roundedRating = Math.round(Number(rating) || 5);
  return '★★★★★'.slice(0, roundedRating).padEnd(5, '☆');
};

function Resenas() {
  const [googleReviews, setGoogleReviews] = useState([]);
  const [placeSummary, setPlaceSummary] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    const cargarResenas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/resenas/google`);
        const data = await response.json();

        if (ignore) {
          return;
        }

        setPlaceSummary(data);

        if (Array.isArray(data.reviews) && data.reviews.length) {
          setGoogleReviews(data.reviews);
          setStatus('');
          return;
        }

        setGoogleReviews([]);
        setStatus(data.message || 'Aun no hay resenas de Google disponibles.');
      } catch {
        if (!ignore) {
          setGoogleReviews([]);
          setStatus('No se pudieron cargar las resenas de Google.');
        }
      }
    };

    cargarResenas();

    return () => {
      ignore = true;
    };
  }, []);

  const reviews = googleReviews.length ? googleReviews : fallbackReviews;

  const summaryText = useMemo(() => {
    if (placeSummary?.rating && placeSummary?.totalReviews) {
      return `${placeSummary.rating.toFixed(1)} de 5 en Google con ${placeSummary.totalReviews} resenas`;
    }

    return 'Resenas reales de Google cuando conectes tu ficha de negocio';
  }, [placeSummary]);

  return (
    <section className="reviews-section">
      <div className="reviews-summary">
        <p className="eyebrow">Resenas</p>
        <h2>Lo que dicen tus clientes en Google.</h2>
        <p>{summaryText}</p>
        {status && <span className="reviews-status">{status}</span>}
        <a
          className="button button-primary"
          href={placeSummary?.googleMapsUri || '/contacto'}
          target={placeSummary?.googleMapsUri ? '_blank' : undefined}
          rel={placeSummary?.googleMapsUri ? 'noreferrer' : undefined}
        >
          Ver en Google
        </a>
      </div>

      <div className="reviews-list" aria-label="Resenas de Google">
        {reviews.map((review) => (
          <article className="review-card" key={review.id || review.author}>
            <div className="review-stars" aria-label={`${review.rating} estrellas`}>
              {renderStars(review.rating)}
            </div>
            <p>{review.text}</p>
            <strong>{review.author}</strong>
            <span>{review.relativeTime || 'Google Reviews'}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Resenas;
