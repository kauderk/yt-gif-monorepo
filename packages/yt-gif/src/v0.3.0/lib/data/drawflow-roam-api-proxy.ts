import type { rap } from '$lib/utils-roam-alpha-api'
import data from '$cmp/drawflow/data.json'
import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'

// : typeof rap['getBlockInfoByUIDM']

export const getBlockInfoByUID = async (
	uid: ID,
	withChildren?: boolean,
	withParents?: boolean
): Promise<TBlockInfoRec[][] | null> => {
	debugger
	const node = getNodeByID(uid)!
	const outputs = getOutputs(node!) // should fail
	const children = outputs
		.map(getNodeByID)
		.filter(c => !!c)
		.map(o => getBlockInterface(o!))

	const x = REC({ node, arr: [getBlockInterface(node)] })
	return [x]
}
function getOutputs(node: DrawflowNode) {
	return node?.outputs?.output_1?.connections?.map(o => o.node) ?? []
}

// @ts-ignore
function REC(next: { node: DrawflowNode; arr: TBlockInfoRec[] }) {
	const outputs = getOutputs(next.node)
	for (const uid of outputs) {
		const nextNode = getNodeByID(uid)

		if (nextNode) {
			const outputs = getOutputs(nextNode)
			const children = outputs
				.map(getNodeByID)
				.filter(c => !!c)
				.map(o => getBlockInterface(o!))
			next.arr.push({
				...getBlockInterface(nextNode),
				children,
			})
			next.arr = REC({ node: nextNode, arr: next.arr })
		}
	}
	return next.arr
}

function getNodeByID(id: ID): DrawflowNode | undefined {
	// @ts-ignore
	return data.drawflow.Home.data[id]
}

function getBlockInterface(node: DrawflowNode) {
	return {
		open: node.open ?? false,
		order: node.order ?? 0,
		string: node.name,
		uid: node.id.toString(),
	}
}
//#region TODO
//export const updateBlock:typeof rap['updateBlock']=()=>{}
//export const moveBlock:typeof rap['moveBlock']=()=>{}
//export const createBlock:typeof rap['createBlock']=()=>{}
//export const SetNumberedViewWithUid:typeof rap['SetNumberedViewWithUid']=()=>{}
//export const CollapseDirectcChildren:typeof rap['CollapseDirectcChildren']=()=>{}
//export const ExpandBlock:typeof rap['ExpandBlock']=()=>{}
//export const sortObjectsByOrder:typeof rap['sortObjectsByOrder']=()=>{}
//export const getBlockParentUids:typeof rap['getBlockParentUids']=()=>{}
//export const getPageNamesFromBlockUidList:typeof rap['getPageNamesFromBlockUidList']=()=>{}
//export const getPageUid:typeof rap['getPageUid']=()=>{}
//export const getPageUidSync:typeof rap['getPageUidSync']=()=>{}
//export const createUid:typeof rap['createUid']=()=>{}
//export const createPage:typeof rap['createPage']=()=>{}
//export const createChildBlock:typeof rap['createChildBlock']=()=>{}
//export const getOrCreatePageUid:typeof rap['getOrCreatePageUid']=()=>{}
//export const allChildrenInfo:typeof rap['allChildrenInfo']=()=>{}
//export const isBlockRef:typeof rap['isBlockRef']=()=>{}
//export const getBlockByPhrase:typeof rap['getBlockByPhrase']=()=>{}
//export const simulateMouseOver:typeof rap['simulateMouseOver']=()=>{}
//export const setSideBarState:typeof rap['setSideBarState']=()=>{}
//export const getBlockOrPageInfo:typeof rap['getBlockOrPageInfo']=()=>{}
//export const getBlockStringByUID:typeof rap['getBlockStringByUID']=()=>{}
//export const getBlockParentUids_custom:typeof rap['getBlockParentUids_custom']=()=>{}
//export const navigateToUiOrCreate:typeof rap['navigateToUiOrCreate']=()=>{}
//export const openBlockInSidebar:typeof rap['openBlockInSidebar']=()=>{}
//export const deleteBlock:typeof rap['deleteBlock']=()=>{}
//#endregion

// const x:TBlockInfoRec[] = [getBlockInterface(<DrawflowNode>{})]
// const y = <DrawflowNode>{}

// const totalValues:TBlockInfoRec[][] = (node: DrawflowNode) => {
// 	const connections = node?.outputs?.output_1?.connections

// 	return connections?.reduce(
// 		(array, output): n => {
// 			const node = getNodeByID(output?.node)
// 			if (!node) {
// 				return 0
// 			}

// 			array += node.order ?? 0

// 			if (node) {
// 				array += totalValues(node)
// 			}

// 			return array
// 		},
// 		[]
// 	)
// }
