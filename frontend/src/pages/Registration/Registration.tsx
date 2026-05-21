import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser, ACTION_TYPE } from '../../action';
import { selectIsLoading } from '../../selectors';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),

	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),

	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password')], 'Повтор пароля не совпадает'),
});

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const isLoading = useSelector(selectIsLoading);
	const [serverError, setServerError] = useState<string | null>(null);
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async ({ login, password }) => {
		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		setServerError(null);

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login, password }),
			});

			const data = await response.json();

			if (response.ok) {
				dispatch(setUser(data.user));
				navigate('/');
			} else {
				setServerError(data.error || 'Login failed');
			}
		} catch (err) {
			setServerError('Network error. Please try again');
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			{isLoading && <Loader />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6"
			>
				<h4 className="text-2xl font-bold text-center text-gray-800">
					Регистрация
				</h4>
				<label className="block space-y-1">
					<span className="text-sm text-gray-600">Логин</span>
					<input
						type="text"
						placeholder="Введите логин"
						{...register('login', { onChange: () => setServerError(null) })}
						className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
					/>
				</label>
				<label className="block space-y-1">
					<span className="text-sm text-gray-600">Пароль</span>
					<input
						type="password"
						placeholder="Введите пароль"
						{...register('password', {
							onChange: () => setServerError(null),
						})}
						className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
					/>
				</label>
				<label className="block space-y-1">
					<span className="text-sm text-gray-600">Повтор пароля</span>
					<input
						type="password"
						placeholder="Повторите пароль"
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
						className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
					/>
				</label>
				<Button
					type="submit"
					disabled={isLoading}
					className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-all font-medium"
				>
					{isLoading ? 'Регистрация...' : 'Создать аккаунт'}
				</Button>
				<Link
					to="/login"
					className="block text-center text-sm text-gray-500 hover:text-emerald-600 transition"
				>
					Уже есть аккаунт? Войти
				</Link>
				{errorMessage && (
					<div className="text-sm text-red-600 text-center bg-red-50 border border-red-100 rounded-xl py-2">
						{errorMessage}
					</div>
				)}
			</form>
		</div>
	);
};
