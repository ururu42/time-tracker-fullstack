import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
	return (
		<div className="flex flex-col min-h-screen max-w-[1000px] mx-auto bg-gray-100">
			{children}
		</div>
	);
};
