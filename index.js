require('dotenv-safe').load({
  allowEmptyValues: true,
});
const { json } = require('micro');

module.exports = async function(req, res){
  console.log(req.headers);
  if( req.method === 'POST' &&
      req.url === `/${process.env.HOOK_URL}` &&
      req.headers['content-type'] === 'application/json' &&
      req.headers.key === process.env.HOOK_KEY)
  {
    const data = await json(req);
    console.log(data);
    res.end('Yay!');
  }
  res.end('Nope');
}
