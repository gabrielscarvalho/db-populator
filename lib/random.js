const ChanceClass = require('chance');
const _ = require('lodash');
const chance = new ChanceClass();


/**
 * Based in the type of the field, parse it to you, to create your insert.
*/
class Random {


    string(prefix, length = 5) {
        return () => prefix + '' + chance.string({ length });
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
        for (const arg in arguments) {
            variables.push(arguments[arg]);
        }

        return () => {
            let result = '';
            variables.forEach(param => {
                if (_.isArray(param)) {
                    result =  result + chance.pickone(param);
                }
                if (!_.isObject(param)) {
                    result = result + param;
                }
            });
            return result;
        }
    }


    number({ min = 0, max = 10000, decimals = 0 }) {
        return () => {
            if (decimals && decimals > 0) {
                return chance.floating({ min, max, fixed: decimals });
            }

            return chance.integer({ min, max });
        }
    }


    date({ minYear = 2000, maxYear = 2050, minMonth = 1, maxMonth = 12, minDay = 1, maxDay = 28 }) {


        minMonth = minMonth - 1;
        maxMonth = maxMonth - 1;

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


    dateWithSpecific({ year = null, month = null, day = null, hour = null, minute = null, seconds = null }) {

        const y = year;
        const m = month;
        const d = day;
        const h = hour;
        const min = minute;
        const sec = seconds;

        return () => {

            const genDate = this.date({})();

            let year = y != null ? y : genDate.getFullYear();
            let month = m != null ? (m - 1) : genDate.getMonth();
            let day = d != null ? d : genDate.getDate();
            let hour = h != null ? h : genDate.getHours();
            let minute = min != null ? min : genDate.getMinutes();
            let seconds = sec != null ? sec : genDate.getSeconds();

            return new Date(year, month, day, hour, minute, seconds, 0);
        }
    }

    /**
     * Returns a random email
     * @see docs https://chancejs.com/text/word.html
    */
    word(options = { syllables: 3 }) {
        return () => {
            return chance.word(options);
        }
    }

    /**
     * Returns a random email
     * @see docs https://chancejs.com/web/email.html
    */
    email(options = {}) {
        return () => {
            return chance.email(options);
        }
    }

    /**
     * Returns a random guid
     * @see docs https://chancejs.com/miscellaneous/guid.html
    */
    guid(options = {}) {
        return () => {
            return chance.guid(options);
        }
    }

    /**
    * Returns a random hash
    * @see docs https://chancejs.com/miscellaneous/hash.html
   */
    hash(options = {}) {
        return () => {
            return chance.hash(options);
        }
    }

    /**
    * Returns a random char
    * @see docs https://chancejs.com/miscellaneous/hash.html
   */
    char(options = { alpha: true }) {
        return () => {
            return chance.char(options);
        }
    }

    /**
    * Returns a random cpf
    * @see docs https://chancejs.com/person/cpf.html
   */
    cpf() {
        return () => {
            return chance.cpf();
        }
    }

    /**
    * Returns a random char
    * @see docs https://chancejs.com/person/name.html
   */
    name(options = { nationality: 'en' }) {
        return () => {
            return chance.name(options);
        }
    }


    /**
    * Returns a random char
    * @see docs https://chancejs.com/person/last.html
   */
    lastName(options = { nationality: 'en' }) {
        return () => {
            return chance.last(options);
        }
    }


    /**
    * Returns a random char
    * @see docs https://chancejs.com/web/url.html
   */
    url(options = {}) {
        return () => {
            return chance.url(options);
        }
    }


}




module.exports = new Random();