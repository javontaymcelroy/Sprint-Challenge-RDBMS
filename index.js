// ================================= DEPENDANCIES ================================== //
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();
// ================================= USES ================================== //
server.use(express.json());
server.use(helmet());

// ================================= DEPENDANCIES ================================== //
server.get('/', (req, res) => {
  res.send('API Running, AAAYYYYEEE!');
});

// ================================= ENDPOINTS ================================== //

// --- (POST) MALONE --- //
server.post('/api/projects', (req, res) => {
  const project = req.body;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage:
        'Soooo, you just not gonna give your Project a name? How Im suppose to know what it is then...'
    });
    return;
  }

  db.insert(project)
    .into('projects')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/actions', (req, res) => {
  const action = req.body;
  const { description } = req.body;
  if (!description) {
    res.status(400).json({
      errorMessage:
        'You need an action description... Please enter the name and try again, please!'
    });
    return;
  }

  db.insert(action)
    .into('actions')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// --- (GET) ME BODIES --- //
server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  db('projects')
    .where('id', '=', id)
    .then(project => {
      if (project.length === 0) {
        res.status(401).json({
          message: 'The project with the ID does not exist.'
        });
        return;
      }

      db('actions')
        .where('project_id', '=', id)
        .then(actions => {
          console.log(actions);
          project[0].actions = actions;
          res.status(200).json(project);
        })
        .catch(err => {
          console.error('error', err);
          res.status(500).json({
            error: 'Dat project information could not be found, sowwy!'
          });
        });
    })
    .catch(err => {
      console.error('error', err);
      res
        .status(500)
        .json({ error: 'Dat project information could not be found, sowwy!' });
    });
});

server.get('/api/projects', (req, res) => {
  db('projects')
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});
server.get('/api/actions', (req, res) => {
  db('actions')
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;

  db('actions')
    .where('id', '=', id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: 'Dat action does not exist.'
        });
        return;
      }
      res.status(200).json(action);
    })
    .catch(err => {
      console.error('error', err);
      res
        .status(500)
        .json({ error: 'Dat action information could not be found, sowwy!' });
    });
});

// --- (DELETES) TO THE LEFTS TO THE LEFTS --- //
server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  db('projects')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;

  db('actions')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// --- (PUT) A RING ON IT --- //
server.put('/api/projects/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('projects')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
server.put('/api/actions/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('actions')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 5000;
server.listen(port, function() {
  console.log(`\n API Listening on http://localhost:${port}\n`);
});
