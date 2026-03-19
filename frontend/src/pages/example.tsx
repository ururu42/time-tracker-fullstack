import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../action/action-type';
import { Button } from '../components';

export const LoginPage = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError(null);

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
				dispatch({
					type: ACTION_TYPE.SET_USER,
					payload: data.user,
				});
				navigate('/dashboard');
			} else {
				setError(data.error || 'Login failed');
			}
		} catch (err) {
			setError('Network error. Please try again');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6"
				onSubmit={handleSubmit}
			>
				<h4 className="text-2xl font-semibold text-center text-gray-800">
					Sign in to your account
				</h4>

				<label className="block">
					<span className="text-sm font-medium text-gray-700">Login</span>
					<input
						type="text"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						placeholder="Enter your login"
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</label>

				<label className="block">
					<span className="text-sm font-medium text-gray-700">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</label>

				<Button type="submit" disabled={loading}>
					{loading ? 'Signing in...' : 'Sign in'}
				</Button>

				{error && <p className="text-red-500 text-sm text-center">{error}</p>}
			</form>
		</div>
	);
};
