  
/**
 * @imports
 */
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { dbDriver, dbSchema as schema, dbData as data, Parser } from './install.js';

chai.use(chaiAsPromised);

describe(`UPDATE QUERIES`, function() {

    before('Import into DB', async function() {
        await dbDriver.dropDatabase('db1', {ifExists: true});
        await dbDriver.importDatabase('db1', { schema, data });
    });

    var ast1, expr1 = `UPDATE table2 t2 set fname = "New FNAME"`;
    describe(`${expr1}`, function() {

        it(`"parse()" the expression and stringify to compare with original`, function() {
            ast1 = Parser.parse(expr1, null, {dbDriver, explain: false});
            expect(ast1.stringify({interpreted:false}).toLowerCase()).to.be.equal(expr1.toLowerCase());
        });

        it(`"eval()" the expression and expect affected rows to be: { table2: [ 1, 2, 3 ] }`, async function() {
            var result = await ast1.eval(dbDriver);
            expect(result).to.be.an('object').that.have.keys('table2');
            expect(await result.table2.getAffectedRows(true)).to.be.an('array').that.eql([ 1, 2, 3 ]);
        });

    });

    //var ast2, expr2 = `UPDATE WITH UAC table2 t2, table3 t3 set t2.lname = 100, t3.lname = 500 WHERE t2.age = 20 AND t3.age = 10`;
    var ast2, expr2 = `UPDATE table2 t2, table3 t3 set t2.lname = 100, t3.lname = 500 WHERE t2.age = 20 AND t3.age = 10`;
    describe(`${expr2}`, function() {

        it(`"parse()" the expression and stringify to compare with original`, function() {
            ast2 = Parser.parse(expr2, null, {dbDriver, explain: false});
            expect(ast2.stringify({interpreted:false}).toLowerCase()).to.be.equal(expr2.toLowerCase());
        });

        it(`"eval()" the expression and expect affected rows to be: { table2: [ 1, 2, 3 ], table3: [ 1, 2, 3 ] }`, async function() {
            var result = await ast2.eval(dbDriver);
            expect(result).to.be.an('object').that.have.keys('table2', 'table3');
            expect(await result.table2.getAffectedRows(true)).to.be.an('array').that.eql([ 1, 2, 3 ]);
            expect(await result.table3.getAffectedRows(true)).to.be.an('array').that.eql([ 1, 2, 3 ]);
        });

    });

    var ast3, expr3 = `UPDATE (select id, ffnn, aaggee aaagggeee from (select id, fname ffnn, age aaggee from table2) ta) tb set ffnn = "ddddddddddddd", aaagggeee = 900 WHERE aaagggeee = 22`;
    describe(`${expr3}`, function() {

        it(`"parse()" the expression and stringify to compare with original`, function() {
            ast3 = Parser.parse(expr3, null, {dbDriver, explain: false});
            expect(ast3.stringify({interpreted:false}).toLowerCase()).to.be.equal(expr3.toLowerCase());
        });

        it(`"eval()" the expression and expect affected rows to be: {tb: [ [ [ 1, 2, 3 ] ] ] }`, async function() {
            var result = await ast3.eval(dbDriver);
            expect(result).to.be.an('object').with.property('tb');
            expect(await result.tb[0][0].getAffectedRows(true)).to.eql([ 1, 2, 3 ]);
        });

    });

    var ast4, expr4 = `UPDATE (select id, ffnn, aaggee aaagggeee from (select id, SUM(fname) ffnn, age aaggee from table2) ta) tb set ffnn = "ddddddddddddd", aaagggeee = 900 WHERE aaagggeee = 900`;
    describe(`${expr4}`, function() {

        it(`"parse()" the expression and stringify to compare with original`, function() {
            ast4 = Parser.parse(expr4, null, {dbDriver, explain: false});
            expect(ast4.stringify({interpreted:false}).toLowerCase()).to.be.equal(expr4.toLowerCase());
        });

        it(`"eval()" the expression and expect it to throw: "ffnn" cannot be modified; not a reference!`, async function() {
            var result = ast4.eval(dbDriver);
            await expect(result).to.eventually.be.rejectedWith(`"ffnn" cannot be modified; not a reference!`);
            // TODO: doesn't throw if the SELECT (by virtue of the WHERE) doesn't match any records.
        });

    });

});