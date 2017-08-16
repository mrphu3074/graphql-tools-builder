import { Scalar } from './scalar';
import { Enum } from './enum';
import { Type } from './type';
import { Input } from './input';
import { Query } from './query';
import { Mutation } from './mutation';
import * as merge from 'deepmerge';

type ITypeItem = Scalar | Enum | Type | Input;

class Module {
  private STR_PAD: string;
  public name: string;
  private types: ITypeItem[];
  private queries: Query[];
  private mutations: Mutation[];

  constructor(name: string) {
    this.STR_PAD = '  ';
    this.name = name;
    this.types = [];
    this.queries = [];
    this.mutations = [];
  }

  getTypeDefs(): string[] {
    const elements = [];
    const queries = [];
    const mutations = [];

    for (const query of this.queries) {
      queries.push(query.toString());
    }
    for (const mutation of this.mutations) {
      mutations.push(mutation.toString());
    }
    for (const type of this.types) {
      elements.push(type.toString());
    }

    if(queries.length > 0) {
      elements.push(['extend type Query {', queries.join('\n'), '}'].join('\n'));
    }

    if(mutations.length > 0) {
      elements.push(
        ['extend type Mutation {', mutations.join('\n'), '}'].join('\n')
      );
    }

    return elements;
  }

  getResolvers() {
    let resolvers = {};
    for (const type of this.types) {
      const resolver = type.getResolver();
      if (resolver) {
        resolvers = merge(resolvers, {
          [type.getName()]: resolver
        });
      }
    }
    for (const query of this.queries) {
      const resolver = query.getResolver();
      if (resolver) {
        resolvers = merge(resolvers, {
          Query: {
            [query.getName()]: resolver
          }
        });
      }
    }
    for (const mutation of this.mutations) {
      const resolver = mutation.getResolver();
      if (resolver) {
        resolvers = merge(resolvers, {
          Mutation: {
            [mutation.getName()]: resolver
          }
        });
      }
    }
    return resolvers;
  }

  private isTypeExists(name, instanceType): boolean {
    for (const type of this.types) {
      if (type instanceof instanceType && type.getName() === name) {
        return true;
      }
    }
    return false;
  }

  private isQueryExists(name): boolean {
    for (const query of this.queries) {
      if (query.getName() === name) return true;
    }
    return false;
  }

  private isMutationExists(name): boolean {
    for (const mutation of this.mutations) {
      if (mutation.getName() === name) return true;
    }
    return false;
  }

  createScalar(name: string, description?: string): Scalar {
    if (this.isTypeExists(name, Scalar)) {
      throw new Error(`Scalar ${name} already exists`);
    }
    const scalarType = new Scalar(name, description);
    this.types.push(scalarType);
    return scalarType;
  }

  createEnum(name: string, description?: string): Enum {
    if (this.isTypeExists(name, Enum)) {
      throw new Error(`Enum ${name} already exists`);
    }
    const enumType = new Enum(name, description);
    this.types.push(enumType);
    return enumType;
  }

  createType(name: string, description?: string): Type {
    if (this.isTypeExists(name, Type)) {
      throw new Error(`Type ${name} already exists`);
    }
    const type = new Type(name, description);
    this.types.push(type);
    return type;
  }

  createInput(name: string, description?: string): Input {
    if (this.isTypeExists(name, Input)) {
      throw new Error(`Input ${name} already exists`);
    }
    const inputType = new Input(name, description);
    this.types.push(inputType);
    return inputType;
  }

  createQuery(name: string, description?: string): Query {
    if (this.isQueryExists(name)) {
      throw new Error(`Query ${name} already exists`);
    }
    const query = new Query(name, description);
    this.queries.push(query);
    return query;
  }

  createMutation(name: string, description?: string): Mutation {
    if (this.isMutationExists(name)) {
      throw new Error(`Mutation ${name} already exists`);
    }
    const mutation = new Mutation(name, description);
    this.mutations.push(mutation);
    return mutation;
  }
}

export { Module };
