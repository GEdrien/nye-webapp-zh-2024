import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  let finalResult : SearchResults = {
    total: 0,
    movies: []
  };

    try {
      const movies = await MovieService.getMovies();
      
      let byQuery = new Array<Movie>;
      const query = (params.query != undefined) ? params.query.toLowerCase() : "";
      if(query) {
        movies.forEach((movie) => {
          if(movie.title.toLowerCase().indexOf(query) > -1 ||
              movie.overview.toLowerCase().indexOf(query) > -1) {
            byQuery.push(movie);
          }
        })
      } else {
        byQuery = movies;
      }      

      // Traits

      const order = params.orderBy ? params.orderBy : "title";
      const direction = params.direction ? params.direction : "ASC";
      if(order){
        byQuery.sort((movie1: Movie, movie2: Movie) => {
          let sortResult = 0;
          if(order == "title") {
            sortResult = movie1.title.localeCompare(movie2.title);
          } else if (order == "vote_average"){
            const movie1Vote = movie1.vote_average ? movie1.vote_average : 0;
            const movie2Vote = movie2.vote_average ? movie2.vote_average : 0;
            sortResult = movie1Vote - movie2Vote;
          } else if (order == "release_date"){
            const movie1Date = movie1.release_date ? movie1.release_date : new Date();
            const movie2Date = movie2.release_date ? movie2.release_date : new Date();
            movie1Date > movie2Date ? sortResult = 1 : sortResult = -1;
          }
          return direction === 'ASC' ? sortResult : -sortResult;
        });
      }
      
      finalResult.total = byQuery.length;

      const limit = params.limit ? params.limit : 12;
      const offset = params.offset ? params.offset : 0;
      const actualLimit = offset + limit;
      
      finalResult.movies = byQuery.slice(offset, actualLimit);

      return finalResult;

    } catch (error) {
      console.log('Error fetching movies:', error);
      finalResult.total = 0;
      finalResult.movies = [];
      return finalResult;
    }
};
