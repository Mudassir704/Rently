import http from "./httpService";

export function bookRental( userId, movieId){
    return http.post('/rentals', {userId, movieId});
}

export function getRentals(){
    return http.get('/rentals');
}

export function deleteRent(rentalId) {
    return http.delete('/rentals/' + rentalId); 
}

export function saveRental(rental) {
    const body = {...rental};
    delete body._id;
    return http.put('/rentals/' + rental._id, body); 
} 

export function returnRentals(movieId, userId) {
    return http.post('/returns', { userId, movieId}); 
}