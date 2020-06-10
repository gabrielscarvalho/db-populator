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
        let parsers: NamedMap<Parser> = new NamedMap<Parser>(false);

        //just to check if there is any repeated at the default values
        parsers.allowReplace = false;
        
        parsers.put(ParserRaw.type, ParserRaw);
        parsers.put(ParserInt.type, ParserInt);
        parsers.put(ParserString.type, ParserString);
        parsers.put(ParserBool.type, ParserBool);
        parsers.put(ParserDate.type, ParserDate);
        parsers.put(ParserDatetime.type, ParserDatetime);
        parsers.put(ParserFloat.type, ParserFloat);

        //but user will be able to replace them
        parsers.allowReplace = true;
        return parsers;
    }

}

export default DefaultParsers;