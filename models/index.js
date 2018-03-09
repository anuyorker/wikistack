const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: Sequelize.STRING,
  urlTitle: Sequelize.STRING,
  content: ,
  status:
});

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
