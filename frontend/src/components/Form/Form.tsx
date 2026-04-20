import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Form = ({
	title = '',
	description = '',
	onTitleChange,
	onDescriptionChange,
	onSubmit,
	onCancel,
	titleLabel = 'Название проекта',
	descriptionLabel = 'Описание проекта',
	titlePlaceholder = 'Введите название проекта',
	descriptionPlaceholder = 'Введите описание проекта',
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<p className="text-gray-900 mb-2">{titleLabel} </p>
					<Input
						placeholder={titlePlaceholder}
						value={title}
						onChange={({ target }) => onTitleChange(target.value)}
					/>
					<p className="text-gray-900 mb-2">{descriptionLabel} </p>
					<textarea
						className="w-full border border-gray-400 rounded h-30 p-4 mb-2"
						placeholder={descriptionPlaceholder}
						value={description}
						onClick={({ target }) => onDescriptionChange(target.value)}
					></textarea>
				</div>
				<div className="flex justify-center gap-6">
					<Button type="submit" className="bg-green-600 hover:bg-green-700">
						Сохранить
					</Button>
					<Button
						type="button"
						className="bg-red-700 hover:bg-red-800"
						onClick={onCancel}
					>
						Отмена
					</Button>
				</div>
			</form>
		</div>
	);
};
