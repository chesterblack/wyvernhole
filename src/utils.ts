export function getCookie(cookieName: string) {
	return document.cookie.split(";").find(i => i.trim().startsWith(cookieName))?.split("=")[1];
}

export function setFromAttribute(
	parent: { getAttribute: (name: string) => string|null, [key: string]: any },
	attrName: string,
	paramName: string = attrName,
	transform: (value: string) => any = v => v
) {
	const value = parent.getAttribute(attrName);
	if (value !== null && typeof parent[paramName] !== 'undefined') {
		parent[paramName] = transform(value);
	}
}

export function toBoolean(value: any) {
	if (value === 'false') {
		return false;
	}

	return !!value;
}