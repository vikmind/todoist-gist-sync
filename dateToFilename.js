module.exports = (date) => {
  // 25.10.2017.txt
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day < 10 ? 0 : ''}${day}.${month < 10 ? 0 : ''}${month}.${date.getFullYear()}.txt`;
}
