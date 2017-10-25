module.exports = (json) => {
  const project = json.project;
  const taskUrlMatch = json.task.match(/(https?\:\/\/.+)\s\((.+)\)/);

  let taskText = '';
  if (taskUrlMatch) {
    // Convert to markdown URL if task contains URL
    taskText = `[${taskUrlMatch[2]}](${taskUrlMatch[1]})`;
  } else {
    taskText = json.task;
  }
  return `- [${project}] ${taskText}`;
}
