import { getUidFromBlock } from '../../lib/dom/elements-yt-gif-parent'
import { getLastAnchorCmptInHierarchy } from '../../lib/backend-frontend/xxx-congif'
import { getCurrentInputBlock } from '../../lib/dom/roam'
import { SrrGlobal } from '$lib/global/SrrGlobal'

export async function getTimestampObj_smart(
	page: startEnd
): Promise<IlocalTimeObjs> {
	const openInputBlock = getCurrentInputBlock()
	const uid = getUidFromBlock(openInputBlock)
	const failObj = <IlocalTimeObjs>{}

	if (!page || !uid || !openInputBlock) return failObj // failObj

	const { ok, formats, targetBlock } = await getLastAnchorCmptInHierarchy(uid)

	if (!ok) return failObj

	const { lessHMS, HMS, hmsSufix, S } = formats

	const obj = (v: string | number) => ({
		value: v,
		fmt: `{{[[yt-gif/${page}]]: ${v} }}`,
	})

	return <const>{
		lessHMS: obj(fmt({ lessHMS })),
		HMS: obj(fmt({ HMS })),
		hmsSufix: obj(fmt({ hmsSufix })),
		S: obj(parseInt(S || targetBlock[page].S)),
		uid: targetBlock?.uid,
	}

	function fmt(o: {}) {
		// https://www.codegrepper.com/code-examples/javascript/get+var+name+javascript#:~:text=%E2%80%9Cget%20var%20name%20javascript%E2%80%9D%20Code%20Answer
		const key = Object.keys(o)[0]
		// @ts-ignore
		const value = o[key] // Hmmm...
		return !value || value?.includes?.('NaN')
			? // @ts-ignore
			  targetBlock[page][key]
			: value
	}
}
SrrGlobal.YTGIF = {
	getTimestampObj: getTimestampObj_smart,
}
