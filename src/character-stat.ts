import { setFromAttribute, toBoolean } from "./utils";

export default class CharacterStat extends HTMLElement {
	value: number = 0;
	label: string = '';
	canBeNegative: boolean = false;
	color: string = '#ffffff';
	negativeColor: string = this.color;
	template: `${string}value${string}` = '{value}';
	hidden: boolean = false;

	connectedCallback() {
		this.setAttributes();
		this.build();
	}

	setAttributes() {
		setFromAttribute(this, 'value', 'value', parseInt)
		setFromAttribute(this, 'label')
		setFromAttribute(this, 'color')
		setFromAttribute(this, 'negative', 'canBeNegative', toBoolean);
		setFromAttribute(this, 'negative-color', 'negativeColor');
		setFromAttribute(this, 'template');
		setFromAttribute(this, 'hidden', 'hidden', toBoolean);
	}

	build() {
		this.innerHTML = '';

		if (this.hidden && this.value < 1) return;

		const labelElement = document.createElement('span');
		labelElement.textContent = `${this.label}: `;
		this.appendChild(labelElement);
		
		const valueElement = document.createElement('span');
		valueElement.textContent = this.template.replace('{value}', this.value.toString());
		valueElement.style.color = this.value >= 0 ? this.color : this.negativeColor;
		this.appendChild(valueElement);
	}
}
customElements.define('character-stat', CharacterStat);


export class CharacterMinMaxStat extends CharacterStat {
	maximum: number = 0;
	divider: string = '/';
	dividerColor: boolean|string = false;
	maxColor?: string;

	connectedCallback() {
		setFromAttribute(this, 'max', 'maximum');
		super.connectedCallback();
	}

	build() {
		super.build();

		this.maxColor = this.maxColor ?? this.color;

		const dividerElement = document.createElement('span');
		dividerElement.textContent = this.divider;
		if (this.dividerColor) {
			dividerElement.style.color = typeof this.dividerColor === 'string' ? this.dividerColor : this.color;
		}
		this.appendChild(dividerElement);

		const maxValueElement = document.createElement('span');
		maxValueElement.textContent = this.maximum.toString();
		maxValueElement.style.color = this.maxColor;
		this.appendChild(maxValueElement);
	}
}
customElements.define('character-min-max', CharacterMinMaxStat);