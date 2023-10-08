import "./components/icon/icon.js";
import "./components/filter-item/filter-item.js";
import "./components/filter-item-form/filter-item-form.js";

$(() => {
  const exampleTables = {
    exampleTable1: {
      name: "Example Table 1",
      filters: [],
    },
    // exampleTable2: {
    //   name: "Example Table 2",
    //   filters: [],
    // },
  };

  const tables = {};
  let selectedTable = null;

  async function loadTable(id) {
    let table = tables[id];

    if (!table) {
      // Load table data
      tables[id] = table = {
        filters: [],
      };
    }

    return table;
  }

  async function loadTableList() {
    $tableSelectorInput.empty();

    // Load available table names
    const $options = Object.keys(exampleTables).map((key) => {
      const $option = $("<option></option>");
      $option.attr("value", key);
      $option.text(exampleTables[key].name);

      return $option;
    });

    $tableSelectorInput.append($options);
    $tableSelectorInput.trigger("change");
  }

  const $tableSelectorInput = $("#table-selector-input");
  const $filtersItemForm = $("#filters-item-form");

  $tableSelectorInput.on("change", async (e) => {
    const value = e.target.value;
    const table = await loadTable(value);
    selectedTable = table;
    $filtersItemForm.get(0).setItems(table.filters, false);
  });

  $filtersItemForm
    .on("add", (_, value) => {
      if (selectedTable) {
        selectedTable.filters.push(value);
      }
      console.log(`Filter "${value}" added`);
    })
    .on("close", (_, value) => {
      if (selectedTable) {
        const index = selectedTable.filters.indexOf(value);
        if (index > -1) {
          selectedTable.filters.splice(index, 1);
        }
      }

      console.log(`Filter "${value}" removed`);
    });

  loadTableList();
});
