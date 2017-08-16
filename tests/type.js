const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Type } = require('../build');

describe('Graphql Object Type', function() {
  it('should add field to Type', function() {
    const user = new Type('User');
    expect(user.getFields()).to.have.length(0);
    user.field('_id', 'String');
    expect(user.getFields()).to.have.length(1);
  });

  it('should add required field to Type', function() {
    const user = new Type('User');
    expect(user.getFields()).to.have.length(0);
    user.field('_id', 'String', true);
    expect(user.getFields()).to.have.length(1);
    expect(user.getFields()[0].required).to.be(true);
  });

  it('should add multi fields', function() {
    const user = new Type('User');
    expect(user.getFields()).to.have.length(0);
    user.field('_id', 'String', true);
    user.field('name', 'String', true);
    expect(user.getFields()).to.have.length(2);
  });

  it('should not add duplicated field', function() {
    const user = new Type('User');
    user.field('name', 'String', true);
    try {
      user.field('name', String);
    } catch (ex) {
      expect(ex.message).to.contain('Field "name" already exists');
    }
  });
  it('should export schema with description', function() {
    const user = new Type('User', 'User type');
    user.field('name', 'String', true);

    let expected = '#User type';
    expected += '\ntype User {';
    expected += '\n  name: String!';
    expected += '\n}';
    expect(user.toString()).to.contain(expected);
  });

  it('should export schema without description', function() {
    const user = new Type('User');
    user.field('name', 'String', true);

    let expected = 'type User {';
    expected += '\n  name: String!';
    expected += '\n}';
    expect(user.toString()).to.contain(expected);
  });

  it('should set resolver', function() {
    const user = new Type('User');
    const typeResolver = {
      creator() {
        return 'hello';
      }
    };
    user
      .field('_id', 'String', true)
      .field('name', 'String', true)
      .field('email', 'String', true)
      .resolver(typeResolver);

    expect(user.getResolver()).to.equal(typeResolver);
  });
});
