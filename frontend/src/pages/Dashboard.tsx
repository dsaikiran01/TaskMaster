import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useTasks } from '../contexts/TaskContext.tsx';
import TaskList from '../components/TaskList.tsx';
import TaskForm from '../components/TaskForm.tsx';
import FilterSidebar from '../components/FilterSidebar.tsx';
import NavigationBar from '../components/NavigationBar.tsx';
import type { FilterOptions } from '../types/index.ts';
import apiService from '../services/api';


const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, isLoading, error, setFilters, clearFilters } = useTasks();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (filters: FilterOptions) => {
    setFilters(filters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const { completedTasks, pendingTasks, overdueTasks } = useMemo(() => {
    const completed = tasks.filter(task => task.isCompleted);
    const pending = tasks.filter(task => !task.isCompleted);
    const overdue = pending.filter(
      task => task.dueDate && new Date(task.dueDate) < new Date()
    );

    return {
      completedTasks: completed,
      pendingTasks: pending,
      overdueTasks: overdue,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar
        user={user}
        onLogout={logout}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex">
        {/* Sidebar */}
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          taskStats={{
            total: tasks.length,
            completed: completedTasks.length,
            pending: pendingTasks.length,
            overdue: overdueTasks.length
          }}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user?.name}! 👋
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Let's get organized and tackle your tasks
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setIsTaskFormOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Task
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Tasks</dt>
                          <dd className="text-lg font-medium text-gray-900">{tasks.length}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-warning-100 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                          <dd className="text-lg font-medium text-gray-900">{pendingTasks.length}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-success-100 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                          <dd className="text-lg font-medium text-gray-900">{completedTasks.length}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-danger-100 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Overdue</dt>
                          <dd className="text-lg font-medium text-gray-900">{overdueTasks.length}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Task List */}
            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              onTaskUpdate={async (id, data) => {
                try {
                  await apiService.updateTask(id, data);
                } catch (error) {
                  console.error('Failed to update task:', error);
                }
              }}
              onTaskDelete={async (id) => {
                try {
                  await apiService.deleteTask(id);
                } catch (error) {
                  console.error('Failed to delete task:', error);
                }
              }}
              onTaskToggle={async (id) => {
                try {
                  await apiService.toggleTask(id);
                } catch (error) {
                  console.error('Failed to toggle task:', error);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={async (data) => {
          try {
            await apiService.createTask(data);
            setIsTaskFormOpen(false);
          } catch (error) {
            console.error('Failed to create task:', error);
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
