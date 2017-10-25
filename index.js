require('dotenv-safe').load();
const { json } = require('micro');

const taskToString = require('./taskToString');

const gh = require('./createGithubWrapper')({
  GitHub: require('github-api'),
  token: process.env.GITHUB_KEY,
  gistId: process.env.GIST_ID,
});

module.exports = async function(req, res){
  if (false
      || req.method !== 'POST'
      || req.url !== `/${process.env.HOOK_URL}`
      || req.headers['content-type'] !== 'application/json'
  ){
    return 'Nope';
  }

  let error = null;
  const data = await json(req).catch(e => error = e);
  if (error) return 'Wrong json';
  if (data.key !== process.env.HOOK_KEY) return 'Nope';

  const result = await gh.append(taskToString(data));
  if (result === 'ok') {
    return 'Yay!';
  }

  return 'Nope';
}
