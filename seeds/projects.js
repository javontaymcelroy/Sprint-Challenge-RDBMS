exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function() {
      return knex('projects').insert([
        {
          project_name: 'Project 1',
          project_description: 'Finish Lambda',
          completed: 'true'
        },
        {
          project_name: 'Project 2',
          project_description: 'Apply for Jobs',
          completed: 'false'
        },
        {
          project_name: 'Project 3',
          project_description: 'GET HIRED',
          completed: 'false'
        }
      ]);
    });
};
