const test = require('ava');
const createGithubWrapper = require('./createGithubWrapper');

const dateToFilenameAppend = () => '10.10.2017.txt';
const dateToFilenameNew = () => '11.10.2017.txt';
const token = 'TOKEN';
const gistId = 'GIST';
const gistReadReturn = () => Promise.resolve({
  data: {
    files: {
      '10.10.2017.txt': { content: '- [Work] One task' },
    },
  },
});

test('Error flow', async t => {
  class GitHubWithFailure {
    getGist(gistID) {
      return {
        update({ files }){
          return Promise.reject(new Error('Some error'));
        },
        read(){
          return Promise.resolve({ data: { files: {} } });
        },
      };
    }
  };
  const wrapper = createGithubWrapper({
    GitHub: GitHubWithFailure,
    dateToFilename: dateToFilenameAppend,
    token,
    gistId
  });
  const error = await wrapper.append('string');
  t.is(error, 'Error: Some error')
});

test('Success flow with existing file', async t => {
  class GitHubWithSuccessAppend {
    getGist(gistID) {
      return {
        update({ files }){
          t.true(files['10.10.2017.txt'].content.includes('- [Inbox] Tes'))
          return Promise.resolve();
        },
        read(){ return  gistReadReturn() },
      };
    }
  };
  const wrapper = createGithubWrapper({
    GitHub: GitHubWithSuccessAppend,
    dateToFilename: dateToFilenameAppend,
    token,
    gistId,
  });
  const result = await wrapper.append('- [Inbox] Test');
  t.is(result, 'ok');
});

test('Success flow with new file', async t => {
  class GitHubWithSuccessNew {
    getGist(gistID) {
      return {
        update({ files }){
          t.false(files['10.10.2017.txt'].content.includes('- [Inbox] Tes'))
          t.true(files['11.10.2017.txt'].content.includes('- [Inbox] Test'))
          return Promise.resolve();
        },
        read(){ return  gistReadReturn() },
      };
    }
  };
  const wrapper = createGithubWrapper({
    GitHub: GitHubWithSuccessNew,
    dateToFilename: dateToFilenameNew,
    token,
    gistId,
  });
  const result = await wrapper.append('- [Inbox] Test');
  t.is(result, 'ok');
});
