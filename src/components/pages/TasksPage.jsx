import { useState } from 'react';
import { motion } from 'framer-motion';
import TaskQuickAdd from '@/components/molecules/TaskQuickAdd';
import TaskList from '@/components/organisms/TaskList';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';

const TasksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleComplete,
    refetch: refetchTasks 
  } = useTasks();
  
  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useCategories();

  const loading = tasksLoading || categoriesLoading;
  const error = tasksError || categoriesError;

  const handleAddTask = async (taskData) => {
    await createTask(taskData);
  };

  const handleToggleComplete = async (taskId) => {
    await toggleComplete(taskId);
  };

  const handleEditTask = async (taskId, updates) => {
    await updateTask(taskId, updates);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleRetry = () => {
    refetchTasks();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
          Your Tasks
        </h1>
        <p className="text-gray-600">
          Stay organized and productive with your daily tasks
        </p>
      </div>

      <TaskQuickAdd 
        onAddTask={handleAddTask}
        categories={categories}
      />

      <TaskList
        tasks={tasks}
        categories={categories}
        loading={loading}
        error={error}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        selectedCategory={selectedCategory}
        onRetry={handleRetry}
      />
    </motion.div>
  );
};

export default TasksPage;