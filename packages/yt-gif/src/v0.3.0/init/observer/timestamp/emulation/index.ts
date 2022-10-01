import { SetupRerenderedComponents } from './setup'
import { TryToDeployTimestampElms } from './deploy'

export async function cleanAndSetUp_TimestampEmulation(found: El[]) {
	const map_successfulEmulationArr = await SetupRerenderedComponents(found)

	await TryToDeployTimestampElms(map_successfulEmulationArr)
}
