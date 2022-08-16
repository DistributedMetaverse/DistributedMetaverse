interface AuthState {
	token: string;
	isAuthenticated: boolean;
	isLoading: boolean;
	errorMessage: string;
}

interface DataState {
	data: Array<object>;
}

interface MenuInfo {
	index: number;
	name: string;
	path: string;
	items: Array<object>;
	title: string;
	icon: string;
	isActive: boolean;
}

interface MenuState {
	menus: Array<MenuInfo>;
}

export type { AuthState, DataState, MenuState };
