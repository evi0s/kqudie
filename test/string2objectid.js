const expect = require('chai').expect;
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../lib')();

describe('string2objectid', function () {

    it('test', async function () {
        let str = "5b1e7f1e24e8ab001663b37a";
        let obj = new ObjectId(str);
        let testobj = mongo.String2ObjectId(str);

        expect(testobj).to.be.an.instanceof(ObjectId);
        expect(obj.toString()).to.equal(testobj.toString());
    });
});
