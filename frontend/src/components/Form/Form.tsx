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
	isLoading = false,
	disabled = false,

	isEditing,
	setIsEditing,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (disabled || isLoading) return;
		onSubmit();
	};

	return (
		<div className="mb-4">
			<form onSubmit={handleSubmit}>
				<div>
					<p className="text-gray-900 mb-2">{titleLabel} </p>
					<Input
						placeholder={titlePlaceholder}
						value={title}
						onChange={({ target }) => onTitleChange(target.value)}
						disabled={disabled || isLoading}
					/>
					<p className="text-gray-900 mb-2">{descriptionLabel} </p>
					<textarea
						className="w-full border border-gray-400 rounded h-30 p-4 mb-2 disabled:bg-gray-100 disabled:text-gray-400"
						placeholder={descriptionPlaceholder}
						value={description}
						onChange={({ target }) => onDescriptionChange(target.value)}
						disabled={disabled || isLoading}
					></textarea>
				</div>
				<div className="flex justify-center gap-6">
					<Button
						type="submit"
						className={`bg-green-600 hover:bg-green-700 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={disabled || isLoading}
					>
						{isLoading ? 'Сохранение...' : 'Сохранить'}
					</Button>

					<Button
						type="button"
						className={`bg-red-700 hover:bg-red-800 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={onCancel}
						disabled={disabled || isLoading}
					>
						Отмена
					</Button>
				</div>
			</form>
		</div>
	);
};
