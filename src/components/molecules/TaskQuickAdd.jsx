import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'

const TaskQuickAdd = ({ onAddTask, categories = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    try {
      await onAddTask({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        dueDate: dueDate || null,
        completed: false
      })
      
      // Reset form
      setTitle('')
      setDescription('')
      setCategory('')
      setPriority('medium')
      setDueDate('')
      setIsExpanded(false)
    } catch (error) {
      console.error('Failed to add task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    try {
      await onAddTask({
        title: title.trim(),
        description: '',
        category: '',
        priority: 'medium',
        dueDate: null,
        completed: false
      })
      setTitle('')
    } catch (error) {
      console.error('Failed to add task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'text-success' },
    { value: 'medium', label: 'Medium Priority', color: 'text-warning' },
    { value: 'high', label: 'High Priority', color: 'text-accent' }
  ]

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name,
    color: cat.color
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {!isExpanded ? (
        <div className="p-4">
          <form onSubmit={handleQuickAdd} className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={!title.trim() || isLoading}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              Add
            </Button>
            <Button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <AlertCircle size={16} />
              More
            </Button>
          </form>
        </div>
      ) : (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Add some details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field w-full h-20 resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag size={16} className="inline mr-1" />
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                >
                  <option value="">No category</option>
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle size={16} className="inline mr-1" />
                  Priority
                </label>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  Due Date
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                onClick={() => {
                  setIsExpanded(false)
                  setTitle('')
                  setDescription('')
                  setCategory('')
                  setPriority('medium')
                  setDueDate('')
                }}
                className="btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || isLoading}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={16} />
                {isLoading ? 'Adding...' : 'Add Task'}
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskQuickAdd