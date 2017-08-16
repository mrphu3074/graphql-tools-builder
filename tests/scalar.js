const { describe, it } = require('mocha');
const assert = require('assert');
const { Scalar } = require('../build/scalar');

describe('Graphql Scalar Type', function() {
  it('can add new scalar type', function() {
    const scalarType = new Scalar('Date');
    assert.equal(scalarType.getName(), 'Date');
  });

  it('can export graphql schema as string', function() {
    const scalarType = new Scalar('Date');
    assert.equal(scalarType.toString(), 'scalar Date');
  });

  it('can export graphql schema as string with description', function() {
    const scalarType = new Scalar('Date', 'Custom type');
    assert.equal(scalarType.toString(), '#Custom type\nscalar Date');
  });

  it('can add resolver', function() {
    const scalarType = new Scalar('Date');
    const resolver = {value: 1}
    scalarType.resolver(resolver);
    assert.equal(scalarType.getResolver(), resolver);
  });
});
