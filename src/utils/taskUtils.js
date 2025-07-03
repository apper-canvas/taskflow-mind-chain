export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return '#FF6B6B';
    case 'medium':
      return '#FFB84D';
    case 'low':
      return '#4ECB71';
    default:
      return '#9CA3AF';
  }
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'High Priority';
    case 'medium':
      return 'Medium Priority';
    case 'low':
      return 'Low Priority';
    default:
      return 'No Priority';
  }
};

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...tasks].sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const groupTasksByCategory = (tasks, categories) => {
  const grouped = {};
  
  categories.forEach(category => {
    grouped[category.Id] = {
      category,
      tasks: tasks.filter(task => task.categoryId === category.Id)
    };
  });
  
  return grouped;
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < new Date() && 
    !task.completed
  ).length;
  
  return {
    total,
    completed,
    pending,
    overdue,
    completionRate: total > 0 ? (completed / total) * 100 : 0
  };
};