// 1. 인증 관련 State
interface AuthState {
	token: string;
	isAuthenticated: boolean;
	isLoading: boolean;
	errorMessage: string;
}

interface TokenState {
	token: object;
}

// 2. 메뉴 관련 State
interface TitleState {
	title: string;
}

interface MenuInfo extends TitleState {
	index: number;
	name: string;
	path: string;
	description: string;
	position: number;
	isActive: boolean;
	isShow: boolean;
}

interface MenuState {
	menus: Array<MenuInfo>;
}

// 3. Preview 관련 State
interface SearchInfo {
	fileId: string; // node identifier → IPFS 해시 조회용
}

interface PreviewState extends SearchInfo {
	isActive: boolean;
}

// 4. Path 관련 State
interface PathState {
	folderPath: string;
	filePath: string;
	folderType: string; // enum → (all / video / photo)
	fileType: string; // enum → (all / video / photo)
}

interface FolderPathInfo {
	folderPath: string;
	subPath?: string;
	count: number;
}

interface FilePathInfo {
	filePath: string;
	count: number;
}

// 5. 데이터 검색 및 업로드 관련 State
interface UserInfo {
	userId: number;
	username: string;
	email: string;
}

interface FileInfo extends SearchInfo {
	id: number;
	transactionId: number;
	filename: string;
	fileSize: number;
	mimeType: string;
	description?: string;
	path: string;
	isLike?: boolean;
	downIPFS: boolean;
	createdAt: string;
	shared?: Array<UserInfo>;
}

interface FileState {
	data: Array<object>;
	size: number;
}

// 6. Monitor 관련 State
interface MonitorState {
	isActive: boolean;
}

// 7. Paging 관련 State
interface PageState {
	results: Array<FileInfo | FolderPathInfo | UserInfo>;
	take: number;
	total: number;
}

// 8. Data Sync 관련 State
interface DataState {
	time: number;
}

export type {
	AuthState,
	TokenState,
	TitleState,
	MenuInfo,
	MenuState,
	SearchInfo,
	PreviewState,
	PathState,
	FolderPathInfo,
	FilePathInfo,
	UserInfo,
	FileInfo,
	FileState,
	MonitorState,
	PageState,
	DataState,
};
