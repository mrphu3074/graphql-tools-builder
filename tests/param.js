const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Query } = require('../build');

describe('Param', function() {
  it('should init param with all fields', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('name');
    expect(params[0]).to.have.property('type');
    expect(params[0]).to.have.property('description');
    expect(params[0]).to.have.property('required');
    expect(params[0].name).to.equal('_id');
    expect(params[0].type).to.equal('String');
    expect(params[0].required).to.equal(true);
    expect(params[0].description).to.equal('user id');
  });

  it('getName()', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getName');
    expect(params[0].getName()).to.equal('_id');
  });

  it('setName(name: string)', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getName');
    expect(params[0].getName()).to.equal('_id');
    params[0].setName('username');
    expect(params[0].getName()).to.equal('username');
  });

  it('getType()', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getType');
    expect(params[0].getType()).to.equal('String');
  });

  it('setType(type: string)', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getType');
    expect(params[0].getType()).to.equal('String');
    params[0].setType('Int');
    expect(params[0].getType()).to.equal('Int');
  });

  it('getRequired()', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getRequired');
    expect(params[0].getRequired()).to.equal(true);
  });

  it('setRequired(required: boolean)', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getRequired');
    expect(params[0].getRequired()).to.equal(true);
    params[0].setRequired(false);
    expect(params[0].getRequired()).to.equal(false);
  });

  it('getDescription()', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getDescription');
    expect(params[0].getDescription()).to.equal('user id');
  });

  it('setDescription(required: boolean)', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    expect(params[0]).to.have.property('getDescription');
    expect(params[0].getDescription()).to.equal('user id');
    params[0].setDescription('user identity');
    expect(params[0].getDescription()).to.equal('user identity');
  });

  it('clone', function() {
    const query = new Query('getUser');
    query.param('_id', 'String', true, 'user id');
    const params = query.getParams();
    expect(params).to.have.length(1);
    const field1 = params[0]
    const field2 = field1.clone();
    field2.setName('username');
    field2.setType('Int');

    expect(field1.getName()).to.equal('_id');
    expect(field1.getType()).to.equal('String');
    expect(field2.getName()).to.equal('username');
    expect(field2.getType()).to.equal('Int');
  });
});
