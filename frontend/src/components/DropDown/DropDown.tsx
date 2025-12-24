import { useState } from 'react';

export const DropDown = ({ projects }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleChange = ({ target }) => {
		console.log(target.value);
		setSelectedOption(target.value); // обновляем состояние при выборе
	};
	return (
		<div>
			<select id="projects" value={selectedOption} onChange={handleChange}>
				<option value="">Выберите проект</option>
				{projects.map((project) => (
					<option key={project._id} value={project.title}>
						{project.title}
					</option>
				))}
			</select>
		</div>
	);
};
