function g(id) {
    return document.getElementById(id);
}

function keepNbDecimals(number, nbDecimals) {
    return parseFloat(number).toFixed(nbDecimals);
}

function get_url_params(){
    var params = {};
    
    var p = window.location.href.split("?");
    if(p.length == 2){
        p = p[1].split("&");
        for(var i=0; i<p.length; i++){
            var pair = p[i].split("=");
            if(pair.length == 2){
                params[pair[0]] = pair[1];
            }
        }
    }
        
    return params;
         
}

function in_screen(element){
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
}

