export class AppIconElement extends HTMLElement {
  static icons = {
    plus: () => import("./plus.js").then((m) => m.plus),
    close: () => import("./close.js").then((m) => m.close),
    menu: () => import("./menu.js").then((m) => m.menu),
  };

  static get observedAttributes() {
    return ["name"];
  }

  #loadedIcon = null;
  #iconHTML = "";

  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    this.setAttribute("name", value);
  }

  constructor() {
    super();
  }

  async loadIcon() {
    if (this.#loadedIcon === this.name) {
      return;
    }

    const iconLoader = AppIconElement.icons[this.name];
    if (!iconLoader) {
      console.warn(`Icon ${this.name} not found`);
      this.#iconHTML = "";
      this.#loadedIcon = null;
    } else {
      this.#iconHTML = await iconLoader();
      this.#loadedIcon = this.name;
    }
    this.renderIcon();
  }

  async connectedCallback() {
    await this.loadIcon();
  }

  async attributeChangedCallback() {
    await this.loadIcon();
  }

  renderIcon() {
    const $icon = $(this.#iconHTML);
    $icon.addClass("app-icon");
    $(this).empty().append($icon);
  }
}

customElements.define("app-icon", AppIconElement);
