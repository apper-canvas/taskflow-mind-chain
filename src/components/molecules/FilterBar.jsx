import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FilterBar = ({ 
  activeFilter, 
  setActiveFilter, 
  sortBy, 
  setSortBy, 
  searchQuery,
  setSearchQuery 
}) => {
  const filterOptions = [
    { key: 'all', label: 'All Tasks', icon: 'List' },
    { key: 'pending', label: 'Pending', icon: 'Clock' },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { key: 'overdue', label: 'Overdue', icon: 'AlertCircle' }
  ];

  const sortOptions = [
    { key: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { key: 'priority', label: 'Priority', icon: 'Flag' },
    { key: 'created', label: 'Created', icon: 'Clock' },
    { key: 'title', label: 'Title', icon: 'AlphabeticalOrder' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <Button
              key={option.key}
              variant={activeFilter === option.key ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setActiveFilter(option.key)}
              icon={option.icon}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field text-sm py-1 px-2 pr-8"
          >
            {sortOptions.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;