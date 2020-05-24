/**
 * Adiciona zeros para deixar um número com um tamanho pré-definido.
 * @ex: LeftPadWithZeros(5, 3) --> '005'
 **/
function LeftPadWithZeros(number, length)
{
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}

const Utils = {};

Utils.LeftPadWithZeros = LeftPadWithZeros;



module.exports = Utils;