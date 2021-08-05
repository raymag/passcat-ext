browser.pageAction.onClicked.addListener(generatePassword);

async function generatePassword() {
	navigator.clipboard.readText().then((txt) => console.log(txt));
	const keyword = await navigator.clipboard.readText();
	const password = await hashstring(keyword);
	navigator.clipboard.writeText(password);
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
