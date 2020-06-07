import Parser from "../parser";
import ParserInt from "./parser-int";
import ParserString from "./parser-string";
import ParserRaw from "./parser-raw";
import ParserBool from "./parser-bool";
import ParserDate from "./parser-date";
import ParserDatetime from "./parser-datetime";
import ParserFloat from "./parser-float";
import NamedMap from "../../../commons/named-map";


class DefaultParsers {


    static get(): NamedMap<Parser> {
        let parsers: NamedMap<Parser> = new NamedMap<Parser>(true);

        parsers.put(ParserRaw.type, ParserRaw);
        parsers.put(ParserInt.type, ParserInt);
        parsers.put(ParserString.type, ParserString);
        parsers.put(ParserBool.type, ParserBool);
        parsers.put(ParserDate.type, ParserDate);
        parsers.put(ParserDatetime.type, ParserDatetime);
        parsers.put(ParserFloat.type, ParserFloat);

        return parsers;
    }

}

export default DefaultParsers;