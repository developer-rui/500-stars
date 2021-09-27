
function validate_input_longitude(val){
    val = parseFloat(val);
    
    // Si pas un nombre: = 0
    if(isNaN(val)){
        val = 0;        
    }
    
    
    // Contrôler les valeurs pour être dans l'intervalle permis
    if (val > 180) {
        val = 180;        
    } else if (val < -180) {
        val = -180;        
    }   
    
    return val;
}

function validate_input_latitude(val){
    val = parseFloat(val);
    
    // Si pas un nombre: = 0
    if(isNaN(val)){
        val = 0;        
    }
    
    // Contrôler les valeurs pour être dans l'intervalle permis
    if (val > 90) {
        val = 90;        
    } else if (val < -90) {
        val = -90;        
    }
    
    return val;
}

function validate_input_azimuth(val){
    val = parseFloat(val);
    
    
    if (val > 360) {
        val = 360;
    } else if (val < 0) {
        val = 0;
    }
    
    return val;
}

function validate_input_altitude(val){
    val = parseFloat(val);
    
    if (val > 90) {
        val = 90;
    } else if (val < 25) {
        val = 25;
    }
    
    return val;
}


function get_input_longitude() {
    // Récupérer l'input
    var val = parseFloat(g("input_longitude").value);
    var vali = validate_input_longitude(val);
    
    // mettre à jour l'input si erreur
    if(val !== vali){ set_input_longitude(vali); }
    
    return vali; // entre [0, 360]
}

function get_input_latitude() {
    // Récupérer l'input
    var val = parseFloat(g("input_latitude").value);
    var vali = validate_input_latitude(val);
    
    // mettre à jour l'input si erreur
    if(val !== vali){ set_input_latitude(vali); }
    
    return vali; // entre [-90, 90]
}

function get_input_azimuth() {
    var val = parseFloat(g("input_azimuth").value);
    var vali = validate_input_azimuth(val);
    
    // mettre à jour l'input si erreur
    if(val !== vali){ set_input_azimuth(vali); }    
    
    return vali; // entre [0, 360]
}

function get_input_altitude() {
    var val = parseFloat(g("input_altitude").value);
    var vali = validate_input_altitude(val);
    
    // mettre à jour l'input si erreur
    if(val !== vali){ set_input_altitude(vali); }    
    
    return vali; // entre [25, 90]
}


function set_input_longitude(val){   
    g("input_longitude").value = validate_input_longitude(val);
}

function set_input_latitude(val){
    g("input_latitude").value = validate_input_latitude(val);
}

function set_input_azimuth(val){
    val = validate_input_azimuth(val);  val = keepNbDecimals(val, 2);    
    g("input_azimuth").value = val;
    g("value_azimuth").innerHTML = val;
}

function set_input_altitude(val){   
    val = validate_input_altitude(val); val = keepNbDecimals(val, 2);    
    g("input_altitude").value = val;
    g("value_altitude").innerHTML = val;
}


function reset_map_inputs(){
    var url_infos = get_url_params();
    
    url_infos.hasOwnProperty("longitude") ? set_input_longitude(url_infos["longitude"]) :
                                            set_input_longitude(0);
    url_infos.hasOwnProperty("latitude") ? set_input_latitude(url_infos["latitude"]) :
                                            set_input_latitude(0);
    url_infos.hasOwnProperty("azimuth") ? set_input_azimuth(url_infos["azimuth"]) :
                                            set_input_azimuth(0);
    url_infos.hasOwnProperty("altitude") ? set_input_altitude(url_infos["altitude"]) :
                                            set_input_altitude(0);                                       
}

reset_map_inputs();

















