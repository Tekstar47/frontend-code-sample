var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TAB_INDEX = {
    CARTON_QTY_AND_BREAKS: 0,
    DETAILS: 1,
    DOCUMENTS: 2,
};
var state = {
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
if (!state.debug)
    console.log = function (x) { };
// Renders the product group icons at the top of the screen. The dropdown functionality has been depreciated
function RenderProductGroupList() {
    var CategoriesContainer = document.getElementById('wsCategoriesContainer');
    CategoriesContainer.classList.add('group');
    CategoriesContainer.replaceChildren();
    var CategoriesList = document.createElement('div');
    var CategoriesDropdownPlaceholder = document.createElement('div');
    CategoriesList.id = 'wsCategoriesList';
    CategoriesList.classList.add('flex', 'flex-wrap', 'bg-slate-600', 'gap-[2px]');
    // Placing the category items into containers so it flexes better
    var CategoriesRow1 = document.createElement('div');
    var CategoriesRow2 = document.createElement('div');
    CategoriesRow1.classList.add('flex', 'gap-[2px]', 'grow-[100]', 'shrink', 'basis-0');
    CategoriesRow2.classList.add('flex', 'gap-[2px]', 'grow-[99]', 'shrink', 'basis-0');
    var totalNumberOfCategories = 10;
    // Create the title button for each category in our product hirachy
    TABLETEMPLATE.Categories.forEach(function (category, index) {
        // Create the Category Item
        var ProductGroupItem = document.createElement('div');
        ProductGroupItem.id = "wsCategory".concat(category.Name);
        ProductGroupItem.classList.add('flex-1', 'min-w-[6.5rem]', 'py-2', 'text-clip', 'text-center', 'hover:bg-client-yellow', 'cursor-pointer', 'bg-white', 'group');
        var ProductGroupItemContainer = document.createElement('div');
        ProductGroupItemContainer.classList.add('flex', 'flex-col', 'h-full', 'text-clip', 'group');
        // Create and add the image element
        var imageContainer = document.createElement('div');
        imageContainer.classList.add('h-full', 'w-full', 'flex', 'items-center');
        var image = document.createElement('img');
        image.classList.add('max-w-24', 'max-h-24', 'my-auto', 'mx-auto');
        image.src = category.ImageUrl;
        imageContainer.appendChild(image);
        ProductGroupItemContainer.appendChild(imageContainer);
        // Create and add the title element
        var CategoryTitle = document.createElement('span');
        CategoryTitle.textContent = category.Name;
        CategoryTitle.classList.add('uppercase', 'tracking-wider', 'font-semibold', 'mx-auto');
        ProductGroupItemContainer.appendChild(CategoryTitle);
        ProductGroupItem.onmouseenter = function (e) {
            if (state.hoveredProductGroup != null && state.hoveredProductGroup != category.Name) {
                var k = document.getElementById("wsHoverMenu".concat(state.hoveredProductGroup));
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
        ProductGroupItem.onclick = function (e) {
            ChangeAllProductFiltering({
                newProductGroup: category.Name,
                newGroupName: null,
                newProductSubGroup: null,
            });
        };
        ProductGroupItem.appendChild(ProductGroupItemContainer);
        // Create the dropdown menu
        var hoverMenuContainer = document.createElement('div');
        hoverMenuContainer.id = "wsHoverMenu".concat(category.Name);
        hoverMenuContainer.classList.add('hidden', 'absolute', 'z-30', 'mt-2', 'left-0', 'right-0', 'min-h-72', 'bg-client-background', 'border-t-2', 'border-banner-light', 'shadow-md', 'shadow-slate-400', 'cursor-default', 'flex-row', 'item-center', 'p-4');
        var leftColSpacer = document.createElement('div');
        leftColSpacer.classList.add('flex-1');
        hoverMenuContainer.appendChild(leftColSpacer);
        category.Categories.forEach(function (subCategory) {
            var menuColumn = document.createElement('div');
            menuColumn.classList.add('w-64', 'p-2');
            var heading = document.createElement('h3');
            heading.classList.add('text-lg', 'font-bold', 'cursor-pointer', 'hover:text-slate-800', 'hover:scale-105', 'w-fit', 'text-left');
            heading.textContent = subCategory.Name;
            menuColumn.appendChild(heading);
            heading.onclick = function (e) {
                ChangeAllProductFiltering({
                    newProductGroup: category.Name,
                    newProductSubGroup: subCategory.Name,
                    newGroupName: null,
                });
                e.stopPropagation();
                // Close the dropdown menu
                hoverMenuContainer.classList.remove('hover:flex', 'group-hover:flex');
                setTimeout(function () {
                    hoverMenuContainer.classList.add('hover:flex', 'group-hover:flex');
                }, 50);
            };
            subCategory.Categories.forEach(function (subSubCategory) {
                var subheading = document.createElement('p');
                subheading.classList.add('pl-2', 'leading-tight', 'text-sm', 'cursor-pointer', 'hover:text-slate-800', 'hover:scale-105', 'w-fit');
                subheading.textContent = subSubCategory.Name;
                subheading.onclick = function (e) {
                    ChangeAllProductFiltering({
                        newProductGroup: category.Name,
                        newProductSubGroup: subCategory.Name,
                        newGroupName: subSubCategory.Name,
                    });
                    e.stopPropagation();
                    // Close the dropdown menu
                    hoverMenuContainer.classList.remove('hover:flex', 'group-hover:flex');
                    setTimeout(function () {
                        hoverMenuContainer.classList.add('hover:flex', 'group-hover:flex');
                    }, 50);
                };
                menuColumn.appendChild(subheading);
            });
            hoverMenuContainer.appendChild(menuColumn);
        });
        var rightColSpacer = document.createElement('div');
        rightColSpacer.classList.add('flex-1');
        hoverMenuContainer.appendChild(rightColSpacer);
        // Add dropdown menu to root category
        // ProductGroupItem.appendChild(hoverMenuContainer);
        // Append Category Item to the list
        if (index < totalNumberOfCategories / 2) {
            CategoriesRow1.appendChild(ProductGroupItem);
        }
        else {
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
    var filterCategoryList = document.getElementById('wsFilterContainerCategoryList');
    var filterCategoryListTitle = document.getElementById('wsFilterContainerCategoryListTitle');
    filterCategoryListTitle.textContent = '';
    var newChildren = [];
    if (state.selectedProductGroup) {
        var category = TABLETEMPLATE.Categories.find(function (x) { return x.Name == state.selectedProductGroup; });
        filterCategoryListTitle.innerText = category.CategoryGroupName;
        category.Categories.forEach(function (subcategory) {
            // Create the list element
            var listItem = document.createElement('li');
            listItem.classList.add('flex', 'select-none');
            // Create the checkbox
            var checkbox = document.createElement('input');
            checkbox.id = "product-sub-group-".concat(subcategory.Name.split(' ').join('-'));
            checkbox.type = 'checkbox';
            checkbox.checked = state.selectedProductSubGroup == subcategory.Name ? true : false;
            checkbox.classList.add('mx-2', 'cursor-pointer');
            checkbox.onclick = function (e) {
                var newProductSubGroup = subcategory.Name;
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
            var label = document.createElement('span');
            label.classList.add('cursor-default');
            label.textContent = subcategory.Name;
            // Add onclick functionality to the checkbox text to make ticking and unticking the checkbox easier
            label.onclick = function (e) {
                checkbox.checked = !checkbox.checked;
                var newProductSubGroup = subcategory.Name;
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
    }
    else {
        var textMessage = document.createElement('span');
        textMessage.classList.add('font-bold');
        textMessage.textContent = 'Search is across all categories';
        newChildren.push(textMessage);
    }
    filterCategoryList.replaceChildren.apply(filterCategoryList, newChildren);
    // Render subgroup stuff
    RenderProductGroupNameInformation();
}
// Renders the product sub-group information on the left hand side of the screen.
function RenderProductGroupNameInformation() {
    var filterCategoryListTitle = document.getElementById('wsFilterContainerCategoryGroupNameListTitle');
    var filterCategoryList = document.getElementById('wsFilterContainerCategoryGroupNameList');
    var newChildren = [];
    if (state.selectedProductGroup) {
        var groupNameFilters = document.getElementById('wsFilterContainerCategoryGroupNameContainer');
        if (!state.selectedProductSubGroup) {
            groupNameFilters.classList.add('hidden');
            return;
        }
        else {
            groupNameFilters.classList.remove('hidden');
        }
        var productSubGroup = TABLETEMPLATE.Categories.find(function (x) { return x.Name === state.selectedProductGroup; }).Categories.find(function (x) { return x.Name === state.selectedProductSubGroup; });
        filterCategoryListTitle.innerText = 'Range';
        productSubGroup.Categories.forEach(function (GroupName) {
            // Create the list element
            var listItem = document.createElement('li');
            listItem.classList.add('flex', 'select-none');
            // Create the checkbox
            var checkbox = document.createElement('input');
            checkbox.id = "product-group-name-".concat(GroupName.Name.split(' ').join('-'));
            checkbox.type = 'checkbox';
            checkbox.checked = state.selectedGroupName == GroupName.Name ? true : false;
            checkbox.classList.add('mx-2', 'cursor-pointer');
            checkbox.onclick = function (e) {
                var newGroupName = GroupName.Name;
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
            var label = document.createElement('span');
            label.classList.add('cursor-default');
            label.textContent = GroupName.Name;
            // Add onclick functionality to the checkbox text to make ticking and unticking the checkbox easier
            label.onclick = function (e) {
                checkbox.checked = !checkbox.checked;
                var newGroupName = GroupName.Name;
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
    filterCategoryList.replaceChildren.apply(filterCategoryList, newChildren);
}
// Renders the product filter information based on the selected product group on the left hand side of the screen.
function RenderProductFilterInformation() {
    var bodyFilterContainer = document.getElementById('wsFilterContainerProductFiltersContainer');
    bodyFilterContainer.classList.add('hidden');
    var container = document.createElement('div');
    if (state.selectedProductGroup) {
        var selectedCategoryIndex = TABLETEMPLATE.Categories.findIndex(function (x) { return x.Name === state.selectedProductGroup; });
        if (selectedCategoryIndex == -1) {
            console.log('huh?');
            return;
        }
        if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.length > 0) {
            bodyFilterContainer.classList.remove('hidden');
            var filterContainer_1 = document.createElement('div');
            var heading = document.createElement('div');
            heading.classList.add('font-bold', 'border-slate-600');
            heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Name;
            filterContainer_1.appendChild(heading);
            TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.forEach(function (filter, index) {
                var checkboxContainer = document.createElement('div');
                checkboxContainer.classList.add('flex');
                if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter1Expanded) {
                    return;
                }
                var checkbox = document.createElement('input');
                checkbox.id = "checkbox-filter1-".concat(filter);
                checkbox.classList.add('mx-2', 'my-auto');
                checkbox.type = 'checkbox';
                checkbox.checked = state.selectedFilter1s.indexOf(index) !== -1 ? true : false;
                checkbox.onclick = function (e) {
                    var selectedIndex = state.selectedFilter1s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter1s.push(index);
                    }
                    else {
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
                var label = document.createElement('span');
                label.textContent = filter;
                label.classList.add('my-auto', 'flex-1');
                label.onclick = function (e) {
                    checkbox.checked = !checkbox.checked;
                    var selectedIndex = state.selectedFilter1s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter1s.push(index);
                    }
                    else {
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
                filterContainer_1.appendChild(checkboxContainer);
            });
            if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                !state.isFilter1Expanded) {
                var viewAll = document.createElement('div');
                viewAll.id = "filter1-viewall";
                viewAll.textContent = 'view all';
                viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewAll.onclick = function () {
                    state.isFilter1Expanded = true;
                    RenderProductFilterInformation();
                };
                filterContainer_1.appendChild(viewAll);
            }
            else if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter1Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                state.isFilter1Expanded) {
                var viewLess = document.createElement('div');
                viewLess.id = "filter1-viewless";
                viewLess.textContent = 'view less';
                viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewLess.onclick = function () {
                    state.isFilter1Expanded = false;
                    RenderProductFilterInformation();
                };
                filterContainer_1.appendChild(viewLess);
            }
            container.appendChild(filterContainer_1);
        }
        else {
            bodyFilterContainer.classList.add('hidden');
        }
        if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.length > 0) {
            var filterContainer_2 = document.createElement('div');
            var heading = document.createElement('div');
            heading.classList.add('font-bold', 'border-t', 'pt-2', 'mt-2', 'border-slate-600');
            heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Name;
            filterContainer_2.appendChild(heading);
            TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.forEach(function (filter, index) {
                var checkboxContainer = document.createElement('div');
                checkboxContainer.classList.add('flex');
                if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter2Expanded) {
                    return;
                }
                var checkbox = document.createElement('input');
                checkbox.id = "checkbox-filter2-".concat(filter);
                checkbox.classList.add('mx-2', 'my-auto');
                checkbox.type = 'checkbox';
                checkbox.checked = state.selectedFilter2s.indexOf(index) !== -1 ? true : false;
                checkbox.onclick = function (e) {
                    var selectedIndex = state.selectedFilter2s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter2s.push(index);
                    }
                    else {
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
                var label = document.createElement('span');
                label.classList.add('my-auto', 'flex-1');
                label.textContent = filter;
                label.onclick = function (e) {
                    checkbox.checked = !checkbox.checked;
                    var selectedIndex = state.selectedFilter2s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter2s.push(index);
                    }
                    else {
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
                filterContainer_2.appendChild(checkboxContainer);
            });
            if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                !state.isFilter2Expanded) {
                var viewAll = document.createElement('div');
                viewAll.id = "filter2-viewall";
                viewAll.textContent = 'view all';
                viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewAll.onclick = function () {
                    state.isFilter2Expanded = true;
                    RenderProductFilterInformation();
                };
                filterContainer_2.appendChild(viewAll);
            }
            else if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter2Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                state.isFilter2Expanded) {
                var viewLess = document.createElement('div');
                viewLess.id = "filter2-viewless";
                viewLess.textContent = 'view less';
                viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewLess.onclick = function () {
                    state.isFilter2Expanded = false;
                    RenderProductFilterInformation();
                };
                filterContainer_2.appendChild(viewLess);
            }
            container.appendChild(filterContainer_2);
        }
        if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.length > 0) {
            var filterContainer_3 = document.createElement('div');
            var heading = document.createElement('div');
            heading.classList.add('font-bold', 'border-t', 'pt-2', 'mt-2', 'border-slate-600');
            heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Name;
            filterContainer_3.appendChild(heading);
            TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.forEach(function (filter, index) {
                var checkboxContainer = document.createElement('div');
                checkboxContainer.classList.add('flex');
                if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter3Expanded) {
                    return;
                }
                var checkbox = document.createElement('input');
                checkbox.id = "checkbox-filter3-".concat(filter);
                checkbox.classList.add('mx-2', 'my-auto');
                checkbox.type = 'checkbox';
                checkbox.checked = state.selectedFilter3s.indexOf(index) !== -1 ? true : false;
                checkbox.onclick = function (e) {
                    var selectedIndex = state.selectedFilter3s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter3s.push(index);
                    }
                    else {
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
                var label = document.createElement('span');
                label.classList.add('my-auto', 'flex-1');
                label.textContent = filter;
                label.onclick = function (e) {
                    checkbox.checked = !checkbox.checked;
                    var selectedIndex = state.selectedFilter3s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter3s.push(index);
                    }
                    else {
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
                filterContainer_3.appendChild(checkboxContainer);
            });
            if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                !state.isFilter3Expanded) {
                var viewAll = document.createElement('div');
                viewAll.id = "filter3-viewall";
                viewAll.textContent = 'view all';
                viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewAll.onclick = function () {
                    state.isFilter3Expanded = true;
                    RenderProductFilterInformation();
                };
                filterContainer_3.appendChild(viewAll);
            }
            else if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter3Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                state.isFilter3Expanded) {
                var viewLess = document.createElement('div');
                viewLess.id = "filter3-viewless";
                viewLess.textContent = 'view less';
                viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewLess.onclick = function () {
                    state.isFilter3Expanded = false;
                    RenderProductFilterInformation();
                };
                filterContainer_3.appendChild(viewLess);
            }
            container.appendChild(filterContainer_3);
        }
        if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.length > 0) {
            var filterContainer_4 = document.createElement('div');
            var heading = document.createElement('div');
            heading.classList.add('font-bold', 'border-t', 'pt-2', 'mt-2', 'border-slate-600');
            heading.textContent = TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Name;
            filterContainer_4.appendChild(heading);
            TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.forEach(function (filter, index) {
                var checkboxContainer = document.createElement('div');
                checkboxContainer.classList.add('flex');
                if (index > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL && !state.isFilter4Expanded) {
                    return;
                }
                var checkbox = document.createElement('input');
                checkbox.id = "checkbox-filter4-".concat(filter);
                checkbox.classList.add('mx-2', 'my-auto');
                checkbox.type = 'checkbox';
                checkbox.checked = state.selectedFilter4s.indexOf(index) !== -1 ? true : false;
                checkbox.onclick = function (e) {
                    var selectedIndex = state.selectedFilter4s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter4s.push(index);
                    }
                    else {
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
                var label = document.createElement('label');
                label.classList.add('my-auto');
                label.textContent = filter;
                label.onclick = function (e) {
                    checkbox.checked = !checkbox.checked;
                    var selectedIndex = state.selectedFilter4s.indexOf(index);
                    if (selectedIndex == -1) {
                        state.selectedFilter4s.push(index);
                    }
                    else {
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
                filterContainer_4.appendChild(checkboxContainer);
            });
            if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                !state.isFilter4Expanded) {
                var viewAll = document.createElement('div');
                viewAll.id = "filter4-viewall";
                viewAll.textContent = 'view all';
                viewAll.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewAll.onclick = function () {
                    state.isFilter4Expanded = true;
                    RenderProductFilterInformation();
                };
                filterContainer_4.appendChild(viewAll);
            }
            else if (TABLETEMPLATE.Categories[selectedCategoryIndex].Filter4Values.length > MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL &&
                state.isFilter4Expanded) {
                var viewLess = document.createElement('div');
                viewLess.id = "filter4-viewless";
                viewLess.textContent = 'view less';
                viewLess.classList.add('cursor-pointer', 'underline', 'text-blue-500', 'text-left', 'pl-2');
                viewLess.onclick = function () {
                    state.isFilter4Expanded = false;
                    RenderProductFilterInformation();
                };
                filterContainer_4.appendChild(viewLess);
            }
            container.appendChild(filterContainer_4);
        }
    }
    bodyFilterContainer.replaceChildren(container);
}
// Updates and displays the current 
function UpdateCategoryBanner() {
    var banner = document.getElementById('wsContentTableBannerTitle');
    // document.createElement('span');
    if (!state.selectedProductGroup) {
        var textMessage = document.createElement('span');
        textMessage.textContent = 'All Categories';
        banner.replaceChildren(textMessage);
        return;
    }
    var productGroup = document.createElement('span');
    productGroup.textContent = state.selectedProductGroup;
    if (!state.selectedProductSubGroup) {
        banner.replaceChildren(productGroup);
        return;
    }
    productGroup.classList.add('underline', 'cursor-pointer');
    productGroup.onclick = function () {
        return ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: null,
            newGroupName: null,
        });
    };
    var separator = document.createElement('span');
    separator.textContent = ' > ';
    var productSubGroup = document.createElement('span');
    productSubGroup.textContent = state.selectedProductSubGroup;
    if (!state.selectedGroupName) {
        banner.replaceChildren(productGroup, separator, productSubGroup);
        return;
    }
    productSubGroup.classList.add('underline', 'cursor-pointer');
    productSubGroup.onclick = function () {
        return ChangeAllProductFiltering({
            newProductGroup: state.selectedProductGroup,
            newProductSubGroup: state.selectedProductSubGroup,
            newGroupName: null,
        });
    };
    var separator2 = document.createElement('span');
    separator2.textContent = ' > ';
    var groupName = document.createElement('span');
    groupName.textContent = state.selectedGroupName;
    banner.replaceChildren(productGroup, separator, productSubGroup, separator2, groupName);
}
// Unused code for toggling the filters section for mobile devices
function Toggle() {
    var filterContainer = document.getElementById('wsFilterContainer');
    if (!state.mobileShowFilters) {
        filterContainer.classList.add('w-5/6');
        filterContainer.classList.remove('hidden');
    }
    else {
        filterContainer.classList.remove('w-5/6');
        filterContainer.classList.add('hidden');
    }
    state.mobileShowFilters = !state.mobileShowFilters;
}
function RenderTableSection(fetchData) {
    if (fetchData === void 0) { fetchData = true; }
    return __awaiter(this, void 0, void 0, function () {
        var loadTableDataPromise, wsTableContainer, upperSection, tableContainer, table;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!fetchData) return [3 /*break*/, 2];
                    loadTableDataPromise = LoadTableData();
                    RenderTableSkeleton();
                    return [4 /*yield*/, loadTableDataPromise];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2:
                    wsTableContainer = document.getElementById('wsTableContainer');
                    upperSection = document.createElement('div');
                    upperSection.classList.add('w-full', 'flex', 'mt-4', 'mb-4', 'bg-white', 'p-4', 'rounded', 'text-sm');
                    tableContainer = document.createElement('div');
                    (_a = tableContainer.classList).add.apply(_a, COMPONENT_STYLES.ProductTableStyles.Container);
                    table = document.createElement('div');
                    (_b = table.classList).add.apply(_b, COMPONENT_STYLES.ProductTableStyles.Table);
                    if (state.hideImages) {
                        table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithoutImage;
                    }
                    else {
                        table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithImage;
                    }
                    RenderTableLegend(upperSection, table);
                    RenderTableHeader(table);
                    RenderTableBody(table);
                    RenderTableFooter(table);
                    tableContainer.appendChild(table);
                    wsTableContainer.replaceChildren(upperSection, tableContainer);
                    return [2 /*return*/];
            }
        });
    });
}
function RenderTableLegend(upperSection, table) {
    // Table search/legend
    var searchForm = document.createElement('form');
    searchForm.classList.add('flex');
    searchForm.onsubmit = function (e) { return e.preventDefault(); };
    var searchLabel = document.createElement('span');
    searchLabel.classList.add('mr-2', 'my-auto', 'font-bold');
    searchLabel.textContent = 'Search';
    searchForm.appendChild(searchLabel);
    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.value = state.productCodeSearchValue;
    searchInput.classList.add('w-64', 'rounded-sm', 'border', 'h-8', 'px-2', 'my-auto');
    var previousInputValue;
    var searchRegex = /^[0-9A-Za-z ]*$/;
    searchInput.onfocus = function (e) {
        previousInputValue = e.target.value;
        console.log('newpreviousInput', previousInputValue);
    };
    searchInput.oninput = function (e) {
        var value = e.target.value;
        if (searchRegex.exec(value)) {
            previousInputValue = value;
            state.productCodeSearchValue = value;
        }
        else {
            searchInput.value = previousInputValue;
        }
    };
    searchForm.appendChild(searchInput);
    var searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.classList.add('border', 'rounded-sm', 'w-8', 'h-8', 'border-l-0', 'my-auto');
    searchButton.onclick = function (e) {
        var searchProductCode = searchInput.value;
        if (!searchRegex.exec(searchProductCode))
            return;
        state.productCodeSearchValue = searchProductCode;
        state.isProductCodeSearching = true;
        ChangeAllProductFiltering({
            newGroupName: null,
            newProductGroup: null,
            newProductSubGroup: null,
            resetSearch: false,
        }).then(function (res) {
            if (!res) {
                return RenderTableSection();
            }
        });
    };
    var clearButton = document.createElement('button');
    clearButton.type = 'reset';
    clearButton.classList.add('border', 'rounded-sm', 'w-8', 'h-8', 'border-l-0', 'my-auto');
    clearButton.onclick = function (e) {
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
        var searchIcon = document.createElement('i');
        searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');
        var infoIcon = document.createElement('i');
        infoIcon.classList.add('fa-solid', 'fa-circle-info', 'text-lg', 'my-auto');
        var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        iconSvg.setAttribute('viewBox', '0 0 512 512');
        iconPath.setAttribute('d', 'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z');
        iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'my-auto', 'fill-client-dark');
        iconSvg.appendChild(iconPath);
        searchButton.appendChild(iconSvg);
    }
    // Clear Icon
    {
        var clearIcon = document.createElement('i');
        clearIcon.classList.add('fa-solid', 'fa-magnifying-glass');
        var infoIcon = document.createElement('i');
        infoIcon.classList.add('fa-solid', 'fa-circle-info', 'text-lg', 'my-auto');
        var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        iconSvg.setAttribute('viewBox', '0 0 384 512');
        iconPath.setAttribute('d', 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z');
        iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'my-auto', 'fill-client-dark');
        iconSvg.appendChild(iconPath);
        clearButton.appendChild(iconSvg);
    }
    searchForm.appendChild(searchButton);
    searchForm.appendChild(clearButton);
    // Render table image toggle.
    var imageToggleWrapper = document.createElement('div');
    imageToggleWrapper.classList.add('flex', 'items-center', 'gap-4', 'ml-8');
    var imageToggleSwitch = document.createElement('label');
    imageToggleSwitch.classList.add('relative', 'inline-block', 'w-8', 'h-4');
    var imageToggleLabel = document.createElement('div');
    imageToggleLabel.classList.add('text-sm', 'font-bold');
    imageToggleLabel.textContent = 'Hide Images';
    var imageToggleCheckbox = document.createElement('input');
    imageToggleCheckbox.classList.add('opacity-0', 'w-0', 'h-0', 'peer');
    imageToggleCheckbox.type = 'checkbox';
    imageToggleCheckbox.checked = state.hideImages;
    imageToggleCheckbox.onchange = function (e) {
        state.hideImages = e.target.checked;
        console.log('STATE', state);
        var headerImage = document.getElementById("table-header-image-col");
        if (!headerImage) {
            console.log('Potato');
            return;
        }
        if (state.hideImages) {
            table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithoutImage;
            headerImage.classList.add('hidden');
            state.data.forEach(function (product) {
                var tdImage = document.getElementById("".concat(product.ID, "-image"));
                if (!tdImage)
                    return;
                tdImage.classList.add('hidden');
            });
        }
        else {
            table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithImage;
            headerImage.classList.remove('hidden');
            state.data.forEach(function (product) {
                var tdImage = document.getElementById("".concat(product.ID, "-image"));
                if (!tdImage)
                    return;
                tdImage.classList.remove('hidden');
            });
        }
    };
    var imageToggleSlider = document.createElement('span');
    imageToggleSlider.classList.add('absolute', 'cursor-pointer', 'top-0', 'left-0', 'right-0', 'bottom-0', 'bg-[#ccc]', 'rounded-full', 'transition-all', 'before:absolute', 'before:content-[""]', 'before:w-3', 'before:h-3', 'before:rounded-full', 'before:bg-white', 'before:left-0.5', 'before:bottom-0.5', 'before:transition-all', 'peer-checked:bg-client-dark', 'peer-checked:before:translate-x-4', 'peer-checked:before:bg-client-yellow');
    imageToggleSwitch.appendChild(imageToggleCheckbox);
    imageToggleSwitch.appendChild(imageToggleSlider);
    imageToggleWrapper.appendChild(imageToggleLabel);
    imageToggleWrapper.appendChild(imageToggleSwitch);
    var legendContainer = document.createElement('div');
    legendContainer.classList.add('flex-1', 'flex', 'justify-center', 'gap-x-8', 'gap-y-2', 'flex-wrap');
    // Pack Price = Net Price
    var fixedCostLegendContainer = document.createElement('div');
    fixedCostLegendContainer.classList.add('my-auto', 'flex');
    var fixedCostLabel = document.createElement('span');
    fixedCostLabel.classList.add('my-auto', 'font-bold', 'text-nowrap');
    fixedCostLabel.textContent = '($) Pack Price = Net Price';
    fixedCostLegendContainer.appendChild(fixedCostLabel);
    // Qty Breaks
    var qtyBreakContainer = document.createElement('div');
    qtyBreakContainer.classList.add('flex', 'gap-2');
    var qtyBreakLabel = document.createElement('span');
    qtyBreakLabel.classList.add('font-bold', 'text-nowrap', 'my-auto');
    qtyBreakLabel.textContent = ' = Qty Breaks';
    {
        var infoIcon = document.createElement('i');
        infoIcon.classList.add('fa-solid', 'fa-circle-info', 'text-lg', 'my-auto');
        var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        iconSvg.setAttribute('viewBox', '0 0 512 512');
        iconPath.setAttribute('d', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z');
        iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'my-auto', 'fill-client-dark');
        iconSvg.appendChild(iconPath);
        qtyBreakContainer.appendChild(iconSvg);
    }
    qtyBreakContainer.appendChild(qtyBreakLabel);
    var stockInformationLegend = document.createElement('div');
    stockInformationLegend.classList.add('flex', 'gap-x-8', 'gap-y-2');
    var inStockContainer = document.createElement('div');
    inStockContainer.classList.add('flex', 'flex-1', 'gap-2');
    var inStockIcon = document.createElement('div');
    inStockIcon.classList.add('rounded-full', 'border', 'bg-green-400', 'min-w-4', 'min-h-4', 'my-auto');
    var inStockLabel = document.createElement('span');
    inStockLabel.classList.add('my-auto', 'font-bold', 'text-nowrap');
    inStockLabel.textContent = '= In Stock';
    inStockContainer.appendChild(inStockIcon);
    inStockContainer.appendChild(inStockLabel);
    var noStockContainer = document.createElement('div');
    noStockContainer.classList.add('flex', 'gap-2', 'flex-1');
    var noStockIcon = document.createElement('div');
    noStockIcon.classList.add('rounded-full', 'border', 'bg-red-400', 'min-w-4', 'min-h-4', 'my-auto');
    var noStockLabel = document.createElement('span');
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
function RenderTableHeader(table) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // Declare the columns
    var headerRow = document.createElement('div');
    var headerDropdown = document.createElement('div');
    var headerCode = document.createElement('div');
    var headerDescription = document.createElement('div');
    var headerQty = document.createElement('div');
    var headerPackType = document.createElement('div');
    var headerPackQty = document.createElement('div');
    var headerPricePerUOM = document.createElement('div');
    var headerMinBuy = document.createElement('div');
    var headerSupplierSOH = document.createElement('div');
    var headerMySOH = document.createElement('div');
    var headerPackPriceContainer = document.createElement('div');
    var headerPackPrice = document.createElement('div');
    var headerAdd = document.createElement('div');
    var headerImage = document.createElement('div');
    // Apply Styles
    {
        (_a = headerRow.classList).add.apply(_a, COMPONENT_STYLES.ProductTableStyles.HeaderRow);
        (_b = headerDropdown.classList).add.apply(_b, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.Dropdown, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Dropdown, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_c = headerCode.classList).add.apply(_c, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.Code, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Code, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_d = headerDescription.classList).add.apply(_d, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.Description, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Description, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_e = headerQty.classList).add.apply(_e, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.BuyQty, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.BuyQty, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_f = headerPackType.classList).add.apply(_f, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.PackType, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackType, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_g = headerPackQty.classList).add.apply(_g, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.PackQty, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackQty, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_h = headerPricePerUOM.classList).add.apply(_h, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.PricePerUOM, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PricePerUOM, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_j = headerMinBuy.classList).add.apply(_j, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.MinBuy, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MinBuy, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_k = headerSupplierSOH.classList).add.apply(_k, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.SupplierSOH, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.SupplierSOH, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_l = headerMySOH.classList).add.apply(_l, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.MySOH, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MySOH, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_m = headerPackPrice.classList).add.apply(_m, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.PackPrice, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackPrice, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        headerPackPriceContainer.classList.add('group', 'relative', 'flex', COMPONENT_STYLES.ProductTableStyles.HeadingRowColour);
        (_o = headerAdd.classList).add.apply(_o, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.Add, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Add, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
        (_p = headerImage.classList).add.apply(_p, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.HeadingElement.Image, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Image, false), COMPONENT_STYLES.ProductTableStyles.HeadingElement.Shared, false), [COMPONENT_STYLES.ProductTableStyles.HeadingRowColour], false));
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
        if (state.hideImages)
            headerImage.classList.add('hidden');
        headerImage.id = "table-header-image-col";
        var headerPackPriceTooltipContainer = document.createElement('div');
        var headerPackPriceTooltipMessage = document.createElement('span');
        headerPackPriceTooltipMessage.classList.add('text-black');
        headerPackPrice.textContent = 'Pack Price';
        headerPackPriceTooltipContainer.classList.add('hidden', 'left-1/2', '-translate-x-1/2', '-rounded', 'absolute', 'shadow-md', 'shadow-slate-400', 'z-20', 'p-4', 'mt-10', 'group-hover:flex', 'bg-white', 'min-w-32', 'text-black');
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
function RenderTableBody(table) {
    var _a;
    if (state.data.length == 0) {
        var row = document.createElement('div');
        row.classList.add('col-span-full', 'h-24', 'flex', 'justify-center', 'items-center');
        row.textContent = 'No products found!';
        table.appendChild(row);
    }
    state.data.forEach(function (product, index) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var _t;
        // Declare the columns
        var isRowSelected = state.expandedProductID == product.ID;
        var isProductInCart = !!state.cartPurchases.find(function (x) { return (x === null || x === void 0 ? void 0 : x.Product_Code) === product.Product_Code; });
        var dataRow = document.createElement('div');
        var tdDropdown = document.createElement('div');
        var tdCode = document.createElement('div');
        var tdDescription = document.createElement('div');
        var tdBuyQty = document.createElement('div');
        var tdPackQty = document.createElement('div');
        var tdPackType = document.createElement('div');
        var tdMinBuy = document.createElement('div');
        var tdSupplierStock = document.createElement('div');
        var tdMySOH = document.createElement('div');
        var tdPackPrice = document.createElement('div');
        var tdPricePerUOM = document.createElement('div');
        var tdAdd = document.createElement('div');
        var tdImage = document.createElement('div');
        var expandedRecordInformation; // Placeholder for an element that will be added later
        // Apply the styles
        {
            (_a = dataRow.classList).add.apply(_a, COMPONENT_STYLES.ProductTableStyles.Row);
            (_b = tdDropdown.classList).add.apply(_b, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.Dropdown, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Dropdown, false));
            (_c = tdCode.classList).add.apply(_c, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.Code, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Code, false));
            (_d = tdDescription.classList).add.apply(_d, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.Description, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Description, false));
            (_e = tdBuyQty.classList).add.apply(_e, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.BuyQty, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.BuyQty, false));
            (_f = tdPackQty.classList).add.apply(_f, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.PackQty, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackQty, false));
            (_g = tdPackType.classList).add.apply(_g, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.PackType, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackType, false));
            (_h = tdMinBuy.classList).add.apply(_h, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.MinBuy, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MinBuy, false));
            (_j = tdSupplierStock.classList).add.apply(_j, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.SupplierSOH, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.SupplierSOH, false));
            (_k = tdMySOH.classList).add.apply(_k, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.MySOH, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.MySOH, false));
            (_l = tdPackPrice.classList).add.apply(_l, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.PackPrice, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PackPrice, false));
            (_m = tdPricePerUOM.classList).add.apply(_m, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.PricePerUOM, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.PricePerUOM, false));
            (_o = tdAdd.classList).add.apply(_o, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.Add, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Add, false));
            (_p = tdImage.classList).add.apply(_p, __spreadArray(__spreadArray(__spreadArray([], COMPONENT_STYLES.ProductTableStyles.CellElement.Image, false), COMPONENT_STYLES.ProductTableStyles.CellElement.Shared, false), COMPONENT_STYLES.ProductTableStyles.ColumnWidths.Image, false));
            if (IsEven(index)) {
                // Even Row
                (_q = dataRow.classList).add.apply(_q, COMPONENT_STYLES.ProductTableStyles.EvenRowColours);
            }
            else {
                // Odd Row
                (_r = dataRow.classList).add.apply(_r, COMPONENT_STYLES.ProductTableStyles.OddRowColours);
            }
            if (isRowSelected) {
                (_s = dataRow.classList).add.apply(_s, COMPONENT_STYLES.ProductTableStyles.SelectedRowColours);
            }
        }
        // Add the content
        {
            dataRow.id = "".concat(product.ID, "-row");
            tdImage.id = "".concat(product.ID, "-image");
            var productImage = document.createElement('img');
            productImage.classList.add('max-w-full', 'max-h-full', 'w-auto', 'h-auto');
            productImage.id = "img-".concat(product.ID);
            if (state.hideImages)
                tdImage.classList.add('hidden');
            // productImage.alt = `image of ${product.Product_Name}`;
            // productImage.src = `https://plus.unsplash.com/premium_photo-1665952050053-31ac47c6ff4b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D`;
            tdImage.appendChild(productImage);
            if (product['Image']) {
                try {
                    // @ts-expect-error
                    ZOHO.CREATOR.UTIL.setImageData(productImage, product['Image']);
                }
                catch (error) {
                    // This should only break in localhost??
                }
            }
            else {
                var productGroupIndex = TABLETEMPLATE.Categories.findIndex(function (x) { return x.Name == product['Product_Group.Product_Group']; });
                productImage.src = TABLETEMPLATE.Categories[productGroupIndex].ImageUrl;
            }
            tdDropdown.id = "".concat(product.ID, "-dropdown-button");
            tdDropdown.onclick = function () { return ShowDrawerInformation(); };
            var dropdownIcon = document.createElement('i');
            dropdownIcon.classList.add('fa-solid', 'fa-caret-down');
            var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            iconSvg.setAttribute('viewBox', '0 0 320 512');
            iconPath.setAttribute('d', 'M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z');
            iconSvg.classList.add('w-4', 'h-4', 'mx-auto', 'fill-client-dark');
            iconSvg.appendChild(iconPath);
            tdDropdown.appendChild(iconSvg);
            // Add the table data
            tdCode.id = "".concat(product.ID, "-code");
            tdCode.textContent = product.Product_Code;
            tdDescription.id = "".concat(product.ID, "-description");
            tdDescription.textContent = product.Product_Name;
            var increment_1 = parseInt(product.Lot_Size_Multiple) ? product.Lot_Size_Multiple : '1';
            tdBuyQty.id = "".concat(product.ID, "-quantity");
            var tdQtyInput_1 = document.createElement('input');
            tdQtyInput_1.classList.add('text-left', 'w-full', 'pl-1', 'py-2', 'rounded', 'border', 'border-slate-100');
            tdQtyInput_1.value = product.Minimum_Order_Quantity;
            var special_1 = state.productSpecials.find(function (x) { return x.Product_Code == product.Product_Code; });
            var price_1;
            tdPackPrice.id = "".concat(product.ID, "-price");
            if (special_1) {
                price_1 = parseFloat(SelectCorrectProductSpecialsPrice(product.Product_Code, parseInt(tdQtyInput_1.value)));
                if (isNaN(price_1))
                    price_1 = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
            }
            else if (!state.customerPrices[index]) {
                price_1 = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
            }
            else {
                price_1 = parseFloat(SelectCorrectCustomerPrice(state.customerPrices[index], parseInt(tdQtyInput_1.value)));
            }
            var packPriceSpan_1 = document.createElement('span');
            packPriceSpan_1.textContent = "$".concat(price_1.toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 }));
            var specialsImage = document.createElement('img');
            specialsImage.classList.add('w-10', 'h-10', 'absolute', 'z-5', '-translate-x-16');
            tdImage.appendChild(productImage);
            specialsImage.src = './content/Sale.svg';
            if (special_1)
                tdPackPrice.appendChild(specialsImage);
            tdPackPrice.appendChild(packPriceSpan_1);
            var previousInputValue_1;
            tdQtyInput_1.type = 'number';
            tdQtyInput_1.min = product.Minimum_Order_Quantity;
            tdQtyInput_1.step = increment_1;
            // tdQtyInput.max = product.In_Stock;
            tdQtyInput_1.onfocus = function (e) {
                previousInputValue_1 = e.target.value;
            };
            tdQtyInput_1.oninput = function (e) {
                var value = e.target.value;
                var regex = /^[0-9]*$/;
                if (regex.exec(value)) {
                    previousInputValue_1 = value;
                }
                else {
                    tdQtyInput_1.value = previousInputValue_1;
                }
            };
            tdQtyInput_1.onchange = function (e) {
                var quantity = parseInt(e.target.value);
                if (isNaN(quantity)) {
                    tdQtyInput_1.value = previousInputValue_1;
                    return;
                }
                // Only clamping minimum
                var minimum = parseInt(product.Minimum_Order_Quantity);
                if (quantity < minimum) {
                    tdQtyInput_1.value = minimum.toString();
                }
                if (quantity < minimum) {
                    tdQtyInput_1.value = product.Minimum_Order_Quantity;
                    var qtyChangeTooltipContainer_1 = document.createElement('div');
                    qtyChangeTooltipContainer_1.classList.add('flex', 'left-1/2', '-translate-x-1/2', 'absolute', 'shadow-md', 'shadow-slate-400', 'z-20', 'p-4', 'mt-[5.5rem]', 'min-w-32', 'bg-white', 'text-black', 'font-normal', 'text-nowrap');
                    var qtyChangeTooltipMessage = document.createElement('span');
                    qtyChangeTooltipMessage.textContent = 'Buy Qty cannot be less than Min Buy';
                    qtyChangeTooltipContainer_1.appendChild(qtyChangeTooltipMessage);
                    tdBuyQty.appendChild(qtyChangeTooltipContainer_1);
                    setTimeout(function () {
                        qtyChangeTooltipContainer_1.remove();
                    }, 2000);
                    return;
                }
                // Apply the lot sized multiple and remove leading 0s (from the parseInt earlier)
                tdQtyInput_1.value = (Math.ceil((quantity - minimum) / parseInt(increment_1)) * parseInt(increment_1) +
                    minimum).toString();
                if (special_1) {
                    price_1 = parseFloat(SelectCorrectProductSpecialsPrice(product.Product_Code, parseInt(tdQtyInput_1.value)));
                    if (isNaN(price_1))
                        price_1 = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
                }
                else if (!state.customerPrices[index]) {
                    price_1 = parseFloat(RoundTo2(parseFloat(product.Cost_Price)));
                }
                else {
                    price_1 = parseFloat(SelectCorrectCustomerPrice(state.customerPrices[index], parseInt(tdQtyInput_1.value)));
                }
                packPriceSpan_1.textContent = "$".concat(price_1.toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 }));
            };
            tdBuyQty.appendChild(tdQtyInput_1);
            if (special_1) {
                tdBuyQty.appendChild(RenderQtyBreakInfoTooltipSpecials(product.Product_Code));
            }
            else {
                tdBuyQty.appendChild(RenderQtyBreakInfoTooltip(state.customerPrices[index]));
            }
            tdBuyQty.id = "".concat(product.ID, "-units");
            var packQty = product.PackQty;
            tdPackQty.textContent = "".concat(packQty);
            tdPackType.id = "".concat(product.ID, "-uom");
            tdPackType.textContent = "".concat(product.Unit_Of_Measure);
            tdMinBuy.id = "".concat(product.ID, "-min-buy");
            tdMinBuy.textContent = product.Minimum_Order_Quantity;
            tdSupplierStock.id = "".concat(product.ID, "-stock-level");
            // If item is in the bottom 2 elements in the list, render popup above instead of below the icon
            Maximum(state.data.length, MINIMUM_TABLE_ROWS) - index <= 2
                ? tdSupplierStock.appendChild(RenderStockLevelCircle(product, 'TOP'))
                : tdSupplierStock.appendChild(RenderStockLevelCircle(product, 'BOTTOM'));
            tdMySOH.id = "".concat(product.ID, "-stock-on-hand");
            var productStock = (_t = state.productStockLevels.find(function (x) { return x.Product.ID == product.ID; })) === null || _t === void 0 ? void 0 : _t.In_Stock;
            tdMySOH.textContent = productStock !== null && productStock !== void 0 ? productStock : "0"; // parseInt(product.In_Stock).toLocaleString(LOCAL_NUMBER_FORMAT);
            tdAdd.id = "".concat(product.ID, "-add-button");
            var tdAddButton_1 = document.createElement('button');
            tdAddButton_1.classList.add('px-2', 'w-full', 'h-8');
            if (index == 1 && state.debug)
                isProductInCart = true;
            if (isProductInCart) {
                tdAddButton_1.classList.add('!bg-green-300', 'font-bold');
                tdAddButton_1.disabled = true;
                var spanText = document.createElement('span');
                spanText.textContent = 'In Cart';
                tdAddButton_1.append(spanText);
            }
            else if (price_1 <= 0) {
                tdAddButton_1.textContent = 'Disabled';
                tdAddButton_1.classList.add('bg-gray-100', 'text-gray-500', 'font-bold', 'tracking-wide');
                tdAddButton_1.disabled = true;
            }
            else {
                tdAddButton_1.textContent = 'Add';
                tdAddButton_1.classList.add('bg-client-yellow', 'hover:bg-yellow-200', 'font-bold', 'tracking-wide');
            }
            tdAdd.appendChild(tdAddButton_1);
            tdAddButton_1.onclick = function () {
                var _a;
                if (isProductInCart)
                    return;
                var orderQuantity = tdQtyInput_1.value;
                // Check that order quantity is a valid value
                var regex = /^[0-9]*$/;
                if (!regex.exec(orderQuantity)) {
                    ErrorMessageBanner("Unable to add ".concat(product.Product_Name, " to Cart"));
                    return;
                }
                var price = product.Cost_Price;
                if (special_1) {
                    price = (_a = SelectCorrectProductSpecialsPrice(product.Product_Code, parseInt(orderQuantity))) !== null && _a !== void 0 ? _a : product.Cost_Price;
                }
                else if (!state.customerPrices[index]) {
                    price = product.Cost_Price;
                }
                else {
                    price = SelectCorrectCustomerPrice(state.customerPrices[index], parseInt(orderQuantity));
                }
                console.log("".concat(product.Product_Code, ": ").concat(price));
                var total = RoundTo2(parseInt(orderQuantity) * parseFloat(price));
                var newCartPurchase = {
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
                tdAddButton_1.classList.remove('bg-client-yellow');
                tdAddButton_1.classList.add('bg-yellow-100');
                setTimeout(function () {
                    tdAddButton_1.classList.add('bg-client-yellow');
                    tdAddButton_1.classList.remove('bg-yellow-100');
                }, 200);
                APIAddProductToCart(newCartPurchase).then(function (result) {
                    // Fail condition
                    if (!result) {
                        ErrorMessageBanner("Error adding ".concat(product.Product_Name, " to Cart"));
                        return;
                    }
                    // Success condition
                    MessageBanner("Added ".concat(tdQtyInput_1.value).concat(product.Unit_Of_Measure, " ").concat(product.Product_Name, " to Cart"));
                    tdAddButton_1.classList.add('!bg-green-300');
                    tdAddButton_1.textContent = 'In Cart';
                });
            };
            expandedRecordInformation = document.createElement('div');
            expandedRecordInformation.classList.add('col-span-full', 'w-full', 'bg-white', 'border-b', 'hidden', 'p-4', 'gap-4');
            expandedRecordInformation.id = "expanded-".concat(product.ID);
            // Create the function for triggering the dropdown
            function ShowDrawerInformation() {
                var _a;
                if (state.expandedProductID != null) {
                    var previouslyExpandedProductID = state.expandedProductID;
                    ResetProductDropdown();
                    if (previouslyExpandedProductID == product.ID) {
                        state.expandedProductID = null;
                        return;
                    }
                }
                RenderExpandedProductInformation(expandedRecordInformation, product, index, true);
                expandedRecordInformation.classList.remove('hidden');
                expandedRecordInformation.classList.add('flex');
                (_a = dataRow.classList).add.apply(_a, COMPONENT_STYLES.ProductTableStyles.SelectedRowColours);
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
    for (var i = 0; i < MINIMUM_TABLE_ROWS - state.data.length; i++) {
        var row = document.createElement('div');
        (_a = row.classList).add.apply(_a, COMPONENT_STYLES.ProductTableStyles.RowBlank);
        table.appendChild(row);
    }
}
function RenderTableFooter(table) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    // Render the table footer
    var tableFooterContainer = document.createElement('div');
    tableFooterContainer.classList.add('bg-banner-dark', 'w-full', 'min-h-8', 'max-h-8', 'flex', 'col-span-full');
    var validPageSizes = ['10', '25', '50', '100'];
    var pageSizeSelectContainer = document.createElement('div');
    pageSizeSelectContainer.classList.add('my-auto', 'ml-4');
    var pageSizeSelect = document.createElement('select');
    pageSizeSelect.id = "wsTablePageSizeSelect";
    pageSizeSelect.onchange = function (e) {
        var optionValue = e.target.value;
        SetStatePageSize(parseInt(optionValue));
    };
    pageSizeSelect.classList.add('mt-auto');
    validPageSizes.forEach(function (pageSize) {
        var option = document.createElement('option');
        option.value = pageSize;
        option.textContent = pageSize;
        if (state.pageSize.toString() == pageSize) {
            option.selected = true;
        }
        pageSizeSelect.appendChild(option);
    });
    var pageSizeSelectLabel = document.createElement('label');
    pageSizeSelectLabel.htmlFor = "wsTablePageSizeSelect";
    pageSizeSelectLabel.textContent = 'page size';
    pageSizeSelectLabel.classList.add('mr-4', 'text-slate-50');
    pageSizeSelectContainer.appendChild(pageSizeSelectLabel);
    pageSizeSelectContainer.appendChild(pageSizeSelect);
    tableFooterContainer.appendChild(pageSizeSelectContainer);
    var spacer = document.createElement('div');
    spacer.classList.add('flex-1');
    tableFooterContainer.appendChild(spacer);
    var pageNumberContainer = document.createElement('div');
    pageNumberContainer.classList.add('ml-auto', 'my-auto', 'mr-4');
    var pages = Math.ceil(state.dataCount / state.pageSize);
    if (pages > 5) {
        // Render first page
        var firstPageSelector = document.createElement('span');
        firstPageSelector.textContent = '1';
        if (state.pageNumber == 1) {
            (_a = firstPageSelector.classList).add.apply(_a, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
        }
        else {
            (_b = firstPageSelector.classList).add.apply(_b, COMPONENT_STYLES.FooterStyles.pageListItem);
            firstPageSelector.onclick = function () { return SetStatePageNumber(1); };
        }
        pageNumberContainer.appendChild(firstPageSelector);
        // Render last page
        var lastPageSelector = document.createElement('span');
        lastPageSelector.textContent = pages.toString();
        if (state.pageNumber == pages) {
            (_c = lastPageSelector.classList).add.apply(_c, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
        }
        else {
            (_d = lastPageSelector.classList).add.apply(_d, COMPONENT_STYLES.FooterStyles.pageListItem);
            lastPageSelector.onclick = function () { return SetStatePageNumber(pages); };
        }
        // Check edge conditions
        if (state.pageNumber <= 2) {
            // Render pages 1, 2, 3, ... n
            var middlePage = document.createElement('span');
            middlePage.textContent = '2';
            if (state.pageNumber == 2) {
                (_e = middlePage.classList).add.apply(_e, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
            }
            else {
                (_f = middlePage.classList).add.apply(_f, COMPONENT_STYLES.FooterStyles.pageListItem);
                middlePage.onclick = function () { return SetStatePageNumber(2); };
            }
            pageNumberContainer.appendChild(middlePage);
            var rightPage = document.createElement('span');
            rightPage.textContent = '3';
            if (state.pageNumber == 3) {
                (_g = rightPage.classList).add.apply(_g, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
            }
            else {
                (_h = rightPage.classList).add.apply(_h, COMPONENT_STYLES.FooterStyles.pageListItem);
                rightPage.onclick = function () { return SetStatePageNumber(3); };
            }
            pageNumberContainer.appendChild(rightPage);
            var dots = document.createElement('span');
            dots.textContent = '. .';
            (_j = dots.classList).add.apply(_j, COMPONENT_STYLES.FooterStyles.pageListItemDots);
            pageNumberContainer.appendChild(dots);
        }
        else if (state.pageNumber >= pages - 1) {
            // Render pages 1... n-2, n-1, n
            var dots = document.createElement('span');
            dots.textContent = '. .';
            (_k = dots.classList).add.apply(_k, COMPONENT_STYLES.FooterStyles.pageListItemDots);
            pageNumberContainer.appendChild(dots);
            var leftPage = document.createElement('span');
            leftPage.textContent = (pages - 2).toString();
            if (state.pageNumber == pages - 2) {
                (_l = leftPage.classList).add.apply(_l, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
            }
            else {
                (_m = leftPage.classList).add.apply(_m, COMPONENT_STYLES.FooterStyles.pageListItem);
                leftPage.onclick = function () { return SetStatePageNumber(pages - 2); };
            }
            pageNumberContainer.appendChild(leftPage);
            var middlePage = document.createElement('span');
            middlePage.textContent = (pages - 1).toString();
            if (state.pageNumber == pages - 1) {
                (_o = middlePage.classList).add.apply(_o, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
            }
            else {
                (_p = middlePage.classList).add.apply(_p, COMPONENT_STYLES.FooterStyles.pageListItem);
                middlePage.onclick = function () { return SetStatePageNumber(pages - 1); };
            }
            pageNumberContainer.appendChild(middlePage);
        }
        else {
            // Render pages 1 ... 4,5,6 ... n
            if (state.pageNumber > 3) {
                var dots = document.createElement('span');
                dots.textContent = '. .';
                (_q = dots.classList).add.apply(_q, COMPONENT_STYLES.FooterStyles.pageListItemDots);
                pageNumberContainer.appendChild(dots);
            }
            var leftPage = document.createElement('span');
            leftPage.textContent = (state.pageNumber - 1).toString();
            (_r = leftPage.classList).add.apply(_r, COMPONENT_STYLES.FooterStyles.pageListItem);
            leftPage.onclick = function () { return SetStatePageNumber(state.pageNumber - 1); };
            pageNumberContainer.appendChild(leftPage);
            var middlePage = document.createElement('span');
            middlePage.textContent = state.pageNumber.toString();
            (_s = middlePage.classList).add.apply(_s, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
            pageNumberContainer.appendChild(middlePage);
            var rightPage = document.createElement('span');
            rightPage.textContent = (state.pageNumber + 1).toString();
            (_t = rightPage.classList).add.apply(_t, COMPONENT_STYLES.FooterStyles.pageListItem);
            rightPage.onclick = function () { return SetStatePageNumber(state.pageNumber + 1); };
            pageNumberContainer.appendChild(rightPage);
            if (state.pageNumber < pages - 2) {
                var dots2 = document.createElement('span');
                dots2.textContent = '. .';
                (_u = dots2.classList).add.apply(_u, COMPONENT_STYLES.FooterStyles.pageListItemDots);
                pageNumberContainer.appendChild(dots2);
            }
        }
        pageNumberContainer.appendChild(lastPageSelector);
    }
    else {
        var _loop_1 = function (i) {
            var _v, _w;
            var pageSelector = document.createElement('span');
            pageSelector.textContent = i.toString();
            if (i == state.pageNumber) {
                // Selected styles
                (_v = pageSelector.classList).add.apply(_v, COMPONENT_STYLES.FooterStyles.pageListItemSelected);
            }
            else {
                (_w = pageSelector.classList).add.apply(_w, COMPONENT_STYLES.FooterStyles.pageListItem);
                pageSelector.onclick = function () { return SetStatePageNumber(i); };
            }
            pageNumberContainer.appendChild(pageSelector);
        };
        // Render all pages, colour selected page well
        for (var i = 1; i <= pages; i++) {
            _loop_1(i);
        }
    }
    // 1...3 4 5...10
    tableFooterContainer.appendChild(pageNumberContainer);
    table.appendChild(tableFooterContainer);
}
function RenderTableSkeleton() {
    var _a, _b, _c;
    // Get reference to the table container
    var wsTableContainer = document.getElementById('wsTableContainer');
    // Create the table element
    var table = document.createElement('div');
    if (state.hideImages) {
        table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithoutImage;
    }
    else {
        table.style.gridTemplateColumns = COMPONENT_STYLES.ProductTableStyles.GridColsWithImage;
    }
    (_a = table.classList).add.apply(_a, COMPONENT_STYLES.ProductTableStyles.Table);
    var tableContainer = document.createElement('div');
    (_b = tableContainer.classList).add.apply(_b, COMPONENT_STYLES.ProductTableStyles.Container);
    var upperSection = document.createElement('div');
    upperSection.classList.add('w-full', 'flex', 'mt-4', 'mb-4', 'bg-white', 'p-4', 'rounded', 'text-sm');
    RenderTableLegend(upperSection, table);
    {
        var imageToggleWrapper = document.createElement('div');
        imageToggleWrapper.classList.add('mb-4', 'h-4', 'w-8');
        tableContainer.appendChild(imageToggleWrapper);
    }
    RenderTableHeader(table);
    // Render the skeleton body
    for (var i = 0; i < state.pageSize; i++) {
        var row = document.createElement('div');
        (_c = row.classList).add.apply(_c, COMPONENT_STYLES.ProductTableStyles.RowSkeleton);
        table.appendChild(row);
    }
    RenderTableFooter(table);
    tableContainer.appendChild(table);
    wsTableContainer.replaceChildren(upperSection, tableContainer);
}
// Renders the expanded product information view
function RenderExpandedProductInformation(expandedProductDiv, product, index, fetchDocuments) {
    var _a, _b;
    if (fetchDocuments === void 0) { fetchDocuments = false; }
    return __awaiter(this, void 0, void 0, function () {
        function ClickTab(index) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            if (index == state.selectedTabIndex)
                return;
            // Update styles
            if (state.selectedTabIndex == TAB_INDEX.CARTON_QTY_AND_BREAKS) {
                (_a = cartonQtyAndBreaksTab.classList).remove.apply(_a, activeTabStyles);
                (_b = cartonQtyAndBreaksTab.classList).add.apply(_b, inactiveTabStyles);
            }
            if (state.selectedTabIndex == TAB_INDEX.DETAILS) {
                (_c = detailsTab.classList).remove.apply(_c, activeTabStyles);
                (_d = detailsTab.classList).add.apply(_d, inactiveTabStyles);
            }
            if (state.selectedTabIndex == TAB_INDEX.DOCUMENTS) {
                (_e = filesTab.classList).remove.apply(_e, activeTabStyles);
                (_f = filesTab.classList).add.apply(_f, inactiveTabStyles);
            }
            state.selectedTabIndex = index;
            // Update body
            if (index == TAB_INDEX.CARTON_QTY_AND_BREAKS) {
                (_g = cartonQtyAndBreaksTab.classList).remove.apply(_g, inactiveTabStyles);
                (_h = cartonQtyAndBreaksTab.classList).add.apply(_h, activeTabStyles);
                bodyWrapper.replaceChildren(cartonQtyAndBreaksBody);
            }
            if (index == TAB_INDEX.DETAILS) {
                (_j = detailsTab.classList).remove.apply(_j, inactiveTabStyles);
                (_k = detailsTab.classList).add.apply(_k, activeTabStyles);
                bodyWrapper.replaceChildren(detailsBody);
            }
            if (index == TAB_INDEX.DOCUMENTS) {
                (_l = filesTab.classList).remove.apply(_l, inactiveTabStyles);
                (_m = filesTab.classList).add.apply(_m, activeTabStyles);
                bodyWrapper.replaceChildren(filesBody);
            }
        }
        var technicalDataSheetPromise, safetyDataSheetPromise, shipmentUpdatePromise, imageContainer, productInfoWrapper, tabsWrapper, tabs, activeTabStyles, inactiveTabStyles, sharedTabStyles, disabledTabStyles, cartonQtyAndBreaksTab, detailsTab, filesTab, bodyWrapper, detailsBody, cartonQtyAndBreaksBody, filesBody, image, productGroupIndex, productGroupIndex, detailsTable_1, tableHeadingRow, headingDetails, headingDocuments, tableData, productGroupIndex, quantityBreaksWrapper, tableTitle, table, tHeadingRow, qtyHeader, priceHeader, special, customerPrices, record, quantityValue, priceValue, i, qtyKey, priceKey, record, quantityValue, priceValue, i, qtyKey, priceKey, record, quantityValue, priceValue, record, qty, price, cartonQtyWrapper, cartonQtyContainer, cartonQtyLabel, cartonQtyValue, packQty, otherDetailsWrapper, shipmentUpdate_1, totalShipmentContainer, totalShipmentLabel, formatter_1, totalShipmentValue, estimatedTimeContainer, estimatedTimeLabelWrapper, estimatedTimeLabel, estimatedTimeSubLabel, estimatedTimeValue, date, split, shippingInfoWrapper, shippinginfoTableTitle, shippingInfoTable_1, shippingTableHeaderRow, shippingTableHeadingLocation, shippingTableHeadingQty, shippingTableHeadingDue, shippingTableHeadingDate, shippingTableHeadingDateNote, shippingInfoFooter, table_1, i, row, name_1, newChildren;
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        return __generator(this, function (_14) {
            if (fetchDocuments) {
                // Reset existing documents
                state.fetchingExpandedData = true;
                state.technicalDataSheets = [];
                state.safetyDataSheets = [];
                state.shipmentUpdates = [];
                technicalDataSheetPromise = APIGetTechnicalDataSheetsByProductCode(product.Product_Code);
                safetyDataSheetPromise = APIGetSafetyDataSheetsByProductCode(product.Product_Code);
                shipmentUpdatePromise = APIGetShipmentUpdatesByProductCode(product.Product_Code);
                Promise.all([technicalDataSheetPromise, safetyDataSheetPromise, shipmentUpdatePromise]).then(function (_a) {
                    var _b;
                    var technicalDataSheet = _a[0], safetyDataSheet = _a[1], shipmentUpdates = _a[2];
                    if (technicalDataSheet != null)
                        state.technicalDataSheets.push(technicalDataSheet);
                    if (safetyDataSheet != null)
                        state.safetyDataSheets.push(safetyDataSheet);
                    if (shipmentUpdates != null) {
                        // Sort the shipment updates by the sorting rules in the config
                        shipmentUpdates.sort(function (a, b) {
                            if (a.Location == b.Location)
                                return 0;
                            var indexA = TABLE_SHIPPING_AVAILABILITY_ORDER.findIndex(function (x) { return x == a.Location; });
                            var indexB = TABLE_SHIPPING_AVAILABILITY_ORDER.findIndex(function (x) { return x == b.Location; });
                            if (indexA == -1 || indexB == -1)
                                return 0;
                            if (indexB > indexA)
                                return -1;
                            return 1;
                        });
                        (_b = state.shipmentUpdates).push.apply(_b, shipmentUpdates);
                    }
                    state.fetchingExpandedData = false;
                    if (state.technicalDataSheets.length > 0 ||
                        state.safetyDataSheets.length > 0 ||
                        state.shipmentUpdates.length > 0) {
                        RenderExpandedProductInformation(expandedProductDiv, product, index, false);
                    }
                });
            }
            imageContainer = document.createElement('div');
            imageContainer.classList.add('flex', 'justify-center', 'items-center', 'min-w-64', 'min-h-64', 'max-w-64', 'max-h-64');
            productInfoWrapper = document.createElement('div');
            productInfoWrapper.classList.add('w-full');
            tabsWrapper = document.createElement('div');
            tabsWrapper.classList.add('border-b', 'border-client-dark', 'inline-block', 'mb-4');
            tabs = document.createElement('div');
            tabs.classList.add('flex', 'flex-wrap', '-mb-px', 'font-medium', 'text-center');
            activeTabStyles = ['text-yellow', 'border-client-yellow', 'active', 'bg-client-dark', 'text-white'];
            inactiveTabStyles = [
                'cursor-pointer',
                'border-transparent',
                'hover:border-gray-400',
                'hover:bg-gray-50',
                'hover:text-gray-500',
                'hover:border-b-2',
            ];
            sharedTabStyles = [
                'inline-flex',
                'items-center',
                'justify-center',
                'px-4',
                'py-1',
                'border-b-4',
                'group',
                'select-none',
            ];
            disabledTabStyles = [
                'cursor-default',
                'border-transparent',
                'text-gray-400',
            ];
            // Tab override
            if (state.selectedTabIndex == TAB_INDEX.DOCUMENTS && state.technicalDataSheets.length == 0 && state.safetyDataSheets.length == 0)
                state.selectedTabIndex = TAB_INDEX.CARTON_QTY_AND_BREAKS;
            cartonQtyAndBreaksTab = document.createElement('div');
            cartonQtyAndBreaksTab.id = "expanded-".concat(product.ID, "-carton-qty");
            state.selectedTabIndex == TAB_INDEX.CARTON_QTY_AND_BREAKS
                ? (_c = cartonQtyAndBreaksTab.classList).add.apply(_c, __spreadArray(__spreadArray([], activeTabStyles, false), sharedTabStyles, false)) : (_d = cartonQtyAndBreaksTab.classList).add.apply(_d, __spreadArray(__spreadArray([], inactiveTabStyles, false), sharedTabStyles, false));
            cartonQtyAndBreaksTab.textContent = 'Price and Qty';
            cartonQtyAndBreaksTab.onclick = function () { return ClickTab(0); };
            detailsTab = document.createElement('div');
            detailsTab.id = "expanded-".concat(product.ID, "-details");
            state.selectedTabIndex == TAB_INDEX.DETAILS
                ? (_e = detailsTab.classList).add.apply(_e, __spreadArray(__spreadArray([], activeTabStyles, false), sharedTabStyles, false)) : (_f = detailsTab.classList).add.apply(_f, __spreadArray(__spreadArray([], inactiveTabStyles, false), sharedTabStyles, false));
            detailsTab.textContent = 'Details';
            detailsTab.onclick = function () { return ClickTab(1); };
            filesTab = document.createElement('div');
            filesTab.id = "expanded-".concat(product.ID, "-documents");
            if (state.technicalDataSheets.length > 0 || state.safetyDataSheets.length > 0) {
                state.selectedTabIndex == TAB_INDEX.DOCUMENTS
                    ? (_g = filesTab.classList).add.apply(_g, __spreadArray(__spreadArray([], activeTabStyles, false), sharedTabStyles, false)) : (_h = filesTab.classList).add.apply(_h, __spreadArray(__spreadArray([], inactiveTabStyles, false), sharedTabStyles, false));
                filesTab.onclick = function () { return ClickTab(2); };
            }
            else {
                (_j = filesTab.classList).add.apply(_j, __spreadArray(__spreadArray([], disabledTabStyles, false), sharedTabStyles, false));
            }
            filesTab.textContent = 'Documents';
            bodyWrapper = document.createElement('div');
            bodyWrapper.classList.add('w-full');
            detailsBody = document.createElement('div');
            detailsBody.classList.add('w-full');
            cartonQtyAndBreaksBody = document.createElement('div');
            cartonQtyAndBreaksBody.classList.add('flex', 'gap-16');
            filesBody = document.createElement('div');
            filesBody.classList.add();
            image = document.createElement('img');
            image.classList.add('max-w-full', 'max-h-72', 'w-auto', 'h-auto');
            image.id = "img-".concat(product.ID);
            imageContainer.appendChild(image);
            if (product['Image']) {
                try {
                    // @ts-expect-error
                    ZOHO.CREATOR.UTIL.setImageData(image, product['Image']);
                }
                catch (error) {
                    productGroupIndex = TABLETEMPLATE.Categories.findIndex(function (x) { return x.Name == product['Product_Group.Product_Group']; });
                    image.src = (_a = TABLETEMPLATE.Categories[productGroupIndex]) === null || _a === void 0 ? void 0 : _a.ImageUrl;
                }
            }
            else {
                productGroupIndex = TABLETEMPLATE.Categories.findIndex(function (x) { return x.Name == product['Product_Group.Product_Group']; });
                image.src = (_b = TABLETEMPLATE.Categories[productGroupIndex]) === null || _b === void 0 ? void 0 : _b.ImageUrl;
            }
            // Create details body
            {
                detailsTable_1 = document.createElement('div');
                (_k = detailsTable_1.classList).add.apply(_k, COMPONENT_STYLES.ProductDetailsTable.Table);
                tableHeadingRow = document.createElement('div');
                (_l = tableHeadingRow.classList).add.apply(_l, COMPONENT_STYLES.ProductDetailsTable.HeaderRow);
                headingDetails = document.createElement('div');
                (_m = headingDetails.classList).add.apply(_m, __spreadArray(__spreadArray([], COMPONENT_STYLES.ProductDetailsTable.HeadingElement.Details, false), COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Details, false));
                headingDetails.textContent = 'Details';
                headingDocuments = document.createElement('div');
                (_o = headingDocuments.classList).add.apply(_o, __spreadArray(__spreadArray([], COMPONENT_STYLES.ProductDetailsTable.HeadingElement.Documents, false), COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Documents, false));
                headingDocuments.textContent = 'documents';
                tableData = [
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
                productGroupIndex = TABLETEMPLATE.Categories.findIndex(function (x) { return x.Name == product['Product_Group.Product_Group']; });
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
                tableData.forEach(function (productDetail) {
                    var _a, _b, _c;
                    // Create data row
                    var row = document.createElement('div');
                    (_a = row.classList).add.apply(_a, COMPONENT_STYLES.ProductDetailsTable.RecordRow);
                    // Add data
                    var name = document.createElement('div');
                    (_b = name.classList).add.apply(_b, __spreadArray(__spreadArray([], COMPONENT_STYLES.ProductDetailsTable.CellElement.Details, false), COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Details, false));
                    name.textContent = productDetail.name;
                    var value = document.createElement('div');
                    (_c = value.classList).add.apply(_c, __spreadArray(__spreadArray([], COMPONENT_STYLES.ProductDetailsTable.CellElement.Documents, false), COMPONENT_STYLES.ProductDetailsTable.ColumnSizes.Documents, false));
                    value.textContent = productDetail.value;
                    // Add row to table
                    row.appendChild(name);
                    row.appendChild(value);
                    detailsTable_1.appendChild(row);
                });
                // Add table to right col
                detailsBody.appendChild(detailsTable_1);
            }
            // Create carton qty and breaks body
            {
                quantityBreaksWrapper = document.createElement('div');
                tableTitle = document.createElement('div');
                tableTitle.classList.add('w-[160px]', 'max-w-[160px]', 'bg-client-dark', 'text-white', 'font-medium', 'px-2', 'py-1');
                tableTitle.textContent = 'Quantity Breaks';
                table = document.createElement('table');
                (_p = table.classList).add.apply(_p, COMPONENT_STYLES.QtyBreakTable.Table);
                tHeadingRow = document.createElement('tr');
                (_q = tHeadingRow.classList).add.apply(_q, COMPONENT_STYLES.QtyBreakTable.HeaderRow);
                qtyHeader = document.createElement('th');
                (_r = qtyHeader.classList).add.apply(_r, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.HeadingElement.Qty, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty, false));
                qtyHeader.textContent = 'Qty';
                priceHeader = document.createElement('th');
                (_s = priceHeader.classList).add.apply(_s, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.HeadingElement.Price, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price, false));
                priceHeader.textContent = 'Price';
                tHeadingRow.appendChild(qtyHeader);
                tHeadingRow.appendChild(priceHeader);
                table.appendChild(tHeadingRow);
                special = state.productSpecials.find(function (x) { return x.Product_Code == product.Product_Code; });
                customerPrices = state.customerPrices[index];
                if (special) {
                    if (special.Qty && special.Qty > product.Minimum_Order_Quantity) {
                        record = document.createElement('tr');
                        (_t = record.classList).add.apply(_t, COMPONENT_STYLES.QtyBreakTable.RecordRow);
                        quantityValue = document.createElement('td');
                        quantityValue.textContent = "".concat(product.Minimum_Order_Quantity, "+");
                        (_u = quantityValue.classList).add.apply(_u, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Qty, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty, false));
                        table.appendChild(quantityValue);
                        priceValue = document.createElement('td');
                        priceValue.textContent = "$".concat(parseFloat(RoundTo2(parseFloat(product.Cost_Price))).toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 }));
                        (_v = priceValue.classList).add.apply(_v, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Price, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price, false));
                        record.appendChild(quantityValue);
                        record.appendChild(priceValue);
                        table.appendChild(record);
                    }
                    for (i = 1; i <= 10; i++) {
                        qtyKey = i == 1 ? 'Qty' : "Qty".concat(i);
                        priceKey = i == 1 ? 'Price' : "Price".concat(i);
                        if (special[qtyKey] && special[priceKey]) {
                            record = document.createElement('tr');
                            (_w = record.classList).add.apply(_w, COMPONENT_STYLES.QtyBreakTable.RecordRow);
                            quantityValue = document.createElement('td');
                            quantityValue.textContent = "".concat(special[qtyKey], "+");
                            (_x = quantityValue.classList).add.apply(_x, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Qty, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty, false));
                            table.appendChild(quantityValue);
                            priceValue = document.createElement('td');
                            priceValue.textContent = "$".concat(parseFloat(RoundTo2(parseFloat(special[priceKey]))).toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 }));
                            (_y = priceValue.classList).add.apply(_y, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Price, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price, false));
                            record.appendChild(quantityValue);
                            record.appendChild(priceValue);
                            table.appendChild(record);
                        }
                    }
                }
                else if (customerPrices) {
                    for (i = 1; i <= 10; i++) {
                        qtyKey = i == 1 ? 'qty' : "qty".concat(i);
                        priceKey = i == 1 ? 'price' : "price".concat(i);
                        if (customerPrices[qtyKey] && customerPrices[priceKey]) {
                            record = document.createElement('tr');
                            (_z = record.classList).add.apply(_z, COMPONENT_STYLES.QtyBreakTable.RecordRow);
                            quantityValue = document.createElement('td');
                            quantityValue.textContent = i == 0 ? "1+" : "".concat(customerPrices[qtyKey], "+");
                            (_0 = quantityValue.classList).add.apply(_0, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Qty, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty, false));
                            table.appendChild(quantityValue);
                            priceValue = document.createElement('td');
                            priceValue.textContent = "$".concat(parseFloat(RoundTo2(customerPrices[priceKey])).toLocaleString(LOCAL_NUMBER_FORMAT, { minimumFractionDigits: 2 }));
                            (_1 = priceValue.classList).add.apply(_1, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Price, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price, false));
                            record.appendChild(quantityValue);
                            record.appendChild(priceValue);
                            table.appendChild(record);
                        }
                    }
                }
                else {
                    record = document.createElement('tr');
                    (_2 = record.classList).add.apply(_2, COMPONENT_STYLES.QtyBreakTable.RecordRow);
                    qty = document.createElement('td');
                    (_3 = qty.classList).add.apply(_3, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Qty, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Qty, false));
                    qty.textContent = '1+';
                    price = document.createElement('td');
                    (_4 = price.classList).add.apply(_4, __spreadArray(__spreadArray([], COMPONENT_STYLES.QtyBreakTable.CellElement.Price, false), COMPONENT_STYLES.QtyBreakTable.ColumnSizes.Price, false));
                    price.textContent = "$".concat(parseFloat(RoundTo2(parseFloat(product.Cost_Price))).toLocaleString(LOCAL_NUMBER_FORMAT, {
                        minimumFractionDigits: 2,
                    }));
                    record.appendChild(qty);
                    record.appendChild(price);
                    table.appendChild(record);
                }
                cartonQtyWrapper = document.createElement('div');
                cartonQtyContainer = document.createElement('div');
                cartonQtyContainer.classList.add();
                cartonQtyLabel = document.createElement('span');
                cartonQtyLabel.classList.add('font-medium', 'mr-2');
                cartonQtyLabel.textContent = 'Pack Qty:';
                cartonQtyValue = document.createElement('span');
                packQty = product.PackQty;
                parseInt(product.Unit_Of_Measure) >= 0
                    ? (cartonQtyValue.textContent = "".concat(packQty, " per ").concat(parseInt(product.Unit_Of_Measure)))
                    : (cartonQtyValue.textContent = "".concat(packQty, " ").concat(product.Unit_Of_Measure.toUpperCase()));
                otherDetailsWrapper = document.createElement('div');
                shipmentUpdate_1 = state.shipmentUpdates.find(function (x) { return x.Product == product.Product_Code; });
                totalShipmentContainer = document.createElement('div');
                totalShipmentLabel = document.createElement('span');
                totalShipmentLabel.classList.add('font-medium', 'mr-2');
                totalShipmentLabel.textContent = 'Total Shipment Amount: ';
                formatter_1 = new Intl.NumberFormat('en-US');
                totalShipmentValue = document.createElement('span');
                totalShipmentValue.classList.add('uppercase');
                if (shipmentUpdate_1) {
                    parseInt(product.Unit_Of_Measure) >= 0
                        ? (totalShipmentValue.textContent = "".concat(formatter_1.format(parseInt(shipmentUpdate_1.QtyOrdered)), " per ").concat(parseInt(product.Unit_Of_Measure)))
                        : (totalShipmentValue.textContent = "".concat(formatter_1.format(parseInt(shipmentUpdate_1.QtyOrdered)), " ").concat(product.Unit_Of_Measure.toUpperCase()));
                }
                else if (state.fetchingExpandedData) {
                    totalShipmentValue.textContent = "loading...";
                }
                else {
                    totalShipmentValue.textContent = "N/A";
                }
                totalShipmentContainer.appendChild(totalShipmentLabel);
                totalShipmentContainer.appendChild(totalShipmentValue);
                estimatedTimeContainer = document.createElement('div');
                estimatedTimeContainer.classList.add('flex');
                estimatedTimeLabelWrapper = document.createElement('div');
                estimatedTimeLabel = document.createElement('div');
                estimatedTimeSubLabel = document.createElement('div');
                estimatedTimeLabelWrapper.classList.add('inline-block', 'text-right');
                estimatedTimeLabel.classList.add('font-medium', 'mr-2');
                estimatedTimeLabel.textContent = 'Next Inbound Shipment: ';
                estimatedTimeSubLabel.classList.add('text-sm', 'font-normal', 'text-neutral-600', 'mr-2', '-translate-y-1');
                estimatedTimeSubLabel.textContent = '(subject to change)';
                estimatedTimeLabelWrapper.appendChild(estimatedTimeLabel);
                estimatedTimeLabelWrapper.appendChild(estimatedTimeSubLabel);
                estimatedTimeValue = document.createElement('span');
                date = '';
                if (shipmentUpdate_1) {
                    split = shipmentUpdate_1.ETADate.split('-');
                    console.log(split);
                    if (split.length == 3)
                        date = split[1] + ' ' + split[2];
                }
                else if (state.fetchingExpandedData) {
                    date = 'loading...';
                }
                else {
                    date = 'N/A';
                }
                estimatedTimeValue.textContent = date;
                shippingInfoWrapper = document.createElement('div');
                shippinginfoTableTitle = document.createElement('div');
                shippinginfoTableTitle.classList.add('w-[320px]', 'max-w-[320px]', 'font-medium', 'text-white', 'bg-client-dark', 'px-2', 'py-1');
                shippinginfoTableTitle.textContent = 'Product Availability';
                shippingInfoTable_1 = document.createElement('table');
                (_5 = shippingInfoTable_1.classList).add.apply(_5, COMPONENT_STYLES.ShippingInfoTable.Table);
                // Headings
                {
                    shippingTableHeaderRow = document.createElement('tr');
                    shippingTableHeadingLocation = document.createElement('th');
                    shippingTableHeadingQty = document.createElement('th');
                    shippingTableHeadingDue = document.createElement('th');
                    shippingTableHeadingDate = document.createElement('th');
                    shippingTableHeadingDateNote = document.createElement('span');
                    (_6 = shippingTableHeaderRow.classList).add.apply(_6, COMPONENT_STYLES.ShippingInfoTable.HeaderRow);
                    (_7 = shippingTableHeadingLocation.classList).add.apply(_7, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Location, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Location, false));
                    (_8 = shippingTableHeadingQty.classList).add.apply(_8, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Qty, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Qty, false));
                    (_9 = shippingTableHeadingDue.classList).add.apply(_9, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Due, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Due, false));
                    (_10 = shippingTableHeadingDate.classList).add.apply(_10, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.HeadingElement.Date, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Date, false));
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
                    shippingInfoTable_1.appendChild(shippingTableHeaderRow);
                }
                // Body
                {
                    TABLE_SHIPPING_AVAILABILITY_ORDER.forEach(function (location, index) {
                        var _a, _b, _c, _d, _e;
                        var _f;
                        var shipment = state.shipmentUpdates.find(function (x) { return x.Location == location && x.Product == product.Product_Code; });
                        var shipmentDate = '';
                        var shipmentQty = '';
                        if (shipment) {
                            var split = shipmentUpdate_1.ETADate.split('-');
                            if (split.length == 3)
                                shipmentDate = split[1] + ' ' + split[2];
                            shipmentQty = shipment.QtyOrdered;
                        }
                        var shippingTableRow = document.createElement('tr');
                        (_a = shippingTableRow.classList).add.apply(_a, COMPONENT_STYLES.ShippingInfoTable.RecordRow);
                        var shippingTableDataLocation = document.createElement('td');
                        var shippingTableDataQty = document.createElement('td');
                        var shippingTableDataDue = document.createElement('td');
                        var shippingTableDataDate = document.createElement('td');
                        (_b = shippingTableDataLocation.classList).add.apply(_b, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.CellElement.Location, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Location, false));
                        (_c = shippingTableDataQty.classList).add.apply(_c, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.CellElement.Qty, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Qty, false));
                        (_d = shippingTableDataDue.classList).add.apply(_d, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.CellElement.Due, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Due, false));
                        (_e = shippingTableDataDate.classList).add.apply(_e, __spreadArray(__spreadArray([], COMPONENT_STYLES.ShippingInfoTable.CellElement.Date, false), COMPONENT_STYLES.ShippingInfoTable.ColumnSizes.Date, false));
                        shippingTableDataLocation.textContent = location;
                        shippingTableDataQty.textContent = (_f = product["Supplier_Stock_".concat(location)]) !== null && _f !== void 0 ? _f : '0';
                        shippingTableDataDue.textContent = shipmentQty != '' ? formatter_1.format(parseInt(shipmentQty)) : '';
                        shippingTableDataDate.textContent = shipmentDate;
                        shippingTableRow.appendChild(shippingTableDataLocation);
                        shippingTableRow.appendChild(shippingTableDataQty);
                        shippingTableRow.appendChild(shippingTableDataDue);
                        shippingTableRow.appendChild(shippingTableDataDate);
                        shippingInfoTable_1.appendChild(shippingTableRow);
                    });
                }
                // Footer
                {
                    shippingInfoFooter = document.createElement('div');
                    shippingInfoFooter.classList.add('text-center', 'text-xs');
                    shippingInfoFooter.textContent = '* subject to change';
                    shippingInfoWrapper.appendChild(shippinginfoTableTitle);
                    shippingInfoWrapper.appendChild(shippingInfoTable_1);
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
                table_1 = document.createElement('table');
                (_11 = table_1.classList).add.apply(_11, COMPONENT_STYLES.DocumentsTable.Table);
                state.technicalDataSheets.forEach(function (productDocument) {
                    var _a, _b;
                    var host = window.location.ancestorOrigins[0];
                    var url = host + '/file' + productDocument.File_upload;
                    url = url.replace('/api/v2/', '/');
                    url = url.replace('/report/', '/');
                    url = url.replace('filepath=', 'filepath=/');
                    // Create data row
                    var row = document.createElement('div');
                    (_a = row.classList).add.apply(_a, COMPONENT_STYLES.DocumentsTable.RecordRow);
                    // Add data
                    var name = document.createElement('div');
                    (_b = name.classList).add.apply(_b, COMPONENT_STYLES.DocumentsTable.CellElement.File);
                    var link = document.createElement('a');
                    link.classList.add('underline', 'cursor-pointer');
                    link.href = url;
                    link.target = '_blank';
                    link.textContent = 'technical_data_sheet.pdf';
                    // Add row to table
                    name.appendChild(link);
                    row.appendChild(name);
                    table_1.appendChild(row);
                });
                state.safetyDataSheets.forEach(function (productDocument) {
                    var _a, _b;
                    var host = window.location.ancestorOrigins[0];
                    var url = host + '/file' + productDocument.File_upload;
                    url = url.replace('/api/v2/', '/');
                    url = url.replace('/report/', '/');
                    url = url.replace('filepath=', 'filepath=/');
                    // Create data row
                    var row = document.createElement('div');
                    (_a = row.classList).add.apply(_a, COMPONENT_STYLES.DocumentsTable.RecordRow);
                    // Add data
                    var name = document.createElement('div');
                    (_b = name.classList).add.apply(_b, COMPONENT_STYLES.DocumentsTable.CellElement.File);
                    var link = document.createElement('a');
                    link.classList.add('underline', 'cursor-pointer');
                    link.href = url;
                    link.target = '_blank';
                    link.textContent = 'safety_data_sheet.pdf';
                    // Add row to table
                    name.appendChild(link);
                    row.appendChild(name);
                    table_1.appendChild(row);
                });
                if (state.technicalDataSheets.length + state.safetyDataSheets.length < 10) {
                    for (i = 0; i < 10 - state.technicalDataSheets.length - state.safetyDataSheets.length; i++) {
                        row = document.createElement('div');
                        (_12 = row.classList).add.apply(_12, COMPONENT_STYLES.DocumentsTable.RecordRow);
                        name_1 = document.createElement('div');
                        (_13 = name_1.classList).add.apply(_13, COMPONENT_STYLES.DocumentsTable.CellElement.File);
                        // name.style.minHeight = '100px'
                        // name.textContent = "test"
                        // Add row to table
                        row.appendChild(name_1);
                        table_1.appendChild(row);
                    }
                }
                // Add table to right col
                filesBody.appendChild(table_1);
            }
            tabs.replaceChildren(cartonQtyAndBreaksTab, detailsTab, filesTab);
            tabsWrapper.appendChild(tabs);
            newChildren = [];
            newChildren.push(imageContainer);
            if (state.selectedTabIndex == TAB_INDEX.CARTON_QTY_AND_BREAKS)
                bodyWrapper.appendChild(cartonQtyAndBreaksBody);
            if (state.selectedTabIndex == TAB_INDEX.DETAILS)
                bodyWrapper.appendChild(detailsBody);
            if (state.selectedTabIndex == TAB_INDEX.DOCUMENTS)
                bodyWrapper.appendChild(filesBody);
            productInfoWrapper.replaceChildren(tabsWrapper, bodyWrapper);
            newChildren.push(productInfoWrapper);
            // Add the columns to the container
            expandedProductDiv.replaceChildren.apply(expandedProductDiv, newChildren);
            return [2 /*return*/];
        });
    });
}
// Renders the stock level popup when you hover over the stock level icon
function RenderStockLevelCircle(product, position) {
    var _a;
    if (position === void 0) { position = 'BOTTOM'; }
    // Create the icon
    var tdContainer = document.createElement('div');
    tdContainer.classList.add('group/stock', 'relative');
    var icon = document.createElement('div');
    var productStock = (_a = state.productStockLevels.find(function (x) { return x.Product.ID == product.ID; })) === null || _a === void 0 ? void 0 : _a.In_Stock;
    var storeStockLevel = productStock ? parseInt(productStock) : 0;
    var localStock = 0; //parseInt(product.Supplier_Stock_Local);
    var nationalStock = parseInt(product.Supplier_Stock_National);
    var iconColour = nationalStock == 0 ? 'bg-red-400' : 'bg-green-400';
    icon.classList.add('mx-auto', 'rounded-full', 'border', iconColour, 'w-4', 'h-4');
    // Create a buffer so you can mouse over the tooltip
    var tooltipBuffer = document.createElement('div');
    tooltipBuffer.classList.add('hidden', 'left-1/2', '-translate-x-1/2', 'absolute', 'z-20', 'group-hover/stock:block', 'hover:block', 'w-8', 'h-8');
    tdContainer.appendChild(tooltipBuffer);
    // Create the tooltip
    var tooltip = document.createElement('div');
    tooltip.classList.add('hidden', 'left-1/2', '-translate-x-1/2', '-rounded', 'absolute', 'shadow-md', 'shadow-slate-400', 'z-20', 'p-4', 'group-hover/stock:flex', 'bg-slate-50');
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
    var colLeft = document.createElement('div');
    colLeft.classList.add('flex-2', 'pr-2', 'font-medium', 'text-left', 'flex-col');
    var colRight = document.createElement('div');
    colRight.classList.add('flex-1', 'text-right', 'flex-col');
    var locationHeading = document.createElement('h3');
    locationHeading.textContent = 'Location';
    colLeft.appendChild(locationHeading);
    var qtyHeading = document.createElement('h3');
    qtyHeading.textContent = 'Qty';
    colRight.appendChild(qtyHeading);
    var storeStockNumber = storeStockLevel;
    var localStockNumber = localStock ? localStock : 0;
    var nationalStockNumber = nationalStock ? nationalStock : 0;
    var storeStockLabel = document.createElement('div');
    storeStockLabel.textContent = 'My SOH';
    colLeft.appendChild(storeStockLabel);
    var storeStockQty = document.createElement('div');
    storeStockQty.textContent = storeStockNumber.toString();
    colRight.appendChild(storeStockQty);
    var localStockLabel = document.createElement('div');
    localStockLabel.textContent = 'Local';
    colLeft.appendChild(localStockLabel);
    var localStockQty = document.createElement('div');
    localStockQty.textContent = localStockNumber.toString();
    colRight.appendChild(localStockQty);
    var nationalStockLabel = document.createElement('div');
    nationalStockLabel.textContent = 'National';
    colLeft.appendChild(nationalStockLabel);
    var nationalStockQty = document.createElement('div');
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
function RenderQtyBreakInfoTooltip(customerPrices) {
    var qtyBreakContainer = document.createElement('div');
    qtyBreakContainer.classList.add('relative', 'group/qty', 'min-w-6', 'flex', 'justify-center');
    if (!customerPrices || !HasMultipleCustomerPrices(customerPrices)) {
        return qtyBreakContainer;
    }
    var infoIcon = document.createElement('i');
    infoIcon.classList.add('fa-solid', 'fa-circle-info');
    // Create the tooltip
    var tooltip = document.createElement('div');
    tooltip.classList.add('hidden', 'left-1/2', '-translate-x-1/2', '-rounded', 'absolute', 'shadow-md', 'shadow-slate-400', 'z-20', 'p-4', 'mt-2', 'group-hover/qty:flex', 'bg-slate-50');
    // Create the tooltip content
    var colLeft = document.createElement('div');
    colLeft.classList.add('flex-2', 'pr-2', 'font-medium', 'text-left', 'flex-col');
    var colRight = document.createElement('div');
    colRight.classList.add('flex-1', 'text-right', 'flex-col');
    var quantityHeading = document.createElement('h3');
    quantityHeading.textContent = 'Quantity';
    colLeft.appendChild(quantityHeading);
    var priceHeading = document.createElement('h3');
    priceHeading.textContent = 'Price';
    colRight.appendChild(priceHeading);
    for (var i = 1; i <= 10; i++) {
        var priceKey = i == 1 ? 'price' : "price".concat(i);
        var qtyKey = i == 1 ? "qty" : "qty".concat(i);
        if (customerPrices[priceKey] && customerPrices[qtyKey]) {
            var quantityValue = document.createElement('div');
            quantityValue.textContent = "".concat(customerPrices[qtyKey], "+");
            colLeft.appendChild(quantityValue);
            var priceValue = document.createElement('div');
            priceValue.textContent = "$".concat(RoundTo2(customerPrices[priceKey]));
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
function RenderQtyBreakInfoTooltipSpecials(productCode) {
    var qtyBreakContainer = document.createElement('div');
    qtyBreakContainer.classList.add('relative', 'group/qty', 'min-w-6', 'flex', 'justify-center');
    if (!HasMultipleProductSpecialPrices(productCode)) {
        return qtyBreakContainer;
    }
    var special = state.productSpecials.find(function (x) { return x.Product_Code == productCode; });
    var infoIcon = document.createElement('i');
    infoIcon.classList.add('fa-solid', 'fa-circle-info');
    // Create the tooltip
    var tooltip = document.createElement('div');
    tooltip.classList.add('hidden', 'left-1/2', '-translate-x-1/2', '-rounded', 'absolute', 'shadow-md', 'shadow-slate-400', 'z-20', 'p-4', 'mt-2', 'group-hover/qty:flex', 'bg-slate-50');
    // Create the tooltip content
    var colLeft = document.createElement('div');
    colLeft.classList.add('flex-2', 'pr-2', 'font-medium', 'text-left', 'flex-col');
    var colRight = document.createElement('div');
    colRight.classList.add('flex-1', 'text-right', 'flex-col');
    var quantityHeading = document.createElement('h3');
    quantityHeading.textContent = 'Quantity';
    colLeft.appendChild(quantityHeading);
    var priceHeading = document.createElement('h3');
    priceHeading.textContent = 'Price';
    colRight.appendChild(priceHeading);
    for (var i = 1; i <= 10; i++) {
        var priceKey = i == 1 ? 'Price' : "Price".concat(i);
        var qtyKey = i == 1 ? "Qty" : "Qty".concat(i);
        if (special[priceKey] && special[qtyKey]) {
            var quantityValue = document.createElement('div');
            quantityValue.textContent = "".concat(special[qtyKey], "+");
            colLeft.appendChild(quantityValue);
            var priceValue = document.createElement('div');
            priceValue.textContent = "$".concat(RoundTo2(special[priceKey]));
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
function LoadTableData() {
    return __awaiter(this, void 0, void 0, function () {
        var criteria, productCountPromise, productDataPromise, _a, productCount, productData, productCodes, productIds, _b, customerPrices, stockLevels, productSpecials, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    criteria = GetAllProductsCriteriaString();
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
                                'Image': '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007377215/Product_Image_Bank.Image/3932514000006516911/download?filepath=1677578255369_CSC0658.jpg',
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
                                'Image': '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
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
                                'Image': '/api/v2/redacted/mymarketpluswithtenant/report/All_Products/3932514000007347915/Product_Image_Bank.Image/3932514000006504063/download?filepath=1677561183601_08PA.jpg',
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
                        return [2 /*return*/];
                    }
                    console.log('criteria', criteria);
                    productCountPromise = APIGetRecordCountOfProducts(criteria);
                    productDataPromise = APIGetAllProducts(criteria, state.pageSize, state.pageNumber);
                    return [4 /*yield*/, Promise.all([productCountPromise, productDataPromise])];
                case 1:
                    _a = _c.sent(), productCount = _a[0], productData = _a[1];
                    if (productData == null || productCount == null || productData.length == 0) {
                        state.data = [];
                        state.dataCount = 0;
                        state.customerPrices = [];
                        state.productStockLevels = [];
                        state.productSpecials = [];
                        console.log('Error fetching data');
                        console.log(state.data);
                        return [2 /*return*/];
                    }
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    productCodes = productData.map(function (x) { return x.Product_Code; });
                    productIds = productData.map(function (x) { return x.ID; });
                    return [4 /*yield*/, Promise.all([
                            APIGetCustomerPricingOfProductCodesAzure(state.tenantCode, productCodes),
                            APIGetInstockForProducts(productIds),
                            APIGetSpecialsForProductCodes(productCodes)
                        ])];
                case 3:
                    _b = _c.sent(), customerPrices = _b[0], stockLevels = _b[1], productSpecials = _b[2];
                    state.data = productData;
                    state.dataCount = productCount;
                    state.customerPrices = customerPrices;
                    state.productStockLevels = stockLevels;
                    state.productSpecials = productSpecials;
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Create an message banner to display some string
function MessageBanner(messageText) {
    var testdiv = document.getElementById('messageBanner');
    testdiv.classList.remove('hidden');
    testdiv.classList.add('absolute', 'bg-green-300');
    testdiv.textContent = messageText;
    var bannerCloseTimer = setTimeout(function () {
        testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
        testdiv.classList.add('hidden');
        testdiv.textContent = '';
    }, MESSAGE_TIMEOUT);
    testdiv.onmouseover = function () {
        console.log('OnMouseOver');
        clearTimeout(bannerCloseTimer);
    };
    testdiv.onmouseout = function () {
        console.log('OnMouseOut');
        bannerCloseTimer = setTimeout(function () {
            testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
            testdiv.classList.add('hidden');
            testdiv.textContent = '';
        }, MESSAGE_TIMEOUT);
    };
}
// Create an error message banner to display some string
function ErrorMessageBanner(messageText) {
    var testdiv = document.getElementById('messageBanner');
    testdiv.classList.remove('hidden');
    testdiv.classList.add('absolute', 'bg-red-300');
    testdiv.textContent = messageText;
    var bannerCloseTimer = setTimeout(function () {
        testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
        testdiv.classList.add('hidden');
        testdiv.textContent = '';
    }, MESSAGE_TIMEOUT);
    testdiv.onmouseover = function () {
        console.log('OnMouseOver');
        clearTimeout(bannerCloseTimer);
    };
    testdiv.onmouseout = function () {
        console.log('OnMouseOut');
        bannerCloseTimer = setTimeout(function () {
            testdiv.classList.remove('absolute', 'bg-green-300', 'bg-red-300');
            testdiv.classList.add('hidden');
            testdiv.textContent = '';
        }, MESSAGE_TIMEOUT);
    };
}
// The big function to handle the updates of the product information table
function UpdateTable() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            UpdateCategoryBanner();
            RenderProductSubGroupInformation();
            RenderProductFilterInformation();
            RenderTableSection();
            return [2 /*return*/];
        });
    });
}
// Starting point of the application
function OnPageLoad() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Fetch the tenant of the logged in user
                    _a = state;
                    return [4 /*yield*/, APIGetTenant()];
                case 1:
                    // Fetch the tenant of the logged in user
                    _a.tenantCode = _c.sent();
                    RenderProductGroupList();
                    (_b = document
                        .getElementById("wsCategory".concat(state.selectedProductGroup))
                        .classList).add.apply(_b, COMPONENT_STYLES.SelectedRootCategoryStyle);
                    if (!!state.debug) return [3 /*break*/, 3];
                    return [4 /*yield*/, APIGetAllCartPurchases()];
                case 2:
                    data = _c.sent();
                    if (data != null) {
                        state.cartPurchases = data;
                    }
                    _c.label = 3;
                case 3:
                    // Initalize the table
                    UpdateTable();
                    return [2 /*return*/];
            }
        });
    });
}
// Resets the state for the selected product group
// Note: There used to be a dropdown menu filed with category information at the top of the page but the client decided they didn't want it anymore.
function ResetStateProductGroup() {
    if (!state.selectedProductGroup) {
        return;
    }
    var element = document.getElementById("product-sub-group-".concat(state.selectedProductSubGroup.split(' ').join('-')));
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
    var element = document.getElementById("product-sub-group-".concat(state.selectedProductSubGroup.split(' ').join('-')));
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
    var element = document.getElementById("product-group-name-".concat(state.selectedGroupName.split(' ').join('-')));
    if (element) {
        element.checked = false;
        state.selectedGroupName = null;
    }
}
// Reset the product dropdown state
function ResetProductDropdown(keepSelectedTab) {
    var _a;
    if (keepSelectedTab === void 0) { keepSelectedTab = false; }
    // Remove previously selected record id
    var previousExpandedRecordInformation = document.getElementById("expanded-".concat(state.expandedProductID));
    if (previousExpandedRecordInformation) {
        previousExpandedRecordInformation.classList.remove('flex');
        previousExpandedRecordInformation.classList.add('hidden');
    }
    var dataRow = document.getElementById("".concat(state.expandedProductID, "-row"));
    if (dataRow)
        (_a = dataRow.classList).remove.apply(_a, COMPONENT_STYLES.ProductTableStyles.SelectedRowColours);
    state.expandedProductID = null;
    if (!keepSelectedTab)
        state.selectedTabIndex = TAB_INDEX.CARTON_QTY_AND_BREAKS;
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
function ChangeAllProductFiltering(_a) {
    var newProductGroup = _a.newProductGroup, newProductSubGroup = _a.newProductSubGroup, newGroupName = _a.newGroupName, _b = _a.filtersChanged, filtersChanged = _b === void 0 ? false : _b, _c = _a.resetSearch, resetSearch = _c === void 0 ? true : _c;
    return __awaiter(this, void 0, void 0, function () {
        var updated, previousCategoryItem;
        var _d, _e;
        return __generator(this, function (_f) {
            updated = false;
            if (state.selectedProductGroup != newProductGroup) {
                // Clear dropdown and filter information
                ResetProductDropdown();
                ResetStateCategoryGroup();
                ResetProductFilters();
                // Remove all selected styles from the previous selected root category
                if (state.selectedProductGroup) {
                    previousCategoryItem = document.getElementById("wsCategory".concat(state.selectedProductGroup));
                    if (previousCategoryItem) {
                        (_d = previousCategoryItem.classList).remove.apply(_d, COMPONENT_STYLES.SelectedRootCategoryStyle);
                        updated = true;
                    }
                }
                if (newProductGroup) {
                    // Add selected styles to the this root category item
                    (_e = document
                        .getElementById("wsCategory".concat(newProductGroup))
                        .classList).add.apply(_e, COMPONENT_STYLES.SelectedRootCategoryStyle);
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
                if (resetSearch)
                    state.isProductCodeSearching = false;
                UpdateTable();
                return [2 /*return*/, true];
            }
            return [2 /*return*/, false];
        });
    });
}
// Utility function to handle state updates when switching page sizes
function SetStatePageSize(newPageSize) {
    state.pageSize = newPageSize;
    state.pageNumber = 1;
    UpdateTable();
}
// Utility function to handle state updates when switching pages
function SetStatePageNumber(newPageNumber) {
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
function SelectCorrectCustomerPrice(customerPricing, qty) {
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
function SelectCorrectProductSpecialsPrice(productCode, qty) {
    var special = state.productSpecials.find(function (x) { return x.Product_Code == productCode; });
    if (!special)
        return null;
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
function HasMultipleCustomerPrices(customerPrices) {
    return !!customerPrices.price2 && !!customerPrices.qty2;
}
// Checks if a product has multiple current special/discount.
function HasMultipleProductSpecialPrices(productCode) {
    var special = state.productSpecials.find(function (x) { return x.Product_Code == productCode; });
    if (!special)
        return null;
    return !!special.Price2 && !!special.Qty2;
}
// Builds a criteria string based on the current search term or selected filters.
function GetAllProductsCriteriaString() {
    var criteria = 'Status="Active"';
    // Now searches product code, product name, and barcode
    if (state.isProductCodeSearching) {
        if (state.productCodeSearchValue != '') {
            criteria += " && (Product_Code.contains(\"".concat(state.productCodeSearchValue, "\") || Product_Name.contains(\"").concat(state.productCodeSearchValue, "\") || Barcode ==\"").concat(state.productCodeSearchValue, "\")");
            return criteria;
        }
    }
    if (!state.selectedProductGroup) {
        return criteria;
    }
    var mainCategory = TABLETEMPLATE.Categories.find(function (x) { return x.Name == state.selectedProductGroup; });
    criteria += " && Product_Group.ID == ".concat(mainCategory.ID);
    if (state.selectedFilter1s.length > 0) {
        criteria += ' && (';
        for (var i = state.selectedFilter1s.length - 1; i >= 0; i--) {
            if (i == 0) {
                criteria += "Filter1 == \"".concat(mainCategory.Filter1Values[state.selectedFilter1s[i]], "\"");
            }
            else {
                criteria += "Filter1 == \"".concat(mainCategory.Filter1Values[state.selectedFilter1s[i]], "\" || ");
            }
        }
        criteria += ')';
    }
    if (state.selectedFilter2s.length > 0) {
        criteria += ' && (';
        for (var i = state.selectedFilter2s.length - 1; i >= 0; i--) {
            if (i == 0) {
                criteria += "Filter2 == \"".concat(mainCategory.Filter2Values[state.selectedFilter2s[i]], "\"");
            }
            else {
                criteria += "Filter2 == \"".concat(mainCategory.Filter2Values[state.selectedFilter2s[i]], "\" || ");
            }
        }
        criteria += ')';
    }
    if (state.selectedFilter3s.length > 0) {
        criteria += ' && (';
        for (var i = state.selectedFilter3s.length - 1; i >= 0; i--) {
            if (i == 0) {
                criteria += "Filter3 == \"".concat(mainCategory.Filter3Values[state.selectedFilter3s[i]], "\"");
            }
            else {
                criteria += "Filter3 == \"".concat(mainCategory.Filter3Values[state.selectedFilter3s[i]], "\" || ");
            }
        }
        criteria += ')';
    }
    if (state.selectedFilter4s.length > 0) {
        criteria += ' && (';
        for (var i = state.selectedFilter4s.length - 1; i >= 0; i--) {
            if (i == 0) {
                criteria += "Filter4 == \"".concat(mainCategory.Filter4Values[state.selectedFilter4s[i]], "\"");
            }
            else {
                criteria += "Filter4 == \"".concat(mainCategory.Filter4Values[state.selectedFilter4s[i]], "\" || ");
            }
        }
        criteria += ')';
    }
    if (!state.selectedProductSubGroup) {
        return criteria;
    }
    var subCategory = mainCategory.Categories.find(function (x) { return x.Name == state.selectedProductSubGroup; });
    criteria += " && Product_Sub_Group.ID == ".concat(subCategory.ID);
    if (!state.selectedGroupName) {
        return criteria;
    }
    var group = subCategory.Categories.find(function (x) { return x.Name == state.selectedGroupName; });
    criteria += " && Group_Name.ID == ".concat(group.ID);
    return criteria;
}
// Start the application
OnPageLoad();
