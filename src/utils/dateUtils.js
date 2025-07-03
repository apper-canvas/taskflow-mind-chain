import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';

export const formatRelativeDate = (dateString) => {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM dd, yyyy');
  }
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  return format(date, 'h:mm a');
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy • h:mm a');
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  const now = new Date();
  return date < now;
};