import type Drawflow from 'drawflow'

export default function dragAndDrop(
	editor: Drawflow & { precanvas: HTMLElement }
) {
	let mobile_item_selec = ''
	let mobile_last_move: TouchEvent
	function positionMobile(ev: any) {
		mobile_last_move = ev
	}

	function allowDrop(ev: any) {
		ev.preventDefault()
	}

	function drag(ev: any) {
		if (ev.type === 'touchstart') {
			mobile_item_selec = ev.target
				.closest('.drag-drawflow')
				.getAttribute('data-node')
		} else {
			ev.dataTransfer.setData('node', ev.target.getAttribute('data-node'))
		}
	}

	function drop(ev: any) {
		if (ev.type === 'touchend') {
			let parentdrawflow = document
				.elementFromPoint(
					mobile_last_move.touches[0].clientX,
					mobile_last_move.touches[0].clientY
				)
				?.closest('#drawflow')
			if (parentdrawflow != null) {
				addNodeToDrawFlow(
					mobile_item_selec,
					mobile_last_move.touches[0].clientX,
					mobile_last_move.touches[0].clientY
				)
			}
			mobile_item_selec = ''
		} else {
			ev.preventDefault()
			let data = ev.dataTransfer?.getData('node')
			addNodeToDrawFlow(data, ev.clientX, ev.clientY)
		}
	}

	function addNodeToDrawFlow(name: s, pos_x: n, pos_y: n) {
		if (editor.editor_mode === 'fixed') {
			return false
		}
		pos_x =
			pos_x *
				(editor.precanvas.clientWidth /
					(editor.precanvas.clientWidth * editor.zoom)) -
			editor.precanvas.getBoundingClientRect().x *
				(editor.precanvas.clientWidth /
					(editor.precanvas.clientWidth * editor.zoom))
		pos_y =
			pos_y *
				(editor.precanvas.clientHeight /
					(editor.precanvas.clientHeight * editor.zoom)) -
			editor.precanvas.getBoundingClientRect().y *
				(editor.precanvas.clientHeight /
					(editor.precanvas.clientHeight * editor.zoom))

		switch (name) {
			case 'facebook':
				let facebook = `
        <div>
          <div class="title-box"><i class="fab fa-facebook"></i> Facebook Message</div>
        </div>
        `
				editor.addNode(
					'facebook',
					0,
					1,
					pos_x,
					pos_y,
					'facebook',
					{},
					facebook,
					false
				)
				break
			case 'slack':
				let slackchat = `
          <div>
            <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>
          </div>
          `
				editor.addNode(
					'slack',
					1,
					0,
					pos_x,
					pos_y,
					'slack',
					{},
					slackchat,
					false
				)
				break
			case 'github':
				let githubtemplate = `
          <div>
            <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>
            <div class="box">
              <p>Enter repository url</p>
            <input type="text" df-name>
            </div>
          </div>
          `
				editor.addNode(
					'github',
					0,
					1,
					pos_x,
					pos_y,
					'github',
					{ name: '' },
					githubtemplate,
					false
				)
				break
			case 'telegram':
				let telegrambot = `
          <div>
            <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram bot</div>
            <div class="box">
              <p>Send to telegram</p>
              <p>select channel</p>
              <select df-channel>
                <option value="channel_1">Channel 1</option>
                <option value="channel_2">Channel 2</option>
                <option value="channel_3">Channel 3</option>
                <option value="channel_4">Channel 4</option>
              </select>
            </div>
          </div>
          `
				editor.addNode(
					'telegram',
					1,
					0,
					pos_x,
					pos_y,
					'telegram',
					{ channel: 'channel_3' },
					telegrambot,
					false
				)
				break
			case 'aws':
				let aws = `
          <div>
            <div class="title-box"><i class="fab fa-aws"></i> Aws Save </div>
            <div class="box">
              <p>Save in aws</p>
              <input type="text" df-db-dbname placeholder="DB name"><br><br>
              <input type="text" df-db-key placeholder="DB key">
              <p>Output Log</p>
            </div>
          </div>
          `
				editor.addNode(
					'aws',
					1,
					1,
					pos_x,
					pos_y,
					'aws',
					{ db: { dbname: '', key: '' } },
					aws,
					false
				)
				break
			case 'log':
				let log = `
            <div>
              <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>
            </div>
            `
				editor.addNode('log', 1, 0, pos_x, pos_y, 'log', {}, log, false)
				break
			case 'google':
				let google = `
            <div>
              <div class="title-box"><i class="fab fa-google-drive"></i> Google Drive save </div>
            </div>
            `
				editor.addNode(
					'google',
					1,
					0,
					pos_x,
					pos_y,
					'google',
					{},
					google,
					false
				)
				break
			case 'email':
				let email = `
            <div>
              <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
            </div>
            `
				editor.addNode(
					'email',
					1,
					0,
					pos_x,
					pos_y,
					'email',
					{},
					email,
					false
				)
				break

			case 'template':
				let template = `
            <div>
              <div class="title-box"><i class="fas fa-code"></i> Template</div>
              <div class="box">
                Ger Vars
                <textarea df-template></textarea>
                Output template with vars
              </div>
            </div>
            `
				editor.addNode(
					'template',
					1,
					1,
					pos_x,
					pos_y,
					'template',
					{ template: 'Write your template' },
					template,
					false
				)
				break
			case 'multiple':
				let multiple = `
            <div>
              <div class="box">
                Multiple!
              </div>
            </div>
            `
				editor.addNode(
					'multiple',
					3,
					4,
					pos_x,
					pos_y,
					'multiple',
					{},
					multiple,
					false
				)
				break
			case 'personalized':
				let personalized = `
            <div>
              Personalized
            </div>
            `
				editor.addNode(
					'personalized',
					1,
					1,
					pos_x,
					pos_y,
					'personalized',
					{},
					personalized,
					false
				)
				break
			case 'dbclick':
				let dbclick = `
            <div>
            <div class="title-box"><i class="fas fa-mouse"></i> Db Click</div>
              <div class="box dbclickbox" ondblclick="showpopup(event)">
                Db Click here
                <div class="modal" style="display:none">
                  <div class="modal-content">
                    <span class="close" onclick="closemodal(event)">&times;</span>
                    Change your variable {name} !
                    <input type="text" df-name>
                  </div>

                </div>
              </div>
            </div>
            `
				editor.addNode(
					'dbclick',
					1,
					1,
					pos_x,
					pos_y,
					'dbclick',
					{ name: '' },
					dbclick,
					false
				)
				break

			default:
		}
	}

	return {
		drop,
		positionMobile,
		drag,
		allowDrop,
	}
}

export function AssignEvents(
	root: HTMLElement,
	dnd: ReturnType<typeof dragAndDrop>
) {
	/* Mouse and Touch Actions */
	let elements = Array.from(
		root.getElementsByClassName('drag-drawflow')
	) as HTMLElement[]

	for (const element of elements) {
		element.addEventListener('touchend', dnd.drop, false)
		element.addEventListener('touchmove', dnd.positionMobile, false)
		element.addEventListener('touchstart', dnd.drag, false)
	}
}
