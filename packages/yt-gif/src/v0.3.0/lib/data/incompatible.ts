const warn = () => console.warn("Drawflow & Svelte don't deal with pages")

/**
 * @deprecated
 */
export const getPageUid = async (pageTitle: s): Promise<s> => {
	warn()
	return ''
}

/**
 * @deprecated
 */
export const getPageUidSync = (pageTitle: s): s => {
	warn()
	return ''
}

/**
 * @deprecated
 */
export const createPage = async (pageTitle: s) => {
	warn()
	return ''
}

/**
 * @deprecated
 */
export const getOrCreatePageUid = async (pageTitle: s, initString?: s) => {
	warn()
	return ''
}
