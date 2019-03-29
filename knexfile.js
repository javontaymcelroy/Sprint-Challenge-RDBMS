module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/project_tables.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
