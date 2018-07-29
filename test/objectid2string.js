const expect = require('chai').expect;
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../lib')();

describe('objectid2string', function () {

    it('test', async function () {
        let obj = new ObjectId();
        let str = obj.toString();
        let teststr = mongo.ObjectId2String(obj);

        expect(teststr).to.equal(obj.toString());
    });
});
