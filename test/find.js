const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const mongo = require('../lib')(url);

const DATABASE = "test";
const COLLECTION = "test";

describe('find', function () {
    before(async function () {
        let connect = null;

        try {
            connect = await MongoClient.connect(url);
        } catch (err) {
            throw err;
        }

        let db = connect.db(DATABASE);
        let collect = db.collection(COLLECTION);

        try {
            await collect.deleteMany({});
            await collect.insertMany([
                { a: 1 }, { a: 2 }, { a: 3 }
            ]);
        } catch (err) {
            throw err;
        }
    });

    it('test', async function () {
        let data = await mongo.find(DATABASE, COLLECTION, {
            find: {}, sort: {}
        })

        expect(data).to.have.lengthOf(3);
        expect(data[0].a).to.equal(1);
        expect(data[1].a).to.equal(2);
        expect(data[2].a).to.equal(3);
    });
});