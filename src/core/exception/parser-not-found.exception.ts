

export class ParserNotFoundException extends Error {
 
  constructor(parser: string) {
    super(`The parser [${parser}] was not found. Check if you typed it right.`);
    Object.setPrototypeOf(this, ParserNotFoundException.prototype);
  }
}