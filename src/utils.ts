export function getCookie(cookieName: string) {
	return document.cookie.split(";").find(i => i.trim().startsWith(cookieName))?.split("=")[1];
}