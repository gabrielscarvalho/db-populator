

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


    string(prefix, length = 5) {
        return () => prefix + '' + Math.random().toString(20).substr(2, length)
    }

    /**
     * Receives the arguments and make it random.
     * Accepts list of simple values and simple variables as string or int.
     * 
     * @example Random.fromList(['john','mary'], '::fixed-value::', ['other', 'list', 'to','apply','random'])
     * // will return 'mary::fixed-value::to'
    */
    fromList() {
        
        const variables = [];
        for(const arg in arguments){
            variables.push(arguments[arg]);
        }
        
        return () => {
            let result = '';
            variables.forEach(param => {
                if(Array.isArray(param)) {
                    result = result +param[Math.floor(Math.random() * param.length)];
                } 
                if(typeof param != 'object') {
                    result = result + param;
                }
            });
            return result;
        }
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


    date({ minYear = 2000, maxYear = 2050, minMonth = 0, maxMonth = 11, minDay=1, maxDay=28 }) {

        return () => {

            let year = this.number({ min: minYear, max: maxYear, decimals: 0 })();
            let month = this.number({ min: minMonth, max: maxMonth, decimals: 0 })();
            let day = this.number({ min: minDay, max: maxDay, decimals: 0 })();

            let hour = this.number({ min: 0, max: 23, decimals: 0 })();
            let minute = this.number({ min: 0, max: 59, decimals: 0 })();
            let second = this.number({ min: 0, max: 59, decimals: 0 })();
            return new Date(year, month, day, hour, minute, second, 0);
        }
    }


    dateWithSpecific({ year = null, month = null, day = null, hour = null, minute = null, seconds = null}) {
        
        const y = year;
        const m = month;
        const d = day;
        const h = hour;
        const min = minute;
        const sec = seconds;
        
        return () => {

            const genDate = this.date({})();

            let year = y != null ? y : genDate.getFullYear();
            let month = m != null  ? (m-1) : genDate.getMonth();
            let day = d != null  ? d : genDate.getDate();
            let hour = h != null  ? h : genDate.getHours();
            let minute = min != null  ? min : genDate.getMinutes();
            let seconds = sec != null  ? sec : genDate.getSeconds();

            return new Date(year, month, day, hour, minute, seconds, 0);
        }
    }

}




module.exports = new Random();