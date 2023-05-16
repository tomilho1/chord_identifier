let um = new Map();
um.set(0,"")
um.set(1,"um")
um.set(2,"dois")
um.set(3,"três")
um.set(4,"quatro")
um.set(5,"cinco")
um.set(6,"seis")
um.set(7,"sete")
um.set(8,"oito")
um.set(9,"nove")

um.set(10,"dez")
um.set(11,"onze")
um.set(12,"doze")
um.set(13,"treze")
um.set(14,"catorze")
um.set(15,"quinze")
um.set(16,"dezesseis")
um.set(17,"dezessete")
um.set(18,"dezoito")
um.set(19,"dezenove")

let dois = new Map();
dois.set(2,"vinte")
dois.set(3,"trinta")
dois.set(4,"quarenta")
dois.set(5,"cinquenta")
dois.set(6,"sessenta")
dois.set(7,"setenta")
dois.set(8,"oitenta")
dois.set(9,"noventa")

let tres = new Map();
tres.set(1,"cento")
tres.set(2,"duzentos")
tres.set(3,"trezentos")
tres.set(4,"quatrocentos")
tres.set(5,"quinhentos")
tres.set(6,"seiscentos")
tres.set(7,"setecentos")
tres.set(8,"oitocentos")
tres.set(9,"novecentos")

let nb = 9900002

function umDigito(number) {
    return um.get(number)
}

function doisDigitos(number) {
    if (number < 20) {return um.get(number)}
    
    dezena = number.toString().slice(0,1)
    unidade = number.toString().slice(1,2)

    if (+unidade === 0) return dois.get(+dezena)

    return `${dois.get(+dezena)} e ${umDigito(+unidade)}`
}

function tresDigitos(number) {
    if (+number === 100) {return "cem"}

    centena = number.toString().slice(0,1)
    dezena = number.toString().slice(1,3)

    return `${tres.get(+centena)} e ${extenso(+dezena)}`
}

function quatroDigitos(number) {
    if (+number === 1000) {return "mil"}

    milhar = number.toString().slice(0,1)
    centena = number.toString().slice(1,4)

    if (+milhar === 1) return `mil ${extenso(+centena)}`
    return `${um.get(+milhar)} mil ${extenso(+centena)}`
}

function cincoDigitos(number) {
    decimilhar = number.toString().slice(0,2)
    resto = number.toString().slice(2,5)

    return `${extenso(+decimilhar)} mil e ${extenso(+resto)}`
}

function seisDigitos(number) {
    centimilhar = number.toString().slice(0,3)
    resto = number.toString().slice(3,6)

    return `${extenso(+centimilhar)} mil e ${extenso(+resto)}`
}

function seteDigitos(number) {

    milhão = number.toString().slice(0,1)
    resto = number.toString().slice(1,7)

    if (+milhão === 1) {
    return `um milhão e ${extenso(+resto)}`}
    else {return `${extenso(+milhão)} milhões e ${extenso(+resto)}`}
}

function oitoDigitos(number) {

    milhão = number.toString().slice(0,2)
    resto = number.toString().slice(2,8)

    return `${extenso(+milhão)} milhões e ${extenso(+resto)}`
}

function noveDigitos(number) {

    milhão = number.toString().slice(0,3)
    resto = number.toString().slice(3,9)

    return `${extenso(+milhão)} milhões e ${extenso(+resto)}`
}


function extenso(my_number) {
switch (my_number.toString().length) {
    case 1:
        return(umDigito(my_number))
    case 2:
        return(doisDigitos(my_number))
    case 3:
        return(tresDigitos(my_number))
    case 4:
        return(quatroDigitos(my_number))
    case 5:
        return(cincoDigitos(my_number))
    case 6:
        return(seisDigitos(my_number))
    case 7:
        return(seteDigitos(my_number))
    case 8:
        return(oitoDigitos(my_number))
    case 9:
        return(noveDigitos(my_number))
}
}

console.log(extenso(nb))