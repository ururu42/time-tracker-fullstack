export const Main = ({ children }) => {
	return (
		<main className="flex-1 p-2 overflow-auto bg-gray-50">
			<div className="w-full">{children}</div>
		</main>
	);
};
