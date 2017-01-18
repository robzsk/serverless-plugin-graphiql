'use strict';

var g = require('graphql');
var graphql = g.graphql;
var buildSchema = g.buildSchema;

var maybeJson = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

module.exports.graphql = (event, context, callback) => {
  var payload = maybeJson(event.body);
  var requestString = payload[Object.keys(payload)[0]]; // query, mutation ...
  var schema = buildSchema(`
    type Query {
      # # hello
      # request for hello resource
      hello: String
    }`);
  var root = {
    hello: () => 'Hello world!',
  };
  graphql(schema, requestString, root)
    .then(body => callback(null, {
      headers: { 'Content-Type': 'text/json' },
      statusCode: 200,
      body: JSON.stringify(body)
    }));
};
