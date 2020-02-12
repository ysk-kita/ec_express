exports.up = function(knex, Promise) {
  console.log('users migrate');
  return knex.schema.hasTable('users').then(function(exists) {
      if (!exists) {
          return knex.schema.createTable('users', function(table) {
              table.increments('id').primary();
              table.string('name', 100);
              table.string('password');
              table.string('mail');
          });
      }else{
          return new Error("The table already exists");
      }
  });
};

exports.down = function(knex, Promise) {
    console.log('users rollback');
  return knex.schema.hasTable('users').then(function(exists) {
      if (exists) {
          return knex.schema.dropTable('users');
      }
  });
};
