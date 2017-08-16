import { BaseType } from './base-type';
import { Param } from './param';

class Type extends BaseType {
  private STR_PAD: string;
  private fields: Param[];

  constructor(name: string, description?: string) {
    super(name, description);
    this.STR_PAD = '  ';
    this.fields = [];
  }

  isFieldExists(name: string): boolean {
    for (const field of this.fields) {
      if (field.getName() === name) {
        return true;
      }
    }
    return false;
  }

  field(
    name: string,
    type: string,
    required?: boolean,
    description?: string
  ): Type {
    if (this.isFieldExists(name)) {
      throw new Error(`Field "${name}" already exists`);
    }
    this.fields.push(
      new Param({
        name,
        type,
        required,
        description
      })
    );
    return this;
  }

  getFields(): Param[] {
    return this.fields;
  }

  toString(): string {
    const elements = [];
    if (this.description) {
      elements.push('#' + this.description);
    }
    elements.push(`type ${this.name} {`);
    for (const field of this.fields) {
      elements.push(this.STR_PAD + field.toString());
    }
    elements.push('}');
    return elements.join('\n');
  }
}

export { Type };
