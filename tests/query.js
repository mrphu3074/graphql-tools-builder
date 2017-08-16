const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Query } = require('../build');

describe('Graphql Query', function() {
  it('should add param to Query', function() {
    const query = new Query('getUsers');
    expect(query.getParams()).to.have.length(0);
    query.param('name', 'String');
    expect(query.getParams()).to.have.length(1);
  });

  it('should add required param to Query', function() {
    const query = new Query('getUsers');
    expect(query.getParams()).to.have.length(0);
    query.param('name', 'String', true);
    expect(query.getParams()).to.have.length(1);
    expect(query.getParams()[0].toString()).to.contain('name: String');
  });

  it('should add multi params', function() {
    const query = new Query('getUsers');
    expect(query.getParams()).to.have.length(0);
    query.param('name', 'String');
    query.param('email', 'String', true);
    query.param('sort', 'String', true);
    expect(query.getParams()).to.have.length(3);
  });

  it('should not add duplicated param', function() {
    const query = new Query('getUsers');
    query.param('name', 'String');
    try {
      query.param('name', 'String');
    } catch (ex) {
      expect(ex.message).to.contain('Param "name" already exists');
    }
  });

  it('should add ouput to Query', function() {
    const query = new Query('getUsers');
    query.param('name', 'String');
    query.output('[User]');
    expect(query.getOutput()).to.equal('[User]');
  });

  it('should export schema with description', function() {
    const query = new Query('getUsers', 'get all users');
    query
      .param('name', 'String')
      .param('email', 'String', true)
      .output('[User]');

    let expected = '#get all users';
    expected += '\n  getUsers(name: String, email: String!): [User]';
    expect(query.toString()).to.contain(expected);
  });

  it('should export schema without description', function() {
    const query = new Query('getUsers');
    query
      .param('name', 'String')
      .param('email', 'String', true)
      .output('[User]');

    let expected = '';
    expected += '  getUsers(name: String, email: String!): [User]';
    expect(query.toString()).to.contain(expected);
  });

  it('should export schema without params', function() {
    const query = new Query('getUsers');
    query.output('[User]');

    let expected = '';
    expected += '  getUsers: [User]';
    expect(query.toString()).to.contain(expected);
  });

  it('should set resolver', function() {
    const query = new Query('getUsers');
    query
      .param('name', 'String')
      .param('email', 'String', true)
      .output('[User]')
      .resolver(function(root, args, context) {
        return 'hello';
      });

    const resolver = query.getResolver();
    resolver().then(res => {
      expect(res).to.equal('hello');
    });
  });
});
