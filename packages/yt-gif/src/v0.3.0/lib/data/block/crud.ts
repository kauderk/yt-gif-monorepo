import { generateUID, sleep, Unhandled } from '../utils'

export const createChildBlock = async (
	parentUid: s,
	order: n,
	childString: s,
	childUid: s
) => {
	const payload = {
		location: { 'parent-uid': parentUid, order: order },
		block: { string: childString.toString(), uid: childUid },
	}
	Unhandled(moveBlock, payload)
}

export const updateBlock = async (
	block_uid: s,
	block_string: s,
	block_expanded?: boolean
) => {
	const payload = {
		uid: block_uid,
		string: block_string.toString(),
		open: block_expanded,
	}
	Unhandled(updateBlock, payload)
}

export const moveBlock = async (
	parent_uid: s,
	block_order: n,
	block_to_move_uid: s
) => {
	const payload = {
		location: { 'parent-uid': parent_uid, order: block_order },
		block: { uid: block_to_move_uid },
	}
	Unhandled(moveBlock, payload)
}

export const createBlock = async (
	parent_uid: s,
	block_order: n,
	block_string: s,
	manualUID = false
) => {
	parent_uid = parent_uid.replace('((', '').replace('))', '')
	let newUid = !manualUID ? await generateUID() : manualUID // polymorphism man...

	const payload = {
		location: {
			'parent-uid': parent_uid,
			order: block_order,
		},
		block: {
			string: block_string.toString(),
			uid: newUid,
		},
	}
	Unhandled(createBlock, payload)

	await sleep(10) //seems a brief pause is need for DB to register the write
	return <const>{
		uid: newUid,
		parentUid: parent_uid,
		order: block_order,
		string: block_string,
	}
}
