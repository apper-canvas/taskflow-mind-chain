import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskQuickAdd = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    try {
      setLoading(true);
      
      const taskData = {
        title: title.trim(),
        priority,
        categoryId: categoryId ? parseInt(categoryId) : categories[0]?.Id || 1,
        dueDate: dueDate || null,
        completed: false
      };

      await onAddTask(taskData);
      
      // Reset form
      setTitle('');
      setPriority('medium');
      setCategoryId('');
      setDueDate('');
      setIsExpanded(false);
      
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isExpanded) {
        setIsExpanded(true);
      } else {
        handleSubmit(e);
      }
    }
  };

  const priorityOptions = [
    { value: 'low', label: '🟢 Low Priority' },
    { value: 'medium', label: '🟡 Medium Priority' },
    { value: 'high', label: '🔴 High Priority' }
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat.Id.toString(),
    label: cat.name
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsExpanded(true)}
            className="text-lg font-medium"
            icon="Plus"
          />
        </div>

        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={priorityOptions}
            />
            
            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              options={categoryOptions}
              placeholder="Select category"
            />
            
            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              icon="Calendar"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="submit"
              loading={loading}
              disabled={!title.trim()}
              icon="Plus"
            >
              Add Task
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              icon="X"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TaskQuickAdd;