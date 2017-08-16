import * as Ware from 'ware';

export interface IWare {
  fns: Function[];
  use(fn: Function): IWare;
  run(...args: any[]): void;
}
export type ResolverCallback = (root: any, args: any, context: any) => void;
export type ResolverObject = {
  [key: string]: any;
};
export type ResolverType = ResolverCallback | ResolverObject;

export abstract class BaseType {
  protected name: string;
  protected description: string;
  protected middlewares: IWare;
  protected _resolver: ResolverType;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
    this.middlewares = Ware();
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  use(middleware: Function) {
    this.middlewares.use(middleware);
    return this;
  }

  resolver(resolver: ResolverType) {
    this._resolver = resolver;
    return this;
  }

  getResolver() {
    if (this._resolver) {
      if (typeof this._resolver === 'function') {
        const resolver: Function = this._resolver as Function;
        const hasMiddleware = this.middlewares.fns.length > 0;
        if (hasMiddleware) {
          if (typeof this._resolver === 'function') {
            return (...args) => {
              return new Promise((resolve, reject) => {
                this.middlewares.run(...args, (error, ...modifiedArgs) => {
                  if (error) {
                    return reject(error);
                  }
                  return resolve(modifiedArgs);
                });
              }).then((modifiedArgs: any[]) => {
                return resolver(...modifiedArgs);
              });
            };
          }
        }
        return (...args) => {
          return Promise.resolve(resolver(...args));
        };
      } else {
        return this._resolver;
      }
    }
    return undefined;
  }
}
