import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label,
  type = 'text',
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const inputClasses = `input-field w-full ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''} ${error ? 'border-error focus:ring-error' : ''}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <ApperIcon 
            name={icon} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
          />
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${inputClasses} ${className}`}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <ApperIcon 
            name={icon} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
          />
        )}
      </div>
      
      {error && (
        <p className="text-sm text-error flex items-center space-x-1">
          <ApperIcon name="AlertCircle" className="h-3 w-3" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;