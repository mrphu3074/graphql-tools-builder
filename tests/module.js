const { describe, it } = require('mocha');
const expect = require('expect.js');
const { Module } = require('../build');

describe('Graphql Module', function() {
  it('should init instance with default typeDefs and empty resolvers', function() {
    const userModule = new Module('User');
    expect(userModule.getTypeDefs()).to.have.length(2);
    expect(userModule.getResolvers()).to.empty();
  });

  it('createScalar', function() {
    const userModule = new Module('User');
    const scalar = userModule.createScalar('Date').resolver(Date);
    expect(userModule.getTypeDefs()).to.have.contain('scalar Date');
    expect(userModule.getResolvers()).to.have.property('Date');
    expect(userModule.getResolvers()['Date']).to.equal(Date);
  });

  it('should not create duplicated Scalar type', function() {
    const userModule = new Module('User');
    const scalar = userModule.createScalar('Date').resolver(Date);
    try {
      const scalar = userModule.createScalar('Date').resolver(Date);
    } catch (ex) {
      expect(ex.message).to.equal('Scalar Date already exists');
    }
  });

  it('createEnum', function() {
    const userModule = new Module('User');
    const enumType = userModule
      .createEnum('UserStatus')
      .option('ENABLE')
      .option('DISABLE');

    expect(userModule.getTypeDefs()).to.have.contain(
      'enum UserStatus {\n  ENABLE\n  DISABLE\n}'
    );
  });

  it('should not create duplicated Enum type', function() {
    const userModule = new Module('User');
    const enumType = userModule
      .createEnum('UserStatus')
      .option('ENABLE')
      .option('DISABLE');
    try {
      const enumType = userModule
        .createEnum('UserStatus')
        .option('ENABLE')
        .option('DISABLE');
    } catch (ex) {
      expect(ex.message).to.equal('Enum UserStatus already exists');
    }
  });

  it('createType', function() {
    const userModule = new Module('User');
    const userType = userModule
      .createType('User')
      .field('_id', 'String')
      .field('username', 'String')
      .field('password', 'String')
      .resolver({
        creator() {
          return 'hello';
        }
      });

    expect(userModule.getTypeDefs()).to.have.contain(
      'type User {\n  _id: String\n  username: String\n  password: String\n}'
    );
    expect(userModule.getResolvers()).to.have.property('User');
    expect(userModule.getResolvers().User).to.have.property('creator');
    expect(userModule.getResolvers().User.creator()).to.equal('hello');
  });

  it('should not create duplicated type', function() {
    const userModule = new Module('User');
    const userType = userModule
      .createType('User')
      .field('_id', 'String')
      .field('username', 'String')
      .field('password', 'String')
      .resolver({
        creator() {
          return 'hello';
        }
      });

    try {
      const userType = userModule
        .createType('User')
        .field('_id', 'String')
        .field('username', 'String')
        .field('password', 'String')
        .resolver({
          creator() {
            return 'hello';
          }
        });
    } catch (ex) {
      expect(ex.message).to.equal('Type User already exists');
    }
  });

  it('createInput', function() {
    const userModule = new Module('User');
    const userType = userModule
      .createInput('UserForm')
      .field('username', 'String', true)
      .field('password', 'String', true)
      .resolver({
        creator() {
          return 'hello';
        }
      });

    expect(userModule.getTypeDefs()).to.have.contain(
      'input UserForm {\n  username: String!\n  password: String!\n}'
    );
    expect(userModule.getResolvers()).to.not.have.property('UserForm');
  });

  it('should not create duplicated Input', function() {
    const userModule = new Module('User');
    const userType = userModule
      .createInput('UserForm')
      .field('username', 'String', true)
      .field('password', 'String', true)
      .resolver({
        creator() {
          return 'hello';
        }
      });

    try {
      const userType = userModule
        .createInput('UserForm')
        .field('username', 'String', true)
        .field('password', 'String', true)
        .resolver({
          creator() {
            return 'hello';
          }
        });
    } catch (ex) {
      expect(ex.message).to.equal('Input UserForm already exists');
    }
  });

  it('createQuery', function() {
    const userModule = new Module('User');
    const query = userModule
      .createQuery('getUser')
      .param('id', 'String', true)
      .output('User')
      .resolver(function() {
        return 'hello';
      });

    expect(userModule.getTypeDefs()).to.contain(
      'extend type Query {\n  getUser(id: String!): User\n}'
    );

    expect(userModule.getResolvers()).to.have.property('Query');
    expect(userModule.getResolvers().Query).to.have.property('getUser');
    expect(userModule.getResolvers().Query.getUser()).to.equal('hello');
  });

  it('should not create duplicated Query', function() {
    const userModule = new Module('User');
    const query = userModule
      .createQuery('getUser')
      .param('id', 'String', true)
      .output('User')
      .resolver(function() {
        return 'hello';
      });

    try {
      const query = userModule
        .createQuery('getUser')
        .param('id', 'String', true)
        .output('User')
        .resolver(function() {
          return 'hello';
        });
    } catch (ex) {
      expect(ex.message).to.equal('Query getUser already exists');
    }
  });

  it('createMutation', function() {
    const userModule = new Module('User');
    const query = userModule
      .createMutation('createUser')
      .param('username', 'String', true)
      .param('password', 'String', true)
      .output('User')
      .resolver(function() {
        return 'hello';
      });

    expect(userModule.getTypeDefs()).to.contain(
      'extend type Mutation {\n  createUser(username: String!, password: String!): User\n}'
    );

    expect(userModule.getResolvers()).to.have.property('Mutation');
    expect(userModule.getResolvers().Mutation).to.have.property('createUser');
    expect(userModule.getResolvers().Mutation.createUser()).to.equal('hello');
  });

  it('should not create duplicated Mutation', function() {
    const userModule = new Module('User');
    const query = userModule
      .createMutation('createUser')
      .param('username', 'String', true)
      .param('password', 'String', true)
      .output('User')
      .resolver(function() {
        return 'hello';
      });

    try {
      const query = userModule
        .createMutation('createUser')
        .param('username', 'String', true)
        .param('password', 'String', true)
        .output('User')
        .resolver(function() {
          return 'hello';
        });
    } catch (ex) {
      expect(ex.message).to.equal('Mutation createUser already exists');
    }
  });
});
