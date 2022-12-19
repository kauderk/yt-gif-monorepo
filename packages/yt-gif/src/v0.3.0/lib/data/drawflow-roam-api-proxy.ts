export { getBlockInfoByUID } from './proxy/block-info'
export { getBlockParentUids } from './block/query'

// : typeof rap['getBlockInfoByUIDM']

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
// 			const node = tryGetNodeByID(output?.node)
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
