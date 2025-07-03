import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, isToday, isPast, parseISO } from 'date-fns';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskItem = ({ task, categories, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);

  const category = categories.find(cat => cat.Id === task.categoryId);
  const isOverdue = task.dueDate && isPast(parseISO(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(parseISO(task.dueDate));

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      await onToggleComplete(task.Id);
      
      if (!task.completed) {
        toast.success('Task completed! 🎉');
      }
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (editTitle.trim() === task.title) {
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      await onEdit(task.Id, { title: editTitle.trim() });
      setIsEditing(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
      setEditTitle(task.title);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        await onDelete(task.Id);
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-accent';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-gray-300';
    }
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = parseISO(dateStr);
    
    if (isToday(date)) {
      return 'Today';
    }
    
    return format(date, 'MMM dd');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`task-card priority-border ${getPriorityColor(task.priority)} ${task.completed ? 'completed' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={loading}
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyPress={handleKeyPress}
              className="w-full bg-transparent border-none outline-none text-gray-900 font-medium"
              autoFocus
            />
          ) : (
            <h3 
              className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </h3>
          )}
          
          <div className="flex items-center space-x-2 mt-1">
            {category && (
              <span 
                className="category-pill text-xs"
                style={{ 
                  backgroundColor: `${category.color}20`,
                  color: category.color 
                }}
              >
                <ApperIcon name={category.icon} className="h-3 w-3 inline mr-1" />
                {category.name}
              </span>
            )}
            
            {task.dueDate && (
              <span className={`text-xs flex items-center space-x-1 ${
                isOverdue 
                  ? 'text-error' 
                  : isDueToday 
                    ? 'text-warning' 
                    : 'text-gray-500'
              }`}>
                <ApperIcon name="Calendar" className="h-3 w-3" />
                <span>{formatDueDate(task.dueDate)}</span>
                {isOverdue && <ApperIcon name="AlertCircle" className="h-3 w-3" />}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="small"
            onClick={() => setIsEditing(true)}
            icon="Edit2"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          
          <Button
            variant="ghost"
            size="small"
            onClick={handleDelete}
            icon="Trash2"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;