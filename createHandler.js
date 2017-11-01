module.exports = function({
  micro,
  taskToString,
  gh,
  hookKey,
  hookUrl,
}){
  return async function(req) {
    if (false
        || req.method !== 'POST'
        || req.url !== `/${hookUrl}`
        || req.headers['content-type'] !== 'application/json'
    ){
      return 'Nope';
    }

    let error = null;
    const data = await micro.json(req).catch(e => error = e);
    if (error) return 'Wrong json';

    if (data.key !== hookKey) return 'Nope: wrong key';

    const result = await gh.append(taskToString(data));
    if (result === 'ok') return 'Yay!';

    return 'Nope: GitHub problem';
  };
};
