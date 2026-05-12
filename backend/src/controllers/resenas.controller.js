const GOOGLE_PLACES_BASE_URL = 'https://places.googleapis.com/v1/places';

const fallbackResponse = {
    source: 'fallback',
    placeName: 'SH-BARBER',
    rating: null,
    totalReviews: null,
    googleMapsUri: null,
    reviews: [],
};

const normalizeReview = (review) => ({
    id: review.name,
    author: review.authorAttribution?.displayName || 'Cliente Google',
    rating: review.rating || 5,
    text: review.text?.text || review.originalText?.text || '',
    relativeTime: review.relativePublishTimeDescription || '',
    profilePhotoUrl: review.authorAttribution?.photoUri || null,
    googleMapsUri: review.googleMapsUri || null,
});

const obtenerResenasGoogle = async (req, res) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return res.json({
            ...fallbackResponse,
            configured: false,
            message: 'Google Places no esta configurado todavia.',
        });
    }

    try {
        const fields = [
            'displayName',
            'rating',
            'userRatingCount',
            'googleMapsUri',
            'reviews',
        ].join(',');

        const url = new URL(`${GOOGLE_PLACES_BASE_URL}/${placeId}`);
        url.searchParams.set('languageCode', 'es');

        const response = await fetch(url, {
            headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': fields,
            },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error('Error de Google Places:', data);
            return res.status(response.status).json({
                ...fallbackResponse,
                configured: true,
                message: 'No se pudieron obtener las resenas de Google.',
            });
        }

        res.json({
            source: 'google',
            configured: true,
            placeName: data.displayName?.text || 'SH-BARBER',
            rating: data.rating || null,
            totalReviews: data.userRatingCount || null,
            googleMapsUri: data.googleMapsUri || null,
            reviews: Array.isArray(data.reviews) ? data.reviews.map(normalizeReview) : [],
        });
    } catch (error) {
        console.error('Error al obtener resenas de Google:', error);
        res.status(500).json({
            ...fallbackResponse,
            configured: true,
            message: 'Error al obtener las resenas de Google.',
        });
    }
};

module.exports = {
    obtenerResenasGoogle,
};
