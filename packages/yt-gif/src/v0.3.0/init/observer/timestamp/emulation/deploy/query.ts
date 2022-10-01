import type { IArrObj } from '../../types'
import { sortObjByKey } from '../sortObjByKey'

export function SortEmulationArr(values: IArrObj[]) {
	const _values = [...values].sort((a, b) => a.indent - b.indent) // RAP utils
	const sortedByUid = sortObjByKey('fromUniqueUid', _values)
	// @ts-ignore
	const targetObjsArr: IArrObj[][] = sortedByUid.map(v => v['data'])

	//return <const>{ targetObjsArr, values: _values }
	return targetObjsArr
}
export function GetPears(ArrObjs: IArrObj[]) {
	// prettier-ignore
	const findPage = (p: s) => [...ArrObjs].reverse().find(x => x.page == p);
	const lastArr = [findPage('start'), findPage('end')]
	const completePears = lastArr.every(el => !!el)
	return <const>{ lastArr, completePears }
}
