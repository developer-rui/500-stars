
function get_solar_xyz_to_moon(){
    
    //Position de la lune
    var theta_moon = live_solars_pos["The Moon"]["theta"];
    var phi_moon = live_solars_pos["The Moon"]["phi"];
    
    /*(theta_moon <= 360 && theta_moon >= 335){
        theta_moon -= 360;
    }*/
    
//alert(theta_moon + " __ " + phi_moon);
//alert(live_solars_pos["The Sun"]["theta"] + " __ " + live_solars_pos["The Sun"]["phi"]);

    // Obtenir la position du Soleil quand la lune est centrée  
    var sun_after_h_move = rotate_horizontal(live_solars_pos["The Sun"], theta_moon * (-1));
//alert(sun_after_h_move["theta"] + " __ " + sun_after_h_move["phi"]);
    var sun_after_v_move = rotate_vertical(sun_after_h_move, phi_moon * (-1));
//alert(sun_after_v_move["theta"] + " __ " + sun_after_v_move["phi"]);
//var aa = spheric_to_cartesian(sun_after_v_move);
//alert(aa["x"] + " __ " + aa["y"] + " __ " + aa["z"]);

    // retourner cette position transformée en cartesian
    return spheric_to_cartesian(sun_after_v_move);
}


function get_mooncrescent_size(z){			
	var size = Math.floor(arccos(z) / (180 / 7));		
	size = size > 6 ? 6 : size;
	return size;
}

function get_moon_orientation(x, y){	
    if(x == 0){
        if(y >= 0){
            return 180;
        }else{
            return 0;
        }
    }else if(x < 0){				
        return arctan(y / Math.abs(x)) * (-1) + 270;
    }else if(x > 0){
        return arctan(y / x) + 90;        
    }
}


