exports.seed = function (knex) {

  return knex('user')
  .del()
  .then(function () {
      // insert seed entries
      return knex('user').insert([
          {username: 'yultrish', email: 'yultrish@gmail.com'}
      ]);
  });
  };