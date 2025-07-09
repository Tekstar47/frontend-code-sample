const TAB_INDEX = {
  CARTON_QTY_AND_BREAKS: 0,
  DETAILS: 1,
  DOCUMENTS: 2,
}

const state: {
  productCodeSearchValue: string;
  isProductCodeSearching: boolean;
  hoveredProductGroup: string | null;
  selectedProductGroup: string | null;
  selectedProductSubGroup: string | null;
  selectedGroupName: string | null;
  selectedFilter1s: Array<number>;
  selectedFilter2s: Array<number>;
  selectedFilter3s: Array<number>;
  selectedFilter4s: Array<number>; // Index from template
  isFilter1Expanded: boolean;
  isFilter2Expanded: boolean;
  isFilter3Expanded: boolean;
  isFilter4Expanded: boolean;
  hideImages: boolean;
  expandedProductID: string | null;
  fetchingExpandedData: boolean;
  selectedTabIndex: number; // Enum = SELECTED_TAB_INDEX
  mobileShowFilters: boolean;
  data: Product[];
  cartPurchases: CartPurchase[];
  productStockLevels: InStockProduct[];
  customerPrices: APIAzureCustomerPricing[];
  technicalDataSheets: TechnicalDataSheet[];
  safetyDataSheets: SafetyDataSheet[];
  shipmentUpdates: ShipmentUpdate[];
  productSpecials: ProductSpecials[];
  dataCount: number;
  pageSize: number;
  pageNumber: number;
  tenantCode: string; 
  debug: boolean; // Enable for localhost debugging
} = {
  productCodeSearchValue: '',
  isProductCodeSearching: false,
  hoveredProductGroup: null,
  selectedProductGroup: TABLETEMPLATE.Categories[0].Name, 
  selectedProductSubGroup: null,
  selectedGroupName: null,
  selectedFilter1s: [],
  selectedFilter2s: [],
  selectedFilter3s: [],
  selectedFilter4s: [],
  isFilter1Expanded: false,
  isFilter2Expanded: false,
  isFilter3Expanded: false,
  isFilter4Expanded: false,
  hideImages: false,
  expandedProductID: null,
  fetchingExpandedData: false,
  selectedTabIndex: TAB_INDEX.CARTON_QTY_AND_BREAKS, // Default to details tab
  mobileShowFilters: false,
  data: [],
  cartPurchases: [],
  productStockLevels: [],
  technicalDataSheets: [],
  safetyDataSheets: [],
  shipmentUpdates: [],
  productSpecials: [],
  customerPrices: [],
  dataCount: 0,
  pageSize: 10,
  pageNumber: 1, // 1-indexed (page 1 is items 0-(pageSize-1))
  tenantCode: "",
  debug: true
};

if (!state.debug) console.log = (x) => {};


// Renders the product group icons at the top of the screen. The dropdown functionality has been depreciated
function RenderProductGroupList() {
  const CategoriesContainer = document.getElementById('wsCategoriesContainer');

  CategoriesContainer.classList.add('group');
  CategoriesContainer.replaceChildren();
  const CategoriesList = document.createElement('div');
  const CategoriesDropdownPlaceholder = document.createElement('div');
  CategoriesList.id = 'wsCategoriesList';
  CategoriesList.classList.add(
    'flex',
    'flex-wrap',
    'bg-slate-600',
    'gap-[2px]'
  );

  // Placing the category items into containers so it flexes better
  const CategoriesRow1 = document.createElement('div');
  const CategoriesRow2 = document.createElement('div');

  CategoriesRow1.classList.add('flex', 'gap-[2px]', 'grow-[100]', 'shrink', 'basis-0');
  CategoriesRow2.classList.add('flex', 'gap-[2px]', 'grow-[99]', 'shrink', 'basis-0');

  const totalNumberOfCategories = 10;

  // Create the title button for each category in our product hirachy
  TABLETEMPLATE.Categories.forEach((category, index) => {
    // Create the Category Item
    const ProductGroupItem = document.createElement('div');
    ProductGroupItem.id = `wsCategory${category.Name}`;
    ProductGroupItem.classList.add(
      'flex-1',
      'min-w-[6.5rem]',
      'py-2',
      'text-clip',
      'text-center',
      'hover:bg-client-yellow',
      'cursor-pointer',
      'bg-white',
      'group'
    );

    const ProductGroupItemContainer = document.createElement('div');
    ProductGroupItemContainer.classList.add(
      'flex',
      'flex-col',
      'h-full',
      'text-clip',
      'group'
    );

    // Create and add the image element
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('h-full', 'w-full', 'flex', 'items-center');
    const image = document.createElement('img');
    image.classList.add('max-w-24', 'max-h-24', 'my-auto', 'mx-auto');
    image.src = category.ImageUrl;
    imageContainer.appendChild(image);
    ProductGroupItemContainer.appendChild(imageContainer);

    // Create and add the title element
    const CategoryTitle = document.createElement('span');
    CategoryTitle.textContent = category.Name;
    CategoryTitle.classList.add('uppercase', 'tracking-wider', 'font-semibold', 'mx-auto');
    ProductGroupItemContainer.appendChild(CategoryTitle);

    ProductGroupItem.onmouseenter = (e) => {
      if (state.hoveredProductGroup != null && state.hoveredProductGroup != category.Name) {
        let k = document.getElementById(`wsHoverMenu${state.hoveredProductGroup}`);
        if (k) {
          k.classList.add('hidden');
          k.classList.remove('flex');
        }
      }

      state.hoveredProductGroup = category.Name;
      hoverMenuContainer.classList.remove('hidden');
      hoverMenuContainer.classList.add('flex');
    };

    // Add Onclick function to slect the root category and display all associated products.
    ProductGroupItem.onclick = (e) => {
      ChangeAllProductFiltering({
        newProductGroup: category.Name,
        newGroupName: null,
        newProductSubGroup: null,
      });
    };
    ProductGroupItem.appendChild(ProductGroupItemContainer);

    // Create the dropdown menu
    const hoverMenuContainer = document.createElement('div');
    hoverMenuContainer.id = `wsHoverMenu${category.Name}`;
    hoverMenuContainer.classList.add(
      'hidden',
      'absolute',
      'z-30',
      'mt-2',
      'left-0',
      'right-0',
      'min-h-72',
      'bg-client-background',
      'border-t-2',
      'border-banner-light',
      'shadow-md',
      'shadow-slate-400',
      'cursor-default',
      'flex-row',
      'item-center',
      'p-4'
    );

    let leftColSpacer = document.createElement('div');
    leftColSpacer.classList.add('flex-1');
    hoverMenuContainer.appendChild(leftColSpacer);

    category.Categories.forEach((subCategory) => {
      let menuColumn = document.createElement('div');
      menuColumn.classList.add('w-64', 'p-2');

      let heading = document.createElement('h3');
      heading.classList.add(
        'text-lg',
        'font-bold',
        'cursor-pointer',
        'hover:text-slate-800',
        'hover:scale-105',
        'w-fit',
        'text-left'
      );
      heading.textContent = subCategory.Name;
      menuColumn.appendChild(heading);
      heading.onclick = (e) => {
        ChangeAllProductFiltering({
          newProductGroup: category.Name,
          newProductSubGroup: subCategory.Name,
          newGroupName: null,
        });
        e.stopPropagation();

        // Close the dropdown menu
        hoverMenuContainer.classList.remove('hover:flex', 'group-hover:flex');
        setTimeout(() => {
          hoverMenuContainer.classList.add('hover:flex', 'group-hover:flex');
        }, 50);
      };

      subCategory.Categories.forEach((subSubCategory) => {
        let subheading = document.createElement('p');
        subheading.classList.add(
          'pl-2',
          'leading-tight',
          'text-sm',
          'cursor-pointer',
          'hover:text-slate-800',
          'hover:scale-105',
          'w-fit'
        );
        subheading.textContent = subSubCategory.Name;
        subheading.onclick = (e) => {
          ChangeAllProductFiltering({
            newProductGroup: category.Name,
            newProductSubGroup: subCategory.Name,
            newGroupName: subSubCategory.Name,
          });
          e.stopPropagation();

          // Close the dropdown menu
          hoverMenuContainer.classList.remove('hover:flex', 'group-hover:flex');
          setTimeout(() => {
            hoverMenuContainer.classList.add('hover:flex', 'group-hover:flex');
          }, 50);
        };

        menuColumn.appendChild(subheading);
      });

      hoverMenuContainer.appendChild(menuColumn);
    });

    let rightColSpacer = document.createElement('div');
    rightColSpacer.classList.add('flex-1');
    hoverMenuContainer.appendChild(rightColSpacer);

    // Add dropdown menu to root category
    // ProductGroupItem.appendChild(hoverMenuContainer);

    // Append Category Item to the list
    if (index < totalNumberOfCategories / 2) {
      CategoriesRow1.appendChild(ProductGroupItem);
    } else {
      CategoriesRow2.appendChild(ProductGroupItem);
    }

    // CategoriesDropdownPlaceholder.appendChild(hoverMenuContainer);
    // CategoriesContainer.appendChild(hoverMenuContainer);
  });

  CategoriesList.appendChild(CategoriesRow1);
  CategoriesList.appendChild(CategoriesRow2);
  CategoriesContainer.replaceChildren(CategoriesList, CategoriesDropdownPlaceholder);
}

// Renders the product sub-group information on the left hand side of the screen.
function RenderProductSubGroupInformation() {
  const filterCategoryList = document.getElementById('wsFilterContainerCategoryList');
  const filterCategoryListTitle = document.getElementById('wsFilterContainerCategoryListTitle');
  filterCategoryListTitle.textContent = '';
  let newChildren: HTMLElement[] = [];

  if (state.selectedProductGroup) {
    let category = TABLETEMPLATE.Categories.find((x) => x.Name == state.selectedProductGroup);

    filterCategoryListTitle.innerText = category.CategoryGroupName;

    category.Categories.forEach((subcategory) => {
      // Create the list element
      const listItem = document.createElement('li');
      listItem.classList.add('flex', 'select-none');

      // Create the checkbox
      const checkbox = document.createElement('input');
      checkbox.id = `product-sub-group-${subcategory.Name.split(' ').join('-')}`;
      checkbox.type = 'checkbox';
      checkbox.checked = state.selectedProductSubGroup == subcategory.Name ? true : false;
      checkbox.classList.add('mx-2', 'cursor-pointer');
      checkbox.onclick = (e) => {
        let newProductSubGroup = subcategory.Name;
        if (state.selectedProductSubGroup == newProductSubGroup) {
          newProductSubGroup = null;
        }

        ChangeAllProductFiltering({
          newProductGroup: state.selectedProductGroup,
          newProductSubGroup: newProductSubGroup,
          newGroupName: null,
        });
      };

      // Create the checkbox label
      const label: HTMLSpanElement = document.createElement('span');
      label.classList.add('cursor-default');
      label.textContent = subcategory.Name;
      // Add onclick functionality to the checkbox text to make ticking and unticking the checkbox easier
      label.onclick = (e) => {
        checkbox.checked = !checkbox.checked;

        let newProductSubGroup = subcategory.Name;
        if (state.selectedProductSubGroup == newProductSubGroup) {
          newProductSubGroup = null;
        }

        ChangeAllProductFiltering({
          newProductGroup: state.selectedProductGroup,
          newProductSubGroup: newProductSubGroup,
          newGroupName: null,
        });
      };

      // Add checkbox and label to the list element
      listItem.append(checkbox, label);

      // Prepare list item to be added to the list
      newChildren.push(listItem);
    });
  } else {
    const textMessage = document.createElement('span');
    textMessage.classList.add('font-bold');
    textMessage.textContent = 'Search is across all categories';
    newChildren.push(textMessage);
  }

  filterCategoryList.replaceChildren(...newChildren);

  // Render subgroup stuff
  RenderProductGroupNameInformation();
}

// Renders the product sub-group information on the left hand side of the screen.
function RenderProductGroupNameInformation() {
  const filterCategoryListTitle = document.getElementById('wsFilterContainerCategoryGroupNameListTitle');
  const filterCategoryList = document.getElementById('wsFilterContainerCategoryGroupNameList');
  let newChildren: HTMLElement[] = [];

  if (state.selectedProductGroup) {
    let groupNameFilters = document.getElementById('wsFilterContainerCategoryGroupNameContainer');
    if (!state.selectedProductSubGroup) {
      groupNameFilters.classList.add('hidden');
      return;
    } else {
      groupNameFilters.classList.remove('hidden');
    }

    let productSubGroup = TABLETEMPLATE.Categories.find((x) => x.Name === state.selectedProductGroup).Categories.find(
      (x) => x.Name === state.selectedProductSubGroup
    ) as TableTemplateCategoryGroup;

    filterCategoryListTitle.innerText = 'Range';

    productSubGroup.Categories.forEach((GroupName: TableTemplateGroupName) => {
      // Create the list element
      const listItem = document.createElement('li');
      listItem.classList.add('flex', 'select-none');

      // Create the checkbox
      const checkbox = document.createElement('input');
      checkbox.id = `product-group-name-${GroupName.Name.split(' ').join('-')}`;
      checkbox.type = 'checkbox';
      checkbox.checked = state.selectedGroupName == GroupName.Name ? true : false;
      checkbox.classList.add('mx-2', 'cursor-pointer');
      checkbox.onclick = (e) => {
        let newGroupName = GroupName.Name;
        if (state.selectedGroupName == newGroupName) {
          newGroupName = null;
        }

        ChangeAllProductFiltering({
          newProductGroup: state.selectedProductGroup,
          newProductSubGroup: state.selectedProductSubGroup,
          newGroupName: newGroupName,
        });
      };

      // Create the checkbox label
      const label: HTMLSpanElement = document.createElement('span');
      label.classList.add('cursor-default');
      label.textContent = GroupName.Name;
      // Add onclick functionality to the checkbox text to make ticking and unticking the checkbox easier
      label.onclick = (e) => {
        checkbox.checked = !checkbox.checked;

        let newGroupName = GroupName.Name;
        if (state.selectedGroupName == newGroupName) {
          newGroupName = null;
        }

        ChangeAllProductFiltering({
          newProductGroup: state.selectedProductGroup,
          newProductSubGroup: state.selectedProductSubGroup,
          newGroupName: newGroupName,
        });
      };

      // Add checkbox and label to the list element
      listItem.append(checkbox, label);

      // Prepare list item to be added to the list
      newChildren.push(listItem);
    });
  }

  filterCategoryList.replaceChildren(...newChildren);
}

