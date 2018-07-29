const expect = require('chai').expect;
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../lib')();

describe('objectid2unixtimestamp', function () {

    it('test', async function () {
        let str = "5b1e7f1e24e8ab001663b37a";
        let obj = new ObjectId(str);
        let timestamp = getTimestamp(str);
        let testtimestamp = mongo.ObjectId2UnixTimeStamp(obj);

        expect(timestamp).to.equal(testtimestamp);
    });

    function getTimestamp(str){
		    var bytes = [];
		    for (var i = 0; i < 4; i++) {
    		  bytes[i] = parseInt(str.substring(i * 2, i * 2 + 2), 16);
		     }
		    var int = (((bytes[0]) << 24) |
    		  ((bytes[1] & 0xff) << 16) |
    		  ((bytes[2] & 0xff) << 8) |
    		  ((bytes[3] & 0xff)));
		    return int;
	 }
});
