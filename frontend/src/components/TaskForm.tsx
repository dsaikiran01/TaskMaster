import React, { useState, useEffect, useRef } from 'react';
import type { CreateTaskData } from '../types/index.ts';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTaskData) => void;
    initialData?: Partial<CreateTaskData>;
}

const formatDateTimeLocal = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    // Format YYYY-MM-DDTHH:mm (no seconds)
    const pad = (num: number) => num.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

const TaskForm: React.FC<TaskFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) => {
    const [formData, setFormData] = useState<CreateTaskData>({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        tags: []
    });

    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                dueDate: formatDateTimeLocal(initialData.dueDate),
                priority: initialData.priority || 'medium',
                tags: initialData.tags || []
            });
        } else {
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'medium',
                tags: []
            });
        }
        setTagInput('');
        setErrors({});
    }, [initialData, isOpen]);

    // Focus trap implementation
    useEffect(() => {
        if (!isOpen) return;

        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];
        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = modalNode.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                handleClose();
            }
        };

        // Focus first element on open
        firstElement?.focus();

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();
        if (tag && !(formData.tags ?? []).includes(tag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags ?? []), tag]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: (prev.tags ?? []).filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (formData.title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit form
        const submitData: CreateTaskData = {
            title: formData.title.trim(),
            description: formData.description || ''.trim() || undefined,
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
            priority: formData.priority,
            tags: (formData.tags || [])
        };

        onSubmit(submitData);

        // Reset form
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            priority: 'medium',
            tags: []
        });
        setTagInput('');
        setErrors({});
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            priority: 'medium',
            tags: []
        });
        setTagInput('');
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="taskform-title"
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4"
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 id="taskform-title" className="text-xl font-semibold text-gray-900">
                        {initialData ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button
                        onClick={handleClose}
                        aria-label="Close task form"
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Task Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            aria-describedby={errors.title ? 'title-error' : undefined}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.title ? 'border-danger-300' : 'border-gray-300'
                                }`}
                            placeholder="Enter task title"
                            autoComplete="off"
                        />
                        {errors.title && (
                            <p id="title-error" className="mt-1 text-sm text-danger-600">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            aria-describedby={errors.description ? 'description-error' : undefined}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.description ? 'border-danger-300' : 'border-gray-300'
                                }`}
                            placeholder="Enter task description (optional)"
                        />
                        {errors.description && (
                            <p id="description-error" className="mt-1 text-sm text-danger-600">{errors.description}</p>
                        )}
                    </div>

                    {/* Due Date */}
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <div className="space-y-2">
                            {/* Date Picker */}
                            <input
                                type="date"
                                id="dueDateDate"
                                name="dueDateDate"
                                value={formData.dueDate ? formData.dueDate.split('T')[0] : ''}
                                onChange={(e) => {
                                    const datePart = e.target.value;
                                    const timePart = formData.dueDate?.split('T')[1] || '00:00';
                                    handleChange({
                                        target: {
                                            name: 'dueDate',
                                            value: `${datePart}T${timePart}`,
                                        },
                                    });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />

                            {/* Time Picker */}
                            <input
                                type="time"
                                id="dueDateTime"
                                name="dueDateTime"
                                value={formData.dueDate ? formData.dueDate.split('T')[1]?.slice(0, 5) : ''}
                                onChange={(e) => {
                                    const timePart = e.target.value;
                                    const datePart = formData.dueDate?.split('T')[0] || new Date().toISOString().split('T')[0];
                                    handleChange({
                                        target: {
                                            name: 'dueDate',
                                            value: `${datePart}T${timePart}`,
                                        },
                                    });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        <p id="dueDateHelp" className="text-xs text-gray-500 mt-1">
                            Optional: Set a due date and time for the task.
                        </p>
                    </div>

                    {/* Priority */}
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags
                        </label>
                        <div className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Add a tag"
                                aria-label="Add tag"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                disabled={!tagInput.trim()}
                                className={`px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 ${tagInput.trim() ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Add
                            </button>
                        </div>

                        {/* Display tags */}
                        {(formData.tags || []).length > 0 && (
                            <div className="flex flex-wrap gap-2" aria-live="polite" aria-relevant="additions removals">
                                {(formData.tags || []).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                    >
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-1 text-primary-600 hover:text-primary-800"
                                            aria-label={`Remove tag ${tag}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            {initialData ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