// Renders the product filter information based on the selected product group on the left hand side of the screen.
function RenderProductFilterInformation() {
  const bodyFilterContainer = document.getElementById('wsFilterContainerProductFiltersContainer');
  bodyFilterContainer.classList.add('hidden');
  const container = document.createElement('div');

  if (state.selectedProductGroup) {
    let selectedCategoryIndex = TABLETEMPLATE.Categories.findIndex((x) => x.Name === state.selectedProductGroup);
    if (selectedCategoryIndex == -1) {
      console.log('huh?');
      return;
    }

    if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.length > 0) {
      bodyFilterContainer.classList.remove('hidden');
      const filterContainer = document.createElement('div');

      const heading = document.createElement('div');
      heading.classList.add('font-bold', 'border-slate-600');
      heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Name;
      filterContainer.appendChild(heading);

      TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.forEach((filter, index) => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('flex');

        if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter1Expanded) {
          return;
        }

        const checkbox = document.createElement('input');
        checkbox.id = `checkbox-filter1-${filter}`;
        checkbox.classList.add('mx-2', 'my-auto');
        checkbox.type = 'checkbox';
        checkbox.checked = state.selectedFilter1s.indexOf(index) !== -1 ? true : false;
        checkbox.onclick = (e) => {
          let selectedIndex = state.selectedFilter1s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter1s.push(index);
          } else {
            state.selectedFilter1s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(checkbox);

        const label = document.createElement('span');
        label.textContent = filter;
        label.classList.add('my-auto', 'flex-1');

        label.onclick = (e) => {
          checkbox.checked = !checkbox.checked;

          let selectedIndex = state.selectedFilter1s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter1s.push(index);
          } else {
            state.selectedFilter1s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(label);

        filterContainer.appendChild(checkboxContainer);
      });

      if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        !state.isFilter1Expanded
      ) {
        let viewAll = document.createElement('div');
        viewAll.id = `filter1-viewall`;
        viewAll.textContent = 'view all';
        viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewAll.onclick = () => {
          state.isFilter1Expanded = true;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewAll);
      } else if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        state.isFilter1Expanded
      ) {
        let viewLess = document.createElement('div');
        viewLess.id = `filter1-viewless`;
        viewLess.textContent = 'view less';
        viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewLess.onclick = () => {
          state.isFilter1Expanded = false;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewLess);
      }

      container.appendChild(filterContainer);
    } else {
      bodyFilterContainer.classList.add('hidden');
    }

    if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.length > 0) {
      const filterContainer = document.createElement('div');

      const heading = document.createElement('div');
      heading.classList.add('font-bold', 'border-t', 'pt-2', 'mt-2', 'border-slate-600');
      heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Name;
      filterContainer.appendChild(heading);

      TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.forEach((filter, index) => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('flex');

        if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter2Expanded) {
          return;
        }

        const checkbox = document.createElement('input');
        checkbox.id = `checkbox-filter2-${filter}`;
        checkbox.classList.add('mx-2', 'my-auto');
        checkbox.type = 'checkbox';
        checkbox.checked = state.selectedFilter2s.indexOf(index) !== -1 ? true : false;
        checkbox.onclick = (e) => {
          let selectedIndex = state.selectedFilter2s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter2s.push(index);
          } else {
            state.selectedFilter2s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(checkbox);

        const label = document.createElement('span');
        label.classList.add('my-auto', 'flex-1');
        label.textContent = filter;

        label.onclick = (e) => {
          checkbox.checked = !checkbox.checked;

          let selectedIndex = state.selectedFilter2s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter2s.push(index);
          } else {
            state.selectedFilter2s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(label);

        filterContainer.appendChild(checkboxContainer);
      });

      if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        !state.isFilter2Expanded
      ) {
        let viewAll = document.createElement('div');
        viewAll.id = `filter2-viewall`;
        viewAll.textContent = 'view all';
        viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewAll.onclick = () => {
          state.isFilter2Expanded = true;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewAll);
      } else if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        state.isFilter2Expanded
      ) {
        let viewLess = document.createElement('div');
        viewLess.id = `filter2-viewless`;
        viewLess.textContent = 'view less';
        viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewLess.onclick = () => {
          state.isFilter2Expanded = false;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewLess);
      }

      container.appendChild(filterContainer);
    }

    if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.length > 0) {
      const filterContainer = document.createElement('div');

      const heading = document.createElement('div');
      heading.classList.add('font-bold', 'border-t', 'pt-2', 'mt-2', 'border-slate-600');
      heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Name;
      filterContainer.appendChild(heading);

      TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.forEach((filter, index) => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('flex');

        if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter3Expanded) {
          return;
        }

        const checkbox = document.createElement('input');
        checkbox.id = `checkbox-filter3-${filter}`;
        checkbox.classList.add('mx-2', 'my-auto');
        checkbox.type = 'checkbox';
        checkbox.checked = state.selectedFilter3s.indexOf(index) !== -1 ? true : false;
        checkbox.onclick = (e) => {
          let selectedIndex = state.selectedFilter3s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter3s.push(index);
          } else {
            state.selectedFilter3s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(checkbox);

        const label = document.createElement('span');
        label.classList.add('my-auto', 'flex-1');
        label.textContent = filter;

        label.onclick = (e) => {
          checkbox.checked = !checkbox.checked;

          let selectedIndex = state.selectedFilter3s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter3s.push(index);
          } else {
            state.selectedFilter3s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(label);

        filterContainer.appendChild(checkboxContainer);
      });

      if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        !state.isFilter3Expanded
      ) {
        let viewAll = document.createElement('div');
        viewAll.id = `filter3-viewall`;
        viewAll.textContent = 'view all';
        viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewAll.onclick = () => {
          state.isFilter3Expanded = true;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewAll);
      } else if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        state.isFilter3Expanded
      ) {
        let viewLess = document.createElement('div');
        viewLess.id = `filter3-viewless`;
        viewLess.textContent = 'view less';
        viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewLess.onclick = () => {
          state.isFilter3Expanded = false;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewLess);
      }

      container.appendChild(filterContainer);
    }

    if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.length > 0) {
      const filterContainer = document.createElement('div');

      const heading = document.createElement('div');
      heading.classList.add('font-bold', 'border-t', 'pt-2', 'mt-2', 'border-slate-600');
      heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Name;
      filterContainer.appendChild(heading);

      TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.forEach((filter, index) => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('flex');

        if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter4Expanded) {
          return;
        }

        const checkbox = document.createElement('input');
        checkbox.id = `checkbox-filter4-${filter}`;
        checkbox.classList.add('mx-2', 'my-auto');
        checkbox.type = 'checkbox';
        checkbox.checked = state.selectedFilter4s.indexOf(index) !== -1 ? true : false;
        checkbox.onclick = (e) => {
          let selectedIndex = state.selectedFilter4s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter4s.push(index);
          } else {
            state.selectedFilter4s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(checkbox);

        const label = document.createElement('label');
        label.classList.add('my-auto');
        label.textContent = filter;

        label.onclick = (e) => {
          checkbox.checked = !checkbox.checked;

          let selectedIndex = state.selectedFilter4s.indexOf(index);
          if (selectedIndex == -1) {
            state.selectedFilter4s.push(index);
          } else {
            state.selectedFilter4s.splice(selectedIndex, 1);
          }

          ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: state.selectedGroupName,
            filtersChanged: true,
          });
        };

        checkboxContainer.appendChild(label);

        filterContainer.appendChild(checkboxContainer);
      });

      if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        !state.isFilter4Expanded
      ) {
        let viewAll = document.createElement('div');
        viewAll.id = `filter4-viewall`;
        viewAll.textContent = 'view all';
        viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewAll.onclick = () => {
          state.isFilter4Expanded = true;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewAll);
      } else if (
        TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
        state.isFilter4Expanded
      ) {
        let viewLess = document.createElement('div');
        viewLess.id = `filter4-viewless`;
        viewLess.textContent = 'view less';
        viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
        viewLess.onclick = () => {
          state.isFilter4Expanded = false;
          RenderProductFilterInformation();
        };

        filterContainer.appendChild(viewLess);
      }

      container.appendChild(filterContainer);
    }
  }

  bodyFilterContainer.replaceChildren(container);
}

// Updates and displays the current 
function UpdateCategoryBanner() {
  let banner = document.getElementById('wsContentTableBannerTitle');
  // document.createElement('span');

  if (!state.selectedProductGroup) {
    let textMessage = document.createElement('span');
    textMessage.textContent = 'All Categories';
    banner.replaceChildren(textMessage);
    return;
  }

  let productGroup = document.createElement('span');
  productGroup.textContent = state.selectedProductGroup;

  if (!state.selectedProductSubGroup) {
    banner.replaceChildren(productGroup);
    return;
  }

  productGroup.classList.add('underline', 'cursor-pointer');
  productGroup.onclick = () =>
    ChangeAllProductFiltering({
      newProductGroup: state.selectedProductGroup,
      newProductSubGroup: null,
      newGroupName: null,
    });

  let separator = document.createElement('span');
  separator.textContent = ' > ';

  let productSubGroup = document.createElement('span');
  productSubGroup.textContent = state.selectedProductSubGroup;

  if (!state.selectedGroupName) {
    banner.replaceChildren(productGroup, separator, productSubGroup);
    return;
  }

  productSubGroup.classList.add('underline', 'cursor-pointer');

  productSubGroup.onclick = () =>
    ChangeAllProductFiltering({
      newProductGroup: state.selectedProductGroup,
      newProductSubGroup: state.selectedProductSubGroup,
      newGroupName: null,
    });

  let separator2 = document.createElement('span');
  separator2.textContent = ' > ';

  let groupName = document.createElement('span');
  groupName.textContent = state.selectedGroupName;

  banner.replaceChildren(productGroup, separator, productSubGroup, separator2, groupName);
}

// Unused code for toggling the filters section for mobile devices
function Toggle() {
  let filterContainer = document.getElementById('wsFilterContainer');

  if (!state.mobileShowFilters) {
    filterContainer.classList.add('w-5/6');
    filterContainer.classList.remove('hidden');
  } else {
    filterContainer.classList.remove('w-5/6');
    filterContainer.classList.add('hidden');
  }

  state.mobileShowFilters = !state.mobileShowFilters;
}


async function RenderTableSection(fetchData: boolean = true) {
  // Fetch table data
  if (fetchData) {
    const loadTableDataPromise = LoadTableData();

    RenderTableSkeleton();

    await loadTableDataPromise;
  }

  // Get reference to the table container
  let wsTableContainer = document.getElementById('wsTableContainer');

  let upperSection = document.createElement('div');
  upperSection.classList.add(
    'w-full',
    'flex',
    'mt-4',
    'mb-4',
    'bg-white',
    'p-4',
    'rounded',
    'text-sm'
  );

  let tableContainer = document.createElement('div');
  tableContainer.classList.add(...COMPONENT_STYLES.ProductTableStyles.Container);

  // Create the element
  let table = document.createElement('div');
  table.classList.add(...COMPONENT_STYLES.ProductTableStyles.Table);

  if (state.hideImages) {
    table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithoutImage;
  } else {
    table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithImage;
  }

  RenderTableLegend(upperSection, table);
  RenderTableHeader(table);
  RenderTableBody(table);
  RenderTableFooter(table);

  tableContainer.appendChild(table);
  wsTableContainer.replaceChildren(upperSection, tableContainer);
}

function RenderTableLegend(upperSection: HTMLDivElement, table: HTMLDivElement) {
  // Table search/legend
  let searchForm = document.createElement('form');
  searchForm.classList.add('flex');
  searchForm.onsubmit = (e) => e.preventDefault();

  let searchLabel = document.createElement('span');
  searchLabel.classList.add('mr-2', 'my-auto', 'font-bold');
  searchLabel.textContent = 'Search';
  searchForm.appendChild(searchLabel);

  let searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.value = state.productCodeSearchValue;
  searchInput.classList.add('w-64', 'rounded-sm', 'border', 'h-8', 'px-2', 'my-auto');
  let previousInputValue;
  let searchRegex = /^[0-9A-Za-z ]*$/;
  searchInput.onfocus = (e) => {
    previousInputValue = (e.target as HTMLInputElement).value;
    console.log('newpreviousInput', previousInputValue);
  };
  searchInput.oninput = (e) => {
    let value = (e.target as HTMLInputElement).value;

    if (searchRegex.exec(value)) {
      previousInputValue = value;
      state.productCodeSearchValue = value;
    } else {
      searchInput.value = previousInputValue;
    }
  };

  searchForm.appendChild(searchInput);

  let searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.classList.add('border', 'rounded-sm', 'w-8', 'h-8', 'border-l-0', 'my-auto');
  searchButton.onclick = (e) => {
    let searchProductCode = searchInput.value;

    if (!searchRegex.exec(searchProductCode)) return;

    state.productCodeSearchValue = searchProductCode;
    state.isProductCodeSearching = true;
    ChangeAllProductFiltering({
      newGroupName: null,
      newProductGroup: null,
      newProductSubGroup: null,
      resetSearch: false,
    }).then((res) => {
      if (!res) {
        return RenderTableSection();
      }
    });
  };

  let clearButton = document.createElement('button');
  clearButton.type = 'reset';
  clearButton.classList.add('border', 'rounded-sm', 'w-8', 'h-8', 'border-l-0', 'my-auto');
  clearButton.onclick = (e) => {
    searchInput.value = '';
    state.isProductCodeSearching = false;
    state.productCodeSearchValue = '';
    state.selectedProductGroup = null;
    state.selectedProductSubGroup = null;
    state.selectedGroupName = null;

    ChangeAllProductFiltering({
      newProductGroup: TABLETEMPLATE.Categories[0].Name,
      newProductSubGroup: null,
      newGroupName: null,
      resetSearch: true,
    });
  };

  // Search Icon
  {
    let searchIcon = document.createElement('i');
    searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');

    let infoIcon = document.createElement('i');
    infoIcon.classList.add('fa-solid', 'fa-circle-info', 'text-lg', 'my-auto');

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    iconSvg.setAttribute('viewBox', '0 0 512 512');
    iconPath.setAttribute(
      'd',
      'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
    );

    iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'my-auto', 'fill-client-dark');
    iconSvg.appendChild(iconPath);

    searchButton.appendChild(iconSvg);
  }

  // Clear Icon
  {
    let clearIcon = document.createElement('i');
    clearIcon.classList.add('fa-solid', 'fa-magnifying-glass');

    let infoIcon = document.createElement('i');
    infoIcon.classList.add('fa-solid', 'fa-circle-info', 'text-lg', 'my-auto');

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    iconSvg.setAttribute('viewBox', '0 0 384 512');
    iconPath.setAttribute(
      'd',
      'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
    );

    iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'my-auto', 'fill-client-dark');
    iconSvg.appendChild(iconPath);

    clearButton.appendChild(iconSvg);
  }

  searchForm.appendChild(searchButton);
  searchForm.appendChild(clearButton);

  // Render table image toggle.
  const imageToggleWrapper = document.createElement('div');
  imageToggleWrapper.classList.add('flex', 'items-center', 'gap-4', 'ml-8');

  const imageToggleSwitch = document.createElement('label');
  imageToggleSwitch.classList.add('relative', 'inline-block', 'w-8', 'h-4');

  const imageToggleLabel = document.createElement('div');
  imageToggleLabel.classList.add('text-sm', 'font-bold');
  imageToggleLabel.textContent = 'Hide Images';

  const imageToggleCheckbox = document.createElement('input');
  imageToggleCheckbox.classList.add('opacity-0', 'w-0', 'h-0', 'peer');
  imageToggleCheckbox.type = 'checkbox';
  imageToggleCheckbox.checked = state.hideImages;
  imageToggleCheckbox.onchange = (e) => {
    state.hideImages = (e.target as HTMLInputElement).checked;
    console.log('STATE', state);

    const headerImage = document.getElementById(`table-header-image-col`);
    if (!headerImage) {
      console.log('Potato');
      return;
    }

    if (state.hideImages) {
      table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithoutImage;
      headerImage.classList.add('hidden');
      state.data.forEach((product) => {
        let tdImage = document.getElementById(`${product.ID}-image`);
        if (!tdImage) return;
        tdImage.classList.add('hidden');
      });
    } else {
      table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithImage;
      headerImage.classList.remove('hidden');
      state.data.forEach((product) => {
        let tdImage = document.getElementById(`${product.ID}-image`);
        if (!tdImage) return;
        tdImage.classList.remove('hidden');
      });
    }
  };

  const imageToggleSlider = document.createElement('span');
  imageToggleSlider.classList.add(
    'absolute',
    'cursor-pointer',
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'bg-[#ccc]',
    'rounded-full',
    'transition-all',
    'before:absolute',
    'before:content-[""]',
    'before:w-3',
    'before:h-3',
    'before:rounded-full',
    'before:bg-white',
    'before:left-0.5',
    'before:bottom-0.5',
    'before:transition-all',
    'peer-checked:bg-client-dark',
    'peer-checked:before:translate-x-4',
    'peer-checked:before:bg-client-yellow'
  );

  imageToggleSwitch.appendChild(imageToggleCheckbox);
  imageToggleSwitch.appendChild(imageToggleSlider);
  imageToggleWrapper.appendChild(imageToggleLabel);
  imageToggleWrapper.appendChild(imageToggleSwitch);

  let legendContainer = document.createElement('div');
  legendContainer.classList.add('flex-1', 'flex', 'justify-center', 'gap-x-8', 'gap-y-2', 'flex-wrap');

  // Pack Price = Net Price
  let fixedCostLegendContainer = document.createElement('div');
  fixedCostLegendContainer.classList.add('my-auto', 'flex');

  let fixedCostLabel = document.createElement('span');
  fixedCostLabel.classList.add('my-auto', 'font-bold', 'text-nowrap');
  fixedCostLabel.textContent = '($) Pack Price = Net Price';
  fixedCostLegendContainer.appendChild(fixedCostLabel);

  // Qty Breaks
  let qtyBreakContainer = document.createElement('div');
  qtyBreakContainer.classList.add('flex', 'gap-2');

  let qtyBreakLabel = document.createElement('span');
  qtyBreakLabel.classList.add('font-bold', 'text-nowrap', 'my-auto');
  qtyBreakLabel.textContent = ' = Qty Breaks';

  {
    let infoIcon = document.createElement('i');
    infoIcon.classList.add('fa-solid', 'fa-circle-info', 'text-lg', 'my-auto');

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    iconSvg.setAttribute('viewBox', '0 0 512 512');
    iconPath.setAttribute(
      'd',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'
    );

    iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'my-auto', 'fill-client-dark');
    iconSvg.appendChild(iconPath);

    qtyBreakContainer.appendChild(iconSvg);
  }

  qtyBreakContainer.appendChild(qtyBreakLabel);

  let stockInformationLegend = document.createElement('div');
  stockInformationLegend.classList.add('flex', 'gap-x-8', 'gap-y-2');

  let inStockContainer = document.createElement('div');
  inStockContainer.classList.add('flex', 'flex-1', 'gap-2');

  let inStockIcon = document.createElement('div');
  inStockIcon.classList.add('rounded-full', 'border', 'bg-green-400', 'min-w-4', 'min-h-4', 'my-auto');

  let inStockLabel = document.createElement('span');
  inStockLabel.classList.add('my-auto', 'font-bold', 'text-nowrap');
  inStockLabel.textContent = '= In Stock';

  inStockContainer.appendChild(inStockIcon);
  inStockContainer.appendChild(inStockLabel);

  let noStockContainer = document.createElement('div');
  noStockContainer.classList.add('flex', 'gap-2', 'flex-1');

  let noStockIcon = document.createElement('div');
  noStockIcon.classList.add('rounded-full', 'border', 'bg-red-400', 'min-w-4', 'min-h-4', 'my-auto');

  let noStockLabel = document.createElement('span');
  noStockLabel.classList.add('my-auto', 'font-bold', 'text-nowrap');
  noStockLabel.textContent = '= Out of Stock';

  noStockContainer.appendChild(noStockIcon);
  noStockContainer.appendChild(noStockLabel);

  stockInformationLegend.appendChild(inStockContainer);
  stockInformationLegend.appendChild(noStockContainer);

  legendContainer.appendChild(fixedCostLegendContainer);
  legendContainer.appendChild(qtyBreakContainer);
  legendContainer.appendChild(stockInformationLegend);

  upperSection.appendChild(searchForm);
  upperSection.appendChild(imageToggleWrapper);
  upperSection.appendChild(legendContainer);
}

