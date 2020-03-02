
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('cart').then(function(exists) {
      if (!exists) {
          return knex.schema.createTable('cart', function(table) {
              // テーブル作成時に文字コードを設定
              table.charset('utf8');
              table.increments('id').primary();
              table.string('user');
              table.string('itemId');
              table.integer('quantity');
          });
      }else{
          return new Error("The table already exists.");
      }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.hasTable('cart').then(function(exists) {
      if (exists) {
          return knex.schema.dropTable('cart');
      }
  });
};
