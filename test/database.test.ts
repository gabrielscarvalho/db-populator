import Database from "../src/database"




describe('Database test', () => {

    const db: Database = new Database();
  

    it('should generate without any param', () => {
        expect(db).toBeDefined();
    })
})