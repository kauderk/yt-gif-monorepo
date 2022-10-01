export function sortObjByKey<T extends object>(key: keyof T, obj: Array<T>) {
	// https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
	const groupBy = (key: keyof T) => (array: Array<T>) =>
		array.reduce((objectsByKeyValue: object, obj) => {
			const value = obj[key]
			// @ts-ignore // TODO: type this
			// prettier-ignore
			objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
			return objectsByKeyValue
		}, {})
	const groupByKey = groupBy(key)
	const objByKey = groupByKey(obj)

	return Object.entries(objByKey).map(([title, data]) => ({
		title,
		data,
	}))
}
