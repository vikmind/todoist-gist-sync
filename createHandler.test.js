const test = require('ava');
const createHandler = require('./createHandler');

const micro = {
  json: (req) => new Promise((resolve, reject) => {
    if (typeof(req.body) === 'object') {
      resolve(req.body);
    } else {
      reject(new Error('Wrong data'));
    }
  }),
};

const taskToString = data => 'string';
const ghSuccess = { append: string => Promise.resolve('ok') }
const ghFailure = { append: string => Promise.resolve('error') }
const hookKey = 'HOOK_KEY';
const hookUrl = 'HOOK_URL';
const rightRequest = {
  method: 'POST',
  url: `/${hookUrl}`,
  headers: { 'content-type': 'application/json' },
};

test('Request check', async t => {
  const handler = createHandler({
    micro,
    taskToString,
    gh: ghSuccess,
    hookKey,
    hookUrl,
  });
  t.is(
    await handler({
      ...rightRequest,
      method: 'GET',
    }),
    'Nope',
    'Wrong method',
  );
  t.is(
    await handler({
      ...rightRequest,
      url: '/randomString',
    }),
    'Nope',
    'Wrong URL',
  );
  t.is(
    await handler({
      ...rightRequest,
      headers: {},
    }),
    'Nope',
    'Wrong headers',
  );
  t.not(
    await handler(rightRequest),
    'Nope',
    'Request check passed',
  );
})

test('Request parsing', async t => {
  const handler = createHandler({
    micro,
    taskToString,
    gh: ghSuccess,
    hookKey,
    hookUrl,
  });
  t.is(
    await handler({
      ...rightRequest,
      body: 'string',
    }),
    'Wrong json',
  );
  t.not(
    await handler({
      ...rightRequest,
      body: { is: 'object' },
    }),
    'Wrong json',
  );
});

test('Key validation', async t => {
  const handler = createHandler({
    micro,
    taskToString,
    gh: ghSuccess,
    hookKey,
    hookUrl,
  });
  t.is(
    await handler({
      ...rightRequest,
      body: {
        key: 'WRONG_KEY',
      },
    }),
    'Nope: wrong key',
    'Wrong key',
  );
  t.not(
    await handler({
      ...rightRequest,
      body: { key: hookKey },
    }),
    'Nope: wrong key',
    'Right key',
  );
});

test('GitHub error', async t => {
  const handler = createHandler({
    micro,
    taskToString,
    gh: ghFailure,
    hookKey,
    hookUrl,
  });
  t.is(
    await handler({
      ...rightRequest,
      body: { key: hookKey },
    }),
    'Nope: GitHub problem',
  );
});

test('Successfully', async t => {
  const handler = createHandler({
    micro,
    taskToString: function(data) {
      t.is(data.task, 'Successfully');
      t.is(data.project, 'Inbox')
      return data.task;
    },
    gh: ghSuccess,
    hookKey,
    hookUrl,
  });
  t.is(
    await handler({
      ...rightRequest,
      body: {
        key: hookKey,
        task: 'Successfully',
        project: 'Inbox',
      },
    }),
    'Yay!'
  );
});
