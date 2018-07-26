"use strict";
/**
 ** Mongo Database module
 **
 ** @version 0.0.7
 **
 */

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url;

/**
 ** Export module
 **
 ** @param url mongoDB connection url
 **
 */

var mongo = module.exports = function(url_defined){
  if(!url_defined){
    url = "mongodb://localhost:27017";
  }
  url = url_defined;
  return mongo;
}

/**
 ** find (SELECT)
 **
 ** @param database
 ** @param collection
 ** @param find_json find the json
 ** @param sort_option
 **
 ** @return result json
 */

mongo.find = async function (database, collection, option = {}) {
  const find_opt = option.find || {};
  const sort_opt = option.sort || {};

  try {
    let connect = await getConnect();
    let collect = connect.db(database).collection(collection);

    let result = await collect.find(find_opt).sort(sort_opt).toArray();

    connect.close();

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 ** String2ObjectId
 **
 ** @param string
 **
 ** @return ObjectId
 */

mongo.String2ObjectId = function(string){
  return new ObjectId(string);
}

/**
 ** ObjectId2String
 **
 ** @param ObjectId
 **
 ** @return string
 */

mongo.ObjectId2String = function(Objectid){
  return Objectid.toString();
}

/**
 ** ObjectId2UnixTimeStamp
 **
 ** @param ObjectId
 **
 ** @return int
 */

mongo.ObjectId2UnixTimeStamp = function(Objectid){
  return Math.round(Date.parse(Objectid.getTimestamp())/1000);
}

/**
 ** insertOne (INSERT)
 **
 ** @param database
 ** @param collection
 ** @param insert_json insert the json into collection
 **
 ** @return result.insertedCount
 */

mongo.insert = async function (database, collection, insert_json) {
  if (database == null || database == undefined) throw "database is invalid";
  if (collection == null || collection == undefined) throw "database is invalid";

  try {
    let connect = await getConnect();
    let collect = connect.db(database).collection(collection);

    if (!Array.isArray(insert_json))
      await collect.insertOne(insert_json);
    else
      await collect.insertMany(insert_json);

    connect.close();
  } catch (error) {
    throw error;
  }
}

/**
 ** update (UPDATE)
 **
 ** @param database
 ** @param collection
 ** @param query_json find (WHERE)
 ** @param update_json update the json finded
 ** @param options update options (upsert:if no result, insert it; multi:update many)
 **
 ** @return update results
 */

mongo.update = async function(database,collection,query_json,update_json,option = {}){
  var upsert = option.upsert || true;
  var multi = option.multi || false;

  var connect;

  try {
    connect = await MongoClient.connect(url);
  } catch (err) {
    throw err;
  }   

  var db = connect.db(database);

  try {
    await db.collection(collection).update(query_json,update_json,{
      upsert, multi
    });
    connect.close();
  } catch (err) {
    throw err;
  }    
}

/**
 ** remove (DELETE)
 **
 ** @param database
 ** @param collection
 ** @param delete_json delete the json finded
 ** @param option delete one or all matched
 **
 ** @return remove result
 */



mongo.remove = async function (database, collection, option = {}) {
  let connect = await getConnect();
  let collect = connect.db(database).collection(collection);

  let isDeleteAll = option.deleteAll || false;
  let delete_json = option.delete || {};

  if (isDeleteAll)
    await collect.deleteMany({});
  else
    await collect.remove(delete_json);

  connect.close();
  return true;
}

async function getConnect(database) {
    try {
        let connect = await MongoClient.connect(url);

        return connect;
    } catch (err) {
        throw err;
    }
}