function RenderTableHeader(table: HTMLDivElement) {
  // Declare the columns
  let headerRow = document.createElement('div');
  let headerDropdown = document.createElement('div');
  let headerCode = document.createElement('div');
  let headerDescription = document.createElement('div');
  let headerQty = document.createElement('div');
  let headerPackType = document.createElement('div');
  let headerPackQty = document.createElement('div');
  let headerPricePerUOM = document.createElement('div');
  let headerMinBuy = document.createElement('div');
  let headerSupplierSOH = document.createElement('div');
  let headerMySOH = document.createElement('div');
  let headerPackPriceContainer = document.createElement('div');
  let headerPackPrice = document.createElement('div');
  let headerAdd = document.createElement('div');
  let headerImage = document.createElement('div');

  // Apply Styles
  {
    headerRow.classList.add(...COMPONENT_STYLES.ProductTableStyles.HeaderRow);
    headerDropdown.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Dropdown,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Dropdown,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerCode.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Code,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Code,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerDescription.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Description,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Description,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerQty.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.BuyQty,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.BuyQty,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerPackType.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.PackType,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackType,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerPackQty.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.PackQty,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackQty,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerPricePerUOM.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.PricePerUOM,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PricePerUOM,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerMinBuy.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.MinBuy,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MinBuy,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerSupplierSOH.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.SupplierSOH,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.SupplierSOH,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerMySOH.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.MySOH,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MySOH,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerPackPrice.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.PackPrice,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackPrice,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerPackPriceContainer.classList.add(
      'group',
      'relative',
      'flex',
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerAdd.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Add,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Add,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
    headerImage.classList.add(
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Image,
      ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Image,
      ...COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared,
      COMPONENT_STYLES.ProductTableStyles.HeadingRowColour
    );
  }

  // Add content
  {
    headerCode.textContent = 'Code';
    headerDescription.textContent = 'Description';
    headerQty.textContent = 'Buy Qty';
    headerPackType.textContent = 'Pack Type';
    headerPackQty.textContent = 'Pack Qty';
    headerPricePerUOM.textContent = 'Price/100';
    headerMinBuy.textContent = 'Min Buy';
    headerSupplierSOH.textContent = 'Supplier SOH';
    headerMySOH.textContent = 'My SOH';

    headerImage.textContent = 'Image';
    if (state.hideImages) headerImage.classList.add('hidden');
    headerImage.id = `table-header-image-col`;

    let headerPackPriceTooltipContainer = document.createElement('div');
    let headerPackPriceTooltipMessage = document.createElement('span');
    headerPackPriceTooltipMessage.classList.add('text-black');

    headerPackPrice.textContent = 'Pack Price';
    headerPackPriceTooltipContainer.classList.add(
      'hidden',
      'left-1/2',
      '-translate-x-1/2',
      '-rounded',
      'absolute',
      'shadow-md',
      'shadow-slate-400',
      'z-20',
      'p-4',
      'mt-10',
      'group-hover:flex',
      'bg-white',
      'min-w-32',
      'text-black'
    );
    // headerPackPriceTooltipMessage.classList.add('min-w-44');
    headerPackPriceTooltipMessage.textContent = 'Also known as Net Price';
    headerPackPriceTooltipContainer.appendChild(headerPackPriceTooltipMessage);
    headerPackPriceContainer.appendChild(headerPackPrice);
    // headerPackPriceContainer.appendChild(headerPackPriceTooltipContainer);
  }

  // Add to DOM
  {
    headerRow.appendChild(headerDropdown);
    headerRow.appendChild(headerImage);
    headerRow.appendChild(headerCode);
    headerRow.appendChild(headerDescription);
    headerRow.appendChild(headerPackPrice);
    headerRow.appendChild(headerPackType);
    headerRow.appendChild(headerPackQty);
    headerRow.appendChild(headerMinBuy);
    headerRow.appendChild(headerQty);
    headerRow.appendChild(headerSupplierSOH);
    headerRow.appendChild(headerMySOH);
    headerRow.appendChild(headerAdd);
    table.appendChild(headerRow);
  }
}

function RenderTableBody(table: HTMLDivElement) {
  if (state.data.length == 0) {
    const row = document.createElement('div');
    row.classList.add('col-span-full', 'h-24', 'flex', 'justify-center', 'items-center');
    row.textContent = 'No products found!';
    table.appendChild(row);
  }

  state.data.forEach((product, index) => {
    // Declare the columns
    let isRowSelected = state.expandedProductID == product.ID;
    let isProductInCart = !!state.cartPurchases.find((x) => x?.Product_Code === product.Product_Code);

    let dataRow = document.createElement('div');
    let tdDropdown = document.createElement('div');
    let tdCode = document.createElement('div');
    let tdDescription = document.createElement('div');
    let tdBuyQty = document.createElement('div');
    let tdPackQty = document.createElement('div');
    let tdPackType = document.createElement('div');
    let tdMinBuy = document.createElement('div');
    let tdSupplierStock = document.createElement('div');
    let tdMySOH = document.createElement('div');
    let tdPackPrice = document.createElement('div');
    let tdPricePerUOM = document.createElement('div');
    let tdAdd = document.createElement('div');
    let tdImage = document.createElement('div');
    let expandedRecordInformation; // Placeholder for an element that will be added later

    // Apply the styles
    {
      dataRow.classList.add(...COMPONENT_STYLES.ProductTableStyles.Row);

      tdDropdown.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Dropdown,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Dropdown
      );
      tdCode.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Code,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Code
      );
      tdDescription.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Description,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Description
      );
      tdBuyQty.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.BuyQty,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.BuyQty
      );
      tdPackQty.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.PackQty,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackQty
      );
      tdPackType.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.PackType,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackType
      );
      tdMinBuy.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.MinBuy,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MinBuy
      );
      tdSupplierStock.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.SupplierSOH,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.SupplierSOH
      );
      tdMySOH.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.MySOH,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MySOH
      );
      tdPackPrice.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.PackPrice,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackPrice
      );
      tdPricePerUOM.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.PricePerUOM,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PricePerUOM
      );
      tdAdd.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Add,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Add
      );
      tdImage.classList.add(
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Image,
        ...COMPONENT_STYLES.ProductTableStyles.CellElement.Shared,
        ...COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Image
      );

      if (IsEven(index)) {
        // Even Row
        dataRow.classList.add(...COMPONENT_STYLES.ProductTableStyles.EvenRowColours);
      } else {
        // Odd Row
        dataRow.classList.add(...COMPONENT_STYLES.ProductTableStyles.OddRowColours);
      }

      if (isRowSelected) {
        dataRow.classList.add(...COMPONENT_STYLES.ProductTableStyles.SelectedRowColours);
      }
    }

    // Add the content
    {
      dataRow.id = `${product.ID}-row`;

      tdImage.id = `${product.ID}-image`;
      const productImage = document.createElement('img');
      productImage.classList.add('max-w-full', 'max-h-full', 'w-auto', 'h-auto');
      productImage.id = `img-${product.ID}`;
      if (state.hideImages) tdImage.classList.add('hidden');
      // productImage.alt = `image of ${product.Product_Name}`;
      // productImage.src = `https://plus.unsplash.com/premium_photo-1665952050053-31ac47c6ff4b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D`;
      tdImage.appendChild(productImage);
      if (product['Image']) {
        try {
          // @ts-expect-error
          ZOHO.CREATOR.UTIL.setImageData(productImage, product['Image']);
        } catch (error) {
          // This should only break in localhost??
        }
      } else {
        let productGroupIndex = TABLETEMPLATE.Categories.findIndex(
          (x) => x.Name == product['Product_Group.Product_Group']
        );
        productImage.src = TABLETEMPLATE.Categories[productGroupIndex].ImageUrl;
      }

      tdDropdown.id = `${product.ID}-dropdown-button`;
      tdDropdown.onclick = () => ShowDrawerInformation();
      let dropdownIcon = document.createElement('i');
      dropdownIcon.classList.add('fa-solid', 'fa-caret-down');

      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      iconSvg.setAttribute('viewBox', '0 0 320 512');
      iconPath.setAttribute(
        'd',
        'M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'
      );

      iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'fill-client-dark');
      iconSvg.appendChild(iconPath);

      tdDropdown.appendChild(iconSvg);

      // Add the table data
      tdCode.id = `${product.ID}-code`;
      tdCode.textContent = product.Product_Code;

      tdDescription.id = `${product.ID}-description`;
      tdDescription.textContent = product.Product_Name;

      let increment = parseInt(product.Lot_Size_Multiple) ? product.Lot_Size_Multiple : '1';
      tdBuyQty.id = `${product.ID}-quantity`;
      let tdQtyInput = document.createElement('input');
      tdQtyInput.classList.add('text-left', 'w-full', 'pl-1', 'py-2', 'rounded', 'border', 'border-slate-100');
      tdQtyInput.value = product.Minimum_Order_Quantity;

      let special = state.productSpecials.find(x => x.Product_Code == product.Product_Code);
      let price;
      tdPackPrice.id = `${product.ID}-price`;
      if (special)
      {
        price = parseFloat(SelectCorrectProductSpecialsPrice(product.Product_Code, parseInt(tdQtyInput.value)));
        if (isNaN(price)) price = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
      } else if (!state.customerPrices[index]) {
        price = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
      } else {
        price = parseFloat(SelectCorrectCustomerPrice(state.customerPrices[index], parseInt(tdQtyInput.value)));
      }
      const packPriceSpan = document.createElement('span');
      packPriceSpan.textContent = `$${price.toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 })}`;

      const specialsImage = document.createElement('img');
      specialsImage.classList.add('w-10', 'h-10', 'absolute', 'z-5', '-translate-x-16');
      tdImage.appendChild(productImage);
      specialsImage.src = './content/Sale.svg';
      
      if (special) tdPackPrice.appendChild(specialsImage);
      tdPackPrice.appendChild(packPriceSpan);

      let previousInputValue;
      tdQtyInput.type = 'number';
      tdQtyInput.min = product.Minimum_Order_Quantity;
      tdQtyInput.step = increment;
      // tdQtyInput.max = product.In_Stock;
      tdQtyInput.onfocus = (e) => {
        previousInputValue = (e.target as HTMLInputElement).value;
      };
      tdQtyInput.oninput = (e) => {
        const value = (e.target as HTMLInputElement).value;
        let regex = /^[0-9]*$/;
        if (regex.exec(value)) {
          previousInputValue = value;
        } else {
          tdQtyInput.value = previousInputValue;
        }
      };
      tdQtyInput.onchange = (e) => {
        const quantity = parseInt((e.target as HTMLInputElement).value);

        if (isNaN(quantity)) {
          tdQtyInput.value = previousInputValue;
          return;
        }

        // Only clamping minimum
        let minimum = parseInt(product.Minimum_Order_Quantity);

        if (quantity < minimum) {
          tdQtyInput.value = minimum.toString();
        }

        if (quantity < minimum) {
          tdQtyInput.value = product.Minimum_Order_Quantity;

          let qtyChangeTooltipContainer = document.createElement('div');
          qtyChangeTooltipContainer.classList.add(
            'flex',
            'left-1/2',
            '-translate-x-1/2',
            'absolute',
            'shadow-md',
            'shadow-slate-400',
            'z-20',
            'p-4',
            'mt-[5.5rem]',
            'min-w-32',
            'bg-white',
            'text-black',
            'font-normal',
            'text-nowrap'
          );

          let qtyChangeTooltipMessage = document.createElement('span');
          qtyChangeTooltipMessage.textContent = 'Buy Qty cannot be less than Min Buy';
          qtyChangeTooltipContainer.appendChild(qtyChangeTooltipMessage);

          tdBuyQty.appendChild(qtyChangeTooltipContainer);
          setTimeout(() => {
            qtyChangeTooltipContainer.remove();
          }, 2000);
          return;
        }

        // Apply the lot sized multiple and remove leading 0s (from the parseInt earlier)
        tdQtyInput.value = (
          Math.ceil((quantity - minimum) / parseInt(increment)) * parseInt(increment) +
          minimum
        ).toString();
        if (special)
        {
          price = parseFloat(SelectCorrectProductSpecialsPrice(product.Product_Code, parseInt(tdQtyInput.value)));
          if (isNaN(price)) price = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
        } else if (!state.customerPrices[index]) {
          price = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
        } else {
          price = parseFloat(SelectCorrectCustomerPrice(state.customerPrices[index], parseInt(tdQtyInput.value)));
        }
        packPriceSpan.textContent = `$${price.toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 })}`;
      };
      tdBuyQty.appendChild(tdQtyInput);
      if (special) {
        tdBuyQty.appendChild(RenderQtyBreakInfoTooltipSpecials(product.Product_Code));
      } else {
        tdBuyQty.appendChild(RenderQtyBreakInfoTooltip(state.customerPrices[index]));
      }

      tdBuyQty.id = `${product.ID}-units`;

      let packQty = product.PackQty;
      tdPackQty.textContent = `${packQty}`;

      tdPackType.id = `${product.ID}-uom`;
      tdPackType.textContent = `${product.Unit_Of_Measure}`;

      tdMinBuy.id = `${product.ID}-min-buy`;
      tdMinBuy.textContent = product.Minimum_Order_Quantity;

      tdSupplierStock.id = `${product.ID}-stock-level`;
      
      // If item is in the bottom 2 elements in the list, render popup above instead of below the icon
      Maximum(state.data.length, MINIMUM_TABLE_ROWS) - index <= 2
        ? tdSupplierStock.appendChild(RenderStockLevelCircle(product, 'TOP'))
        : tdSupplierStock.appendChild(RenderStockLevelCircle(product, 'BOTTOM'));

      tdMySOH.id = `${product.ID}-stock-on-hand`;
      let productStock = state.productStockLevels.find(x => x.Product.ID == product.ID)?.In_Stock;
      tdMySOH.textContent = productStock ?? "0";// parseInt(product.In_Stock).toLocaleString(LOCAL_NUMBER_FORMAT);

      tdAdd.id = `${product.ID}-add-button`;
      let tdAddButton = document.createElement('button');
      tdAddButton.classList.add('px-2', 'w-full', 'h-8');

      if (index == 1 && state.debug) isProductInCart = true;

      if (isProductInCart) {
        tdAddButton.classList.add('!bg-green-300', 'font-bold');
        tdAddButton.disabled = true;

        const spanText = document.createElement('span');
        spanText.textContent = 'In Cart';
        tdAddButton.append(spanText);
      } else if (price <= 0) 
      {
        tdAddButton.textContent = 'Disabled';
        tdAddButton.classList.add('bg-gray-100', 'text-gray-500', 'font-bold', 'tracking-wide');
        tdAddButton.disabled = true;
      } else {
        tdAddButton.textContent = 'Add';
        tdAddButton.classList.add('bg-client-yellow', 'hover:bg-yellow-200', 'font-bold', 'tracking-wide');
      }
      tdAdd.appendChild(tdAddButton);
      tdAddButton.onclick = () => {
        if (isProductInCart) return;
        let orderQuantity = tdQtyInput.value;
        
        // Check that order quantity is a valid value
        let regex = /^[0-9]*$/;
        if (!regex.exec(orderQuantity)) {
          ErrorMessageBanner(`Unable to add ${product.Product_Name} to Cart`);
          return;
        }

        let price = product.Cost_Price;
        if (special)
        {
          price = SelectCorrectProductSpecialsPrice(product.Product_Code, parseInt(orderQuantity)) ?? product.Cost_Price;
        } else if (!state.customerPrices[index]) {
          price = product.Cost_Price;
        } else {
          price = SelectCorrectCustomerPrice(state.customerPrices[index], parseInt(orderQuantity));
        }


        console.log(`${product.Product_Code}: ${price}`)


        let total = RoundTo2(parseInt(orderQuantity) * parseFloat(price));

        let newCartPurchase: APIAddCartPurchase = {
          Barcode: product.Barcode,
          Cost_Price: price,
          Order_Quantity: orderQuantity,
          Product_Code: product.Product_Code,
          Product_Name: product.Product_Name,
          Total: total,
          Unit_of_Measure: product.Unit_Of_Measure,
          Product: product.ID,
          Supplier: SUPPLIER_ZID, // Hard coded supplier for now
        };
        if (product.Supplier_Name) {
          newCartPurchase.Supplier = product.Supplier_Name.ID;
        }

        tdAddButton.classList.remove('bg-client-yellow');
        tdAddButton.classList.add('bg-yellow-100');

        setTimeout(() => {
          tdAddButton.classList.add('bg-client-yellow');
          tdAddButton.classList.remove('bg-yellow-100');
        }, 200);
        APIAddProductToCart(newCartPurchase).then((result: boolean) => {
          // Fail condition
          if (!result) {
            ErrorMessageBanner(`Error adding ${product.Product_Name} to Cart`);
            return;
          }
          // Success condition
          MessageBanner(`Added ${tdQtyInput.value}${product.Unit_Of_Measure} ${product.Product_Name} to Cart`);
          tdAddButton.classList.add('!bg-green-300');
          tdAddButton.textContent = 'In Cart';
        });
      };

      expandedRecordInformation = document.createElement('div');
      expandedRecordInformation.classList.add(
        'col-span-full',
        'w-full',
        'bg-white',
        'border-b',
        'hidden',
        'p-4',
        'gap-4'
      );
      expandedRecordInformation.id = `expanded-${product.ID}`;

      // Create the function for triggering the dropdown
      function ShowDrawerInformation(this) {
        if (state.expandedProductID != null) {
          let previouslyExpandedProductID = state.expandedProductID;
          ResetProductDropdown();

          if (previouslyExpandedProductID == product.ID) {
            state.expandedProductID = null;
            return;
          }
        }

        RenderExpandedProductInformation(expandedRecordInformation, product, index, true);
        expandedRecordInformation.classList.remove('hidden');
        expandedRecordInformation.classList.add('flex');

        dataRow.classList.add(...COMPONENT_STYLES.ProductTableStyles.SelectedRowColours);

        state.expandedProductID = product.ID;
      }
    }

    // Add the data to the table
    {
      dataRow.appendChild(tdDropdown);
      dataRow.appendChild(tdImage);
      dataRow.appendChild(tdCode);
      dataRow.appendChild(tdDescription);
      dataRow.appendChild(tdPackPrice);
      dataRow.appendChild(tdPackType);
      dataRow.appendChild(tdPackQty);
      dataRow.appendChild(tdMinBuy);
      dataRow.appendChild(tdBuyQty);
      dataRow.appendChild(tdSupplierStock);
      dataRow.appendChild(tdMySOH);
      dataRow.appendChild(tdAdd);
      table.appendChild(dataRow);

      table.appendChild(expandedRecordInformation);
    }
  });

  // Set the minimum table rows
  for (let i = 0; i < MINIMUM_TABLE_ROWS - state.data.length; i++) {
    const row = document.createElement('div');
    row.classList.add(...COMPONENT_STYLES.ProductTableStyles.RowBlank);
    table.appendChild(row);
  }
}

