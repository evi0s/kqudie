const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;

const mongo = require('../lib')(url);

const DATABASE = "test";
const COLLECTION = "test";

describe('removespc', function () {
    before(async function () {
        try {
            let collect = await getCollect();

            await collect.deleteMany({});
            await collect.insertMany([
                { a: 1 }, { a: 2 }, { a: 3 }
            ]);
        } catch (err) {
            throw err;
        }
    });

    it('test', async function () {
        try {
            await mongo.remove(DATABASE, COLLECTION, { delete: {a : 1} });

            let collect = await getCollect();
            let result = await collect.find({}).sort({}).toArray();
            let result2 = await collect.find({ a : 1 }).sort({}).toArray();

            expect(result).to.have.lengthOf(2);
            expect(result2).to.have.lengthOf(0);
        } catch (error) {
            throw error;
        }
    });
});

async function getCollect() {
    try {
        let connect = await MongoClient.connect(url);
        let db = connect.db(DATABASE);
        let collect = db.collection(COLLECTION);

        return collect;
    } catch (err) {
        throw err;
    }
}
