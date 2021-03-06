
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('items').then(function(exists) {
      if (!exists) {
          return knex.schema.createTable('items', function(table) {
              // テーブル作成時に文字コードを設定
              table.charset('utf8');
              table.increments('id').primary();
              table.string('name', 100);
              table.string('img_alt');
              table.string('img');
              table.integer('price');
              table.integer('new_item');
          });
      }else{
          return new Error("The table already exists.");
      }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.hasTable('items').then(function(exists) {
      if (exists) {
          return knex.schema.dropTable('items');
      }
  });
};
