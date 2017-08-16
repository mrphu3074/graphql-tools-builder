export interface IParamSpecs {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export class Param {
  private name: string;
  private type: string;
  private required: boolean;
  private description: string;

  constructor(specs: IParamSpecs) {
    this.name = specs.name;
    this.type = specs.type;
    this.required = specs.required;
    this.description = specs.description;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  getType() {
    return this.type;
  }

  setRequired(required) {
    this.required = required;
    return this;
  }

  getRequired() {
    return this.required;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  getDescription() {
    return this.description;
  }

  toString() {
    const requiredSymbol = this.getRequired() ? '!' : '';
    return [
      [this.getName(), ':'].join(''),
      [this.getType(), requiredSymbol].join('')
    ].join(' ');
  }

  clone() {
    return new Param({
      name: this.name,
      type: this.type,
      required: this.required,
      description: this.description
    });
  }
}
