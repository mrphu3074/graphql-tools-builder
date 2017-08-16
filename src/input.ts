import { BaseType } from './base-type';
import { Param } from './param';

export class Input extends BaseType {
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
  ): Input {
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
    elements.push(`input ${this.name} {`);
    for (const field of this.fields) {
      elements.push(this.STR_PAD + field.toString());
    }
    elements.push('}');
    return elements.join('\n');
  }

  resolver(resolver: any) {
    return this;
  }
}
