function translate_constellation(symbol) {
    var dict = {
        And: "Andromeda (Chained Maiden)",
        Ant: "Antlia (Air Pump)",
        Aps: "Apus (Bird of Paradise)",
        Aqr: "Aquarius (Water Bearer)",
        Aql: "Aquila (Eagle)",
        Ara: "Ara (Altar)",
        Ari: "Aries (Ram)",
        Aur: "Auriga (Charioteer)",
        Boo: "Boötes (Herdsman)",
        Cae: "Caelum (Engraving Tool)",
        Cam: "Camelopardalis (Giraffe)",
        Cnc: "Cancer (Crab)",
        CVn: "Canes Venatici (Hunting Dogs)",
        CMa: "Canis Major (Great Dog)",
        CMi: "Canis Minor (Lesser Dog)",
        Cap: "Capricornus (Sea Goat)",
        Car: "Carina (Keel)",
        Cas: "Cassiopeia (Seated Queen)",
        Cen: "Centaurus (Centaur)",
        Cep: "Cepheus (King)",
        Cet: "Cetus (Sea Monster)",
        Cha: "Chamaeleon (Chameleon)",
        Cir: "Circinus (Compass)",
        Col: "Columba (Dove)",
        Com: "Coma Berenices (Berenice's Hair)",
        CrA: "Corona Australis (Southern Crown)",
        CrB: "Corona Borealis (Northern Crown)",
        Crv: "Corvus (Crow)",
        Crt: "Crater (Cup)",
        Cru: "Crux (Southern Cross)",
        Cyg: "Cygnus (Swan)",
        Del: "Delphinus (Dolphin)",
        Dor: "Dorado (Dolphinfish)",
        Dra: "Draco (Dragon)",
        Eql: "Equuleus (Little Horse)",
        Eri: "Eridanus (River)",
        For: "Fornax (Furnace)",
        Gem: "Gemini (Twins)",
        Gru: "Grus (Crane)",
        Her: "Hercules (Hercules)",
        Hor: "Horologium (Clock)",
        Hya: "Hydra (Water Snake)",
        Hyi: "Hydrus (Snake)",
        Ind: "Indus (Indian)",
        Lac: "Lacerta (Lizard)",
        Leo: "Leo (Lion)",
        LMi: "Leo Minor (Lesser Lion)",
        Lep: "Lepus (Hare)",
        Lib: "Libra (Scales)",
        Lup: "Lupus (Wolf)",
        Lyn: "Lynx (Lynx)",
        Lyr: "Lyra (Lyre)",
        Men: "Mensa (Table)",
        Mic: "Microscopium (Microscope)",
        Mon: "Monoceros (Unicorn)",
        Mus: "Musca (Fly)",
        Nor: "Norma (Carpenter's Square)",
        Oct: "Octans (Octant)",
        Oph: "Ophiuchus (Serpent Bearer)",
        Ori: "Orion (Hunter)",
        Pav: "Pavo (Peacock)",
        Peg: "Pegasus (Winged Horse)",
        Per: "Perseus (Hero)",
        Phe: "Phoenix (Phoenix)",
        Pic: "Pictor (Painter)",
        Psc: "Pisces (Fishes)",
        PsA: "Piscis Austrinus (Southern Fish)",
        Pup: "Puppis (Stern)",
        Pyx: "Pyxis (Magnetic Compass)",
        Ret: "Reticulum (Reticle)",
        Sge: "Sagitta (Arrow)",
        Sgr: "Sagittarius (Archer)",
        Sco: "Scorpius (Scorpion)",
        Scl: "Sculptor (Sculptor)",
        Sct: "Scutum (Shield)",
        Ser: "Serpens (Serpent)",
        Sex: "Sextans (Sextant)",
        Tau: "Taurus (Bull)",
        Tel: "Telescopium (Telescope)",
        Tri: "Triangulum (Triangle)",
        TrA: "Triangulum Australe (Southern Triangle)",
        Tuc: "Tucana (Toucan)",
        UMa: "Ursa Major (Great Bear)",
        UMi: "Ursa Minor (Lesser Bear)",
        Vel: "Vela (Sails)",
        Vir: "Virgo (Maiden)",
        Vol: "Volans (Flying Fish)",
        Vul: "Vulpecula (Fox)"
    };

    return dict.hasOwnProperty(symbol) ? dict[symbol] : null;
}





var current_displayed_infotable = null;
var stars_infotable = g("infotable");
var solars_infotable = g("solar_infotable");

stars_infotable.remove();
solars_infotable.remove();



