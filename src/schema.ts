import * as merge from 'deepmerge';
import { Module } from './module';

const TYPE_PREFIX = `
type Query {
    test: String
}
type Mutation {
    test: String
}
type Subscription {
    test: String
}
`;
const TYPE_SUFFIX = `
schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}
`;

export class Schema {
  private _modules: Module[] = [];

  addModule(module: Module): Schema {
    this._modules.push(module);
    return this;
  }

  getTypeDefs() {
    let typeDefs = [];
    for (let module of this._modules) {
      typeDefs = [...typeDefs, ...module.getTypeDefs()];
    }
    return [TYPE_PREFIX, ...typeDefs, TYPE_SUFFIX];
  }

  getResolvers() {
    let resolvers = {};
    for (const module of this._modules) {
      resolvers = merge(resolvers, module.getResolvers());
    }
    return resolvers;
  }
}
