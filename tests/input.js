const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Input } = require('../build');

describe('Graphql Object Input', function() {
  it('should add field to Input', function() {
    const user = new Input('CreateUserForm');
    expect(user.getFields()).to.have.length(0);
    user.field('_id', 'String');
    expect(user.getFields()).to.have.length(1);
  });

  it('should add required field to Input', function() {
    const user = new Input('CreateUserForm');
    expect(user.getFields()).to.have.length(0);
    user.field('_id', 'String', true);
    expect(user.getFields()).to.have.length(1);
    expect(user.getFields()[0].required).to.be(true);
  });

  it('should add multi fields', function() {
    const user = new Input('CreateUserForm');
    expect(user.getFields()).to.have.length(0);
    user.field('_id', 'String', true);
    user.field('name', 'String', true);
    expect(user.getFields()).to.have.length(2);
  });

  it('should not add duplicated field', function() {
    const user = new Input('CreateUserForm');
    user.field('name', 'String', true);
    try {
      user.field('name', String);
    } catch (ex) {
      expect(ex.message).to.contain('Field "name" already exists');
    }
  });
  it('should export schema with description', function() {
    const user = new Input('CreateUserForm', 'Data input when create user');
    user.field('name', 'String', true);

    let expected = '#Data input when create user';
    expected += '\ninput CreateUserForm {';
    expected += '\n  name: String!';
    expected += '\n}';
    expect(user.toString()).to.contain(expected);
  });

  it('should export schema without description', function() {
    const user = new Input('CreateUserForm');
    user.field('name', 'String', true);

    let expected = 'input CreateUserForm {';
    expected += '\n  name: String!';
    expected += '\n}';
    expect(user.toString()).to.contain(expected);
  });

  it('should set resolver', function() {
    const user = new Input('User');
    user.field('name', 'String', true).resolver(Date);

    expect(user.getResolver()).to.equal(undefined);
  });
});
