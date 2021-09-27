
function is_visible(obj){
    return obj.phi < 0;
}


// transformer les coordonnées dans current_pos en alt_az
function to_alt_az(obj){    
    var xyz = spheric_to_cartesian(obj);
    
    var alt_az = {};    
    
    alt_az["alt"] = arcsin(xyz.y * (-1));
    
    var hyp = hypotenuse(xyz.x, xyz.z);
    var az = arccos(xyz.z / hyp);
    alt_az["az"] = xyz.x >= 0 ? az : 360 - az;
    
    return alt_az;
}



var found_target_type = "";
function find_target(str){
    
    if(!str){
        found_target_type = "";
        return null;
    }
    
    str = str.toLowerCase();
    
    if(str == "moon"){
        found_target_type = "solar";
        return current_solars_pos["The Moon"];
    }else if(str == "sun"){
        found_target_type = "solar";
        return current_solars_pos["The Sun"];
    }else{
        for (var index in current_solars_pos){
            if(index.toLowerCase() == str){
                found_target_type = "solar";
                return current_solars_pos[index];
            }
        }
        
        for(var index in current_stars_pos){
            if((stars_data.proper[index] && stars_data.proper[index].toLowerCase() == str) ||
               (stars_data.gl[index] && stars_data.gl[index].toLowerCase() == str) ||
               (stars_data.bf[index] && stars_data.bf[index].toLowerCase() == str)) {
                found_target_type = "star";
                return current_stars_pos[index];       
            }
        }
        
        found_target_type = "";
        return null;
    }
}


function move_to_target(target){
    
    var alt_az = to_alt_az(target);
    alt_az.alt = alt_az.alt < 25 ? 25 : alt_az.alt;
    
    set_input_azimuth(alt_az.az);
    set_input_altitude(alt_az.alt);
    
    updateSkyView();
}

function find_action(){
    var str = g("search_input").value;
	str = str.trim();
    var resultat = find_target(str);
    
    if(found_target_type == "star"){
        if(is_visible(resultat)){
            move_to_target(resultat);
            displayStarInfo(resultat.index); 
        }else{
            displayError("This object is currently below the horizon!");
        }               
    }else if(found_target_type == "solar"){
        if(is_visible(resultat)){
            move_to_target(resultat);
            displaySolarInfo(resultat.index);
        }else{
            displayError("This object is currently below the horizon!");
        }        
    }else{
        displayError("No result found!");
    }
}




