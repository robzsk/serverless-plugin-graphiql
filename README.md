# serverless-plugin-graphiql

> Creates http endpoints for graphql server with graphiql


## usage

1. Create a lambda function named graphql that implements a graphql server
2. Add `graphiql` to serverless plugins array
3. Run `sls graphiql` command from root of serverless project
4. Visit `localhost:8000/graphql` to view graphiql in browser


## about

- This plugin creates two endpoints:  
```
GET /graphql
POST /graphql
```
- View `/example` directory to see how simple it is to create a graphql server for the serverless framework.
- Once graphiql is running, you can also make requests via cli:
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
localhost:8000/graphql
```
