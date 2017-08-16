import { BaseType } from './base-type';

class Enum extends BaseType {
  private STR_PAD: string;
  private options: string[];

  constructor(name: string, description?: string) {
    super(name, description);
    this.STR_PAD = '  ';
    this.options = [];
  }

  private isOptionExists(name: string): boolean {
    return this.options.indexOf(name) > -1;
  }

  option(name: string): Enum {
    if (this.isOptionExists(name))
      throw new Error(`Option "${name}" already exists`);
    this.options.push(name);
    return this;
  }

  getOptions(): string[] {
    return this.options;
  }

  toString(): string {
    const elements = [];
    if (this.description) {
      elements.push('#' + this.description);
    }
    elements.push(`enum ${this.name} {`);
    for (const option of this.options) {
      elements.push(this.STR_PAD + option);
    }
    elements.push('}');
    return elements.join('\n');
  }

  resolver() {
    return this;
  }
}

export { Enum };
