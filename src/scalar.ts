import { BaseType } from './base-type';

class Scalar extends BaseType {
  toString(): string {
    const elements = [];
    if (this.description) {
      elements.push('#' + this.description);
    }
    elements.push(`scalar ${this.name}`);
    return elements.join('\n');
  }
}

export { Scalar };
