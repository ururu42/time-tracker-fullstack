import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const Main = ({ children }: Props) => {
	return <main className="flex-1 py-20 px-4">{children}</main>;
};
