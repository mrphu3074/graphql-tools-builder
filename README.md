![Travis](https://api.travis-ci.org/mrphu3074/graphql-tools-builder.svg?branch=master)
[![codecov](https://codecov.io/gh/mrphu3074/graphql-tools-builder/branch/master/graph/badge.svg)](https://codecov.io/gh/mrphu3074/graphql-tools-builder)


------------------

# graphql-tools-builder
Create Graphql schema effortlessly

This library like a plugin for `graphql-tools` to organize your modules easier.

### Graphl-tools style

```
const typeDefs = `
scalar Date

type User {
  _id: String
  username: String
  password: String
  createdAt: Date
  modifiedAt: Date
  createdBy: String
  modifiedBy: String
  creator: User
  modifier: User
}

input CreateUserForm {
  username: String!
  password: String!
}

type Query {
	#get all users
  getUsers: [User]
}

type Mutation {
  #Create new user
  createUser(data: CreateUserForm!): User
}
`;

const resolvers = {
  User: {
    creator(root, args, context) {
      if(root.createdBy) {
        return context.User.findOne({_id: root.createdBy});
      }
      return null;
    },
    modifier(root, args, context) {
      if(root.modifiedBy) {
        return context.User.findOne({_id: root.modifiedBy});
      }
      return null;
    }
  },
  Query: {
    getUsers(root, args, context) {
      return context.User.find({});
    }
  },
  Mutation: {
    createUser(root, args, context) {
      return context.User.insert(args.data);
    }
  }
}

import { makeExecutableSchema } from 'graphql-tools';

// Generarte main schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
```

### Graphl-tools-builder style

```
import { makeExecutableSchema } from 'graphql-tools';
import { Schema, Module } from 'graphql-tools-builder';
const GraphqlDate = require('graphql-date);

const schema = new Schema();
const commons = new Module('Commons');
const user = new Module('User');
schema.addModule(commons);
schema.addModule(user);

// set up commons type
commons.createScalar('Date').resolver(GraphqlDate);
// set up user module
user.createType('User')
  .field('_id', 'String')
  .field('username', 'String')
  .field('password', 'String')
  .field('createdAt', 'Date')
  .field('modifiedAt', 'Date')
  .field('createdBy', 'String')
  .field('modifiedBy', 'String')
  .field('creator', 'User')
  .field('modifier', 'User')
  .resolver({
    creator(root, args, context) {
      if(root.createdBy) {
        return context.User.findOne({_id: root.createdBy});
      }
      return null;
    },
    modifier(root, args, context) {
      if(root.modifiedBy) {
        return context.User.findOne({_id: root.modifiedBy});
      }
      return null;
    }
  });

user.createInput('CreateUserForm')
  .field('username', 'String', true)
  .field('password', 'String', true);

user.createQuery('getUsers')
  .output('[User]')
  .resolver((root, args, context) => {
    return context.User.find({});
  });

user.createMutation('createUser')
  .param('data', 'CreateUserForm', true)
  .output('User')
  .resolver((root, args, context) => ({
    return context.User.insert(args.data);
  }));

// Generarte main schema
const graphqlSchema = makeExecutableSchema({
  typeDefs: schema.getTypeDefs(),
  resolvers: schema.getResolvers()
});
```
