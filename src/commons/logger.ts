
import moment from 'moment';
import colors from 'colors/safe';
let LOGGER_ENABLED = false;


export const enableLogger: Function = (isEnabled) => {
    LOGGER_ENABLED = isEnabled;
};


export class Logger {
    protected context: object = {};
   

    group(msg: string, ...extra: any[]) {
        this.showMessage(colors.blue(colors.bold('INFO')),colors.bgMagenta(colors.bold(msg)), extra);
    }


    info(msg: string, ...extra: any[]) {
        this.showMessage(colors.blue('INFO'),msg, extra);
    }

    warn(msg: string, ...extra: any[]) {
        this.showMessage(colors.yellow('WARN'),msg, extra);
    }

    error(msg: string, ...extra: any[]) {
        this.showMessage(colors.red('ERROR'),msg, extra);
    }

    protected prepareMessage(level: string, msg: string): string {
        const when = moment(new Date()).format('hh:mm:ss.SSS');
        return `[${when}][${level}] - ${msg}`;
    } 


    protected showMessage(level: string, msg, ...extra: any) {
        if(LOGGER_ENABLED) {
            this.applyMsg(this.prepareMessage(level,msg) , ...extra);
        }
    }


    protected applyMsg(...args) {
        console.log.apply(null, arguments);
    }
}



export default Logger;