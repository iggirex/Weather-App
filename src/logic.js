
function kelvinToFar(kelvin){
    return Number((((9/5)*(kelvin - 273.15) + 32).toFixed(0)));
}

function mmRaintoInches(mm){
    return mm / 25.4;
}

exports._test = {
    kelvinToFar: kelvinToFar,
    mmRaintoInches: mmRaintoInches
}
