const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Enum } = require('../build/enum');

describe('Graphql Enum', function() {
  it('should add option to enum type', function() {
    const enumType = new Enum('UserStatus');
    expect(enumType.getOptions()).to.have.length(0);
    enumType.option('ENABLE');
    expect(enumType.getOptions()).to.have.length(1);
  });

  it('should add multi options to enum type', function() {
    const enumType = new Enum('UserStatus');

    expect(enumType.getOptions()).to.have.length(0);
    enumType.option('ENABLE');
    enumType.option('DISABLE');
    expect(enumType.getOptions()).to.have.length(2);
  });

  it('can not add duplicated option', function() {
    const enumType = new Enum('UserStatus', 'This is description');
    enumType.option('ENABLE');
    try {
      enumType.option('ENABLE');
    } catch (ex) {
      expect(ex.message).to.equal('Option "ENABLE" already exists');
    }
  });

  it('should add description to type', function() {
    const enumType = new Enum('UserStatus', 'this is description');
    enumType.option('ENABLE');

    expect(enumType.getDescription()).to.contain('this is description');
  });

  it('can export graphql schema as string with description', function() {
    const enumType = new Enum('UserStatus', 'This is description');
    enumType.option('ENABLE');
    enumType.option('DISABLE');
    let expected = '#This is description';
    expected += '\nenum UserStatus {';
    expected += '\n  ENABLE';
    expected += '\n  DISABLE';
    expected += '\n}';
    expect(enumType.toString()).to.contain(expected);
  });

  it('can export graphql schema as string without description', function() {
    const enumType = new Enum('UserStatus');
    enumType.option('ENABLE');
    enumType.option('DISABLE');
    let expected = 'enum UserStatus {';
    expected += '\n  ENABLE';
    expected += '\n  DISABLE';
    expected += '\n}';
    expect(enumType.toString()).to.contain(expected);
  });

  it('can not set resolver to enum type', function() {
    const enumType = new Enum('UserStatus', 'This is description');
    enumType.resolver(Date);
    expect(enumType.getResolver()).to.be(undefined);
  });
});
