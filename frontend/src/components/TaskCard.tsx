import { useState } from 'react';
import type { Task, UpdateTaskData } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onUpdate: (data: UpdateTaskData) => void;
  onDelete: () => void;
  onToggle: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    tags: task.tags.join(', '),
  });

  const handleSave = () => {
    const updatedData: UpdateTaskData = {
      title: editData.title.trim(),
      description: editData.description.trim() || undefined,
      priority: editData.priority,
      tags: editData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    if (updatedData.title) {
      onUpdate(updatedData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      tags: task.tags.join(', '),
    });
    setIsEditing(false);
  };

  // Use Tailwind default colors or replace 'danger', 'warning', 'success' with standard colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔥';
      case 'medium':
        return '⚡';
      case 'low':
        return '🌱';
      default:
        return '📋';
    }
  };

  const isOverdue = task.dueDate && !task.isCompleted && new Date(task.dueDate) < new Date();

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Task title"
          />

          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description (optional)"
            rows={2}
          />

          <select
            value={editData.priority}
            onChange={(e) =>
              setEditData({ ...editData, priority: e.target.value as 'low' | 'medium' | 'high' })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input
            type="text"
            value={editData.tags}
            onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tags (comma separated)"
          />

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 transition-all duration-200 hover:shadow-lg ${
        task.isCompleted ? 'opacity-75' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggle}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              task.isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {task.isCompleted && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <h3
            className={`font-medium text-gray-900 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </h3>
        </div>

        <div className="flex items-center space-x-1">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
              task.priority
            )}`}
          >
            {getPriorityIcon(task.priority)} {task.priority}
          </span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className={`text-sm text-gray-600 mb-3 ${task.isCompleted ? 'line-through' : ''}`}>
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div className="flex items-center space-x-2 mb-3">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
            {isOverdue ? 'Overdue: ' : 'Due: '}
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        </div>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          {task.isCompleted ? 'Completed' : 'Created'} {format(new Date(task.createdAt), 'MMM dd')}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
