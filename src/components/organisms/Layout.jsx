import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/organisms/Header';
import CategorySidebar from '@/components/molecules/CategorySidebar';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { tasks } = useTasks();
  const { categories } = useCategories();

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
      />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 p-6">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            tasks={tasks}
          />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              tasks={tasks}
              isMobile={true}
              onClose={() => setIsMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;