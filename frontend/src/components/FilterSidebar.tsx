import { useState } from 'react';
import type { FilterOptions } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onFilterChange: (filters: FilterOptions) => void;
    onClearFilters: () => void;
    taskStats: {
        total: number;
        completed: number;
        pending: number;
        overdue: number;
    };
}

const DropdownSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="bg-gray-50 rounded-lg">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 border-b text-sm font-medium text-gray-900"
            >
                {title}
                {open ? (
                    <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                ) : (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                )}
            </button>
            {open && <div className="p-4 space-y-2">{children}</div>}
        </div>
    );
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    isOpen,
    onClose,
    onFilterChange,
    onClearFilters,
    taskStats,
}) => {
    const [filters, setFilters] = useState<FilterOptions>({});

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({});
        onClearFilters();
    };

    const isActive = (key: keyof FilterOptions, value: any) => filters[key] === value;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Filters & Stats</h2>
                        <button
                            onClick={onClose}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">

                        {/* Task Overview */}
                        <DropdownSection title="Task Overview">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Total Tasks</span>
                                <span className="font-medium text-gray-900">{taskStats.total}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Pending</span>
                                <span className="font-medium text-yellow-600">{taskStats.pending}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Completed</span>
                                <span className="font-medium text-green-600">{taskStats.completed}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Overdue</span>
                                <span className="font-medium text-red-600">{taskStats.overdue}</span>
                            </div>
                        </DropdownSection>

                        {/* Status Filter */}
                        <DropdownSection title="Status">
                            <button
                                onClick={() => handleFilterChange('completed', undefined)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!filters.hasOwnProperty('completed')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                All Tasks
                            </button>
                            <button
                                onClick={() => handleFilterChange('completed', false)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isActive('completed', false)
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => handleFilterChange('completed', true)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isActive('completed', true)
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Completed
                            </button>
                        </DropdownSection>

                        {/* Priority Filter */}
                        <DropdownSection title="Priority">
                            {['high', 'medium', 'low'].map((priority) => (
                                <button
                                    key={priority}
                                    onClick={() => handleFilterChange('priority', priority)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isActive('priority', priority)
                                            ? priority === 'high'
                                                ? 'bg-red-100 text-red-700'
                                                : priority === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-green-100 text-green-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                                </button>
                            ))}
                            <button
                                onClick={() => handleFilterChange('priority', undefined)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!filters.hasOwnProperty('priority')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                All Priorities
                            </button>
                        </DropdownSection>

                        {/* Due Date Filter */}
                        <DropdownSection title="Due Date">
                            <button
                                onClick={() => handleFilterChange('dueDate', undefined)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!filters.hasOwnProperty('dueDate')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                All Dates
                            </button>
                            <button
                                onClick={() => handleFilterChange('dueDate', new Date().toISOString().split('T')[0])}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isActive('dueDate', new Date().toISOString().split('T')[0])
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Due Today
                            </button>
                            <button
                                onClick={() => {
                                    const tomorrow = new Date();
                                    tomorrow.setDate(tomorrow.getDate() + 1);
                                    handleFilterChange('dueDate', tomorrow.toISOString().split('T')[0]);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isActive('dueDate', new Date(Date.now() + 86400000).toISOString().split('T')[0])
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Due Tomorrow
                            </button>
                        </DropdownSection>

                        {/* Clear Filters */}
                        <div className="pt-4 border-t border-gray-200">
                            <button
                                onClick={handleClearFilters}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default FilterSidebar;
