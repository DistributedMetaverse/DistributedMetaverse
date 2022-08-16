import CryptoJS from 'crypto-js';

// 참고 : https://m.blog.naver.com/PostView.naver?blogId=ogane53&logNo=221288794072
const base64url = (source: CryptoJS.lib.WordArray) => {
	let encodedSource = CryptoJS.enc.Base64.stringify(source);
	encodedSource = encodedSource.replace(/=+$/, '');
	encodedSource = encodedSource.replace(/\+/g, '-');
	encodedSource = encodedSource.replace(/\//g, '_');

	return encodedSource;
};

// 토큰키 헤더 작성
const getTokenKeyHeader = () => {
	const header = {
		alg: 'HS256', // HMAC SHA256 해싱 알고리즘 사용
		typ: 'JWT', // 토큰 타입 지정.
	};
	const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
	return base64url(stringifiedHeader);
};

// 토큰키 데이터 작성
const getTokenKeyData = (expired: number) => {
	const data = {
		sender: 'sender',
		iat: Math.floor(+new Date() / 1000), // 토큰이 발급된 시간 (type TIMESTAMP)
		exp: Math.floor(+new Date() / 1000 + expired), // 토큰의 만료 시간 (type TIMESTAMP)
	};
	const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
	return base64url(stringifiedData);
};

// HmacSHA256 암호화
const getTokenKeySignature = (token: string, secret: string) => {
	const signature = CryptoJS.HmacSHA256(token, secret);
	return base64url(signature);
};

export { getTokenKeyHeader, getTokenKeyData, getTokenKeySignature };
