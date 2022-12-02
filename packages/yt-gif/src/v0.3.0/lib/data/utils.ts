export function Unhandled(caller: Function, ...optionalParams: any[]) {
	optionalParams = optionalParams ? optionalParams : []
	console.warn(
		`Unhandled Function: ${Unhandled.caller} by ${caller.caller}`,
		...optionalParams
	)
}
export const sleep = (ms: n) => new Promise(resolve => setTimeout(resolve, ms))

export const generateUID = async () =>
	new Date().getTime().toString().slice(0, 9)

export const sortObjectsByOrder = (o: any) => {
	//@ts-ignore
	return o.sort((a, b) => a.order - b.order)
}
