import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE, setUser } from '../../action';
import { Button } from '../../components';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),

	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры, знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

export const LoginPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async ({ login, password }) => {
		setLoading(true);
		setServerError(null);

		try {
			const response = await fetch('/api/auth/login', {
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
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex justify-center items-baseline">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white w-full max-w-md rounded-md shadow-xl p-6 space-y-6 "
			>
				<h4 className="text-xl font-semibold text-center text-gray-800">
					Sign in to your account
				</h4>

				<label className="block">
					<span className="text-sm font-normal text-gray-700">Login</span>
					<input
						type="text"
						placeholder="Enter your login"
						{...register('login')}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</label>

				<label className="block">
					<span className="text-sm font-normal text-gray-700">Password</span>
					<input
						type="password"
						{...register('password')}
						placeholder="Enter your password"
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</label>

				<Button
					type="submit"
					disabled={loading}
					className="w-full rounded-md font-semibold hover:bg-blue-600 hover:shadow-md active:bg-blue-700"
				>
					{loading ? 'Signing in...' : 'Sign in'}
				</Button>
				<Link
					to="/register"
					className="block w-full text-center text-base text-blue-600 hover:text-blue-500 hover:underline"
				>
					Register
				</Link>

				{errorMessage && (
					<p className="text-sm text-red-700 text-center">{errorMessage}</p>
				)}
			</form>
		</div>
	);
};
