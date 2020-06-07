import Parser from "../parser";
import ParserInt from "./parser-int";
import ParserString from "./parser-string";
import ParserRaw from "./parser-raw";
import ParserBool from "./parser-bool";
import ParserDate from "./parser-date";
import ParserDatetime from "./parser-datetime";
import ParserFloat from "./parser-float";
import NamedMap from "../../../commons/named-map";
import { ParserConfig } from "../../config";


class DefaultParsers {


    static get(config: ParserConfig): NamedMap<Parser> {
        let parsers: NamedMap<Parser> = new NamedMap<Parser>(false);

        //just to check if there is any repeated at the default values
        parsers.allowReplace = false;
        
        parsers.put(ParserRaw.type, ParserRaw.setConfig(config));
        parsers.put(ParserInt.type, ParserInt.setConfig(config));
        parsers.put(ParserString.type, ParserString.setConfig(config));
        parsers.put(ParserBool.type, ParserBool.setConfig(config));
        parsers.put(ParserDate.type, ParserDate.setConfig(config));
        parsers.put(ParserDatetime.type, ParserDatetime.setConfig(config));
        parsers.put(ParserFloat.type, ParserFloat.setConfig(config));

        //but user will be able to replace them
        parsers.allowReplace = true;
        return parsers;
    }

}

export default DefaultParsers;