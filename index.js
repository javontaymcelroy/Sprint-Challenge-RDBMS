// ======================= REQUIRES =========================== //
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
// ======================= DEFINES =========================== //
const db = require('./data/helper.js');
const server = express();

server.use(helmet());
server.use(express.json());

// ======================= PROJECTS =========================== //

// GET ALL ===================================================//
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await db('projects');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET =======================================================//
server.get('/api/projects/:id', async (req, res) => {
  const id = req.params.id;
  db.getProjectByIdWithActions(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'project is not found' });
      }
    })
    .catch(err => console.log('error', err));
});

// POST =====================================================//
server.post('/api/projects', async (req, res) => {
  try {
    const [id] = await db('projects').insert(req.body);

    const project = await db('projects')
      .where({ id })
      .first();

    res.status(201).json(project);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

// PUT =======================================================//
server.put('/api/projects/:id', async (req, res) => {
  try {
    const count = await db('projects')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const project = await db('projects')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// DELETE ===================================================//
server.delete('/api/projects/:id', async (req, res) => {
  try {
    const count = await db('projects')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// ======================= ACTIONS =========================== //

// GET ALL ===================================================//
server.get('/api/actions', (req, res) => {
  db.getActions()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => res.status(500).json(err));
});

// POST =====================================================//
server.post('/api/actions', async (req, res) => {
  db.addAction(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => res.status(500).json(err));
});

// DELETE ===================================================//
server.delete('/api/actions/:id', async (req, res) => {
  try {
    const count = await db('actions')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'action not found' });
    }
  } catch (error) {}
});

// ======================= SERVER =========================== //
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
