/* eslint import/no-extraneous-dependencies: 0 */
const test = require('tap').test;
const http = require('http');
const server = require('./../../server');
const example = require('./../../example/foo/bah');

const host = 'localhost';
const port = 9001;
const path = '/graphql';

let s;

test('start', () => server.start({ handler: example.graphql, port })
  .then(httpServer => {
    s = httpServer;
    return;
  }));

test('GET /graphql returns graphiql html page', t => {
  http.get({ host, port, path }, res => {
    t.strictSame('text/html; charset=utf-8', res.headers['content-type']);
    t.strictSame(200, res.statusCode);
    let body = '';
    res.on('data', d => { body += d; });
    res.on('end', () => {
      const htmlTag = body.match(/(<html>)/)[1];
      t.strictSame('<html>', htmlTag);
      t.end();
    });
  });
});

test('POST /graphql returns graphiql server response', t => {
  const req = http.request({
    host,
    port,
    path,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, res => {
    let body = '';
    res.on('data', d => { body += d; });
    res.on('end', () => {
      t.strictSame('{"data":{"hello":"Hello world!"}}', body);
      t.end();
    });
  });
  req.on('error', e => {
    console.error(`problem with request: ${e.message}`);
  });
  req.write('{"query": "{ hello }"}');
  req.end();
});

test('close', t => {
  s.close();
  t.end();
});
