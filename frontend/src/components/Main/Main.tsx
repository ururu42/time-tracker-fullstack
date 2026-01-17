import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const Main = ({ children }: Props) => {
	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			{children}
		</main>
	);
};
