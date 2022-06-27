/* eslint-disable no-restricted-syntax */
import { createContext, ReactNode } from 'react';

export const AppContext = createContext({
	sessionToken: '',
	pathname: '',
});

type Props = {
	children: ReactNode;
	sessionToken?: string;
	pathname?: string;
}
const AppProvider = ({
	children, sessionToken,
	pathname,
}: Props) => {
	return (
		<AppContext.Provider
			value={{
					pathname, // browser url,
					sessionToken
				}}
			>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
