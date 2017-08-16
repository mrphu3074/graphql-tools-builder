import { BaseType } from './base-type';
import { Param } from './param';

class Query extends BaseType {
  private STR_PAD: string;
  private params: Param[];
  private _output: string;

  constructor(name: string, description?: string) {
    super(name, description);
    this.STR_PAD = '  ';
    this.params = [];
  }

  private isParamExists(name: string): boolean {
    for (const param of this.params) {
      if (param.getName() === name) {
        return true;
      }
    }
    return false;
  }

  param(
    name: string,
    type: string,
    required?: boolean,
    description?: string
  ): Query {
    if (this.isParamExists(name)) {
      throw new Error(`Param "${name}" already exists`);
    }
    this.params.push(
      new Param({
        name,
        type,
        required,
        description
      })
    );
    return this;
  }

  getParams(): Param[] {
    return this.params;
  }

  output(type: string): Query {
    this._output = type;
    return this;
  }

  getOutput(): string {
    return this._output;
  }

  toString(): string {
    const elements = [];

    if (this.description) {
      elements.push([this.STR_PAD, '#', this.description].join(''));
    }

    if (this.params.length > 0) {
      const params = [];
      for (const param of this.params) {
        params.push(param.toString());
      }
      elements.push(
        `${this.STR_PAD}${this.name}(${params.join(', ')}): ${this._output}`
      );
    } else {
      elements.push(`${this.STR_PAD}${this.name}: ${this._output}`);
    }
    return elements.join('\n');
  }
}

export { Query };
