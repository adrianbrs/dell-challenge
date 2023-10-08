const template = document.createElement("template");
template.innerHTML = `
  <span class="app-filter-item-label text-truncate"></span>
  <button type="button" class="btn btn-secondary app-filter-item-remove" aria-label="Remove filter" title="Remove filter">
    <app-icon name="close"></app-icon>
  </button>
`;

export class AppFilterItemElement extends HTMLElement {
  constructor() {
    super();
  }

  get value() {
    return this.getAttribute("value");
  }
  set value(value) {
    this.setAttribute("value", value);
  }

  connectedCallback() {
    $(this).addClass("app-filter-item");

    const content = template.content.cloneNode(true);
    $(this).contents().appendTo($(content).find(".app-filter-item-label"));
    $(this).append(content);

    $(this)
      .find(".app-filter-item-remove")
      .on("click", () => {
        $(this).trigger("remove", [this.value]);
        $(this).remove();
      });
  }
}

customElements.define("app-filter-item", AppFilterItemElement);
