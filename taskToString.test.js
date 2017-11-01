const test = require('ava');
const taskToString = require('./taskToString');

test('Simple case', t => {
  t.is(
    taskToString({
      project: 'Inbox',
      task: 'Test',
    }),
    '- [Inbox] Test',
  );
});

test('Task with link', t => {
  t.is(
    taskToString({
      project: 'Checking',
      task: 'https://github.com/ (GitHub)'
    }),
    '- [Checking] [GitHub](https://github.com/)',
  );
});
