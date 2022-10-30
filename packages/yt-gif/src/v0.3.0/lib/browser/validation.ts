export const browserIs = (keywords: string[]) => {
	return navigator.userAgent
		.split(' ')
		.map(w => w.toLowerCase())
		.some(w => keywords.includes(w))
}
export const isApple = () => {
	return browserIs(['safari', 'applewebkit'])
}
export const isMozilla = () => {
	return browserIs(['firefox'])
}
