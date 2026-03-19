import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const Main = ({ children }: Props) => {
	return <main className="flex-1 min-h-screen bg-gray-50">{children}</main>;
};
