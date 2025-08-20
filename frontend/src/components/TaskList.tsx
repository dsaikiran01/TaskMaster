import React from 'react';
import type { Task, UpdateTaskData } from '../types/index.ts';
import TaskCard from './TaskCard.tsx';
import LoadingSpinner from './LoadingSpinner.tsx';
import { format, isToday, isTomorrow, isBefore, startOfDay } from 'date-fns';

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
    onTaskToggle,
}) => {
    if (isLoading) {
        return (
            <div
                className="flex justify-center items-center py-12"
                role="status"
                aria-live="polite"
                aria-label="Loading tasks"
            >
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <section className="text-center py-12" aria-live="polite" aria-label="No tasks message">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4" role="img" aria-hidden="true">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        className="h-full w-full"
                    >
                        <title>No tasks icon</title>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                <p className="text-gray-500 mb-6">
                    Get started by creating your first task. You'll be amazed at how much you can accomplish!
                </p>
                <aside
                    className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto"
                    aria-label="Quick tips for task management"
                >
                    <h4 className="font-medium text-gray-900 mb-2">💡 Quick Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>Break large tasks into smaller, manageable pieces</li>
                        <li>Set realistic due dates to avoid feeling overwhelmed</li>
                        <li>Use tags to organize related tasks</li>
                        <li>Prioritize tasks based on importance and urgency</li>
                    </ul>
                </aside>
            </section>
        );
    }

    // Precompute today/tomorrow start times for better date comparison
    const today = startOfDay(new Date());
    // const tomorrow = startOfDay(new Date(today.getTime() + 24 * 60 * 60 * 1000));

    // Group tasks by date category
    const groupedTasks = tasks.reduce<Record<string, Task[]>>((groups, task) => {
        let dateKey = 'No Due Date';

        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);

            if (isToday(dueDate)) {
                dateKey = 'Today';
            } else if (isTomorrow(dueDate)) {
                dateKey = 'Tomorrow';
            } else if (isBefore(dueDate, today) && !task.isCompleted) {
                dateKey = 'Overdue';
            } else {
                dateKey = format(dueDate, 'MMM dd, yyyy');
            }
        }

        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(task);
        return groups;
    }, {});

    // Custom sort date keys with stable ordering and sort others by date ascending
    const priorityOrder: Record<string, number> = {
        Overdue: 0,
        Today: 1,
        Tomorrow: 2,
        'No Due Date': 999,
    };

    const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
        if (priorityOrder[a] !== undefined && priorityOrder[b] !== undefined) {
            return priorityOrder[a] - priorityOrder[b];
        }
        if (priorityOrder[a] !== undefined) return -1;
        if (priorityOrder[b] !== undefined) return 1;

        // Both are dates — sort by actual date
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
    });

    // Optional: Sort tasks inside each group by priority (high->low) then dueDate ascending
    const priorityRank = { high: 1, medium: 2, low: 3 };
    const sortTasks = (tasks: Task[]) =>
        tasks.slice().sort((a, b) => {
            const pA = priorityRank[a.priority] ?? 4;
            const pB = priorityRank[b.priority] ?? 4;
            if (pA !== pB) return pA - pB;

            const dA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
            const dB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
            return dA - dB;
        });

    return (
        <section aria-live="polite" aria-label="Task list" className="space-y-8">
            {sortedDateKeys.map((dateKey) => {
                const tasksForDate = sortTasks(groupedTasks[dateKey]);
                const isOverdue = dateKey === 'Overdue';

                return (
                    <div key={dateKey} className="space-y-4">
                        <header className="flex items-center space-x-3" aria-label={`${dateKey} tasks`}>
                            <h3
                                className={`text-lg font-semibold ${isOverdue ? 'text-danger-600' : 'text-gray-900'
                                    }`}
                            >
                                {dateKey}
                            </h3>
                            {isOverdue && (
                                <span
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800"
                                    aria-label={`${tasksForDate.length} overdue tasks`}
                                >
                                    {tasksForDate.length} overdue
                                </span>
                            )}
                        </header>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {tasksForDate.map((task) => (
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
        </section>
    );
};

export default TaskList;
