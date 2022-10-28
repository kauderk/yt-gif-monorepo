let key, _name, email, url

const get = id => document.getElementById(id)
const DBPath = () => firebase.database().ref('Nota/' + key)

get('read').onclick = updateDomUsingDB
get('update').onclick = writeToDB
get('delete').onclick = removeFromDB
get('insert').onclick = insertToDB

function readFom() {
	key = get('key').value
	_name = get('name').value
	email = get('email').value
	url = get('url').value
	console.log(key, _name, url, email)
}
function clearForm(alertMSG) {
	get('key').value = ''
	get('name').value = ''
	get('email').value = ''
	get('url').value = ''
	alert(alertMSG)
}

function insertToDB() {
	readFom()

	DBPath().set({
		key,
		name: _name,
		email,
		url,
	})

	clearForm('Data Inserted')
}

function updateDomUsingDB() {
	readFom()

	DBPath().on('value', function (snap) {
		get('key').value = snap.val().key
		get('name').value = snap.val().name
		get('email').value = snap.val().email
		get('url').value = snap.val().url
		get('enlaceYt').src = snap.val().url //+ "?start=45";
	})
}

function writeToDB() {
	readFom()

	DBPath().update({
		name: _name,
		email,
		url,
	})

	clearForm('Data Update')
}

function removeFromDB() {
	readFom()

	DBPath().remove()

	clearForm('Data Deleted')
}
