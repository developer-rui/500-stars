
function rad_to_deg(rad) {
    return rad / Math.PI * 180;
}

function deg_to_rad(deg) {
    return deg / 180 * Math.PI;
}


function sin(angle) {
    return Math.sin(deg_to_rad(angle));
}

function cos(angle) {
    return Math.cos(deg_to_rad(angle));
}

function tan(angle) {
    return Math.tan(deg_to_rad(angle));
}


function arcsin(r) {
    return rad_to_deg(Math.asin(r));
}

function arccos(r) {
    return rad_to_deg(Math.acos(r));
}

function arctan(r) {
    return rad_to_deg(Math.atan(r));
}


function hypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
}



function spheric_to_cartesian(star) {
    return {
        index: star.index,
        z: cos(star.phi) * cos(star.theta),
        x: cos(star.phi) * sin(star.theta),
        y: sin(star.phi)
    };
}

function cartesian_to_spheric(star) {
    var d_ = hypotenuse(star.x, star.z);
    var d = hypotenuse(star.y, d_);

    // retrouver le theta en fonction de l'orientation:
    var theta = arccos(star.z / d_);
    if (star.x < 0) {
        theta = 360 - theta;
    }

    return {
        index: star.index,
        theta: theta,
        phi: arccos(d_ / d) * (star.y >= 0 ? 1 : -1)
    };
}

function swap_axis(star) {
    return {
        index: star.index,
        x: star.y,
        y: star.x * -1,
        z: star.z
    };
}

function back_swap_axis(star) {
    return {
        index: star.index,
        x: star.y * -1,
        y: star.x,
        z: star.z
    };
}


function rotate_horizontal(star, angle) {

    // faire la rotation et normaliser l'angle au besoin
    var new_theta = star.theta + angle;
    while (new_theta > 360) {
        new_theta -= 360;
    }
    while (new_theta < 0) {
        new_theta += 360;
    }

    return {
        index: star.index,
        theta: new_theta,
        phi: star.phi
    };
}

function rotate_vertical(star, angle) {

    // transformer les coordonnées
    var cartesian = spheric_to_cartesian(star);
    var cartesian_swapped = swap_axis(cartesian);
    var spheric_swapped = cartesian_to_spheric(cartesian_swapped);

    // rotation
    var spheric_rotated = rotate_horizontal(spheric_swapped, angle);

    // backtransform
    var cartesian2 = spheric_to_cartesian(spheric_rotated);
    var cartesian_back = back_swap_axis(cartesian2);
    return cartesian_to_spheric(cartesian_back);
}


function rotate_horizontal_all(stars, angle) {
    var rotated = {};
    //for (var i = 1; i <= 498; i++) {
    for (var i in stars) {
        rotated[i] = rotate_horizontal(stars[i], angle);
    }
    return rotated;
}

function rotate_vertical_all(stars, angle) {
    var rotated = {};
    //for (var i = 1; i <= 498; i++) {
    for (var i in stars) {
        rotated[i] = rotate_vertical(stars[i], angle);
    }
    return rotated;
}





