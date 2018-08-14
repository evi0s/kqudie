# kqudie

[![Build Status](https://travis-ci.org/evi0s/kqudie.svg?branch=master)](https://travis-ci.org/evi0s/kqudie)
[![Coverage Status](https://coveralls.io/repos/github/evi0s/kqudie/badge.svg)](https://coveralls.io/github/evi0s/kqudie)

Node.js MongoDB module

**Old version document**

Not updated yet

## Usage

```js
var url = "mongodb://mongo:27017";
var mongo = require('kqudie')(url);
```

### mongo.find

#### Params
* database *string*
* collection *string*
* option.find *json object*
* option.sort sort options *json object*

#### Demo

```js
var option = {};
var data = mongo.find(database,collection,option);
```

#### Return

Return Json object.

### mongo.String2ObjectId

#### Param
* str *string*

#### Demo

```js
var str = "5b1e7f1e24e8ab001663b37a";
var oid = mongo.String2ObjectId(str);
```

#### Return
Return ObjectId object

### mongo.ObjectId2String

#### Param
* oid *ObjectId object*

#### Demo

```js
var oid = new ObjectId();
var str = mongo.ObjectId2String(oid);
```

#### Return
Return string

### mongo.ObjectId2UnixTimeStamp

#### Param
* oid *ObjectId object*

#### Demo

```js
var oid = new ObjectId("5b1e7f1e24e8ab001663b37a");
var unixtimestamp = mongo.ObjectId2UnixTimeStamp(oid);
```

#### Return
Return Unix Time Stamp

### mongo.insert

#### Params
* database *string*
* collection *string*
* insertjson *json or json array*

#### Demo

```js
var insertjson = { 'title' : 'test' , 'value' : true };
var data = mongo.insert(database, collection, insertjson);
```

```js
var insertjson = [{ 'title' : 'test1' , 'value' : true }, { 'title' : 'test2' , 'value' : false }];
var data = mongo.insert(database, collection, insertjson);
```

#### Return

Return json object

Use data.insertedCount or data.insertedId

### mongo.update

#### Params
* database *string*
* collection *string*
* queryjson *bson object*
* updatejson *bson object* 
* option.upsert if query not matched, insert it *bool* **Default: true**
* option.multi if query matched many, update them *bool* **Default: false**

#### Demo

```js
var queryjson = { 'title' : 'test' };
var updatejson = { 'title' : 'test' , 'value' : true };
var option = {};
var data = mongo.update(database, collection, queryjson, updatejson, option);
```

#### Return

Return json object

Use results.result.n to get changes

### mongo.remove

#### Params
* database *string*
* collection
* option.delete *json object* **Default: {}**
* option.deleteAll *bool* **Default: false**

**Warning: If you forget to pass a 'delete' json in 'option', it will delete all the docs in the collection!**

#### Demo

```js
var option = {
                'delete' : { 'title' : 'test' },
                'deleteAll' : false
              };
var data = mongo.remove(database, collection, option);
```
#### Return
Return json object

Use results.result.n to get changes