function RenderTableFooter(table: HTMLDivElement) {
  // Render the table footer
  let tableFooterContainer = document.createElement('div');
  tableFooterContainer.classList.add('bg-banner-dark', 'w-full', 'min-h-8', 'max-h-8', 'flex', 'col-span-full');
  let validPageSizes = ['10', '25', '50', '100'];

  let pageSizeSelectContainer = document.createElement('div');
  pageSizeSelectContainer.classList.add('my-auto', 'ml-4');

  let pageSizeSelect = document.createElement('select');
  pageSizeSelect.id = `wsTablePageSizeSelect`;
  pageSizeSelect.onchange = (e) => {
    let optionValue = (e.target as HTMLSelectElement).value;
    SetStatePageSize(parseInt(optionValue));
  };
  pageSizeSelect.classList.add('mt-auto');

  validPageSizes.forEach((pageSize) => {
    let option = document.createElement('option');
    option.value = pageSize;
    option.textContent = pageSize;
    if (state.pageSize.toString() == pageSize) {
      option.selected = true;
    }
    pageSizeSelect.appendChild(option);
  });

  let pageSizeSelectLabel = document.createElement('label');
  pageSizeSelectLabel.htmlFor = `wsTablePageSizeSelect`;
  pageSizeSelectLabel.textContent = 'page size';
  pageSizeSelectLabel.classList.add('mr-4', 'text-slate-50');

  pageSizeSelectContainer.appendChild(pageSizeSelectLabel);
  pageSizeSelectContainer.appendChild(pageSizeSelect);

  tableFooterContainer.appendChild(pageSizeSelectContainer);

  let spacer = document.createElement('div');
  spacer.classList.add('flex-1');
  tableFooterContainer.appendChild(spacer);

  let pageNumberContainer = document.createElement('div');
  pageNumberContainer.classList.add('ml-auto', 'my-auto', 'mr-4');

  let pages = Math.ceil(state.dataCount / state.pageSize);

  if (pages > 5) {
    // Render first page
    let firstPageSelector = document.createElement('span');
    firstPageSelector.textContent = '1';
    if (state.pageNumber == 1) {
      firstPageSelector.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
    } else {
      firstPageSelector.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
      firstPageSelector.onclick = () => SetStatePageNumber(1);
    }
    pageNumberContainer.appendChild(firstPageSelector);

    // Render last page
    let lastPageSelector = document.createElement('span');
    lastPageSelector.textContent = pages.toString();
    if (state.pageNumber == pages) {
      lastPageSelector.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
    } else {
      lastPageSelector.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
      lastPageSelector.onclick = () => SetStatePageNumber(pages);
    }

    // Check edge conditions
    if (state.pageNumber <= 2) {
      // Render pages 1, 2, 3, ... n
      let middlePage = document.createElement('span');
      middlePage.textContent = '2';
      if (state.pageNumber == 2) {
        middlePage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
      } else {
        middlePage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
        middlePage.onclick = () => SetStatePageNumber(2);
      }
      pageNumberContainer.appendChild(middlePage);

      let rightPage = document.createElement('span');
      rightPage.textContent = '3';
      if (state.pageNumber == 3) {
        rightPage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
      } else {
        rightPage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
        rightPage.onclick = () => SetStatePageNumber(3);
      }
      pageNumberContainer.appendChild(rightPage);

      let dots = document.createElement('span');
      dots.textContent = '. .';
      dots.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemDots);
      pageNumberContainer.appendChild(dots);
    } else if (state.pageNumber >= pages - 1) {
      // Render pages 1... n-2, n-1, n
      let dots = document.createElement('span');
      dots.textContent = '. .';
      dots.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemDots);
      pageNumberContainer.appendChild(dots);

      let leftPage = document.createElement('span');
      leftPage.textContent = (pages - 2).toString();
      if (state.pageNumber == pages - 2) {
        leftPage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
      } else {
        leftPage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
        leftPage.onclick = () => SetStatePageNumber(pages - 2);
      }
      pageNumberContainer.appendChild(leftPage);

      let middlePage = document.createElement('span');
      middlePage.textContent = (pages - 1).toString();
      if (state.pageNumber == pages - 1) {
        middlePage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
      } else {
        middlePage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
        middlePage.onclick = () => SetStatePageNumber(pages - 1);
      }
      pageNumberContainer.appendChild(middlePage);
    } else {
      // Render pages 1 ... 4,5,6 ... n
      if (state.pageNumber > 3) {
        let dots = document.createElement('span');
        dots.textContent = '. .';
        dots.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemDots);
        pageNumberContainer.appendChild(dots);
      }
      let leftPage = document.createElement('span');
      leftPage.textContent = (state.pageNumber - 1).toString();
      leftPage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
      leftPage.onclick = () => SetStatePageNumber(state.pageNumber - 1);
      pageNumberContainer.appendChild(leftPage);

      let middlePage = document.createElement('span');
      middlePage.textContent = state.pageNumber.toString();
      middlePage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
      pageNumberContainer.appendChild(middlePage);

      let rightPage = document.createElement('span');
      rightPage.textContent = (state.pageNumber + 1).toString();
      rightPage.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
      rightPage.onclick = () => SetStatePageNumber(state.pageNumber + 1);
      pageNumberContainer.appendChild(rightPage);

      if (state.pageNumber < pages - 2) {
        let dots2 = document.createElement('span');
        dots2.textContent = '. .';
        dots2.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemDots);
        pageNumberContainer.appendChild(dots2);
      }
    }

    pageNumberContainer.appendChild(lastPageSelector);
  } else {
    // Render all pages, colour selected page well
    for (let i = 1; i <= pages; i++) {
      let pageSelector = document.createElement('span');
      pageSelector.textContent = i.toString();
      if (i == state.pageNumber) {
        // Selected styles
        pageSelector.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItemSelected);
      } else {
        pageSelector.classList.add(...COMPONENT_STYLES.FooterStyles.pageListItem);
        pageSelector.onclick = () => SetStatePageNumber(i);
      }
      pageNumberContainer.appendChild(pageSelector);
    }
  }
  // 1...3 4 5...10
  tableFooterContainer.appendChild(pageNumberContainer);
  table.appendChild(tableFooterContainer);
}

function RenderTableSkeleton() {
  // Get reference to the table container
  let wsTableContainer = document.getElementById('wsTableContainer');

  // Create the table element
  let table = document.createElement('div');
  if (state.hideImages) {
    table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithoutImage;
  } else {
    table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithImage;
  }

  table.classList.add(...COMPONENT_STYLES.ProductTableStyles.Table);

  let tableContainer = document.createElement('div');
  tableContainer.classList.add(...COMPONENT_STYLES.ProductTableStyles.Container);

  let upperSection = document.createElement('div');
  upperSection.classList.add('w-full', 'flex', 'mt-4', 'mb-4', 'bg-white', 'p-4', 'rounded', 'text-sm');

  RenderTableLegend(upperSection, table);

  {
    const imageToggleWrapper = document.createElement('div');
    imageToggleWrapper.classList.add('mb-4', 'h-4', 'w-8');
    tableContainer.appendChild(imageToggleWrapper);
  }

  RenderTableHeader(table);

  // Render the skeleton body
  for (let i = 0; i < state.pageSize; i++) {
    const row = document.createElement('div');
    row.classList.add(...COMPONENT_STYLES.ProductTableStyles.RowSkeleton);
    table.appendChild(row);
  }

  RenderTableFooter(table);

  tableContainer.appendChild(table);
  wsTableContainer.replaceChildren(upperSection, tableContainer);
}

