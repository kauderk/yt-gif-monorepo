import type { TBase } from '$v3/api-ready/setup/url-result/composition'

export async function getUIDResult(metaComponent: TBase) {
	const resObj = {
		uid: metaComponent.uid,
		preUrlIndex: metaComponent.getUrlIndex(),
		accUrlIndex: metaComponent.getUrlIndex(),
		url: metaComponent.url,
		grandParentBlock: metaComponent.grandParentBlock(),
		nestedComponentMap: <Trm_map>{},
		earlyReturnKey: '',
	}

	resObj.accUrlIndex = resObj.preUrlIndex
	return resObj
}
