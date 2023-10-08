import "./components/icon/icon.js";
import "./components/filter-item/filter-item.js";

/********************
 * Dashboard
 ********************/
$(() => {
  const $filtersItemForm = $("#filters-item-form");
  const $filtersItemInput = $("#filters-item-input");
  const $filtersItemList = $("#filters-item-list");

  function addFilterItem(value) {
    if (!value) {
      return;
    }

    const $filterItem = $("<app-filter-item></app-filter-item>");
    $filterItem.text(value);
    $filterItem.attr("value", value);
    $filterItem.attr("title", value);

    $filterItem.on("remove", (_, itemValue) => {
      console.log(`Filter "${itemValue}" removed`);
    });

    $filtersItemList.append($filterItem);

    console.log(`Filter ${value} added`);
  }

  $filtersItemForm.on("submit", (e) => {
    e.preventDefault();

    const value = $filtersItemInput.val();

    addFilterItem(value);

    $filtersItemInput.val("").trigger("focus");
  });
});
