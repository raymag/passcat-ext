const status = document.querySelector("#status");

const signatureFd = document.querySelector("#signature");
const sizeFd = document.querySelector("#size");

const settings = JSON.parse(localStorage.getItem("settings"));
if (settings && settings.signature && settings.size) {
	signatureFd.value = settings.signature;
	sizeFd.value = settings.size;
}

// navigator.clipboard.writeText("teste");

const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", () => {
	status.innerText = "Saving...";
	const settings = { size: sizeFd.value, signature: signatureFd.value };
	localStorage.setItem("settings", JSON.stringify(settings));
	status.innerText = "Saved";
	setTimeout(() => {
		status.innerText = "";
	}, 1000);
});