const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Mutation } = require('../build');

describe('Graphql Mutation', function() {
  it('should add param to Mutation', function() {
    const mutation = new Mutation('getUsers');
    expect(mutation.getParams()).to.have.length(0);
    mutation.param('name', 'String');
    expect(mutation.getParams()).to.have.length(1);
  });

  it('should add required param to Mutation', function() {
    const mutation = new Mutation('getUsers');
    expect(mutation.getParams()).to.have.length(0);
    mutation.param('name', 'String', true);
    expect(mutation.getParams()).to.have.length(1);
    expect(mutation.getParams()[0].toString()).to.contain('name: String');
  });

  it('should add multi params', function() {
    const mutation = new Mutation('getUsers');
    expect(mutation.getParams()).to.have.length(0);
    mutation.param('name', 'String');
    mutation.param('email', 'String', true);
    mutation.param('sort', 'String', true);
    expect(mutation.getParams()).to.have.length(3);
  });

  it('should not add duplicated param', function() {
    const mutation = new Mutation('getUsers');
    mutation.param('name', 'String');
    try {
      mutation.param('name', 'String');
    } catch (ex) {
      expect(ex.message).to.contain('Param "name" already exists');
    }
  });

  it('should add ouput to Mutation', function() {
    const mutation = new Mutation('getUsers');
    mutation.param('name', 'String');
    mutation.output('[User]');
    expect(mutation.getOutput()).to.equal('[User]');
  });

  it('should export schema with description', function() {
    const mutation = new Mutation('getUsers', 'get all users');
    mutation
      .param('name', 'String')
      .param('email', 'String', true)
      .output('[User]');

    let expected = '#get all users';
    expected += '\n  getUsers(name: String, email: String!): [User]';
    expect(mutation.toString()).to.contain(expected);
  });

  it('should export schema without description', function() {
    const mutation = new Mutation('getUsers');
    mutation
      .param('name', 'String')
      .param('email', 'String', true)
      .output('[User]');

    let expected = '';
    expected += '  getUsers(name: String, email: String!): [User]';
    expect(mutation.toString()).to.contain(expected);
  });

  it('should export schema without params', function() {
    const mutation = new Mutation('getUsers');
    mutation.output('[User]');

    let expected = '';
    expected += '  getUsers: [User]';
    expect(mutation.toString()).to.contain(expected);
  });

  it('should set resolver', function() {
    const mutation = new Mutation('getUsers');
    mutation
      .param('name', 'String')
      .param('email', 'String', true)
      .output('[User]')
      .resolver(() => {
        return 'hello';
      });
    const resolver = mutation.getResolver();
    resolver().then(res => {
      expect(res).to.equal('hello');
    });
  });
});
