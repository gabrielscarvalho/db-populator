import { Chance } from 'chance';
import { iValueGenerator } from '../../interfaces';
const chance = new Chance();

export class Random {

  public static Number(min: number = 0, max: number = 999, decimals: number = 5): iValueGenerator {
    return () => {
      if (decimals && decimals > 0) {
        return chance.floating({ min, max, fixed: decimals });
      }
      return chance.integer({ min, max });
    }
  }

  public static String(prefix, length = 5): iValueGenerator {
    return () => prefix + '' + chance.string({ length, alpha: true });
  }


  /**
     * Returns a random word
     * @see docs https://chancejs.com/text/bool.html
    */
   public static Boolean(options: object = { likelihood: 50 }): iValueGenerator {
    return () => {
      return chance.bool(options);
    }
  }


  /**
  * Returns a random char
  * @see docs https://chancejs.com/person/name.html
  */
  public static Name(options: object = { nationality: 'en' }): iValueGenerator {
    return () => {
      return chance.name(options);
    }
  }

  /**
    * Returns a random char
    * @see docs https://chancejs.com/person/last.html
    */
  public static LastName(options: object = { nationality: 'en' }): iValueGenerator {
    return () => {
      return chance.last(options);
    }
  }



  /**
    * Returns a random email
    * @see docs https://chancejs.com/web/email.html
   */
  public static Email(options: object = {}): iValueGenerator {
    return () => {
      return chance.email(options);
    }
  }


  /**
     * Returns a random word
     * @see docs https://chancejs.com/text/word.html
    */
  public static Word(options: object = { syllables: 3 }): iValueGenerator {
    return () => {
      return chance.word(options);
    }
  }


  /**
    * Returns a random word
    * @see docs https://chancejs.com/text/word.html
    */
  public static Sentence(options: object = { words: 3 }): iValueGenerator {
    return () => {
      return chance.sentence(options)
    }
  }

  /**
    * Returns a random guid
    * @see docs https://chancejs.com/miscellaneous/guid.html
  */
  public static Guid(options: object = {}): iValueGenerator {
    return () => {
      return chance.guid(options);
    }
  }

  /**
  * Returns a random hash
  * @see docs https://chancejs.com/miscellaneous/hash.html
  */
  public static Hash(options: object = {}): iValueGenerator {
    return () => {
      return chance.hash(options);
    }
  }

  /**
    * Returns a random char
    * @see docs https://chancejs.com/miscellaneous/hash.html
    */
  public static Char(options: object = { alpha: true }): iValueGenerator {
    return () => {
      return chance.char(options);
    }
  }

  /**
    * Returns a random cpf
    * @see docs https://chancejs.com/person/cpf.html
    */
  public static Cpf(): iValueGenerator {
    return () => {
      return chance.cpf();
    }
  }
}
