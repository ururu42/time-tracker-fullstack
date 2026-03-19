export const HeaderMainPage = ({ user }) => {
	return (
		<h1 className="text-3xl font-bold text-gray-900 mb-4">Привет, {user.name}!</h1>
	);
};
