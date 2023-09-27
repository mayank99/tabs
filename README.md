# tabs

Simple, accessible, unstyled tabs built entirely in vanilla JavaScript. Based on the [APG Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

```
npm add @acab/tabs
```

## Usage

Import the tabs and register it.

```js
import TheTabs from '@acab/tabs';

window.customElements.define('the-tabs', TheTabs);
```

Inside the custom element, define the initial markup consisting of `role=tablist`, `role=tab` and `role=tabpanel`. Add `aria-selected='true'` to the tab you initially want to be active, and add `hidden` to the panels of the other tabs.

```html
<the-tabs>
	<div role='tablist' aria-label='…'>
		<button role='tab' aria-selected='true'>…</button>
		<button role='tab'>…</button>
		<button role='tab'>…</button>
	</div>

	<div role='tabpanel'>…</div>
	<div role='tabpanel' hidden>…</div>
	<div role='tabpanel' hidden>…</div>
</the-tabs>
```

Now style it however you want! The `[role=tablist]`/`[role=tab]`/`[role=tabpanel]` and `[aria-selected=true]` selectors can be referenced in CSS.

```css
[role='tablist'] {
	/* … */
}

[role='tab'] {
	/* … */
	
	&[aria-selected='true'] {
		border-bottom: 2px solid;
		/* … */
	}
}

[role='tabpanel'] {
	/* … */
}
```
