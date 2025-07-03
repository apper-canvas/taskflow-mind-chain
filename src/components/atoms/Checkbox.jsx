import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label,
  disabled = false,
  className = '' 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
          ${checked 
            ? 'bg-gradient-to-r from-primary to-secondary border-primary focus:ring-primary' 
            : 'bg-white border-gray-300 hover:border-gray-400 focus:ring-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <motion.div
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ApperIcon name="Check" className="h-3 w-3 text-white" />
        </motion.div>
      </motion.button>
      
      {label && (
        <label 
          onClick={() => !disabled && onChange(!checked)}
          className={`text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;