import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseISO, isPast, compareDesc, compareAsc } from 'date-fns';
import TaskItem from '@/components/molecules/TaskItem';
import FilterBar from '@/components/molecules/FilterBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const TaskList = ({ 
  tasks, 
  categories, 
  loading, 
  error, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  selectedCategory,
  onRetry,
  isViewMode = false
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(task => task.categoryId === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    switch (activeFilter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(task => 
          task.dueDate && isPast(parseISO(task.dueDate)) && !task.completed
        );
        break;
      default:
        break;
    }

    // Sort tasks
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
        
case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'created':
          return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
        
        case 'title':
          return a.title.localeCompare(b.title);
        
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, selectedCategory, searchQuery, activeFilter, sortBy]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  const getEmptyStateProps = () => {
    if (searchQuery.trim()) {
      return {
        title: "No tasks found",
        description: `No tasks match your search for "${searchQuery}". Try adjusting your search terms.`,
        icon: "Search",
        actionText: "Clear Search",
        onAction: () => setSearchQuery('')
      };
    }

    if (selectedCategory) {
      const category = categories.find(cat => cat.Id === selectedCategory);
      return {
        title: `No ${category?.name || 'category'} tasks`,
        description: `You haven't created any tasks in this category yet. Start organizing your ${category?.name?.toLowerCase()} tasks!`,
        icon: category?.icon || "FolderOpen"
      };
    }

    if (activeFilter === 'completed') {
      return {
        title: "No completed tasks",
        description: "You haven't completed any tasks yet. Complete some tasks to see them here!",
        icon: "CheckCircle"
      };
    }

    if (activeFilter === 'overdue') {
      return {
        title: "No overdue tasks",
        description: "Great! You're staying on top of your deadlines. Keep up the good work!",
        icon: "Clock",
        actionText: "View All Tasks",
        onAction: () => setActiveFilter('all')
      };
    }

    return {
      title: "No tasks yet",
      description: "Start by creating your first task to get organized and boost your productivity!",
      icon: "Plus"
    };
  };

return (
    <div className="space-y-6">
      {!isViewMode && (
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <AnimatePresence mode="wait">
        {filteredAndSortedTasks.length === 0 ? (
          <Empty {...getEmptyStateProps()} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredAndSortedTasks.map(task => (
              <TaskItem
                key={task.Id}
                task={task}
                categories={categories}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;