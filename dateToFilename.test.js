const test = require('ava');
const dateToFilename = require('./dateToFilename');

test('Different dates', t => {
  t.is(
    dateToFilename(new Date('2017-10-10')),
    '10.10.2017.txt',
  );

  t.is(
    dateToFilename(new Date('2017-03-10')),
    '10.03.2017.txt'
  );
});
