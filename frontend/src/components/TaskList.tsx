import React from 'react';
import { Task, UpdateTaskData } from '../types/index.ts';
import TaskCard from './TaskCard.tsx';
import LoadingSpinner from './LoadingSpinner.tsx';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onTaskUpdate: (id: string, data: UpdateTaskData) => void;
  onTaskDelete: (id: string) => void;
  onTaskToggle: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggle
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500 mb-6">
          Get started by creating your first task. You'll be amazed at how much you can accomplish!
        </p>
        <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
          <h4 className="font-medium text-gray-900 mb-2">💡 Quick Tips:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Break large tasks into smaller, manageable pieces</li>
            <li>• Set realistic due dates to avoid feeling overwhelmed</li>
            <li>• Use tags to organize related tasks</li>
            <li>• Prioritize tasks based on importance and urgency</li>
          </ul>
        </div>
      </div>
    );
  }

  // Group tasks by date
  const groupedTasks = tasks.reduce((groups, task) => {
    let dateKey = 'No Due Date';
    
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (dueDate.toDateString() === today.toDateString()) {
        dateKey = 'Today';
      } else if (dueDate.toDateString() === tomorrow.toDateString()) {
        dateKey = 'Tomorrow';
      } else if (dueDate < today && !task.isCompleted) {
        dateKey = 'Overdue';
      } else {
        dateKey = format(dueDate, 'MMM dd, yyyy');
      }
    }
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  // Sort date keys
  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
    const order = { 'Overdue': 0, 'Today': 1, 'Tomorrow': 2, 'No Due Date': 999 };
    return (order[a as keyof typeof order] || 3) - (order[b as keyof typeof order] || 3);
  });

  return (
    <div className="space-y-8">
      {sortedDateKeys.map(dateKey => {
        const tasksForDate = groupedTasks[dateKey];
        const isOverdue = dateKey === 'Overdue';
        
        return (
          <div key={dateKey} className="space-y-4">
            <div className="flex items-center space-x-3">
              <h3 className={`text-lg font-semibold ${
                isOverdue ? 'text-danger-600' : 'text-gray-900'
              }`}>
                {dateKey}
              </h3>
              {isOverdue && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
                  {tasksForDate.length} overdue
                </span>
              )}
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasksForDate.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={(data) => onTaskUpdate(task._id, data)}
                  onDelete={() => onTaskDelete(task._id)}
                  onToggle={() => onTaskToggle(task._id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
