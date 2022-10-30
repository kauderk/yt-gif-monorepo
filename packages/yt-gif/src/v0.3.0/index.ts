import '$lib/window'
import { init as settingsPageInit } from '$v3/settings-page'
import { links } from './init/config/paths'
import { Ready } from './init/index'
import { CreateXload } from '$v3/lib/helpers'
import { TryCreateUserInputObject } from '$v3/init/config/yt-gif-init'
import './../yt-gif/resources/css/player.css'
import './../yt-gif/resources/css/drop-down-menu.css'

init()
async function init() {
	await CreateXload('https://www.youtube.com/player_api')

	// prettier-ignore
	if (typeof window.YT == 'undefined')
        return console.warn(`The YT GIF Extension won't be installed, major scripts are missing... submit your issue here: ${links.help.github_isuues}`);

	await settingsPageInit().then(TryCreateUserInputObject)
	await Ready()
}
