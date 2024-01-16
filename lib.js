/**
 * @param {Element} element
 */
function configureFrame(element) {
	const name = element.getAttribute("data-name");
	element.src =
		"viewer.html?" +
		new URLSearchParams({
			token,
			name,
			width: element.parentElement.clientWidth, // * 0.8,
			height: element.parentElement.clientHeight, // * 0.8,
		}).toString();
}
/**
 * @param {String} name
 */
function createItem(name, token) {
	if (typeof name !== "string") throw "Expected string, got " + typeof name;
	const s = JSON.stringify;
	const data = JSON.parse(
		localStorage.getItem("layoutdata." + token + "." + name) || "{}"
	);
	console.log(data);
	const item = `<div class="grid-stack-item" gs-h=${s(data.h || "5")} gs-w=${s(
		data.w || "5"
	)} gs-x=${s(data.x || "5")} gs-y=${s(data.y || "5")} data-name=${s(name)}>
		<div class="grid-stack-item-content">
			<iframe
				id="frame"
				src="about:blank"
				frameborder="0"
				scrolling="no"
				class="viewer"
				data-name=${s(name)}
			></iframe>
		</div>
	</div>`;
	grid.addWidget(item);
}
function saveData(el, token) {
	const name = el.getAttribute("data-name");
	localStorage.setItem(
		"layoutdata." + token + "." + name,
		JSON.stringify({
			x: el.getAttribute("gs-x"),
			y: el.getAttribute("gs-y"),
			w: el.getAttribute("gs-w"),
			h: el.getAttribute("gs-h"),
		})
	);
}
function sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
}
