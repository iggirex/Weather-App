
function kelvinToFar(kelvin){
    if(isNaN(kelvin)){ return "Must input a number type for temperature";}
    return Number((((9/5)*(kelvin - 273.15) + 32).toFixed(0)));
}

function mmRaintoInches(mm){
    if(mm < 0){ return "Can't accept negative millimeters of rain";}
    if(isNaN(mm)){ return "Must input a number type for millimeters of rain";}
    return Number((mm / 25.4).toFixed(2));
}

exports._test = {
    kelvinToFar: kelvinToFar,
    mmRaintoInches: mmRaintoInches,
};
