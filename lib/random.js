

/**
 * Adiciona zeros para deixar um número com um tamanho pré-definido.
 * @ex: LeftPadWithZeros(5, 3) --> '005'
 **/
function LeftPadWithZeros(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}



/**
 * Based in the type of the field, parse it to you, to create your insert.
*/
class Random {

    fromList(things) {
        return () => (things[Math.floor(Math.random() * things.length)]);
    }

    fromDoubleList(things1, things2) {
        return () => this.fromList(things1)() + this.fromList(things2)();
    }


    number({ min, max, decimals = 0 }) {
        return () => {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;

            if (decimals && decimals > 0) {
                let decimalValue = parseFloat("0." + Math.floor(Math.pow(10, decimals - 1) + Math.random() * 9 * Math.pow(10, decimals - 1)));
                return number + decimalValue;
            }
            return number;
        }
    }


    date({ minYear = 2000, maxYear = 2050, minMonth = 1, maxMonth = 12, addTime = false }) {

        return () => {

            let year = this.number({ min: minYear, max: maxYear, decimals: 0 })();
            let month = this.number({ min: minMonth, max: maxMonth, decimals: 0 })();
            let day = this.number({ min: 1, max: 28, decimals: 0 })();

            if (addTime) {
                let hour = this.number({ min: 0, max: 23, decimals: 0 })();
                let minute = this.number({ min: 0, max: 59, decimals: 0 })();
                let second = this.number({ min: 0, max: 59, decimals: 0 })();
                return new Date(year, month, day, hour, minute, second, 0);
            }

            return new Date(year, month, day);
        }
    }



}




module.exports = new Random();