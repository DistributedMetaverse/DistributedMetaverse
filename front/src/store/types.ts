// 1. 인증 관련 State
interface AuthState {
	token: string;
	isAuthenticated: boolean;
	isLoading: boolean;
	errorMessage: string;
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
}

interface MenuState {
	menus: Array<MenuInfo>;
}

// 3. Preview 관련 State
interface SearchInfo {
	fileId: string; // node identifier
}

interface PreviewState extends SearchInfo {
	isActive: boolean;
}

// 4. Path 관련 State
interface PathState {
	folderPath: string;
	filePath: string;
	folderType: string; // enum → (all / video / photo / pdf / doc)
	fileType: string; // enum → (all / video / photo / pdf / doc)
}

interface FolderInfo {
	path: string;
	count: number;
}

interface FolderInfoList {
	datas?: Array<FolderInfo>;
}

// 5. 데이터 검색 및 업로드 관련 State
interface UserInfo {
	userId: number;
	username: string;
	email: string;
}

interface FileInfo extends SearchInfo {
	id: number;
	filename: string;
	fileSize: number;
	description?: string;
	createdAt: string;
	isLike?: boolean;
	shared?: Array<UserInfo>;
}

interface FileInfoList {
	datas?: Array<FileInfo>;
}

interface FileState {
	data: Array<object>;
	size: number;
}

// 6. Setting 관련 State
// → But, Backend 서버 쪽에서 포워딩 할꺼라서 별도의 State를 만들 필요는 없음
// → Only, Setting 정보를 확인하기 위한 Interface
interface SettingInfo {
	id: number;
	host: string;
	port: number;
	size: number;
	limit?: number;
}

interface SettingInfoList {
	datas?: Array<SettingInfo>;
}

export type {
	AuthState,
	TitleState,
	MenuInfo,
	MenuState,
	SearchInfo,
	PreviewState,
	PathState,
	FolderInfo,
	FolderInfoList,
	UserInfo,
	FileInfo,
	FileInfoList,
	FileState,
	SettingInfo,
	SettingInfoList,
};
