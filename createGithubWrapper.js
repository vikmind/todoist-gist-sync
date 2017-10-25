module.exports = function({ GitHub, token, gistId }) {
  const gh = new GitHub({
    token,
  });
  const gistObject = gh.getGist(gistId);
  const todayFn = () => {
    const date = new Date();
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.txt`;
  };

  return {
    append: async function(string) {
      const gist = await(gistObject.read());
      const files = {
        ...gist.data.files,
      };
      const today = todayFn();
      if (!!files[today]) {
        files[today].content = `${files[today].content}\n${string}`;
      } else {
        files[today] = {
          content: string,
        };
      }
      return gistObject.update({ files })
        .then(() => 'ok')
        .catch(e => `Error: ${e.message}`);
    }
  };
};