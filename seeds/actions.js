exports.seed = function(knex) {
  return knex('actions')
    .del()
    .then(function() {
      return knex('actions').insert([
        {
          action_description: 'paint',
          action_notes: 'mix paint',
          completed: 'true',
          project_id: '1'
        },
        {
          action_description: 'dance',
          action_notes: 'learn some choreo',
          completed: 'true',
          project_id: '1'
        },
        {
          action_description: 'movie',
          action_notes: 'write a screenplay to something.',
          completed: 'true',
          project_id: '2'
        },
        {
          action_description: 'sing',
          action_notes: 'win a Grammy',
          completed: 'true',
          project_id: '2'
        },
        {
          action_description: 'act',
          action_notes: 'win an Oscar',
          completed: 'true',
          project_id: '3'
        },
        {
          action_description: 'retire',
          action_notes: 'as if...but try to retire at 30 lol',
          completed: 'true',
          project_id: '3'
        }
      ]);
    });
};
