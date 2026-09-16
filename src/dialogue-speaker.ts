import type { DialogueStatement } from "./room-data";
import Typewriter from "./typewriter"

export default class DialogueSpeaker extends HTMLElement {
	finished = new CustomEvent('finished');
	messageElement?: Typewriter

	build( options: DialogueStatement ) {
		const { message, speaker } = options;

		const speakerElement = document.createElement('span');
		speakerElement.textContent = `${speaker.name}: `;
		speakerElement.style.color = speaker.color;

		this.messageElement = new Typewriter;
		this.messageElement.textContent = message;

		this.appendChild(speakerElement);
		this.appendChild(this.messageElement);
	}

	connectedCallback() {
		if (!this.messageElement) {
			console.error('No messageElement on connectedCallback for SpeakerDialogue', this);
			return;
		}

		this.messageElement.addEventListener('finished', () => {
			this.dispatchEvent(this.finished);
		});
	}
	
	runMessage() {
		if (!this.messageElement) {
			console.error('No messageElement on runMessage for SpeakerDialogue', this);
			return;
		}

		this.messageElement.type();
	}
}

customElements.define('dialogue-speaker', DialogueSpeaker);
