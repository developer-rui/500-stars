/*
    Attention, la fonction get_geolocation_coordinates est appelé et exécutée de façon 
    asynchrone, c'est-à-dire que get_geolocation() termine son exécution avant même que 
    get_geolocation_coordinates() finit!
*/

function use_geolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocation_action, geolocation_error);       
    }else{
        show_geolocation_error("Geolocation is not supported by this browser.");
    }
}

function geolocation_error(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            show_geolocation_error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            show_geolocation_error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            show_geolocation_error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            show_geolocation_error("An unknown error occurred.");
            break;
    }
}


/*
    Fonction custom à redéfinir au besoin
*/
function geolocation_action(position) {
    accept_coordinates(position.coords.longitude, position.coords.latitude);                           
}
