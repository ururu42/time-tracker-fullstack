import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

export const DropDown = ({
	options = [],
	selectedProject,
	setSelectedProject,
	placeholder = 'Все проекты',
	disabled = false,
	className = '',
	setSelectedTask = () => {},
	setSearchQuery = () => {},
	setDescriptionTask = () => {},
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const selectedOption = options.find((opt) => opt.value === selectedProject);
	const hasValue = selectedProject !== '';

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (optionValue) => {
		if (optionValue === '' || optionValue !== selectedProject) {
			setSelectedTask(null);
			setSearchQuery('');
			setDescriptionTask('');
		}
		setSelectedProject(optionValue);
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className={`relative w-full ${className}`}>
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border shadow-sm transition-all cursor-pointer ${
					hasValue
						? 'bg-green-600 border-green-600 text-white hover:bg-green-700'
						: 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
				} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${
					isOpen ? 'ring-2 ring-green-500' : ''
				}`}
			>
				<span className="truncate">
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<Icon
					icon="solar:alt-arrow-down-linear"
					className={`w-5 h-5 transition-transform ${
						hasValue ? 'text-white' : 'text-gray-400'
					} ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
					<button
						type="button"
						onClick={() => handleSelect('')}
						className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
					>
						{placeholder}
					</button>
					{options.map((option, index) => (
						<button
							key={option.value}
							type="button"
							onClick={() => handleSelect(option.value)}
							className={`w-full px-4 py-2.5 text-left text-gray-700 hover:bg-indigo-50 hover:text-green-600 transition-colors ${
								option.value === selectedProject
									? 'bg-indigo-50 text-green-600 font-medium'
									: ''
							} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};