// Renders the expanded product information view
async function RenderExpandedProductInformation(
  expandedProductDiv: HTMLDivElement,
  product: Product,
  index: number,
  fetchDocuments: boolean = false
) {
  if (fetchDocuments) {
    // Reset existing documents
    state.fetchingExpandedData = true;
    state.technicalDataSheets = [];
    state.safetyDataSheets = [];
    state.shipmentUpdates = [];

    let technicalDataSheetPromise = APIGetTechnicalDataSheetsByProductCode(product.Product_Code);
    let safetyDataSheetPromise = APIGetSafetyDataSheetsByProductCode(product.Product_Code);
    let shipmentUpdatePromise = APIGetShipmentUpdatesByProductCode(product.Product_Code);

    Promise.all([technicalDataSheetPromise, safetyDataSheetPromise, shipmentUpdatePromise]).then(
      ([technicalDataSheet, safetyDataSheet, shipmentUpdates]) => {
        if (technicalDataSheet != null) state.technicalDataSheets.push(technicalDataSheet);
        if (safetyDataSheet != null) state.safetyDataSheets.push(safetyDataSheet);
        if (shipmentUpdates != null) {
          // Sort the shipment updates by the sorting rules in the config
          shipmentUpdates.sort((a, b) => {
            if (a.Location == b.Location) return 0;
            let indexA = TABLE_SHIPPING_AVAILABILITY_ORDER.findIndex((x) => x == a.Location);
            let indexB = TABLE_SHIPPING_AVAILABILITY_ORDER.findIndex((x) => x == b.Location);
            if (indexA == -1 || indexB == -1) return 0;
            if (indexB > indexA) return -1;
            return 1;
          });
          state.shipmentUpdates.push(...shipmentUpdates);
        }

        state.fetchingExpandedData = false;
        if (
          state.technicalDataSheets.length > 0 ||
          state.safetyDataSheets.length > 0 ||
          state.shipmentUpdates.length > 0
        ) {
          RenderExpandedProductInformation(expandedProductDiv, product, index, false);
        }
      }
    );
  }

  let imageContainer = document.createElement('div');
  imageContainer.classList.add(
    'flex',
    'justify-center',
    'items-center',
    'min-w-64',
    'min-h-64',
    'max-w-64',
    'max-h-64'
  );

  let productInfoWrapper = document.createElement('div');
  productInfoWrapper.classList.add('w-full');

  let tabsWrapper = document.createElement('div');
  tabsWrapper.classList.add('border-b', 'border-client-dark', 'inline-block', 'mb-4');

  let tabs = document.createElement('div');
  tabs.classList.add('flex', 'flex-wrap', '-mb-px', 'font-medium', 'text-center');

  let activeTabStyles = ['text-yellow', 'border-client-yellow', 'active', 'bg-client-dark', 'text-white'];

  let inactiveTabStyles = [
    'cursor-pointer',
    'border-transparent',
    'hover:border-gray-400',
    'hover:bg-gray-50',
    'hover:text-gray-500',
    'hover:border-b-2',
  ];

  let sharedTabStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'py-1',
    'border-b-4',
    'group',
    'select-none',
  ];

  let disabledTabStyles = [
    'cursor-default',
    'border-transparent',
    'text-gray-400',
  ];

  // Tab override
  if (state.selectedTabIndex == TAB_INDEX.DOCUMENTS && state.technicalDataSheets.length == 0 && state.safetyDataSheets.length == 0)
    state.selectedTabIndex = TAB_INDEX.CARTON_QTY_AND_BREAKS;

  // Create the tabs
  let cartonQtyAndBreaksTab = document.createElement('div');
  cartonQtyAndBreaksTab.id = `expanded-${product.ID}-carton-qty`;
  state.selectedTabIndex == TAB_INDEX.CARTON_QTY_AND_BREAKS
    ? cartonQtyAndBreaksTab.classList.add(...activeTabStyles, ...sharedTabStyles)
    : cartonQtyAndBreaksTab.classList.add(...inactiveTabStyles, ...sharedTabStyles);
  cartonQtyAndBreaksTab.textContent = 'Price and Qty';
  cartonQtyAndBreaksTab.onclick = () => ClickTab(0);

  let detailsTab = document.createElement('div');
  detailsTab.id = `expanded-${product.ID}-details`;
  state.selectedTabIndex == TAB_INDEX.DETAILS
    ? detailsTab.classList.add(...activeTabStyles, ...sharedTabStyles)
    : detailsTab.classList.add(...inactiveTabStyles, ...sharedTabStyles);
  detailsTab.textContent = 'Details';
  detailsTab.onclick = () => ClickTab(1);

  let filesTab = document.createElement('div');
  filesTab.id = `expanded-${product.ID}-documents`;
  if (state.technicalDataSheets.length > 0 || state.safetyDataSheets.length > 0) {
    state.selectedTabIndex == TAB_INDEX.DOCUMENTS
      ? filesTab.classList.add(...activeTabStyles, ...sharedTabStyles)
      : filesTab.classList.add(...inactiveTabStyles, ...sharedTabStyles);
    filesTab.onclick = () => ClickTab(2);
  } else {
    filesTab.classList.add(...disabledTabStyles, ...sharedTabStyles);
  }
  filesTab.textContent = 'Documents';

  let bodyWrapper = document.createElement('div');
  bodyWrapper.classList.add('w-full');

  let detailsBody = document.createElement('div');
  detailsBody.classList.add('w-full');

  let cartonQtyAndBreaksBody = document.createElement('div');
  cartonQtyAndBreaksBody.classList.add('flex', 'gap-16');

  let filesBody = document.createElement('div');
  filesBody.classList.add();

  const image = document.createElement('img');
  image.classList.add('max-w-full', 'max-h-72', 'w-auto', 'h-auto');
  image.id = `img-${product.ID}`;
  imageContainer.appendChild(image);
  if (product['Image']) {
    try {
      // @ts-expect-error
      ZOHO.CREATOR.UTIL.setImageData(image, product['Image']);
    } catch (error) {
      // Localhost fallback
      let productGroupIndex = TABLETEMPLATE.Categories.findIndex(
        (x) => x.Name == product['Product_Group.Product_Group']
      );
      image.src = TABLETEMPLATE.Categories[productGroupIndex]?.ImageUrl;
    }
  } else {
    let productGroupIndex = TABLETEMPLATE.Categories.findIndex((x) => x.Name == product['Product_Group.Product_Group']);
    image.src = TABLETEMPLATE.Categories[productGroupIndex]?.ImageUrl;
  }

  // Create details body
  {
    // Create the details table
    let detailsTable = document.createElement('div');
    detailsTable.classList.add(...COMPONENT_STYLES.ProductDetailsTable.Table);

    // Create the details table heading
    let tableHeadingRow = document.createElement('div');
    tableHeadingRow.classList.add(...COMPONENT_STYLES.ProductDetailsTable.HeaderRow);

    // Create headings
    let headingDetails = document.createElement('div');
    headingDetails.classList.add(
      ...COMPONENT_STYLES.ProductDetailsTable.HeadingElement.Details,
      ...COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Details
    );
    headingDetails.textContent = 'Details';

    let headingDocuments = document.createElement('div');
    headingDocuments.classList.add(
      ...COMPONENT_STYLES.ProductDetailsTable.HeadingElement.Documents,
      ...COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Documents
    );
    headingDocuments.textContent = 'documents';

    let tableData = [
      {
        name: 'Stock Code',
        value: product.Product_Code,
      },
      {
        name: 'Description',
        value: product.Product_Name,
      },
      {
        name: 'Barcode',
        value: product.Barcode,
      },
    ];

    let productGroupIndex = TABLETEMPLATE.Categories.findIndex((x) => x.Name == product['Product_Group.Product_Group']);
    if (productGroupIndex >= 0) {
      // Add in category data
      {
        tableData.push({
          name: 'Main Category',
          value: product['Product_Group.Product_Group'],
        });
        tableData.push({
          name: 'Sub Category',
          value: product.Product_Sub_Group.display_value,
        });
        tableData.push({
          name: 'Range',
          value: product.Group_Name.display_value,
        });
      }

      // Add in filter data
      {
        if (product.Filter1 && product.Filter1 != '0' && product.Filter1.length > 0) {
          tableData.push({
            name: TABLETEMPLATE.Categories[productGroupIndex].Filter1Name,
            value: product.Filter1,
          });
        }
        if (product.Filter2 && product.Filter2 != '0' && product.Filter2.length > 0) {
          tableData.push({
            name: TABLETEMPLATE.Categories[productGroupIndex].Filter2Name,
            value: product.Filter2,
          });
        }
        if (product.Filter3 && product.Filter3 != '0' && product.Filter3.length > 0) {
          tableData.push({
            name: TABLETEMPLATE.Categories[productGroupIndex].Filter3Name,
            value: product.Filter3,
          });
        }
        if (product.Filter4 && product.Filter4 != '0' && product.Filter4.length > 0) {
          tableData.push({
            name: TABLETEMPLATE.Categories[productGroupIndex].Filter4Name,
            value: product.Filter4,
          });
        }
      }
    }

    // Create table body
    tableData.forEach((productDetail) => {
      // Create data row
      let row = document.createElement('div');
      row.classList.add(...COMPONENT_STYLES.ProductDetailsTable.RecordRow);

      // Add data
      let name = document.createElement('div');
      name.classList.add(
        ...COMPONENT_STYLES.ProductDetailsTable.CellElement.Details,
        ...COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Details
      );
      name.textContent = productDetail.name;

      let value = document.createElement('div');
      value.classList.add(
        ...COMPONENT_STYLES.ProductDetailsTable.CellElement.Documents,
        ...COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Documents
      );
      value.textContent = productDetail.value;

      // Add row to table
      row.appendChild(name);
      row.appendChild(value);
      detailsTable.appendChild(row);
    });

    // Add table to right col
    detailsBody.appendChild(detailsTable);
  }

  // Create carton qty and breaks body
  {
    let quantityBreaksWrapper = document.createElement('div');

    let tableTitle = document.createElement('div');
    tableTitle.classList.add(
      'w-[160px]',
      'max-w-[160px]',
      'bg-client-dark',
      'text-white',
      'font-medium',
      'px-2',
      'py-1'
    );
    tableTitle.textContent = 'Quantity Breaks';

    let table = document.createElement('table');
    table.classList.add(...COMPONENT_STYLES.QtyBreakTable.Table);

    let tHeadingRow = document.createElement('tr');
    tHeadingRow.classList.add(...COMPONENT_STYLES.QtyBreakTable.HeaderRow);

    let qtyHeader = document.createElement('th');
    qtyHeader.classList.add(
      ...COMPONENT_STYLES.QtyBreakTable.HeadingElement.Qty,
      ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty
    );
    qtyHeader.textContent = 'Qty';

    let priceHeader = document.createElement('th');
    priceHeader.classList.add(
      ...COMPONENT_STYLES.QtyBreakTable.HeadingElement.Price,
      ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price
    );
    priceHeader.textContent = 'Price';

    tHeadingRow.appendChild(qtyHeader);
    tHeadingRow.appendChild(priceHeader);
    table.appendChild(tHeadingRow);

    let special = state.productSpecials.find(x => x.Product_Code == product.Product_Code);
    let customerPrices = state.customerPrices[index];

    if (special) {
      if (special.Qty && special.Qty > product.Minimum_Order_Quantity) {
        let record = document.createElement('tr');
        record.classList.add(...COMPONENT_STYLES.QtyBreakTable.RecordRow);

        let quantityValue = document.createElement('td');
        quantityValue.textContent = `${product.Minimum_Order_Quantity}+`;
        quantityValue.classList.add(
          ...COMPONENT_STYLES.QtyBreakTable.CellElement.Qty,
          ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty
        );
        table.appendChild(quantityValue);

        let priceValue = document.createElement('td');
        priceValue.textContent = `$${parseFloat(RoundTo2(parseFloat(product.Cost_Price))).toLocaleString(
          LOCAL_NUMBER_FORMAT,
          { minimumFractionDigits: 2 }
        )}`;
        priceValue.classList.add(
          ...COMPONENT_STYLES.QtyBreakTable.CellElement.Price,
          ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price
        );

        record.appendChild(quantityValue);
        record.appendChild(priceValue);
        table.appendChild(record);
      }

      for (let i = 1; i <= 10; i++)
      {
        const qtyKey = i == 1 ? 'Qty' : `Qty${i}`;
        const priceKey = i == 1 ? 'Price' : `Price${i}`;
        if (special[qtyKey] && special[priceKey]) {
          let record = document.createElement('tr');
          record.classList.add(...COMPONENT_STYLES.QtyBreakTable.RecordRow);

          let quantityValue = document.createElement('td');
          quantityValue.textContent = `${special[qtyKey]}+`;
          quantityValue.classList.add(
            ...COMPONENT_STYLES.QtyBreakTable.CellElement.Qty,
            ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty
          );
          table.appendChild(quantityValue);

          let priceValue = document.createElement('td');
          priceValue.textContent = `$${parseFloat(RoundTo2(parseFloat(special[priceKey]))).toLocaleString(
            LOCAL_NUMBER_FORMAT,
            { minimumFractionDigits: 2 }
          )}`;
          priceValue.classList.add(
            ...COMPONENT_STYLES.QtyBreakTable.CellElement.Price,
            ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price
          );

          record.appendChild(quantityValue);
          record.appendChild(priceValue);
          table.appendChild(record);
        }
        
      }
    } else if (customerPrices) {
      for (let i = 1; i <= 10; i++) {
        const qtyKey = i == 1 ? 'qty' : `qty${i}`;
        const priceKey = i == 1 ? 'price' : `price${i}`;
        if (customerPrices[qtyKey] && customerPrices[priceKey]) {
          let record = document.createElement('tr');
          record.classList.add(...COMPONENT_STYLES.QtyBreakTable.RecordRow);

          let quantityValue = document.createElement('td');
          quantityValue.textContent = i == 0 ? `1+` : `${customerPrices[qtyKey]}+`;
          quantityValue.classList.add(
            ...COMPONENT_STYLES.QtyBreakTable.CellElement.Qty,
            ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty
          );
          table.appendChild(quantityValue);

          let priceValue = document.createElement('td');
          priceValue.textContent = `$${parseFloat(RoundTo2(customerPrices[priceKey])).toLocaleString(
            LOCAL_NUMBER_FORMAT,
            { minimumFractionDigits: 2 }
          )}`;
          priceValue.classList.add(
            ...COMPONENT_STYLES.QtyBreakTable.CellElement.Price,
            ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price
          );

          record.appendChild(quantityValue);
          record.appendChild(priceValue);
          table.appendChild(record);
        }
        
      }
    } else  {
      let record = document.createElement('tr');
      record.classList.add(...COMPONENT_STYLES.QtyBreakTable.RecordRow);

      let qty = document.createElement('td');
      qty.classList.add(
        ...COMPONENT_STYLES.QtyBreakTable.CellElement.Qty,
        ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty
      );
      qty.textContent = '1+';

      let price = document.createElement('td');
      price.classList.add(
        ...COMPONENT_STYLES.QtyBreakTable.CellElement.Price,
        ...COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price
      );
      price.textContent = `$${parseFloat(RoundTo2(parseFloat(product.Cost_Price))).toLocaleString(LOCAL_NUMBER_FORMAT, {
        minimumFractionDigits: 2,
      })}`;

      record.appendChild(qty);
      record.appendChild(price);
      table.appendChild(record);
    } 

    let cartonQtyWrapper = document.createElement('div');

    let cartonQtyContainer = document.createElement('div');
    cartonQtyContainer.classList.add();

    let cartonQtyLabel = document.createElement('span');
    cartonQtyLabel.classList.add('font-medium', 'mr-2');
    cartonQtyLabel.textContent = 'Pack Qty:';

    let cartonQtyValue = document.createElement('span');
    let packQty = product.PackQty;

    parseInt(product.Unit_Of_Measure) >= 0
      ? (cartonQtyValue.textContent = `${packQty} per ${parseInt(product.Unit_Of_Measure)}`)
      : (cartonQtyValue.textContent = `${packQty} ${product.Unit_Of_Measure.toUpperCase()}`);

    let otherDetailsWrapper = document.createElement('div');

    let shipmentUpdate = state.shipmentUpdates.find((x) => x.Product == product.Product_Code);

    let totalShipmentContainer = document.createElement('div');

    let totalShipmentLabel = document.createElement('span');
    totalShipmentLabel.classList.add('font-medium', 'mr-2');
    totalShipmentLabel.textContent = 'Total Shipment Amount: ';

    let formatter = new Intl.NumberFormat('en-US');

    let totalShipmentValue = document.createElement('span');
    totalShipmentValue.classList.add('uppercase');
    if (shipmentUpdate) {
      parseInt(product.Unit_Of_Measure) >= 0
        ? (totalShipmentValue.textContent = `${formatter.format(parseInt(shipmentUpdate.QtyOrdered))} per ${parseInt(
            product.Unit_Of_Measure
          )}`)
        : (totalShipmentValue.textContent = `${formatter.format(
            parseInt(shipmentUpdate.QtyOrdered)
          )} ${product.Unit_Of_Measure.toUpperCase()}`);
    } else if (state.fetchingExpandedData) {
      totalShipmentValue.textContent = `loading...`;
    } else {
      totalShipmentValue.textContent = `N/A`;
    }

    totalShipmentContainer.appendChild(totalShipmentLabel);
    totalShipmentContainer.appendChild(totalShipmentValue);

    let estimatedTimeContainer = document.createElement('div');
    estimatedTimeContainer.classList.add('flex');

    let estimatedTimeLabelWrapper = document.createElement('div');
    let estimatedTimeLabel = document.createElement('div');
    let estimatedTimeSubLabel = document.createElement('div');

    estimatedTimeLabelWrapper.classList.add('inline-block', 'text-right');

    estimatedTimeLabel.classList.add('font-medium', 'mr-2');
    estimatedTimeLabel.textContent = 'Next Inbound Shipment: ';

    estimatedTimeSubLabel.classList.add('text-sm', 'font-normal', 'text-neutral-600', 'mr-2', '-translate-y-1');
    estimatedTimeSubLabel.textContent = '(subject to change)';

    estimatedTimeLabelWrapper.appendChild(estimatedTimeLabel);
    estimatedTimeLabelWrapper.appendChild(estimatedTimeSubLabel);

    let estimatedTimeValue = document.createElement('span');

    let date = '';

    if (shipmentUpdate) {
      let split = shipmentUpdate.ETADate.split('-');
      console.log(split);
      if (split.length == 3) date = split[1] + ' ' + split[2];
    } else if (state.fetchingExpandedData) {
      date = 'loading...';
    } else {
      date = 'N/A';
    }
    estimatedTimeValue.textContent = date;

    const shippingInfoWrapper = document.createElement('div');

    const shippinginfoTableTitle = document.createElement('div');
    shippinginfoTableTitle.classList.add(
      'w-[320px]',
      'max-w-[320px]',
      'font-medium',
      'text-white',
      'bg-client-dark',
      'px-2',
      'py-1'
    );
    shippinginfoTableTitle.textContent = 'Product Availability';

    const shippingInfoTable = document.createElement('table');
    shippingInfoTable.classList.add(...COMPONENT_STYLES.ShippingInfoTable.Table);

    // Headings
    {
      const shippingTableHeaderRow = document.createElement('tr');
      const shippingTableHeadingLocation = document.createElement('th');
      const shippingTableHeadingQty = document.createElement('th');
      const shippingTableHeadingDue = document.createElement('th');
      const shippingTableHeadingDate = document.createElement('th');
      const shippingTableHeadingDateNote = document.createElement('span');

      shippingTableHeaderRow.classList.add(...COMPONENT_STYLES.ShippingInfoTable.HeaderRow);
      shippingTableHeadingLocation.classList.add(
        ...COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Location,
        ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Location
      );
      shippingTableHeadingQty.classList.add(
        ...COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Qty,
        ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Qty
      );
      shippingTableHeadingDue.classList.add(
        ...COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Due,
        ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Due
      );
      shippingTableHeadingDate.classList.add(
        ...COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Date,
        ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Date
      );
      shippingTableHeadingDateNote.classList.add('text-xs');

      shippingTableHeadingLocation.textContent = 'Location';
      shippingTableHeadingQty.textContent = 'Qty';
      shippingTableHeadingDue.textContent = 'Due';
      shippingTableHeadingDateNote.textContent = '*';
      shippingTableHeadingDate.appendChild(document.createTextNode('Date'));
      shippingTableHeadingDate.appendChild(shippingTableHeadingDateNote);

      shippingTableHeaderRow.appendChild(shippingTableHeadingLocation);
      shippingTableHeaderRow.appendChild(shippingTableHeadingQty);
      shippingTableHeaderRow.appendChild(shippingTableHeadingDue);
      shippingTableHeaderRow.appendChild(shippingTableHeadingDate);

      shippingInfoTable.appendChild(shippingTableHeaderRow);
    }

    // Body
    {
      TABLE_SHIPPING_AVAILABILITY_ORDER.forEach((location, index) => {
        let shipment = state.shipmentUpdates.find((x) => x.Location == location && x.Product == product.Product_Code);

        let shipmentDate = '';
        let shipmentQty = '';
        if (shipment) {
          let split = shipmentUpdate.ETADate.split('-');
          if (split.length == 3) shipmentDate = split[1] + ' ' + split[2];
          shipmentQty = shipment.QtyOrdered;
        }

        const shippingTableRow = document.createElement('tr');
        shippingTableRow.classList.add(...COMPONENT_STYLES.ShippingInfoTable.RecordRow);

        const shippingTableDataLocation = document.createElement('td');
        const shippingTableDataQty = document.createElement('td');
        const shippingTableDataDue = document.createElement('td');
        const shippingTableDataDate = document.createElement('td');

        shippingTableDataLocation.classList.add(
          ...COMPONENT_STYLES.ShippingInfoTable.CellElement.Location,
          ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Location
        );
        shippingTableDataQty.classList.add(
          ...COMPONENT_STYLES.ShippingInfoTable.CellElement.Qty,
          ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Qty
        );
        shippingTableDataDue.classList.add(
          ...COMPONENT_STYLES.ShippingInfoTable.CellElement.Due,
          ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Due
        );
        shippingTableDataDate.classList.add(
          ...COMPONENT_STYLES.ShippingInfoTable.CellElement.Date,
          ...COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Date
        );

        shippingTableDataLocation.textContent = location;
        shippingTableDataQty.textContent = product[`Supplier_Stock_${location}`] ?? '0';
        shippingTableDataDue.textContent = shipmentQty != '' ? formatter.format(parseInt(shipmentQty)) : '';
        shippingTableDataDate.textContent = shipmentDate;

        shippingTableRow.appendChild(shippingTableDataLocation);
        shippingTableRow.appendChild(shippingTableDataQty);
        shippingTableRow.appendChild(shippingTableDataDue);
        shippingTableRow.appendChild(shippingTableDataDate);

        shippingInfoTable.appendChild(shippingTableRow);
      });
    }

    // Footer
    {
      const shippingInfoFooter = document.createElement('div');
      shippingInfoFooter.classList.add('text-center', 'text-xs');
      shippingInfoFooter.textContent = '* subject to change';

      shippingInfoWrapper.appendChild(shippinginfoTableTitle);
      shippingInfoWrapper.appendChild(shippingInfoTable);
      shippingInfoWrapper.appendChild(shippingInfoFooter);

      quantityBreaksWrapper.appendChild(tableTitle);
      quantityBreaksWrapper.appendChild(table);

      cartonQtyContainer.appendChild(cartonQtyLabel);
      cartonQtyContainer.appendChild(cartonQtyValue);

      estimatedTimeContainer.appendChild(estimatedTimeLabelWrapper);
      estimatedTimeContainer.appendChild(estimatedTimeValue);

      cartonQtyWrapper.appendChild(cartonQtyContainer);
      otherDetailsWrapper.appendChild(totalShipmentContainer);
      otherDetailsWrapper.appendChild(estimatedTimeContainer);

      cartonQtyAndBreaksBody.appendChild(quantityBreaksWrapper);
      cartonQtyAndBreaksBody.appendChild(cartonQtyWrapper);
      cartonQtyAndBreaksBody.appendChild(shippingInfoWrapper);
    }
  }

  // Create documents body
  {
    let table = document.createElement('table');
    table.classList.add(...COMPONENT_STYLES.DocumentsTable.Table);

    state.technicalDataSheets.forEach((productDocument) => {
      let host = window.location.ancestorOrigins[0];
      let url = host + '/file' + productDocument.File_upload;
      url = url.replace('/api/v2/', '/');
      url = url.replace('/report/', '/');
      url = url.replace('filepath=', 'filepath=/');

      // Create data row
      let row = document.createElement('div');
      row.classList.add(...COMPONENT_STYLES.DocumentsTable.RecordRow);

      // Add data
      let name = document.createElement('div');
      name.classList.add(...COMPONENT_STYLES.DocumentsTable.CellElement.File);

      let link = document.createElement('a');
      link.classList.add('underline', 'cursor-pointer');
      link.href = url;
      link.target = '_blank';
      link.textContent = 'technical_data_sheet.pdf';

      // Add row to table
      name.appendChild(link);
      row.appendChild(name);
      table.appendChild(row);
    });

    state.safetyDataSheets.forEach((productDocument) => {
      let host = window.location.ancestorOrigins[0];
      let url = host + '/file' + productDocument.File_upload;
      url = url.replace('/api/v2/', '/');
      url = url.replace('/report/', '/');
      url = url.replace('filepath=', 'filepath=/');

      // Create data row
      let row = document.createElement('div');
      row.classList.add(...COMPONENT_STYLES.DocumentsTable.RecordRow);

      // Add data
      let name = document.createElement('div');
      name.classList.add(...COMPONENT_STYLES.DocumentsTable.CellElement.File);

      let link = document.createElement('a');
      link.classList.add('underline', 'cursor-pointer');
      link.href = url;
      link.target = '_blank';
      link.textContent = 'safety_data_sheet.pdf';

      // Add row to table
      name.appendChild(link);
      row.appendChild(name);
      table.appendChild(row);
    });

    if (state.technicalDataSheets.length + state.safetyDataSheets.length < 10) {
      for (let i = 0; i < 10 - state.technicalDataSheets.length - state.safetyDataSheets.length; i++) {
        // Create data row
        let row = document.createElement('div');
        row.classList.add(...COMPONENT_STYLES.DocumentsTable.RecordRow);

        // Add data
        let name = document.createElement('div');
        name.classList.add(...COMPONENT_STYLES.DocumentsTable.CellElement.File);
        // name.style.minHeight = '100px'
        // name.textContent = "test"
        // Add row to table
        row.appendChild(name);
        table.appendChild(row);
      }
    }

    // Add table to right col
    filesBody.appendChild(table);
  }

  tabs.replaceChildren(cartonQtyAndBreaksTab, detailsTab, filesTab);
  tabsWrapper.appendChild(tabs);

  let newChildren = [];
  newChildren.push(imageContainer);
  if (state.selectedTabIndex == TAB_INDEX.CARTON_QTY_AND_BREAKS) bodyWrapper.appendChild(cartonQtyAndBreaksBody);
  if (state.selectedTabIndex == TAB_INDEX.DETAILS) bodyWrapper.appendChild(detailsBody);
  if (state.selectedTabIndex == TAB_INDEX.DOCUMENTS) bodyWrapper.appendChild(filesBody);

  productInfoWrapper.replaceChildren(tabsWrapper, bodyWrapper);
  newChildren.push(productInfoWrapper);

  function ClickTab(index: number) {
    if (index == state.selectedTabIndex) return;
    
    // Update styles
    if (state.selectedTabIndex == TAB_INDEX.CARTON_QTY_AND_BREAKS) {
      cartonQtyAndBreaksTab.classList.remove(...activeTabStyles);
      cartonQtyAndBreaksTab.classList.add(...inactiveTabStyles);
    }
    if (state.selectedTabIndex == TAB_INDEX.DETAILS) {
      detailsTab.classList.remove(...activeTabStyles);
      detailsTab.classList.add(...inactiveTabStyles);
    }
    if (state.selectedTabIndex == TAB_INDEX.DOCUMENTS) {
      filesTab.classList.remove(...activeTabStyles);
      filesTab.classList.add(...inactiveTabStyles);
    }

    state.selectedTabIndex = index;

    // Update body
    if (index == TAB_INDEX.CARTON_QTY_AND_BREAKS) {
      cartonQtyAndBreaksTab.classList.remove(...inactiveTabStyles);
      cartonQtyAndBreaksTab.classList.add(...activeTabStyles);
      bodyWrapper.replaceChildren(cartonQtyAndBreaksBody);
    }
    if (index == TAB_INDEX.DETAILS) {
      detailsTab.classList.remove(...inactiveTabStyles);
      detailsTab.classList.add(...activeTabStyles);
      bodyWrapper.replaceChildren(detailsBody);
    }
    if (index == TAB_INDEX.DOCUMENTS) {
      filesTab.classList.remove(...inactiveTabStyles);
      filesTab.classList.add(...activeTabStyles);
      bodyWrapper.replaceChildren(filesBody);
    }
  }

  // Add the columns to the container
  expandedProductDiv.replaceChildren(...newChildren);
}

