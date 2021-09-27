
// !! Il faut s'assurer que element.style.opacity soit défini pour que ces deux foncitons marchent!
// ** Ça doit être défini en JS et non en CSS!

function shadeIn(element, interval){    
    if(parseFloat(element.style.opacity) < 1){
        element.style.opacity = parseFloat(element.style.opacity) + 0.01;
        setTimeout(() => {
            shadeIn(element, interval);
        }, interval/100);
    }    
}

function shadeOut(element, interval){    
    if(parseFloat(element.style.opacity) > 0){
        element.style.opacity = parseFloat(element.style.opacity) - 0.01;
        setTimeout(() => {
            shadeOut(element, interval);
        }, interval/100);
    }    
}