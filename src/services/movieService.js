import http from './httpService';


export function getMovies() {
    return http.get('/movies'); 
} 

export function getMovie(movieId) {
    return http.get('/movies/' + movieId); 
}

export function saveMovie(movie) {
    if(movie._id){
        const body = {...movie};
        delete body._id;
        return http.put('/movies/' + movie._id, body); 
    } 
    return http.post('/movies', movie); 
} 


export function deleteMovie(movieId) {
    return http.delete('/movies/' + movieId); 
}