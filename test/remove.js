const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;

const mongo = require('../lib')(url);

const DATABASE = "test";
const COLLECTION = "test";

describe('remove', function () {
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
            await mongo.remove(DATABASE, COLLECTION, { deleteAll: true });

            let collect = await getCollect();
            let result = await collect.find({}).sort({}).toArray();

            expect(result).to.have.lengthOf(0);
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
