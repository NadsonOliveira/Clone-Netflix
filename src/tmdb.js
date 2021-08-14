const API_kEY = '2c4f461ef18ae746d444afec7b7e11bd';
const API_BASE = 'https://api.themoviedb.org/3';

/*
-originais da netflix
-recomendados (trending)
-em alta(top rated)
-ação
-comédia
-terror
-anime
-romance
*/
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}
export default {
    getHomeList: async () => {
        return [

            {
                slug: 'trending',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_kEY}`)
            },

            {
                slug: 'Action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_kEY}`)
            },
            {
                slug: 'Comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_kEY}`)
            },
            {
                slug: 'Horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_kEY}`)
            },

            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_kEY}`)
            },
            {
                slug: 'documantary',
                title: 'Documentario',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_kEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_kEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_kEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }
        return info;
    }

}