// Renders the stock level popup when you hover over the stock level icon
function RenderStockLevelCircle(product: Product, position: 'TOP' | 'BOTTOM' = 'BOTTOM'): HTMLElement {
  // Create the icon
  let tdContainer = document.createElement('div');
  tdContainer.classList.add('group/stock', 'relative');

  let icon = document.createElement('div');
  let productStock = state.productStockLevels.find(x => x.Product.ID == product.ID)?.In_Stock;
  let storeStockLevel = productStock ? parseInt(productStock) : 0;
  
  let localStock = 0; //parseInt(product.Supplier_Stock_Local);
  let nationalStock = parseInt(product.Supplier_Stock_National);

  let iconColour = nationalStock == 0 ? 'bg-red-400' : 'bg-green-400';
  icon.classList.add('mx-auto', 'rounded-full', 'border', iconColour, 'w-4', 'h-4');

  // Create a buffer so you can mouse over the tooltip
  let tooltipBuffer = document.createElement('div');
  tooltipBuffer.classList.add(
    'hidden',
    'left-1/2',
    '-translate-x-1/2',
    'absolute',
    'z-20',
    'group-hover/stock:block',
    'hover:block',
    'w-8',
    'h-8'
  );
  tdContainer.appendChild(tooltipBuffer);

  // Create the tooltip
  let tooltip = document.createElement('div');
  tooltip.classList.add(
    'hidden',
    'left-1/2',
    '-translate-x-1/2',
    '-rounded',
    'absolute',
    'shadow-md',
    'shadow-slate-400',
    'z-20',
    'p-4',
    'group-hover/stock:flex',
    'bg-slate-50'
  );

  switch (position) {
    case 'BOTTOM': {
      tooltip.classList.add('mt-2');
      break;
    }
    case 'TOP': {
      tooltip.classList.add('bottom-0', 'mb-6');
      break;
    }
  }

  // Create the tooltip content
  let colLeft = document.createElement('div');
  colLeft.classList.add('flex-2', 'pr-2', 'font-medium', 'text-left', 'flex-col');
  let colRight = document.createElement('div');
  colRight.classList.add('flex-1', 'text-right', 'flex-col');

  let locationHeading = document.createElement('h3');
  locationHeading.textContent = 'Location';
  colLeft.appendChild(locationHeading);

  let qtyHeading = document.createElement('h3');
  qtyHeading.textContent = 'Qty';
  colRight.appendChild(qtyHeading);

  let storeStockNumber = storeStockLevel;
  let localStockNumber = localStock ? localStock : 0;
  let nationalStockNumber = nationalStock ? nationalStock : 0;

  let storeStockLabel = document.createElement('div');
  storeStockLabel.textContent = 'My SOH';
  colLeft.appendChild(storeStockLabel);

  let storeStockQty = document.createElement('div');
  storeStockQty.textContent = storeStockNumber.toString();
  colRight.appendChild(storeStockQty);

  let localStockLabel = document.createElement('div');
  localStockLabel.textContent = 'Local';
  colLeft.appendChild(localStockLabel);

  let localStockQty = document.createElement('div');
  localStockQty.textContent = localStockNumber.toString();
  colRight.appendChild(localStockQty);

  let nationalStockLabel = document.createElement('div');
  nationalStockLabel.textContent = 'National';
  colLeft.appendChild(nationalStockLabel);

  let nationalStockQty = document.createElement('div');
  nationalStockQty.textContent = nationalStockNumber.toString();
  colRight.appendChild(nationalStockQty);

  // Add tooltip content to tooltip
  tooltip.appendChild(colLeft);
  tooltip.appendChild(colRight);

  // Add icon and tooltip to table cell
  tdContainer.appendChild(icon);
  tdContainer.appendChild(tooltip);
  return tdContainer;
}

