import Parser from "../parser";
import ParserInt from "./parser-int";
import ParserString from "./parser-string";
import ParserRaw from "./parser-raw";
import ParserBool from "./parser-bool";
import ParserDate from "./parser-date";
import ParserDatetime from "./parser-datetime";
import ParserFloat from "./parser-float";


class DefaultParsers {


    static get(): Map<string, Parser> {
        let parsers: Map<string, Parser> = new Map<string, Parser>();

        parsers[ParserRaw.type] = ParserRaw;
        parsers[ParserInt.type] = ParserInt;
        parsers[ParserString.type] = ParserString;

        parsers[ParserBool.type] = ParserBool;
        parsers[ParserDate.type] = ParserDate;
        parsers[ParserDatetime.type] = ParserDatetime;
        parsers[ParserFloat.type] = ParserFloat;

        return parsers;
    }

}

export default DefaultParsers;