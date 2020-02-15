
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {name: 'うなぎのかば焼き', img_alt: 'img', img: 'images/item01.png', price: '1000', new_item: 1},
        {name: 'バーベキューセット', img_alt: 'img', img: 'images/item02.png', price: '3000', new_item: 0},
        {name: 'カップラーメン', img_alt: 'img', img: 'images/item03.png', price: '150', new_item: 0},
        {name: '豚骨ラーメン', img_alt: 'img', img: 'images/item04.png', price: '600', new_item: 1},
        {name: '色々セット', img_alt: 'img', img: 'images/item05.png', price: '2000', new_item: 0},
      ]);
    });
};
