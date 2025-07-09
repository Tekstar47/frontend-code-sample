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
function APIGetProductByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_ALL_PRODUCTS,
                        id: id,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getRecordById(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000) {
                        return [2 /*return*/, null];
                    }
                    console.log('single product', data);
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetTechnicalDataSheetsByProductCode(productCode) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_ALL_TECHNICAL_DATA_SHEETS,
                        criteria: "Product_Code=\"".concat(productCode, "\""),
                        pageSize: 1,
                        page: 1,
                    };
                    if (state.debug)
                        return [2 /*return*/, {
                                File_upload: '/redacted.pdf',
                                ID: '3932514000008754007',
                                Product_Code: 'WPAJ10075',
                            }];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000 || data.length == 0) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, data[0]];
                case 4:
                    error_2 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetSafetyDataSheetsByProductCode(productCode) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_ALL_SAFETY_DATA_SHEETS,
                        criteria: "Product_Code=\"".concat(productCode, "\""),
                        pageSize: 1,
                        page: 1,
                    };
                    if (state.debug)
                        return [2 /*return*/, {
                                File_upload: '/redacted.pdf',
                                ID: '3932514000008754007',
                                Product_Code: 'WPAJ10075',
                            }];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000 || data.length == 0) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, data[0]];
                case 4:
                    error_3 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetShipmentUpdatesByProductCode(productCode) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_SHIPMENT_UPDATES,
                        criteria: "Product=\"".concat(productCode, "\""),
                        pageSize: 50,
                        page: 1,
                    };
                    if (state.debug)
                        return [2 /*return*/, [
                                {
                                    Product: 'CSC0658',
                                    QtyOrdered: '100',
                                    ETADate: '24-May-2024',
                                    Location: 'QLD',
                                },
                                {
                                    Product: 'CSC0658',
                                    QtyOrdered: '200',
                                    ETADate: '30-May-2024',
                                    Location: 'NSW',
                                },
                                {
                                    Product: 'CSC0658',
                                    QtyOrdered: '45',
                                    ETADate: '26-May-2024',
                                    Location: 'WA',
                                },
                            ]];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000 || data.length == 0) {
                        return [2 /*return*/, null];
                    }
                    // return shipment updates
                    return [2 /*return*/, data];
                case 4:
                    error_4 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetAllProducts(criteria, pageSize, page) {
    if (pageSize === void 0) { pageSize = 10; }
    if (page === void 0) { page = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_ALL_PRODUCTS,
                        page: page,
                        pageSize: pageSize,
                    };
                    if (criteria != undefined) {
                        config.criteria = criteria;
                    }
                    else {
                        config.criteria = "Status=\"Active\"";
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000) {
                        console.log('Error fetching data', code, data);
                        return [2 /*return*/, null];
                    }
                    console.log('API Data Response', data);
                    return [2 /*return*/, data];
                case 4:
                    error_5 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetRecordCountOfProducts(criteria) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, result, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_ALL_PRODUCTS,
                    };
                    if (criteria) {
                        config.criteria = criteria;
                    }
                    else {
                        config.criteria = "Status=\"Active\"";
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getRecordCount(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, result = _a.result;
                    if (code != 3000) {
                        console.log('Error fetching data', code, result);
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, parseInt(result.records_count)];
                case 4:
                    error_6 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetAllProductCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_NEW_WEB_SALES_CATEGORY,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    console.log('code', code);
                    if (code != 3000) {
                        return [2 /*return*/, null];
                    }
                    console.log('Categories', data);
                    return [2 /*return*/, data];
                case 4:
                    error_7 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIAddProductToCart(data) {
    return __awaiter(this, void 0, void 0, function () {
        var config, initparams, code, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        formName: FORM_SCAN_PURCHASES_CART,
                        data: {
                            data: data,
                        },
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _a.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.UTIL.getInitParams()];
                case 3:
                    initparams = _a.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.addRecord(config)];
                case 4:
                    code = (_a.sent()).code;
                    if (code != 3000) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                case 5:
                    error_8 = _a.sent();
                    console.log('error', error_8);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function APIGetAllCartPurchases() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_CART_PURCHASES,
                        // page,
                        // pageSize,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000) {
                        console.log('Error fetching data from cart', code, data);
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, data];
                case 4:
                    err_1 = _b.sent();
                    console.log('Error fetching data from cart', err_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetCustomerPricingOfProductCode(productCode) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, e_1, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_CUSTOMER_PRICES,
                        criteria: "ProductID == \"".concat(productCode, "\""),
                        // pageSize: 20,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 4:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000 || data.length == 0) {
                        console.log('Error fetching pricing data', code, data);
                        return [2 /*return*/, null];
                    }
                    // console.log("Pricing", data);
                    return [2 /*return*/, data[0]];
                case 5:
                    e_1 = _b.sent();
                    return [2 /*return*/, null];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_2 = _b.sent();
                    null;
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function APIGetCustomerPricingOfProductCodesAzure(customerID, productCodes) {
    return __awaiter(this, void 0, void 0, function () {
        var postBody, AZURE_URL, response, customerPrices, _loop_1, i, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (productCodes.length == 0) {
                        return [2 /*return*/, []];
                    }
                    if (customerID.length == 0) {
                        console.log("Invalid Tenant Code");
                        return [2 /*return*/, []];
                    }
                    postBody = {
                        customerID: customerID,
                        productIDs: productCodes,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    AZURE_URL = "https://redacted.azurewebsites.net/api/redacted";
                    return [4 /*yield*/, fetch(AZURE_URL, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(postBody)
                        }).then(function (response) { return response.json(); }).catch(function () { data: []; })];
                case 2:
                    response = _a.sent();
                    customerPrices = [];
                    _loop_1 = function (i) {
                        var idx = response.data.findIndex(function (x) { return (x === null || x === void 0 ? void 0 : x.productID) == productCodes[i]; });
                        if (idx == -1) {
                            customerPrices.push(null);
                        }
                        else {
                            customerPrices.push(response.data[idx]);
                        }
                    };
                    // index the result
                    for (i = 0; i < productCodes.length; i++) {
                        _loop_1(i);
                    }
                    return [2 /*return*/, customerPrices];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function APIGetQueryParams() {
    return __awaiter(this, void 0, void 0, function () {
        var queryParams, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (state.debug)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _a.sent();
                    queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
                    console.log(queryParams);
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Fetches the tenant code for the current logged in user
function APIGetTenant() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, code, data, e_3, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_TENANT,
                        // criteria: `ProductID == "${productCode}"`,
                        // pageSize: 20,
                    };
                    // Default to DIREFA for fetching customer prices in localhost
                    if (state.debug)
                        return [2 /*return*/, "DIREFA"];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 4:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000 || data.length == 0) {
                        console.log('Error fetching tenant data');
                        return [2 /*return*/, ""];
                    }
                    return [2 /*return*/, data[0].Tenant_Code];
                case 5:
                    e_3 = _b.sent();
                    return [2 /*return*/, ""];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_4 = _b.sent();
                    console.log('Error fetching tenant data');
                    return [2 /*return*/, ""];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function APIGetInstockForProducts(productIds) {
    return __awaiter(this, void 0, void 0, function () {
        var config, criteria_1, first_1, _a, code, data, error_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_IN_STOCK_PRODUCTS,
                        // page,
                        // pageSize,
                    };
                    if (state.debug)
                        return [2 /*return*/, []];
                    if (productIds.length == 0)
                        return [2 /*return*/, []];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    criteria_1 = "Product.ID in {";
                    first_1 = true;
                    productIds.forEach(function (x) {
                        if (first_1) {
                            criteria_1 += "\"".concat(x, "\"");
                            first_1 = false;
                        }
                        else {
                            criteria_1 += ",\"".concat(x, "\"");
                        }
                    });
                    criteria_1 += "}";
                    config.criteria = criteria_1;
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000) {
                        console.log('No products found', code, data);
                        return [2 /*return*/, []];
                    }
                    console.log('API Data Response APIGetInstockForProducts', data);
                    return [2 /*return*/, data];
                case 4:
                    error_9 = _b.sent();
                    console.log('Error APIGetInstockForProducts', error_9);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function APIGetSpecialsForProductCodes(productCodes) {
    return __awaiter(this, void 0, void 0, function () {
        var config, criteria_2, first_2, _a, code, data, error_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_MARKETING_SPECIALS,
                    };
                    if (state.debug)
                        return [2 /*return*/, []];
                    if (productCodes.length == 0)
                        return [2 /*return*/, []];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    criteria_2 = "Product_Code in {";
                    first_2 = true;
                    productCodes.forEach(function (x) {
                        if (first_2) {
                            criteria_2 += "\"".concat(x, "\"");
                            first_2 = false;
                        }
                        else {
                            criteria_2 += ",\"".concat(x, "\"");
                        }
                    });
                    criteria_2 += "}";
                    config.criteria = criteria_2;
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _b.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.getAllRecords(config)];
                case 3:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    if (code != 3000) {
                        console.log('Error fetching data APIGetSpecialsForProductCodes', code, data);
                        return [2 /*return*/, []];
                    }
                    console.log('API Data Response APIGetSpecialsForProductCodes', data);
                    return [2 /*return*/, data];
                case 4:
                    error_10 = _b.sent();
                    console.log('Error APIGetSpecialsForProductCodes', error_10);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Updates API with new quantity of items, as well as updates the total cost
// Assumes data is a valid payload
function APIUpdateCartPurchase(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var config, response, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        appName: APP_NAME,
                        reportName: REPORT_CART_PURCHASES,
                        id: id,
                        data: data,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // @ts-expect-error
                    return [4 /*yield*/, ZOHO.CREATOR.init()];
                case 2:
                    // @ts-expect-error
                    _a.sent();
                    return [4 /*yield*/, ZOHO.CREATOR.API.updateRecord(config)];
                case 3:
                    response = _a.sent();
                    if (response.code != 3000) {
                        // Record failed to update
                        return [2 /*return*/, false];
                    }
                    // Record updated successfully
                    return [2 /*return*/, true];
                case 4:
                    err_5 = _a.sent();
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
