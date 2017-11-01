module.exports = function({
  GitHub,
  dateToFilename,
  token,
  gistId,
}) {
  const gh = new GitHub({
    token,
  });
  const gistObject = gh.getGist(gistId);

  return {
    append: async function(string) {
      const gist = await gistObject.read();
      const files = {
        ...gist.data.files,
      };
      const today = dateToFilename(new Date());
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