function getStarTitle(star_index) {
    var name = stars_data.proper[star_index];
    var symbol1 = stars_data.gl[star_index];
    var symbol2 = stars_data.bf[star_index];

    if (name) {
        if (symbol1) {
            return name + " (" + symbol1 + ")";
        } else if (symbol2) {
            return name + " (" + symbol2 + ")";
        } else {
            return name;
        }
    } else {
        if (symbol1) {
            return symbol1;
        } else if (symbol2) {
            return symbol2;
        } else {
            return "Unnamed star";
        }
    }
}


function displayStarInfo(star_index) {
    

    // On envlève la table pour pouvoir la remettre à l'endroit approprié
    if(current_displayed_infotable){
        current_displayed_infotable.remove();   
    }    
    
    // déterminer la table actuelle
    current_displayed_infotable = stars_infotable;

    // On met la table dans le conteneur approprié en fonction de la largeur de l'écran
    if (window.innerWidth >= 992) {
        g("infopane_bigscreen").appendChild(current_displayed_infotable);
    } else {
        g("infopane_smallscreen").appendChild(current_displayed_infotable);
    }

    // On met à jour les informations:
        // titre            
        g("infotable_title").innerHTML = getStarTitle(star_index);
        // distance
        g("infotable_dist").innerHTML = parseFloat(stars_data.dist_ly[star_index]) < 326156 ?
            keepNbDecimals(stars_data.dist_ly[star_index], 2) : "unknown";
        // ascension droite
        g("infotable_rasc").innerHTML = keepNbDecimals(stars_data.rasc[star_index], 2);
        // déclinaison
        g("infotable_dec").innerHTML = keepNbDecimals(stars_data.dec[star_index], 2);
        // magnitude apparente
        g("infotable_mag").innerHTML = keepNbDecimals(stars_data.mag[star_index], 2);
        // luminosité intrinsèque
        g("infotable_lum").innerHTML = keepNbDecimals(stars_data.lum[star_index], 2);
        // constellation
        var constellation = translate_constellation(stars_data.con[star_index]);
        g("infotable_con").innerHTML = constellation ? constellation : stars_data.con[star_index];
    

}


function displaySolarInfo(index){
    
    // On envlève la table pour pouvoir la remettre à l'endroit approprié
    if(current_displayed_infotable){
        current_displayed_infotable.remove();   
    }   
    
    // déterminer la table actuelle
    current_displayed_infotable = solars_infotable;

    // On met la table dans le conteneur approprié en fonction de la largeur de l'écran
    if (window.innerWidth >= 992) {
        g("infopane_bigscreen").appendChild(current_displayed_infotable);
    } else {
        g("infopane_smallscreen").appendChild(current_displayed_infotable);
    }
    
    // On met à jour les informations:
        // titre            
        g("solar_infotable_title").innerHTML = index;
        // rasc         
        g("solar_infotable_rasc").innerHTML = keepNbDecimals(solars_data[index]["rasc"], 2);
        // dec         
        g("solar_infotable_dec").innerHTML = keepNbDecimals(solars_data[index]["dec"], 2);
        // mag           
        g("solar_infotable_mag").innerHTML = solars_data[index]["mag"];
        // image           
        //g("solar_infotable_img").src = "../images/" + index + ".jpg";
        g("solar_infotable_img").src = "../../static/images/" + index + ".jpg";        
       
}


function displayError(msg){
    if(current_displayed_infotable){
        current_displayed_infotable.remove();   
    }

    current_displayed_infotable = document.createElement('h4');
    current_displayed_infotable.innerHTML = msg;
    current_displayed_infotable.className = "px-2 mb-4";

    if (window.innerWidth >= 992) {
        g("infopane_bigscreen").appendChild(current_displayed_infotable);
    } else {
        g("infopane_smallscreen").appendChild(current_displayed_infotable);
    }
}

var search_form = g("search_form");
if (window.innerWidth >= 992) {
    search_form.remove();
    g("infopane_bigscreen").appendChild(search_form);
} 

window.addEventListener("resize", () => { // re-display quand l'écran resize        
    search_form.remove();
    if(current_displayed_infotable){
        current_displayed_infotable.remove();
    }

    if (window.innerWidth >= 992) {
        g("infopane_bigscreen").appendChild(search_form);
        if(current_displayed_infotable){
            g("infopane_bigscreen").appendChild(current_displayed_infotable);
        }
    } else {
        g("infopane_smallscreen").appendChild(search_form);
        if(current_displayed_infotable){
            g("infopane_smallscreen").appendChild(current_displayed_infotable);
        }
    }        
});

