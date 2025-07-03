import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/organisms/Layout'
import TaskList from '@/components/organisms/TaskList'
import TaskQuickAdd from '@/components/molecules/TaskQuickAdd'
import FilterBar from '@/components/molecules/FilterBar'
import { useTasks } from '@/hooks/useTasks'
import { useCategories } from '@/hooks/useCategories'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

function TasksPage() {
  const { tasks, loading: tasksLoading, error: tasksError, addTask, updateTask, deleteTask } = useTasks()
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const [filteredTasks, setFilteredTasks] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all',
    search: ''
  })

  useEffect(() => {
    if (!tasks) return

    let filtered = [...tasks]

    // Apply category filter
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(task => task.categoryId === activeFilters.category)
    }

    // Apply priority filter
    if (activeFilters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === activeFilters.priority)
    }

    // Apply status filter
    if (activeFilters.status !== 'all') {
      if (activeFilters.status === 'completed') {
        filtered = filtered.filter(task => task.completed)
      } else if (activeFilters.status === 'pending') {
        filtered = filtered.filter(task => !task.completed)
      }
    }

    // Apply search filter
    if (activeFilters.search) {
      const searchLower = activeFilters.search.toLowerCase()
      filtered = filtered.filter(task => 
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      )
    }

    setFilteredTasks(filtered)
  }, [tasks, activeFilters])

  const handleFilterChange = (newFilters) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData)
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateTask(taskId, updates)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  if (tasksLoading || categoriesLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (tasksError || categoriesError) {
    return (
      <Layout>
        <Error 
          message={tasksError || categoriesError} 
          onRetry={() => window.location.reload()} 
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Quick Add Task */}
        <TaskQuickAdd 
          onAddTask={handleAddTask}
          categories={categories || []}
        />

        {/* Filter Bar */}
        <FilterBar
          categories={categories || []}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <Empty 
            title="No tasks found"
            description={
              activeFilters.search || 
              activeFilters.category !== 'all' || 
              activeFilters.priority !== 'all' || 
              activeFilters.status !== 'all'
                ? "Try adjusting your filters to see more tasks."
                : "Get started by adding your first task above."
            }
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            categories={categories || []}
          />
        )}
      </motion.div>
    </Layout>
  )
}

export default TasksPage