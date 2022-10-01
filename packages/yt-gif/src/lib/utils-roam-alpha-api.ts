const mouseOverEvents = ['mouseover']
type THierarchy = [
	{ uid: string; string: string },
	{ title: string; uid: string }
]
export const getPageUidSync = (pageTitle: s): s => {
	const res = window.roamAlphaAPI.q(
		`[:find (pull ?page [:block/uid])
	:where [?page :node/title \"${pageTitle}\"]]`
	)
	return res.length ? res[0][0].uid : null
}
export const getOrCreatePageUid = async (pageTitle: s, initString?: s) => {
	let pageUid = await getPageUid(pageTitle)
	if (!pageUid) {
		pageUid = await createPage(pageTitle)
		if (initString)
			await createChildBlock(pageUid, 0, initString, createUid())
	}
	return pageUid
}
export const SetNumberedViewWithUid = async (uid: s) => {
	//https://github.com/dvargas92495/roam-js-extensions/blob/c7092e40f6602a97fb555ae9d0cda8d2780ba0f2/src/entries/mouseless.ts#:~:text=%60%5B%3Afind%20(pull%20%3Fb%20%5B%3Achildren/view-type%5D)%20%3Awhere%20%5B%3Fb%20%3Ablock/uid%20%22%24%7Buid%7D%22%5D%5D%60
	const newViewType = 'numbered'
	await window.roamAlphaAPI.updateBlock({
		block: { uid, 'children-view-type': newViewType },
	})
}
export const CollapseDirectcChildren = async (
	block_uid: s,
	block_expanded: b
) => {
	const firstGen = await allChildrenInfo(block_uid)
	const children = sortObjectsByOrder(firstGen[0][0].children)

	for (const child of children) {
		await ExpandBlock(child.uid, block_expanded)
	}
}
export const getBlockInfoByUIDM = async (
	uid: s,
	withChildren = false,
	withParents = false
): Promise<TBlockInfoRec[][] | null> => {
	try {
		const q = `[:find (pull ?page
					 [:node/title :block/string :block/uid :block/heading :block/props 
					  :entity/attrs :block/open :block/text-align :children/view-type
					  :block/order
					  ${withChildren ? '{:block/children ...}' : ''}
					  ${withParents ? '{:block/parents ...}' : ''}
					 ])
				  :where [?page :block/uid "${uid}"]  ]`
		const results = await window.roamAlphaAPI.q(q)
		if (results.length == 0) return null
		return results
	} catch (e) {
		return null
	}
}
export const getBlockParentUids = async (uid: s) => {
	try {
		const parentUIDs = await window.roamAlphaAPI.q(
			`[:find (pull ?block [{:block/parents [:block/uid]}]) :in $ [?block-uid ...] :where [?block :block/uid ?block-uid]]`,
			[uid]
		)[0][0]
		const UIDS = parentUIDs.parents.map((e: any) => e.uid)
		UIDS.shift()
		return getPageNamesFromBlockUidList(UIDS) // if I fail. I fail.
	} catch (e) {
		return null
	}
}
export const updateBlock = async (
	block_uid: s,
	block_string: s,
	block_expanded = true
) => {
	block_uid = block_uid.replace('((', '').replace('))', '')
	return await window.roamAlphaAPI.updateBlock({
		block: {
			uid: block_uid,
			string: block_string.toString(),
			open: block_expanded,
		},
	})
}
export const sleep = (ms: n) => new Promise(resolve => setTimeout(resolve, ms))
export const moveBlock = async (
	parent_uid: s,
	block_order: n,
	block_to_move_uid: s
) => {
	return window.roamAlphaAPI.moveBlock({
		location: { 'parent-uid': parent_uid, order: block_order },
		block: { uid: block_to_move_uid },
	})
}
export const createBlock = async (
	parent_uid: s,
	block_order: n,
	block_string: s,
	manualUID = false
) => {
	parent_uid = parent_uid.replace('((', '').replace('))', '')
	let newUid = !manualUID
		? await window.roamAlphaAPI.util.generateUID()
		: manualUID // polymorphism man...

	await window.roamAlphaAPI.createBlock({
		location: {
			'parent-uid': parent_uid,
			order: block_order,
		},
		block: {
			string: block_string.toString(),
			uid: newUid,
		},
	})
	await sleep(10) //seems a brief pause is need for DB to register the write
	return <const>{
		uid: newUid,
		parentUid: parent_uid,
		order: block_order,
		string: block_string,
	}
}
export const createUid = () => {
	return window.roamAlphaAPI.util.generateUID()
}
export const getPageUid = async (pageTitle: s): Promise<s> => {
	const res = await window.roamAlphaAPI.q(
		`[:find (pull ?page [:block/uid])
	:where [?page :node/title \"${pageTitle}\"]]`
	)
	return res.length ? res[0][0].uid : null
}
export const createPage = async (pageTitle: s) => {
	let pageUid = createUid()
	await window.roamAlphaAPI.createPage({
		page: { title: pageTitle, uid: pageUid },
	})
	return pageUid
}
export const createChildBlock = async (
	parentUid: s,
	order: n,
	childString: s,
	childUid: s
) => {
	return await window.roamAlphaAPI.createBlock({
		location: { 'parent-uid': parentUid, order: order },
		block: { string: childString.toString(), uid: childUid },
	})
}
export const allChildrenInfo = async (blockUid: s) => {
	let results = await window.roamAlphaAPI.q(
		`[:find (pull ?parent [* {:block/children [:block/string :block/uid :block/order]}]) :where [?parent :block/uid \"${blockUid}\"]]`
	)
	return results.length == 0 ? undefined : results
}
export const sortObjectsByOrder = (o: any) => {
	//@ts-ignore
	return o.sort((a, b) => a.order - b.order)
}
export const ExpandBlock = async (block_uid: s, block_expanded: b) => {
	return await window.roamAlphaAPI.updateBlock({
		block: { uid: block_uid, open: block_expanded },
	})
}
export const getPageNamesFromBlockUidList = async (blockUidList: string[]) => {
	//blockUidList ex ['sdfsd', 'ewfawef']
	const rule =
		'[[(ancestor ?b ?a)[?a :block/children ?b]][(ancestor ?b ?a)[?parent :block/children ?b ](ancestor ?parent ?a) ]]'
	const query = `[:find  (pull ?block [:block/uid :block/string])(pull ?page [:node/title :block/uid])
									 :in $ [?block_uid_list ...] %
									 :where
									  [?block :block/uid ?block_uid_list]
									 [?page :node/title]
									 (ancestor ?block ?page)]`

	const results: THierarchy[] = await window.roamAlphaAPI.q(
		query,
		blockUidList,
		rule
	)
	return results
}
/* ********************** */
export const isBlockRef = async (uid: s) => {
	try {
		if (uid.startsWith('((')) {
			uid = uid.slice(2, uid.length)
			uid = uid.slice(0, -2)
		}

		const block_ref = await window.roamAlphaAPI.q(`
		  [:find (pull ?e [:block/string])
			  :where [?e :block/uid "${uid}"]]`)

		return block_ref.length > 0 && block_ref[0][0] != null ? true : false
	} catch (e) {
		return ''
	}
}
export const getBlockByPhrase = async (search_phrase: s) => {
	return await window.roamAlphaAPI.q(
		`[:find (pull ?e [:block/uid :block/string] ) :where [?e :block/string ?contents][(clojure.string/includes? ?contents "${search_phrase}")]]`
	)
}
export const simulateMouseOver = (element: El) => {
	mouseOverEvents.forEach(mouseEventType =>
		element.dispatchEvent(
			new MouseEvent(mouseEventType, {
				view: window,
				bubbles: true,
				cancelable: true,
				buttons: 1,
			})
		)
	)
}
export const setSideBarState = async (state: 1 | 2 | 3 | 4) => {
	switch (state) {
		case 1: //open left
			if (document.querySelector('.rm-open-left-sidebar-btn')) {
				//not open.. so open
				simulateMouseOver(
					document.getElementsByClassName(
						'rm-open-left-sidebar-btn'
					)[0]
				)
				setTimeout(async () => {
					const el = document.getElementsByClassName(
						'rm-open-left-sidebar-btn'
					)[0] as HTMLElement
					el.click()
				}, 100)
			}
			break
		case 2: //close left
			if (!document.querySelector('.rm-open-left-sidebar-btn')) {
				//open.. so close
				const el = document.querySelector(
					'.roam-sidebar-content .bp3-icon-menu-closed'
				) as HTMLElement
				el.click()
				simulateMouseOver(
					document.getElementsByClassName('roam-article')[0]
				)
			}
			break
		case 3: //open right
			await window.roamAlphaAPI.ui.rightSidebar.open()
			break
		case 4: //close right
			await window.roamAlphaAPI.ui.rightSidebar.close()
			break
	}
}
export const getBlockOrPageInfo = async (blockUid: s) => {
	const results = await window.roamAlphaAPI.q(
		`[:find (pull ?e [ :node/title :block/string :block/children :block/uid :block/order { :block/children ... } ] ) :where [ ?e :block/uid \"${blockUid}\" ] ]`
	)

	return results.length == 0 ? undefined : results
}
export const getBlockStringByUID = async (
	blockUid: string
): Promise<string> => {
	const info = await window.roamAlphaAPI.q(
		`[:find (pull ?b [:block/string]):where [?b :block/uid "${blockUid}"]]`
	)
	return info[0]?.[0]?.string
}
export const getBlockParentUids_custom = async (
	uid: string
): Promise<THierarchy[]> => {
	try {
		const parentUIDs = await window.roamAlphaAPI.q(
			`[:find (pull ?block [{:block/parents [:block/uid]}]) :in $ [?block-uid ...] :where [?block :block/uid ?block-uid]]`,
			[uid]
		)[0][0]
		// @ts-ignore
		const UIDS: string[] = parentUIDs?.parents?.map(e => e.uid)
		return getPageNamesFromBlockUidList(UIDS)
	} catch (e) {
		return []
	}
}
export const navigateToUiOrCreate = async (
	destinationPage: s,
	openInSideBar = false,
	sSidebarType = 'outline'
) => {
	//sSidebarType = block, outline, graph
	const prefix = destinationPage.substring(0, 2)
	const suffix = destinationPage.substring(
		destinationPage.length - 2,
		destinationPage.length
	)
	if (sSidebarType == 'outline' && prefix == '((' && suffix == '))') {
		//test if block ref to open in block mode
		sSidebarType = 'block' //chnage to block mode
	}
	if (
		(prefix == '[[' && suffix == ']]') ||
		(prefix == '((' && suffix == '))')
	) {
		// [[ ]] or (( ))
		destinationPage = destinationPage.substring(
			2,
			destinationPage.length - 2
		)
	}

	let uid = await getPageUid(destinationPage)

	if (uid == null) {
		//test if UID for zooming in, if not create page
		uid = await getNodePageInfo(destinationPage)
		if (uid == null) {
			//not a page, nor UID so create page
			if (destinationPage.length > 255) {
				destinationPage = destinationPage.substring(0, 254)
			}
			await getOrCreatePageUid(destinationPage)

			await sleep(50)

			uid = await getPageUid(destinationPage)
		} else {
			uid = destinationPage //seems to be a UID, zoom it
		}
	}

	if (openInSideBar == false) {
		document.location.href = baseUrl().href + '/' + uid
	} else {
		await window.roamAlphaAPI.ui.rightSidebar.addWindow({
			window: {
				'block-uid': uid,
				type: sSidebarType,
			},
		})
	}
	return uid

	function sleep(afterMiliseconds: n) {
		return new Promise(resolve => setTimeout(resolve, afterMiliseconds))
	}

	function baseUrl() {
		const url = new URL(window.location.href)
		const parts = url.hash.split('/')
		url.hash = parts.slice(0, 3).concat(['page']).join('/')
		return url
	}

	async function getNodePageInfo(uid: s) {
		const results = await window.roamAlphaAPI.q(
			`[:find (pull ?e [ :node/title :block/string :block/children :block/uid :block/order { :block/children ... } ] ) :where [ ?e :block/uid \"${uid}\" ] ]`
		)
		return results.length == 0 ? undefined : results
	}
}
/* -------------------------------------------------------------------- */
export const openBlockInSidebar = (blockUid: s, windowType = 'outline') => {
	//windowType = block, outline, graph
	return window.roamAlphaAPI.ui.rightSidebar.addWindow({
		window: { type: windowType, 'block-uid': blockUid },
	})
}
export const deleteBlock = (blockUid: s) => {
	return window.roamAlphaAPI.deleteBlock({ block: { uid: blockUid } })
}
export const rap = {
	/* DISCLAIMER - THE MAJORITY OF THIS FUNCTIONS I TOOK THEM FROM ...
    https://github.com/yangkennyk/Roam42-Mirror/blob/5f9217e7f89c46b8cc409726aca744d1eca106e9/common/commonDatalog.js
    https://github.com/dvargas92495/roam42/blob/35f75e3bfbcaea1cecb79250175f4730df3128b5/common/commonDatalog.js
    https://github.com/dvargas92495/roam42/blob/7b20c8a80eda4ef8641916db4c252c7dbe58ba58/common/commonFunctions.js
    https://davidbieber.com/snippets/2020-12-22-datalog-queries-for-roam-research/
    https://www.zsolt.blog/2021/01/Roam-Data-Structure-Query.html
    https://www.putyourleftfoot.in/introduction-to-the-roam-alpha-api
    https://www.putyourleftfoot.in/roampagesearch
    https://github.com/c3founder/Roam-Enhancement/blob/main/enhancedUtility.js
    https://github.com/dvargas92495/roam42/blob/35f75e3bfbcaea1cecb79250175f4730df3128b5/common/commonDatalog.js
    >>>> "Why not use those already?" Well, I learned some things in the process. I'd like to think that way. 
    Also, this piece of code is less dependent on external resources.
    */
	getBlockInfoByUIDM,
	sleep,
	updateBlock,
	moveBlock,
	createBlock,
	SetNumberedViewWithUid,
	CollapseDirectcChildren,
	ExpandBlock,
	sortObjectsByOrder,
	getBlockParentUids,
	getPageNamesFromBlockUidList,
	getPageUid,
	getPageUidSync,
	createUid,
	createPage,
	createChildBlock,
	getOrCreatePageUid,
	allChildrenInfo,
	//
	isBlockRef,
	getBlockByPhrase,
	simulateMouseOver,
	setSideBarState,
	getBlockOrPageInfo,
	getBlockStringByUID,
	getBlockParentUids_custom,
	navigateToUiOrCreate,
	openBlockInSidebar,
	deleteBlock,
}
//export default rap
