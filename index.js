require('dotenv-safe').load();
const taskToString = require('./taskToString');

const gh = require('./createGithubWrapper')({
  GitHub: require('github-api'),
  token:  process.env.GITHUB_KEY,
  gistId: process.env.GIST_ID,
});

const handler = require('./createHandler')({
  micro: require('micro'),
  taskToString,
  gh,
  hookKey: process.env.HOOK_KEY,
  hookUrl: process.env.HOOK_URL,
});

module.exports = handler;