// Renders the stock level popup when you hover over the stock level icon
function RenderQtyBreakInfoTooltip(customerPrices: APIAzureCustomerPricing | null): HTMLElement {
  const qtyBreakContainer = document.createElement('div');
  qtyBreakContainer.classList.add('relative', 'group/qty', 'min-w-6', 'flex', 'justify-center');
  if (!customerPrices || !HasMultipleCustomerPrices(customerPrices)) {
    return qtyBreakContainer;
  }

  let infoIcon = document.createElement('i');
  infoIcon.classList.add('fa-solid', 'fa-circle-info');

  // Create the tooltip
  let tooltip = document.createElement('div');
  tooltip.classList.add(
    'hidden',
    'left-1/2',
    '-translate-x-1/2',
    '-rounded',
    'absolute',
    'shadow-md',
    'shadow-slate-400',
    'z-20',
    'p-4',
    'mt-2',
    'group-hover/qty:flex',
    'bg-slate-50'
  );

  // Create the tooltip content
  let colLeft = document.createElement('div');
  colLeft.classList.add('flex-2', 'pr-2', 'font-medium', 'text-left', 'flex-col');
  let colRight = document.createElement('div');
  colRight.classList.add('flex-1', 'text-right', 'flex-col');

  let quantityHeading = document.createElement('h3');
  quantityHeading.textContent = 'Quantity';
  colLeft.appendChild(quantityHeading);

  let priceHeading = document.createElement('h3');
  priceHeading.textContent = 'Price';
  colRight.appendChild(priceHeading);

  for (let i = 1; i <= 10; i++) {
    const priceKey = i == 1 ? 'price' : `price${i}`;
    const qtyKey = i == 1 ? `qty` : `qty${i}`;
    if (customerPrices[priceKey] && customerPrices[qtyKey]) {
      let quantityValue = document.createElement('div');
      quantityValue.textContent = `${customerPrices[qtyKey]}+`;
      colLeft.appendChild(quantityValue);

      let priceValue = document.createElement('div');
      priceValue.textContent = `$${RoundTo2(customerPrices[priceKey])}`;
      colRight.appendChild(priceValue);
    }
  }

  // Add tooltip content to tooltip
  tooltip.appendChild(colLeft);
  tooltip.appendChild(colRight);

  // Add icon and tooltip to table cell
  qtyBreakContainer.appendChild(infoIcon);
  qtyBreakContainer.appendChild(tooltip);

  return qtyBreakContainer;
}


function RenderQtyBreakInfoTooltipSpecials(productCode: string): HTMLElement {
  const qtyBreakContainer = document.createElement('div');
  qtyBreakContainer.classList.add('relative', 'group/qty', 'min-w-6', 'flex', 'justify-center');
  if (!HasMultipleProductSpecialPrices(productCode)) {
    return qtyBreakContainer;
  }

  let special = state.productSpecials.find(x => x.Product_Code == productCode);

  let infoIcon = document.createElement('i');
  infoIcon.classList.add('fa-solid', 'fa-circle-info');

  // Create the tooltip
  let tooltip = document.createElement('div');
  tooltip.classList.add(
    'hidden',
    'left-1/2',
    '-translate-x-1/2',
    '-rounded',
    'absolute',
    'shadow-md',
    'shadow-slate-400',
    'z-20',
    'p-4',
    'mt-2',
    'group-hover/qty:flex',
    'bg-slate-50'
  );

  // Create the tooltip content
  let colLeft = document.createElement('div');
  colLeft.classList.add('flex-2', 'pr-2', 'font-medium', 'text-left', 'flex-col');
  let colRight = document.createElement('div');
  colRight.classList.add('flex-1', 'text-right', 'flex-col');

  let quantityHeading = document.createElement('h3');
  quantityHeading.textContent = 'Quantity';
  colLeft.appendChild(quantityHeading);

  let priceHeading = document.createElement('h3');
  priceHeading.textContent = 'Price';
  colRight.appendChild(priceHeading);

  for (let i = 1; i <= 10; i++) {
    const priceKey = i == 1 ? 'Price' : `Price${i}`;
    const qtyKey = i == 1 ? `Qty` : `Qty${i}`;
    if (special[priceKey] && special[qtyKey]) {
      let quantityValue = document.createElement('div');
      quantityValue.textContent = `${special[qtyKey]}+`;
      colLeft.appendChild(quantityValue);

      let priceValue = document.createElement('div');
      priceValue.textContent = `$${RoundTo2(special[priceKey])}`;
      colRight.appendChild(priceValue);
    }
  }

  // Add tooltip content to tooltip
  tooltip.appendChild(colLeft);
  tooltip.appendChild(colRight);

  // Add icon and tooltip to table cell
  qtyBreakContainer.appendChild(infoIcon);
  qtyBreakContainer.appendChild(tooltip);

  return qtyBreakContainer;
}

// Utility function to fetch data from the database based on the current criteria
async function LoadTableData(): Promise<void> {
  let criteria = GetAllProductsCriteriaString();

  // Load example data for localhost debugging
  if (state.debug) {
    state.data = [
      {
        Product_Group: {
          display_value: 'Anchoring',
          ID: '3932514000007341039',
        },
        Cost_Price: '1234.56789',
        Status: 'Active',
        Product_Description: 'Just some flavour text to fill out the column',
        Minimum_Order_Quantity: '20',
        Discount: '',
        Retail_Recommended_Price: '',
        Product_Name: '6.5MM X 58MM CSK. CONSCREW',
        Buy_Price: '',
        'Image':
          '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007377215/Product_Image_Bank.Image/3932514000006516911/download?filepath=1677578255369_CSC0658.jpg',
        'Product_Group.Product_Group': 'Anchoring',
        Supplier_Name: {
          display_value: ' redacted',
          ID: '3932514000003970005',
        },
        Product_Sub_Group: {
          display_value: 'Medium Duty Anchoring',
          ID: '3932514000007341063',
        },
        Lot_Size_Multiple: '5',
        Supplier_Code: '',
        Product_Code: 'CSC0658',
        Unit_Of_Measure: 'bx',
        Barcode: '9312862075142',
        Group_Name: {
          display_value: 'Conscrew Anchor',
          ID: '3932514000007343175',
        },
        ID: '3932514000007377215',
        In_Stock: '400',
        Reorder_Level: '1',
        Pack: 'Pack',
        PackQty: 'QPACK 50PCS',
      },
      {
        Product_Group: {
          display_value: 'Anchoring',
          ID: '3932514000007341039',
        },
        Cost_Price: '5.00',
        Status: 'Active',
        Product_Description: '',
        Minimum_Order_Quantity: '1',
        Discount: '',
        Retail_Recommended_Price: '',
        Product_Name: 'PLASTER ANCHOR',
        Buy_Price: '',
        'Image':
          '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
        'Product_Group.Product_Group': 'Anchoring',
        Supplier_Name: {
          display_value: ' redacted',
          ID: '3932514000003970005',
        },
        Product_Sub_Group: {
          display_value: 'Hollow Wall Plugs',
          ID: '3932514000007341071',
        },
        Lot_Size_Multiple: '1',
        Supplier_Code: '',
        Product_Code: '08PA',
        Unit_Of_Measure: 'bx',
        Barcode: '9312862054345',
        Group_Name: {
          display_value: 'Plaster Anchor - Zinc Plated',
          ID: '3932514000007343091',
        },
        ID: '3932514000007347915',
        In_Stock: '40000',
        Reorder_Level: '1',
        Pack: 'Pack',
        PackQty: '15',
      },
      {
        Product_Group: {
          display_value: 'Anchoring',
          ID: '3932514000007341039',
        },
        Cost_Price: '0.00',
        Status: 'Active',
        Product_Description: '',
        Minimum_Order_Quantity: '10',
        Discount: '',
        Retail_Recommended_Price: '',
        Product_Name: 'PLASTER ANCHOR',
        Buy_Price: '',
        'Image':
          '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
        'Product_Group.Product_Group': 'Anchoring',
        Supplier_Name: {
          display_value: ' redacted',
          ID: '3932514000003970005',
        },
        Product_Sub_Group: {
          display_value: 'Hollow Wall Plugs',
          ID: '3932514000007341071',
        },
        Lot_Size_Multiple: '10',
        Supplier_Code: '',
        Product_Code: '08PA',
        Unit_Of_Measure: 'bx',
        Barcode: '9312862054345',
        Group_Name: {
          display_value: 'Plaster Anchor - Zinc Plated',
          ID: '3932514000007343091',
        },
        ID: '3932514000007347916',
        In_Stock: '40000',
        Reorder_Level: '1',
        Pack: 'Pack',
        PackQty: '15',
      },
      // {
      //   Product_Group: {
      //     display_value: 'Anchoring',
      //     ID: '3932514000007341039',
      //   },
      //   Cost_Price: '5.00',
      //   Status: 'Active',
      //   Product_Description: '',
      //   Minimum_Order_Quantity: '63',
      //   Discount: '',
      //   Retail_Recommended_Price: '',
      //   Product_Name: 'PLASTER ANCHOR',
      //   Buy_Price: '',
      //   'Product_Image_Bank.Image':
      //     '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
      //   'Product_Group.Product_Group': 'Anchoring',
      //   Supplier_Name: {
      //     display_value: ' redacted',
      //     ID: '3932514000003970005',
      //   },
      //   Product_Sub_Group: {
      //     display_value: 'Hollow Wall Plugs',
      //     ID: '3932514000007341071',
      //   },
      //   Lot_Size_Multiple: '',
      //   Supplier_Code: '',
      //   Product_Code: '08PA',
      //   Unit_Of_Measure: 'bx',
      //   Barcode: '9312862054345',
      //   Group_Name: {
      //     display_value: 'Plaster Anchor - Zinc Plated',
      //     ID: '3932514000007343091',
      //   },
      //   ID: '3932514000007347917',
      //   In_Stock: '40000',
      //   Reorder_Level: '1',
      //   Pack: 'Pack',
      //   PackQty: '15',
      // },
      // {
      //   Product_Group: {
      //     display_value: 'Anchoring',
      //     ID: '3932514000007341039',
      //   },
      //   Cost_Price: '5.00',
      //   Status: 'Active',
      //   Product_Description: '',
      //   Minimum_Order_Quantity: '63',
      //   Discount: '',
      //   Retail_Recommended_Price: '',
      //   Product_Name: 'PLASTER ANCHOR',
      //   Buy_Price: '',
      //   'Product_Image_Bank.Image':
      //     '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
      //   'Product_Group.Product_Group': 'Anchoring',
      //   Supplier_Name: {
      //     display_value: ' redacted',
      //     ID: '3932514000003970005',
      //   },
      //   Product_Sub_Group: {
      //     display_value: 'Hollow Wall Plugs',
      //     ID: '3932514000007341071',
      //   },
      //   Lot_Size_Multiple: '',
      //   Supplier_Code: '',
      //   Product_Code: '08PA',
      //   Unit_Of_Measure: 'bx',
      //   Barcode: '9312862054345',
      //   Group_Name: {
      //     display_value: 'Plaster Anchor - Zinc Plated',
      //     ID: '3932514000007343091',
      //   },
      //   ID: '3932514000007347918',
      //   In_Stock: '40000',
      //   Reorder_Level: '1',
      //   Pack: 'Pack',
      //   PackQty: '15',
      // },
      // {
      //   Product_Group: {
      //     display_value: 'Anchoring',
      //     ID: '3932514000007341039',
      //   },
      //   Cost_Price: '5.00',
      //   Status: 'Active',
      //   Product_Description: '',
      //   Minimum_Order_Quantity: '63',
      //   Discount: '',
      //   Retail_Recommended_Price: '',
      //   Product_Name: 'PLASTER ANCHOR',
      //   Buy_Price: '',
      //   'Product_Image_Bank.Image':
      //     '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
      //   'Product_Group.Product_Group': 'Anchoring',
      //   Supplier_Name: {
      //     display_value: ' redacted',
      //     ID: '3932514000003970005',
      //   },
      //   Product_Sub_Group: {
      //     display_value: 'Hollow Wall Plugs',
      //     ID: '3932514000007341071',
      //   },
      //   Lot_Size_Multiple: '',
      //   Supplier_Code: '',
      //   Product_Code: '08PA',
      //   Unit_Of_Measure: 'bx',
      //   Barcode: '9312862054345',
      //   Group_Name: {
      //     display_value: 'Plaster Anchor - Zinc Plated',
      //     ID: '3932514000007343091',
      //   },
      //   ID: '3932514000007347919',
      //   In_Stock: '40000',
      //   Reorder_Level: '1',
      //   Pack: 'Pack',
      //   PackQty: '15',
      // },
    ];

    // Azure
    state.customerPrices = [
      {
        price: 86.96,
        price2: 78.76,
        price3: 71.98,
        price4: null,
        price5: null,
        price6: null,
        price7: null,
        price8: null,
        price9: null,
        price10: null,
        qty: 1,
        qty2: 5,
        qty3: 10,
        qty4: 0,
        qty5: 0,
        qty6: 0,
        qty7: 0,
        qty8: 0,
        qty9: 0,
        qty10: 0,
        customerID: 'DIREFA',
        productID: 'CH12130G',
      },
      {
        price: 11.3,
        price2: 10.24,
        price3: 9.36,
        price4: null,
        price5: null,
        price6: null,
        price7: null,
        price8: null,
        price9: null,
        price10: null,
        qty: 1,
        qty2: 10,
        qty3: 19,
        qty4: 0,
        qty5: 0,
        qty6: 0,
        qty7: 0,
        qty8: 0,
        qty9: 0,
        qty10: 0,
        customerID: 'DIREFA',
        productID: 'MSIS38200Z',
      },
      null,
    ];

    return;
  }

  console.log('criteria', criteria);
  let productCountPromise = APIGetRecordCountOfProducts(criteria);
  let productDataPromise = APIGetAllProducts(criteria, state.pageSize, state.pageNumber);
  let [productCount, productData] = await Promise.all([productCountPromise, productDataPromise]);
  if (productData == null || productCount == null || productData.length == 0) {
    state.data = [];
    state.dataCount = 0;
    state.customerPrices = [];
    state.productStockLevels = [];
    state.productSpecials = [];
    console.log('Error fetching data');
    console.log(state.data);
    return;
  }
  try {
    let productCodes = productData.map((x) => x.Product_Code);
    let productIds = productData.map((x) => x.ID);

    let [customerPrices, stockLevels, productSpecials] = await Promise.all([
      APIGetCustomerPricingOfProductCodesAzure(state.tenantCode, productCodes),
      APIGetInstockForProducts(productIds),
      APIGetSpecialsForProductCodes(productCodes)
    ]);

    state.data = productData;
    state.dataCount = productCount;
    state.customerPrices = customerPrices;
    state.productStockLevels = stockLevels;
    state.productSpecials = productSpecials;
  } catch (err) {
    console.log(err);
  }
}

