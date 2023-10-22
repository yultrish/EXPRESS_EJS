exports.seed = function (knex) {

  return knex('users')
  //delete existing entries
  .del()
  .then(function () {
      // insert seed entries
      return knex('users').insert([
          {username: 'yultrish', email: 'yultrish@gmail.com', password: 'yult123'}
      ]);
  });
  };