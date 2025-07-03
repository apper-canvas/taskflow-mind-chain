import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No tasks yet", 
  description = "Start by creating your first task to get organized!",
  actionText = "Create Task",
  onAction,
  icon = "CheckCircle"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full p-8 mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-primary" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" className="h-5 w-5" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;