// Create an message banner to display some string
function MessageBanner(messageText: string) {
  let testdiv = document.getElementById('messageBanner');
  testdiv.classList.remove('hidden');
  testdiv.classList.add('absolute', 'bg-green-300');
  testdiv.textContent = messageText;

  let bannerCloseTimer = setTimeout(() => {
    testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
    testdiv.classList.add('hidden');
    testdiv.textContent = '';
  }, MESSAGE_TIMEOUT);

  testdiv.onmouseover = () => {
    console.log('OnMouseOver');
    clearTimeout(bannerCloseTimer);
  };

  testdiv.onmouseout = () => {
    console.log('OnMouseOut');
    bannerCloseTimer = setTimeout(() => {
      testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
      testdiv.classList.add('hidden');
      testdiv.textContent = '';
    }, MESSAGE_TIMEOUT);
  };
}

// Create an error message banner to display some string
function ErrorMessageBanner(messageText: string) {
  let testdiv = document.getElementById('messageBanner');
  testdiv.classList.remove('hidden');
  testdiv.classList.add('absolute', 'bg-red-300');
  testdiv.textContent = messageText;

  let bannerCloseTimer = setTimeout(() => {
    testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
    testdiv.classList.add('hidden');
    testdiv.textContent = '';
  }, MESSAGE_TIMEOUT);

  testdiv.onmouseover = () => {
    console.log('OnMouseOver');
    clearTimeout(bannerCloseTimer);
  };

  testdiv.onmouseout = () => {
    console.log('OnMouseOut');
    bannerCloseTimer = setTimeout(() => {
      testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
      testdiv.classList.add('hidden');
      testdiv.textContent = '';
    }, MESSAGE_TIMEOUT);
  };
}


// The big function to handle the updates of the product information table
async function UpdateTable() {
  UpdateCategoryBanner();
  RenderProductSubGroupInformation();
  RenderProductFilterInformation();
  RenderTableSection();
}

// Starting point of the application
async function OnPageLoad() {
  // Fetch the tenant of the logged in user
  state.tenantCode = await APIGetTenant();
  RenderProductGroupList();
  document
    .getElementById(`wsCategory${state.selectedProductGroup}`)
    .classList.add(...COMPONENT_STYLES.SelectedRootCategoryStyle);

  if (!state.debug) {
    let data = await APIGetAllCartPurchases();
    if (data != null) {
      state.cartPurchases = data;
    }
  }

  // Initalize the table
  UpdateTable();
}

// Resets the state for the selected product group
// Note: There used to be a dropdown menu filed with category information at the top of the page but the client decided they didn't want it anymore.
function ResetStateProductGroup() {
  if (!state.selectedProductGroup) {
    return;
  }
  let element = document.getElementById(
    `product-sub-group-${state.selectedProductSubGroup.split(' ').join('-')}`
  ) as HTMLInputElement;
  if (element) {
    element.checked = false;
    state.selectedProductSubGroup = null;
  }
  ResetStateCategoryGroup();
}

// Resets the state for the product sub group
function ResetStateCategoryGroup() {
  if (!state.selectedProductSubGroup) {
    return;
  }
  let element = document.getElementById(
    `product-sub-group-${state.selectedProductSubGroup.split(' ').join('-')}`
  ) as HTMLInputElement;
  if (element) {
    element.checked = false;
    state.selectedProductSubGroup = null;
  }
  ResetStateGroupName();
}

// Reset the state for the group name
function ResetStateGroupName() {
  if (!state.selectedGroupName) {
    return;
  }
  let element = document.getElementById(
    `product-group-name-${state.selectedGroupName.split(' ').join('-')}`
  ) as HTMLInputElement;

  if (element) {
    element.checked = false;
    state.selectedGroupName = null;
  }
}

// Reset the product dropdown state
function ResetProductDropdown(keepSelectedTab: boolean = false) {
  // Remove previously selected record id
  let previousExpandedRecordInformation = document.getElementById(`expanded-${state.expandedProductID}`);

  if (previousExpandedRecordInformation) {
    previousExpandedRecordInformation.classList.remove('flex');
    previousExpandedRecordInformation.classList.add('hidden');
  }

  let dataRow = document.getElementById(`${state.expandedProductID}-row`);
  if (dataRow) dataRow.classList.remove(...COMPONENT_STYLES.ProductTableStyles.SelectedRowColours);

  state.expandedProductID = null;
  if (!keepSelectedTab) state.selectedTabIndex = TAB_INDEX.CARTON_QTY_AND_BREAKS;
  state.technicalDataSheets = [];
}

// Reset filter states
function ResetProductFilters() {
  state.selectedFilter1s = [];
  state.selectedFilter2s = [];
  state.selectedFilter3s = [];
  state.selectedFilter4s = [];
  state.isFilter1Expanded = false;
  state.isFilter2Expanded = false;
  state.isFilter3Expanded = false;
  state.isFilter4Expanded = false;
}

// Utility function to handle state changes for filtering.
async function ChangeAllProductFiltering({
  newProductGroup,
  newProductSubGroup,
  newGroupName,
  filtersChanged = false,
  resetSearch = true,
}: {
  newProductGroup: string;
  newProductSubGroup: string | null;
  newGroupName: string | null;
  filtersChanged?: boolean;
  resetSearch?: boolean;
}): Promise<boolean> {
  let updated = false;

  if (state.selectedProductGroup != newProductGroup) {
    // Clear dropdown and filter information
    ResetProductDropdown();
    ResetStateCategoryGroup();
    ResetProductFilters();

    // Remove all selected styles from the previous selected root category
    if (state.selectedProductGroup) {
      let previousCategoryItem = document.getElementById(`wsCategory${state.selectedProductGroup}`);
      if (previousCategoryItem) {
        previousCategoryItem.classList.remove(...COMPONENT_STYLES.SelectedRootCategoryStyle);
        updated = true;
      }
    }

    if (newProductGroup) {
      // Add selected styles to the this root category item
      document
        .getElementById(`wsCategory${newProductGroup}`)
        .classList.add(...COMPONENT_STYLES.SelectedRootCategoryStyle);
    }

    state.selectedProductGroup = newProductGroup;
    updated = true;
    console.log('Product');
  }

  if (state.selectedProductSubGroup != newProductSubGroup) {
    state.selectedProductSubGroup = newProductSubGroup;
    updated = true;
    ResetStateGroupName();
    console.log('SubProduct');
  }

  if (state.selectedGroupName != newGroupName) {
    state.selectedGroupName = newGroupName;
    updated = true;
    console.log('Group');
  }

  if (updated || filtersChanged) {
    state.pageNumber = 1;
    if (resetSearch) state.isProductCodeSearching = false;
    UpdateTable();
    return true;
  }
  return false;
}

// Utility function to handle state updates when switching page sizes
function SetStatePageSize(newPageSize: number) {
  state.pageSize = newPageSize;
  state.pageNumber = 1;

  UpdateTable();
}

// Utility function to handle state updates when switching pages
function SetStatePageNumber(newPageNumber: number) {
  // New page number is in 1-indexed, so page 1 is newPageNumber = 1
  if (newPageNumber == state.pageNumber) {
    return;
  }

  if (state.dataCount == 0) {
    // Not sure what to do in this case tbh
    state.pageNumber = 1;
    return;
  }

  if (newPageNumber <= Math.ceil(state.dataCount / state.pageSize)) {
    // Validate if new page number is legitmate
    state.pageNumber = newPageNumber;
  }

  UpdateTable();
}

// Selects the correct customer price, rounds it to two decimals, and writes it as 1,234.56 - TODO: convert pricing to array
function SelectCorrectCustomerPrice(customerPricing: APIAzureCustomerPricing, qty: number): string {
  if (customerPricing.price10 && customerPricing.qty10 && qty >= customerPricing.qty10) {
    return RoundTo2(customerPricing.price10);
  }
  if (customerPricing.price9 && customerPricing.qty9 && qty >= customerPricing.qty9) {
    return RoundTo2(customerPricing.price9);
  }
  if (customerPricing.price8 && customerPricing.qty8 && qty >= customerPricing.qty8) {
    return RoundTo2(customerPricing.price8);
  }
  if (customerPricing.price7 && customerPricing.qty7 && qty >= customerPricing.qty7) {
    return RoundTo2(customerPricing.price7);
  }
  if (customerPricing.price6 && customerPricing.qty6 && qty >= customerPricing.qty6) {
    return RoundTo2(customerPricing.price6);
  }
  if (customerPricing.price5 && customerPricing.qty5 && qty >= customerPricing.qty5) {
    return RoundTo2(customerPricing.price5);
  }
  if (customerPricing.price4 && customerPricing.qty4 && qty >= customerPricing.qty4) {
    return RoundTo2(customerPricing.price4);
  }
  if (customerPricing.price3 && customerPricing.qty3 && qty >= customerPricing.qty3) {
    return RoundTo2(customerPricing.price3);
  }
  if (customerPricing.price2 && customerPricing.qty2 && qty >= customerPricing.qty2) {
    return RoundTo2(customerPricing.price2);
  }
  if (customerPricing.price && customerPricing.qty && qty >= customerPricing.qty) {
    return RoundTo2(customerPricing.price);
  }
  return '';
}

// Selects the correct customer special price, rounds it to two decimals, and writes it as 1,234.56 - TODO: convert pricing to array
function SelectCorrectProductSpecialsPrice(productCode: string, qty: number): string | null {
  let special = state.productSpecials.find(x => x.Product_Code == productCode);
  if (!special) return null;

  if (special.Price10 && special.Qty10 && qty >= parseInt(special.Qty10)) {
    return RoundTo2(parseFloat(special.Price10));
  }
  if (special.Price9 && special.Qty9 && qty >= parseInt(special.Qty9)) {
    return RoundTo2(parseFloat(special.Price9));
  }
  if (special.Price8 && special.Qty8 && qty >= parseInt(special.Qty8)) {
    return RoundTo2(parseFloat(special.Price8));
  }
  if (special.Price7 && special.Qty7 && qty >= parseInt(special.Qty7)) {
    return RoundTo2(parseFloat(special.Price7));
  }
  if (special.Price6 && special.Qty6 && qty >= parseInt(special.Qty6)) {
    return RoundTo2(parseFloat(special.Price6));
  }
  if (special.Price5 && special.Qty5 && qty >= parseInt(special.Qty5)) {
    return RoundTo2(parseFloat(special.Price5));
  }
  if (special.Price4 && special.Qty4 && qty >= parseInt(special.Qty4)) {
    return RoundTo2(parseFloat(special.Price4));
  }
  if (special.Price3 && special.Qty3 && qty >= parseInt(special.Qty3)) {
    return RoundTo2(parseFloat(special.Price3));
  }
  if (special.Price2 && special.Qty2 && qty >= parseInt(special.Qty2)) {
    return RoundTo2(parseFloat(special.Price2));
  }
  if (special.Price && special.Qty && qty >= parseInt(special.Qty)) {
    return RoundTo2(parseFloat(special.Price));
  }
  return null;
}

// Checks if the customer prices have multiple price breaks, we know that if they do, they will at least have 2 prices.
function HasMultipleCustomerPrices(customerPrices: APIAzureCustomerPricing): boolean {
  return !!customerPrices.price2 && !!customerPrices.qty2;
}

// Checks if a product has multiple current special/discount.
function HasMultipleProductSpecialPrices(productCode: string): boolean {
  let special = state.productSpecials.find(x => x.Product_Code == productCode);
  if (!special) return null; 
  
  return !!special.Price2 && !!special.Qty2;
}

// Builds a criteria string based on the current search term or selected filters.
function GetAllProductsCriteriaString(): string {
  let criteria = 'Status="Active"';

  // Now searches product code, product name, and barcode
  if (state.isProductCodeSearching) {
    if (state.productCodeSearchValue != '') {
      criteria += ` && (Product_Code.contains("${state.productCodeSearchValue}") || Product_Name.contains("${state.productCodeSearchValue}") || Barcode =="${state.productCodeSearchValue}")`;
      return criteria;
    }
  }

  if (!state.selectedProductGroup) {
    return criteria;
  }

  let mainCategory = TABLETEMPLATE.Categories.find((x) => x.Name == state.selectedProductGroup);

  criteria += ` && Product_Group.ID == ${mainCategory.ID}`;

  if (state.selectedFilter1s.length > 0) {
    criteria += ' && (';
    for (let i = state.selectedFilter1s.length - 1; i >= 0; i--) {
      if (i == 0) {
        criteria += `Filter1 == "${mainCategory.Filter1Values[state.selectedFilter1s[i]]}"`;
      } else {
        criteria += `Filter1 == "${mainCategory.Filter1Values[state.selectedFilter1s[i]]}" || `;
      }
    }
    criteria += ')';
  }

  if (state.selectedFilter2s.length > 0) {
    criteria += ' && (';
    for (let i = state.selectedFilter2s.length - 1; i >= 0; i--) {
      if (i == 0) {
        criteria += `Filter2 == "${mainCategory.Filter2Values[state.selectedFilter2s[i]]}"`;
      } else {
        criteria += `Filter2 == "${mainCategory.Filter2Values[state.selectedFilter2s[i]]}" || `;
      }
    }
    criteria += ')';
  }

  if (state.selectedFilter3s.length > 0) {
    criteria += ' && (';
    for (let i = state.selectedFilter3s.length - 1; i >= 0; i--) {
      if (i == 0) {
        criteria += `Filter3 == "${mainCategory.Filter3Values[state.selectedFilter3s[i]]}"`;
      } else {
        criteria += `Filter3 == "${mainCategory.Filter3Values[state.selectedFilter3s[i]]}" || `;
      }
    }
    criteria += ')';
  }

  if (state.selectedFilter4s.length > 0) {
    criteria += ' && (';
    for (let i = state.selectedFilter4s.length - 1; i >= 0; i--) {
      if (i == 0) {
        criteria += `Filter4 == "${mainCategory.Filter4Values[state.selectedFilter4s[i]]}"`;
      } else {
        criteria += `Filter4 == "${mainCategory.Filter4Values[state.selectedFilter4s[i]]}" || `;
      }
    }
    criteria += ')';
  }

  if (!state.selectedProductSubGroup) {
    return criteria;
  }

  let subCategory = mainCategory.Categories.find((x) => x.Name == state.selectedProductSubGroup);
  criteria += ` && Product_Sub_Group.ID == ${subCategory.ID}`;

  if (!state.selectedGroupName) {
    return criteria;
  }

  let group = subCategory.Categories.find(
    (x: TableTemplateGroupName) => x.Name == state.selectedGroupName
  ) as TableTemplateGroupName;
  criteria += ` && Group_Name.ID == ${group.ID}`;
  return criteria;
}


// Start the application
OnPageLoad();
