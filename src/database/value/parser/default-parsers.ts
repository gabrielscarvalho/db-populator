import Parser from "../parser";
import ParserInt from "./parser-int";
import ParserString from "./parser-string";
import ParserRaw from "./parser-raw";


class DefaultParsers {


    static get(): Map<string, Parser> {
        let parsers: Map<string, Parser> = new Map<string, Parser>();

        parsers[ParserRaw.type] = ParserRaw;
        parsers[ParserInt.type] = ParserInt;
        parsers[ParserString.type] = ParserString;

        return parsers;
    }

}

export default DefaultParsers;