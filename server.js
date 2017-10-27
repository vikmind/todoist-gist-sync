const port = process.env.PORT || 3000;

require('micro')(
  require('./index')
).listen(port);

console.log(`Listening at port ${port}`)
