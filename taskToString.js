module.exports = (json) => {
  const project = json.project;
  const taskUrlMatch = json.task.match(/(https?\:\/\/.+)\s\((.+)\)/);
  let taskText = '';
  if (taskUrlMatch) {
    taskText = `[${taskUrlMatch[2]}](${taskUrlMatch[1]})`;
  } else {
    taskText = json.task;
  }
  return `- [${project}] ${taskText}`;
}
