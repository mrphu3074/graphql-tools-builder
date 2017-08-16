const { makeExecutableSchema } = require('graphql-tools');
const { Schema, Module } = require('../build/index');

const schema = new Schema();

const product = new Module('Product');

/**
 * Middlewares
 */
function check1(root, args, context) {
  console.log('check 1');
}

function check2(root, args, context) {
  console.log('check 2');
}

function requireAdmin(root, args, context) {
  console.log('check user is admin');
}

function requireRole(role) {
  return function(root, args, context) {
    console.log('check role: ' + role);
  };
}

product
  .createType('Product', 'This is Product')
  .field('_id', 'String')
  .field('name', 'String')
  .field('price', 'Int');

product
  .createQuery('getProducts')
  .param('id', 'Int')
  .output('[String]')
  .use(check1)
  .use(check2)
  .resolver((root, args, context) => {
    return ['item 1', 'item 2', 'item 3'];
  });

product
  .createMutation('createProduct')
  .param('name', 'String', true)
  .param('price', 'Int', true)
  .output('Product')
  .use(requireRole('ADMIN'))
  .resolver((root, { name, price }) => ({ _id: 1, name, price }));

const user = new Module('User');
user
  .createType('User')
  .field('_id', 'String')
  .field('username', 'String')
  .field('password', 'String');

user
  .createInput('CreateUserForm')
  .field('username', 'String', true)
  .field('password', 'String', true);

user
  .createMutation('createUser')
  .param('data', 'CreateUserForm')
  .output('User')
  .use(requireAdmin)
  .resolver((root, args, context) => ({
    _id: 1,
    username: args.data.username,
    password: args.data.password
  }));

schema.addModule(product);
schema.addModule(user);

module.exports = makeExecutableSchema({
  typeDefs: schema.getTypeDefs(),
  resolvers: schema.getResolvers()
});
