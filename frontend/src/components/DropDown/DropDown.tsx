import { useState } from 'react';

interface Option {
	value: string;
	label: string;
}

interface DropDownProps {
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
}

export const DropDown = ({
	options = [],
	value,
	onChange,
	placeholder = 'Select an option',
	disabled = false,
}: DropDownProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="w-full">
			<select
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
