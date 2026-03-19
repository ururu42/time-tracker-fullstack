import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
	return (
		<div className="flex flex-row min-h-screen max-w-full mx-auto bg-gray-100">
			{children}
		</div>
	);
};
