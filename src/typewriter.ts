export default class Typewriter extends HTMLElement {
	typingSpeed: number = 1;
	fullText: string = '';
	currentCharacter: number = 0;

	finished = new CustomEvent('finished');


	connectedCallback() {
		this.fullText = this.textContent.trim();
		this.textContent = '';

		const typingSpeed = this.getAttribute('speed');
		if (typingSpeed !== null) {
			this.typingSpeed = parseInt(typingSpeed);
		}
	}

	build(message: string) {
		this.textContent = message;
	}

	type() {
		if (this.currentCharacter >= this.fullText.length) {
			this.dispatchEvent(this.finished);
			return;
		}

		setTimeout(() => {
			this.textContent += this.fullText[this.currentCharacter];
			this.currentCharacter++;

			this.type();
		}, this.typingSpeed);
	}
}

customElements.define('type-writer', Typewriter);