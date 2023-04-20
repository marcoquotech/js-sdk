# JavaScript and Node.js SDK for OpenFGA

[![npm](https://img.shields.io/npm/v/@openfga/sdk.svg?style=flat)](https://www.npmjs.com/package/@openfga/sdk)
[![Release](https://img.shields.io/github/v/release/openfga/js-sdk?sort=semver&color=green)](https://github.com/openfga/js-sdk/releases)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenfga%2Fjs-sdk.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenfga%2Fjs-sdk?ref=badge_shield)
[![Discord Server](https://img.shields.io/discord/759188666072825867?color=7289da&logo=discord "Discord Server")](https://discord.com/channels/759188666072825867/930524706854031421)
[![Twitter](https://img.shields.io/twitter/follow/openfga?color=%23179CF0&logo=twitter&style=flat-square "@openfga on Twitter")](https://twitter.com/openfga)

This is an autogenerated JavaScript SDK for OpenFGA. It provides a wrapper around the [OpenFGA API definition](https://openfga.dev/api), and includes TS typings.

## Table of Contents

- [About OpenFGA](#about)
- [Resources](#resources)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Initializing the API Client](#initializing-the-api-client)
  - [Get your Store ID](#get-your-store-id)
  - [Calling the API](#calling-the-api)
    - [Stores](#stores)
      - [List All Stores](#list-stores)
      - [Create a Store](#create-store)
      - [Get a Store](#get-store)
      - [Delete a Store](#delete-store)
    - [Authorization Models](#authorization-models)
      - [Read Authorization Models](#read-authorization-models)
      - [Write Authorization Model](#write-authorization-model)
      - [Read a Single Authorization Model](#read-a-single-authorization-model)
      - [Read the Latest Authorization Model](#read-the-latest-authorization-model)
    - [Relationship Tuples](#relationship-tuples)
      - [Read Relationship Tuple Changes (Watch)](#read-relationship-tuple-changes-watch)
      - [Read Relationship Tuples](#read-relationship-tuples)
      - [Write (Create and Delete) Relationship Tuples](#write-create-and-delete-relationship-tuples)
    - [Relationship Queries](#relationship-queries)
      - [Check](#check)
      - [Batch Check](#batch-check)
      - [Expand](#expand)
      - [List Objects](#list-objects)
      - [List Relations](#list-relations)
    - [Assertions](#assertions)
      - [Read Assertions](#read-assertions)
      - [Write Assertions](#write-assertions)
  - [API Endpoints](#api-endpoints)
  - [Models](#models)
- [Contributing](#contributing)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
- [License](#license)

## About

[OpenFGA](https://openfga.dev) is an open source Fine-Grained Authorization solution inspired by [Google's Zanzibar paper](https://research.google/pubs/pub48190/). It was created by the FGA team at [Auth0](https://auth0.com) based on [Auth0 Fine-Grained Authorization (FGA)](https://fga.dev), available under [a permissive license (Apache-2)](https://github.com/openfga/rfcs/blob/main/LICENSE) and welcomes community contributions.

OpenFGA is designed to make it easy for application builders to model their permission layer, and to add and integrate fine-grained authorization into their applications. OpenFGA’s design is optimized for reliability and low latency at a high scale.


## Resources

- [OpenFGA Documentation](https://openfga.dev/docs)
- [OpenFGA API Documentation](https://openfga.dev/api/service)
- [Twitter](https://twitter.com/openfga)
- [OpenFGA Discord Community](https://discord.gg/8naAwJfWN6)
- [Zanzibar Academy](https://zanzibar.academy)
- [Google's Zanzibar Paper (2019)](https://research.google/pubs/pub48190/)

## Installation

Using [npm](https://npmjs.org):

```shell
npm install @openfga/sdk
```

Using [yarn](https://yarnpkg.com):

```shell
yarn add @openfga/sdk
```

## Getting Started

### Initializing the API Client

[Learn how to initialize your SDK](https://openfga.dev/docs/getting-started/setup-sdk-client)

The documentation below refers to the `OpenFgaClient`, to read the documentation for `OpenFgaApi`, check out the [`v0.2.2` documentation](https://github.com/openfga/js-sdk/tree/v0.2.2#readme).

> The OpenFgaClient will by default retry API requests up to 15 times on 429 and 5xx errors.

#### No Credentials

```javascript
const { OpenFgaClient } = require('@openfga/sdk'); // OR import { OpenFgaClient } from '@openfga/sdk';

const fgaClient = new OpenFgaClient({
  apiScheme: OPENFGA_API_SCHEME, // optional, defaults to "https"
  apiHost: OPENFGA_API_HOST, // required, define without the scheme (e.g. api.fga.example instead of https://api.fga.example)
  storeId: OPENFGA_STORE_ID, // not needed when calling `CreateStore` or `ListStores`
  authorizationModelId: OPENFGA_AUTHORIZATION_MODEL_ID, // Optional, can be overridden per request
});
```

#### API Token

```javascript
const { OpenFgaClient } = require('@openfga/sdk'); // OR import { OpenFgaClient } from '@openfga/sdk';

const fgaClient = new OpenFgaClient({
  apiScheme: OPENFGA_API_SCHEME, // optional, defaults to "https"
  apiHost: OPENFGA_API_HOST, // required, define without the scheme (e.g. api.fga.example instead of https://api.fga.example)
  storeId: OPENFGA_STORE_ID, // not needed when calling `CreateStore` or `ListStores`
  authorizationModelId: OPENFGA_AUTHORIZATION_MODEL_ID, // Optional, can be overridden per request
  credentials: {
    method: CredentialsMethod.ApiToken,
    config: {
      token: OPENFGA_API_TOKEN, // will be passed as the "Authorization: Bearer ${ApiToken}" request header
    }
  }
});
```

#### Client Credentials

```javascript
const { OpenFgaClient } = require('@openfga/sdk'); // OR import { OpenFgaClient } from '@openfga/sdk';

const fgaClient = new OpenFgaClient({
  apiScheme: OPENFGA_API_SCHEME, // optional, defaults to "https"
  apiHost: OPENFGA_API_HOST, // required, define without the scheme (e.g. api.fga.example instead of https://api.fga.example)
  storeId: OPENFGA_STORE_ID, // not needed when calling `CreateStore` or `ListStores`
  authorizationModelId: OPENFGA_AUTHORIZATION_MODEL_ID, // Optional, can be overridden per request
  credentials: {
    method: CredentialsMethod.ClientCredentials,
    config: {
      apiTokenIssuer: OPENFGA_API_TOKEN_ISSUER,
      apiAudience: OPENFGA_API_AUDIENCE,
      clientId: OPENFGA_CLIENT_ID,
      clientSecret: OPENFGA_CLIENT_SECRET,
    }
  }
});
```


### Get your Store ID

You need your store id to call the OpenFGA API (unless it is to call the [CreateStore](#create-store) or [ListStores](#list-stores) methods).

If your server is configured with [authentication enabled](https://openfga.dev/docs/getting-started/setup-openfga#configuring-authentication), you also need to have your credentials ready.

### Calling the API

> Note regarding casing in the OpenFgaClient:
> All input parameters are in `camelCase`, all response parameters will match the API and are in `snake_case`.

> Note: The Client interface might see several changes over the next few months as we get more feedback before it stabilizes.

#### Stores

##### List Stores

Get a paginated list of stores.

[API Documentation](https://openfga.dev/api/service#/Stores/ListStores)

```javascript
const options = { pageSize: 10, continuationToken: "..." };

const { stores } = await fgaClient.listStores(options);

// stores = [{ "id": "01FQH7V8BEG3GPQW93KTRFR8JB", "name": "FGA Demo Store", "created_at": "2022-01-01T00:00:00.000Z", "updated_at": "2022-01-01T00:00:00.000Z" }]
```

##### Create Store

Initialize a store.

[API Documentation](https://openfga.dev/api/service#/Stores/CreateStore)

```javascript
const { id: storeId } = await fgaClient.createStore({
  name: "FGA Demo Store",
});

// storeId = "01FQH7V8BEG3GPQW93KTRFR8JB"
```

##### Get Store

Get information about the current store.

[API Documentation](https://openfga.dev/api/service#/Stores/GetStore)

> Requires a client initialized with a storeId

```javascript
const store = await fgaClient.getStore();

// store = { "id": "01FQH7V8BEG3GPQW93KTRFR8JB", "name": "FGA Demo Store", "created_at": "2022-01-01T00:00:00.000Z", "updated_at": "2022-01-01T00:00:00.000Z" }
```

##### Delete Store

Delete a store.

[API Documentation](https://openfga.dev/api/service#/Stores/DeleteStore)

> Requires a client initialized with a storeId

```javascript
await fgaClient.deleteStore();
```

#### Authorization Models

##### Read Authorization Models

Read all authorization models.

[API Documentation](https://openfga.dev/api/service#/Authorization%20Models/ReadAuthorizationModels)

>  Requires a client initialized with a storeId

```javascript
const options = { pageSize: 10, continuationToken: "..." };

const { authorization_models: authorizationModels } = await fgaClient.readAuthorizationModels(options);

/*
authorizationModels = [
 { id: "01GXSA8YR785C4FYS3C0RTG7B1", schema_version: "1.1", type_definitions: [...] },
 { id: "01GXSBM5PVYHCJNRNKXMB4QZTW", schema_version: "1.1", type_definitions: [...] }];
*/
```

##### Write Authorization Model

Create a new version of the authorization model.

[API Documentation](https://openfga.dev/api/service#/Authorization%20Models/WriteAuthorizationModel)

> Requires a client initialized with a storeId

> Note: To learn how to build your authorization model, check the Docs at https://openfga.dev/docs.

> Learn more about [the OpenFGA configuration language](https://openfga.dev/docs/configuration-language).

> You can use the [OpenFGA Syntax Transformer](https://github.com/openfga/syntax-transformer) to convert between the friendly DSL and the JSON authorization model.

```javascript
const { authorization_model_id: id } = await fgaClient.writeAuthorizationModel({
  schema_version: "1.1",
  type_definitions: [{
      type: "user",
    }, {
    type: "document",
    relations: {
      "writer": { "this": {} },
      "viewer": {
        "union": {
          "child": [
            { "this": {} },
            { "computedUserset": {
               "object": "",
              "relation": "writer" }
            }
          ]
        }
      }
    } }],
});

// id = "01GXSA8YR785C4FYS3C0RTG7B1"
```

##### Read a Single Authorization Model

[API Documentation](https://openfga.dev/api/service#/Authorization%20Models/ReadAuthorizationModel)

> Requires a client initialized with a storeId

```javascript
const options = {};

// To override the authorization model id for this request
options.authorizationModelId = "01GXSA8YR785C4FYS3C0RTG7B1";

const { authorization_model: authorizationModel } = await fgaClient.readAuthorizationModel(options);

// authorizationModel = { id: "01GXSA8YR785C4FYS3C0RTG7B1", schema_version: "1.1", type_definitions: [...] }
```

##### Read the Latest Authorization Model

Reads the latest authorization model (note: this ignores the model id in configuration).

[API Documentation](https://openfga.dev/api/service#/Authorization%20Models/ReadAuthorizationModel)

> Requires a client initialized with a storeId

```javascript
const { authorization_model: authorizationModel } = await fgaClient.readLatestAuthorizationModel();

// authorizationModel = { id: "01GXSA8YR785C4FYS3C0RTG7B1", schema_version: "1.1", type_definitions: [...] }
```

#### Relationship Tuples

##### Read Relationship Tuple Changes (Watch)

Reads the list of historical relationship tuple writes and deletes.

> Requires a client initialized with a storeId

[API Documentation](https://openfga.dev/api/service#/Relationship%20Tuples/ReadChanges)

```javascript
const type = 'document';
const options = {
  pageSize: 25,
  continuationToken: 'eyJwayI6IkxBVEVTVF9OU0NPTkZJR19hdXRoMHN0b3JlIiwic2siOiIxem1qbXF3MWZLZExTcUoyN01MdTdqTjh0cWgifQ==',
};

const response = await fgaClient.readChanges({ type }, options);

// response.continuation_token = ...
// response.changes = [
//   { tuple_key: { user, relation, object }, operation: "writer", timestamp: ... },
//   { tuple_key: { user, relation, object }, operation: "viewer", timestamp: ... }
// ]
```

##### Read Relationship Tuples

[API Documentation](https://openfga.dev/api/service#/Relationship%20Tuples/Read)

> Requires a client initialized with a storeId

```javascript
// Find if a relationship tuple stating that a certain user is a viewer of a certain document
const body = {
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:roadmap",
};

// Find all relationship tuples where a certain user has any relation to a certain document
const body = {
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  object: "document:roadmap",
};

// Find all relationship tuples where a certain user is a viewer of any document
const body = {
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:",
};

// Find all relationship tuples where a certain user has any relation with any document
const body = {
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  object: "document:",
};

// Find all relationship tuples where any user has any relation with a particular document
const body = {
  object: "document:roadmap",
};

// Read all stored relationship tuples
const body = {};

const { tuples } = await fgaClient.read(body);

// In all the above situations, the response will be of the form:
// tuples = [{ key: { user, relation, object }, timestamp: ... }]
```

##### Write (Create and Delete) Relationship Tuples

Create and/or delete relationship tuples to update the system state.

[API Documentation](https://openfga.dev/api/service#/Relationship%20Tuples/Write)

> Requires a client initialized with a storeId

###### Transaction mode (default)

By default, write runs in a transaction mode where any invalid operation (deleting a non-existing tuple, creating an existing tuple, one of the tuples was invalid) or a server error will fail the entire operation.

```javascript
const options = {};

// To override the authorization model id for this request
options.authorizationModelId = "01GXSA8YR785C4FYS3C0RTG7B1";

await fgaClient.write({
  writes: [{ user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "viewer", object: "document:roadmap" }],
  deletes: [{ user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "editor", object: "document:roadmap" }],
}, options);

// Convenience functions are available
await fgaClient.writeTuples([{ user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "viewer", object: "document:roadmap" }], options);
await fgaClient.deleteTuples([{ user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "editor", object: "document:roadmap" }], options);

// if any error is encountered in the transaction mode, an error will be thrown
```

###### Non-transaction mode

The SDK will split the writes into separate requests and send them in parallel chunks (default = 1 item per chunk, each chunk is a transaction).

```
// if you'd like to disable the transaction mode for writes (requests will be sent in parallel writes)
options.transaction = {
  disable: true,
  maxPerChunk: 1, // defaults to 1 - each chunk is a transaction (even in non-transaction mode)
  maxParallelRequests: 10, // max requests to issue in parallel
};

const response = await fgaClient.write({
  writes: [{ user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "viewer", object: "document:roadmap" }],
  deletes: [{ user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "editor", object: "document:roadmap" }],
}, options);

/*
response = {
  writes: [{ tuple_key: { user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "viewer", object: "document:roadmap", status: "success" } }],
  deletes: [{ tuple_key: { user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b", relation: "editor", object: "document:roadmap", status: "failure", err: <FgaError ...>  } }],
};
*/
```

#### Relationship Queries

##### Check

Check if a user has a particular relation with an object.

[API Documentation](https://openfga.dev/api/service#/Relationship%20Queries/Check)

> Requires a client initialized with a storeId

```javascript
const options = {
  // if you'd like to override the authorization model id for this request
  authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
};

const result = await fgaClient.check({
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:roadmap",
}, options);

// result = { allowed: true }
```

##### Batch Check

Run a set of [checks](#check). Batch Check will return `allowed: false` if it encounters an error, and will return the error in the body.
If 429s or 5xxs are encountered, the underlying check will retry up to 15 times before giving up.

> Requires a client initialized with a storeId

```javascript
const options = {
  // if you'd like to override the authorization model id for this request
  authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
}
const { responses } = await fgaClient.batchCheck([{
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:budget",
}, {
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "member",
  object: "document:budget",
}, {
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:roadmap",
  contextual_tuples: [{
    user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
    relation: "writer",
    object: "document:roadmap"
  }],
}], options);

/*
responses = [{
  allowed: false,
  _request: {
    user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
    relation: "viewer",
    object: "document:budget",
  }
}, {
  allowed: false,
  _request: {
    user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
    relation: "member",
    object: "document:budget",
  },
  err: <FgaError ...>
}, {
  allowed: true,
  _request: {
    user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
    relation: "viewer",
    object: "document:roadmap",
    contextual_tuples: [{
      user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
      relation: "writer",
      object: "document:roadmap"
    }],
  }},
]
*/
```

#### Expand

Expands the relationships in userset tree format.

[API Documentation](https://openfga.dev/api/service#/Relationship%20Queries/Expand)

> Requires a client initialized with a storeId

```javascript
const options = {};

// To override the authorization model id for this request
options.authorizationModelId = "01GXSA8YR785C4FYS3C0RTG7B1";

const { tree } = await fgaClient.expand({
  relation: "viewer",
  object: "document:roadmap",
}, options);

// tree  = { root: { name: "document:roadmap#viewer", leaf: { users: { users: ["user:81684243-9356-4421-8fbf-a4f8d36aa31b", "user:f52a4f7a-054d-47ff-bb6e-3ac81269988f"] } } } }
```

##### List Objects

 List the objects of a particular type that the user has a certain relation to.

> Requires a client initialized with a storeId

[API Documentation](https://openfga.dev/api/service#/Relationship%20Queries/ListObjects)

```javascript
const options = {};

// To override the authorization model id for this request
options.authorizationModelId = "01GXSA8YR785C4FYS3C0RTG7B1";

const response = await fgaClient.listObjects({
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  type: "document",
  contextual_tuples: [{
    user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
    relation: "writer",
    object: "document:budget"
  }],
}, options);

// response.objects = ["document:roadmap"]
```

##### List Relations

List the relations a user has with an object. This wraps around [BatchCheck](#batchcheck) to allow checking multiple relationships at once.

Note: Any error encountered when checking any relation will be treated as `allowed: false`;

> Requires a client initialized with a storeId

```javascript
const options = {};

// To override the authorization model id for this request
options.authorization_model_id = "1uHxCSuTP0VKPYSnkq1pbb1jeZw";

const response = await fgaClient.listRelations({
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  object: "document:roadmap",
  relations: ["can_view", "can_edit", "can_delete"],
  contextual_tuples: [{
    user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
    relation: "writer",
    object: "document:roadmap"
  }],
}, options);

// response.relations = ["can_view", "can_edit"]
```

#### Assertions

##### Read Assertions

Read assertions for a particular authorization model.

> Requires a client initialized with a storeId

[API Documentation](https://openfga.dev/api/service#/Assertions/Read%20Assertions)

```javascript
const options = {};

// To override the authorization model id for this request
options.authorizationModelId = "01GXSA8YR785C4FYS3C0RTG7B1";

const response = await fgaClient.readAssertions(options);

/*
response.assertions = [{
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:roadmap",
  expectation: true,
}];
*/
```

##### Write Assertions

Update the assertions for a particular authorization model.

> Requires a client initialized with a storeId

[API Documentation](https://openfga.dev/api/service#/Assertions/Write%20Assertions)

```javascript
const options = {};

// To override the authorization model id for this request
options.authorizationModelId = "01GXSA8YR785C4FYS3C0RTG7B1";

const response = await fgaClient.writeAssertions([{
  user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
  relation: "viewer",
  object: "document:roadmap",
  expectation: true,
}], options);
```


### API Endpoints

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**ListStores**](https://openfga.dev/api/service#/Stores/ListStores) | **GET** /stores | List all stores |
| [**CreateStore**](https://openfga.dev/api/service#/Stores/CreateStore) | **POST** /stores | Create a store |
| [**GetStore**](https://openfga.dev/api/service#/Stores/GetStore) | **GET** /stores/{store_id} | Get a store |
| [**DeleteStore**](https://openfga.dev/api/service#/Stores/DeleteStore) | **DELETE** /stores/{store_id} | Delete a store |
| [**ReadAuthorizationModels**](https://openfga.dev/api/service#/Authorization%20Models/ReadAuthorizationModels) | **GET** /stores/{store_id}/authorization-models | Return all the authorization models for a particular store |
| [**WriteAuthorizationModel**](https://openfga.dev/api/service#/Authorization%20Models/WriteAuthorizationModel) | **POST** /stores/{store_id}/authorization-models | Create a new authorization model |
| [**ReadAuthorizationModel**](https://openfga.dev/api/service#/Authorization%20Models/ReadAuthorizationModel) | **GET** /stores/{store_id}/authorization-models/{id} | Return a particular version of an authorization model |
| [**ReadChanges**](https://openfga.dev/api/service#/Relationship%20Tuples/ReadChanges) | **GET** /stores/{store_id}/changes | Return a list of all the tuple changes |
| [**Read**](https://openfga.dev/api/service#/Relationship%20Tuples/Read) | **POST** /stores/{store_id}/read | Get tuples from the store that matches a query, without following userset rewrite rules |
| [**Write**](https://openfga.dev/api/service#/Relationship%20Tuples/Write) | **POST** /stores/{store_id}/write | Add or delete tuples from the store |
| [**Check**](https://openfga.dev/api/service#/Relationship%20Queries/Check) | **POST** /stores/{store_id}/check | Check whether a user is authorized to access an object |
| [**Expand**](https://openfga.dev/api/service#/Relationship%20Queries/Expand) | **POST** /stores/{store_id}/expand | Expand all relationships in userset tree format, and following userset rewrite rules.  Useful to reason about and debug a certain relationship |
| [**ListObjects**](https://openfga.dev/api/service#/Relationship%20Queries/ListObjects) | **POST** /stores/{store_id}/list-objects | [EXPERIMENTAL] Get all objects of the given type that the user has a relation with |
| [**ReadAssertions**](https://openfga.dev/api/service#/Assertions/ReadAssertions) | **GET** /stores/{store_id}/assertions/{authorization_model_id} | Read assertions for an authorization model ID |
| [**WriteAssertions**](https://openfga.dev/api/service#/Assertions/WriteAssertions) | **PUT** /stores/{store_id}/assertions/{authorization_model_id} | Upsert assertions for an authorization model ID |


### Models

[Models](https://github.com/openfga/js-sdk/blob/main/apiModel.ts)


## Contributing

### Issues

If you have found a bug or if you have a feature request, please report them on the [sdk-generator repo](https://github.com/openfga/sdk-generator/issues) issues section. Please do not report security vulnerabilities on the public GitHub issue tracker.

### Pull Requests

All changes made to this repo will be overwritten on the next generation, so we kindly ask that you send all pull requests related to the SDKs to the [sdk-generator repo](https://github.com/openfga/sdk-generator) instead.

## Author

[OpenFGA](https://github.com/openfga)

## License

This project is licensed under the Apache-2.0 license. See the [LICENSE](https://github.com/openfga/js-sdk/blob/main/LICENSE) file for more info.

The code in this repo was auto generated by [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) from a template based on the [typescript-axios template](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/resources/typescript-axios) and [go template](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/resources/go), licensed under the [Apache License 2.0](https://github.com/OpenAPITools/openapi-generator/blob/master/LICENSE).
