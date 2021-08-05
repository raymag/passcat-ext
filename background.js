browser.pageAction.onClicked.addListener(generatePassword);

async function generatePassword() {
	const keyword = await navigator.clipboard.readText();
	const hash = await hashstring(keyword);
	const password = await spiceUp(hash, keyword);
	navigator.clipboard.writeText(password);
}

async function spiceUp(hash, keyword) {
	const settings = JSON.parse(localStorage.getItem("settings"));
	if (settings && settings.signature && settings.size) {
		return `${keyword.substr(0, 3)}${settings.signature}${hash.substr(
			0,
			settings.size
		)}${hash.substr(hash.length - settings.size, hash.length)}`;
	}
	return hash;
}

function hashstring(string) {
	return new Promise((resolve, reject) => {
		const msgBuffer = new TextEncoder().encode(string);
		crypto.subtle
			.digest("SHA-256", msgBuffer)
			.then((hashBuffer) => {
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hashHex = hashArray
					.map((b) => ("00" + b.toString(16)).slice(-2))
					.join("");
				resolve(hashHex);
			})
			.catch(() => reject(""));
	});
}
