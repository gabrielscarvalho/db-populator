import Database from "./database"
import Parser from './database/value/parser';



describe('Database test', () => {

    const db: Database = new Database();
  
    it('should generate without any param', () => {
        expect(db).toBeDefined();
    });

    it('should return a new table', () => {
        const t = db.newTable('table_x');

        expect(t).toBeDefined();
        expect(t.name).toBe('table_x');

        expect(db.getTable('table_x').name).toBe('table_x');
    });


    it('should add new parser', () => {
        const x = {
            type: 'special-parser',
            parse: (val: any) => {
                return 'special-parser';
            }
        } as Parser;

        db.addParser(x);
        const p = db.getParser('special-parser');

        expect(p).toBeDefined();
        expect(p.type).toBe('special-parser');
    });


    it('should get parser types', () => {
        
        const result = db.getParsersType();
        expect(result).toBeDefined();
        expect(result).toEqual(['raw','int','string','bool','date','datetime','float', 'special-parser']);
    });
})