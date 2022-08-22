interface AuthState {
	token: string;
	isAuthenticated: boolean;
	isLoading: boolean;
	errorMessage: string;
}

interface DataState {
	data: Array<object>;
	size: number;
}

interface MenuInfo {
	index: number;
	name: string;
	path: string;
	title: string;
	position: number;
	isActive: boolean;
}

interface MenuState {
	menus: Array<MenuInfo>;
}

export type { AuthState, DataState, MenuInfo, MenuState };
