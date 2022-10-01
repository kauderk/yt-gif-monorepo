import { playerConfig } from 'src/v0.3.0/api-ready/deploy/config'
import type { State } from 'src/v0.3.0/api-ready/parse'

export function Deploy(
	{ record, id, configParams }: ReturnType<typeof State>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	YT: any
) {
	record.wTarget = new YT.Player(id, playerConfig(configParams))
}
