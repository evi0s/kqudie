const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const mongo = require('../lib')(url);

const DATABASE = "test";
const COLLECTION = "test";

describe('update', function () {
    before(async function () {
        try {
            let collect = await getCollect();
            await collect.deleteMany({});
            await mongo.insert(DATABASE, COLLECTION, { 'title': 'saber', 'content': 'she' });
        } catch (err) {
            throw err;
        }
    });

    it('test', async function () {
        try {
            let a= await mongo.update(DATABASE, COLLECTION, { 'title': 'saber'},{ 'title': 'saber','content':'shi'});
            let collect = await getCollect();
            var result = await collect.find({}).sort({}).toArray();

            expect(result).to.have.lengthOf(1);
            expect(result[0].title).to.equal('saber');
            expect(result[0].content).to.equal('shi');
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
