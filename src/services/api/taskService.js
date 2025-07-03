import tasksData from '@/services/mockData/tasks.json';

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index !== -1) {
      const updatedTask = {
        ...tasks[index],
        ...updates,
        completedAt: updates.completed ? new Date().toISOString() : null
      };
      tasks[index] = updatedTask;
      return { ...updatedTask };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    return false;
  },

  async getByCategory(categoryId) {
    await delay(300);
    return tasks.filter(task => task.categoryId === parseInt(categoryId));
  },

  async getByPriority(priority) {
    await delay(300);
    return tasks.filter(task => task.priority === priority);
  },

  async toggleComplete(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : null;
      return { ...task };
    }
    return null;
  }
};