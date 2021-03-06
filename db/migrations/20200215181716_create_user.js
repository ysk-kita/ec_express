
exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
        return knex.schema.createTable('users', function(table) {
            // テーブル作成時に文字コードを設定
            table.charset('utf8');
            table.increments('id').primary();
            table.string('name', 100);
            table.string('mail').unique();
            table.string('password');
        });
    }else{
        return new Error("The table already exists.");
    }
});
};

exports.down = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (exists) {
        return knex.schema.dropTable('users');
    }
});
};
