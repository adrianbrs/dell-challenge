export class AppFilterItemFormElement extends HTMLElement {
  static observedAttributes = ["data-target-list"];

  /** @type {JQuery<HTMLFormElement>} */
  #form = null;

  /** @type {JQuery<HTMLInputElement>} */
  #input = null;

  /** @type {JQuery<HTMLElement>} */
  #list = null;

  #loaded = false;

  #attrCallbacks = {
    "data-target-list": this.updateTargetList.bind(this),
    "data-placeholder": this.renderInput.bind(this),
    "data-aria-label": this.renderInput.bind(this),
    "data-maxlength": this.renderInput.bind(this),
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.#attrCallbacks[name]) {
      this.#attrCallbacks[name]();
    }
  }

  updateTargetList() {
    const selector = this.getAttribute("data-target-list");
    this.#list = $(selector);
  }

  renderForm() {
    const $form = $('<form class="input-group app-filter-item-form"></form>');
    if (this.#form) {
      this.#form.contents().appendTo($form);
      this.#form.replaceWith($form);
    } else {
      $(this).append($form);
    }

    this.#form = $form;

    this.#form.on("submit", (e) => {
      e.preventDefault();
      const value = this.#input.val();

      if (!value) {
        return;
      }

      this.addItem(value);
      this.#input.val("").trigger("focus");
    });

    return this.#form;
  }

  renderInput() {
    const $input = $(`
      <input
        type="text"
        class="form-control"
        required
      />
    `);
    $input.attr("placeholder", this.getAttribute("data-placeholder"));
    $input.attr("aria-label", this.getAttribute("data-aria-label"));
    $input.attr("maxlength", this.getAttribute("data-maxlength"));

    if (this.#input) {
      this.#input.replaceWith($input);
    } else {
      this.#form.append($input);
    }

    this.#input = $input;
    return this.#input;
  }

  connectedCallback() {
    if (this.#loaded) {
      return;
    }

    this.renderForm();
    this.renderInput();

    const $button = $(`
      <button class="btn btn-primary">
        <span class="visually-hidden"
          >Click to add the new filter</span
        >
        <app-icon name="plus"></app-icon>
      </button>
    `);
    this.#form.append($button);

    this.updateTargetList();
    this.#loaded = true;
  }

  /**
   * @param {string} value
   */
  addItem(value, emit = true) {
    if (!value) {
      return;
    }

    const $filterItem = $("<app-filter-item></app-filter-item>");
    $filterItem.text(value);
    $filterItem.attr("value", value);
    $filterItem.attr("title", value);

    $filterItem.on("close", (_, itemValue) => {
      $(this).trigger("close", itemValue);
    });

    this.#list.append($filterItem);

    if (emit) {
      $(this).trigger("add", value);
    }
  }

  clearItems(emit = true) {
    if (emit) {
      $(this).trigger("clear");
    }
    this.#list.empty();
  }

  /**
   *
   * @param {string[]} values
   */
  setItems(values, emit = true) {
    this.clearItems(emit);
    values.forEach((value) => {
      this.addItem(value, emit);
    });
  }
}

customElements.define("app-filter-item-form", AppFilterItemFormElement);
