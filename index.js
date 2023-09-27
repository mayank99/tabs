export default class extends HTMLElement {
	get tablist() {
		return this.querySelector('[role=tablist]');
	}

	get tabs() {
		return [...this.querySelectorAll('[role=tab]')];
	}

	get panels() {
		return [...this.querySelectorAll('[role=tabpanel]')];
	}

	get selected() {
		return this.querySelector('[role=tab][aria-selected=true]');
	}

	set selected(element) {
		this.selected?.setAttribute('aria-selected', 'false');
		element?.setAttribute('aria-selected', 'true');
		element?.focus();
		this.updateSelection();
	}

	connectedCallback() {
		this.generateIds();
		this.updateSelection();
		this.setupEvents();
	}

	generateIds() {
		const prefix = Math.floor(Date.now()).toString(36);

		this.tabs.forEach((tab, index) => {
			const panel = this.panels[index];

			tab.id ||= `${prefix}-tab-${index}`;
			panel.id ||= `${prefix}-panel-${index}`;

			tab.setAttribute('aria-controls', panel.id);
			panel.setAttribute('aria-labelledby', tab.id);
		});
	}

	updateSelection() {
		this.tabs.forEach((tab, index) => {
			const panel = this.panels[index];
			const isSelected = tab.getAttribute('aria-selected') === 'true';

			tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
			tab.setAttribute('tabindex', isSelected ? '0' : '-1');
			panel.setAttribute('tabindex', isSelected ? '0' : '-1');
			panel.hidden = !isSelected;
		});
	}

	setupEvents() {
		this.tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				this.selected = tab;
			});

			tab.addEventListener('keydown', (e) => {
				if (e.altKey || e.shiftKey) return;

				if (e.key === 'ArrowLeft') {
					this.selected = tab.previousElementSibling ?? this.tabs.at(-1);
				} else if (e.key === 'ArrowRight') {
					this.selected = tab.nextElementSibling ?? this.tabs.at(0);
				} else if (e.key === 'Home') {
					this.selected = this.tabs.at(0);
				} else if (e.key === 'End') {
					this.selected = this.tabs.at(-1);
				}
			});
		});
	}
}
