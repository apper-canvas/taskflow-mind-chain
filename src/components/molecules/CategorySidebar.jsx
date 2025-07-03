import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onEnterViewMode,
  tasks,
  isMobile = false,
  onClose 
}) => {
  const getTaskCount = (categoryId) => {
    return tasks.filter(task => task.categoryId === categoryId && !task.completed).length;
  };

  const allTasksCount = tasks.filter(task => !task.completed).length;

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display font-bold text-gray-900">
          Categories
        </h2>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* All Tasks */}
      <div className="space-y-1">
<motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            onEnterViewMode();
            isMobile && onClose();
          }}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            <ApperIcon name="List" className="h-5 w-5" />
            <span className="font-medium">All Tasks</span>
          </div>
          <span className={`text-sm px-2 py-1 rounded-full ${
            selectedCategory === null
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {allTasksCount}
          </span>
        </motion.button>
      </div>

      {/* Categories */}
      <div className="space-y-1">
        {categories.map(category => (
          <motion.button
            key={category.Id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelectCategory(category.Id);
              isMobile && onClose();
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              selectedCategory === category.Id
                ? 'text-white shadow-md'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            style={{
              background: selectedCategory === category.Id
                ? `linear-gradient(135deg, ${category.color}, ${category.color}dd)`
                : 'transparent'
            }}
          >
            <div className="flex items-center space-x-3">
              <ApperIcon name={category.icon} className="h-5 w-5" />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              selectedCategory === category.Id
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {getTaskCount(category.Id)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="bg-surface h-full w-80 p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
      {sidebarContent}
    </div>
  );
};

export default CategorySidebar;