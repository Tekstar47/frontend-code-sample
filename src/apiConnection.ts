async function APIGetProductByID(id: string): Promise<Product | null> {
  let config = {
    appName: APP_NAME,
    reportName: REPORT_ALL_PRODUCTS,
    id: id,
  };
  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: Product } = await ZOHO.CREATOR.API.getRecordById(config);
    if (code != 3000) {
      return null;
    }

    console.log('single product', data);
    return data;
  } catch (error) {
    return null;
  }
}

async function APIGetTechnicalDataSheetsByProductCode(productCode: string): Promise<TechnicalDataSheet | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    pageSize?: number;
    page?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_ALL_TECHNICAL_DATA_SHEETS,
    criteria: `Product_Code="${productCode}"`,
    pageSize: 1,
    page: 1,
  };

  if (state.debug)
    return {
      File_upload:
        '/redacted.pdf',
      ID: '3932514000008754007',
      Product_Code: 'WPAJ10075',
    };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: TechnicalDataSheet[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000 || data.length == 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    return null;
  }
}

async function APIGetSafetyDataSheetsByProductCode(productCode: string): Promise<SafetyDataSheet | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    pageSize?: number;
    page?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_ALL_SAFETY_DATA_SHEETS,
    criteria: `Product_Code="${productCode}"`,
    pageSize: 1,
    page: 1,
  };

  if (state.debug)
    return {
      File_upload:
        '/redacted.pdf',
      ID: '3932514000008754007',
      Product_Code: 'WPAJ10075',
    };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: SafetyDataSheet[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000 || data.length == 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    return null;
  }
}

async function APIGetShipmentUpdatesByProductCode(productCode: string): Promise<ShipmentUpdate[] | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    pageSize?: number;
    page?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_SHIPMENT_UPDATES,
    criteria: `Product="${productCode}"`,
    pageSize: 50,
    page: 1,
  };

  if (state.debug)
    return [
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
    ];

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: ShipmentUpdate[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000 || data.length == 0) {
      return null;
    }

    // return shipment updates
    return data;
  } catch (error) {
    return null;
  }
}

async function APIGetAllProducts(
  criteria?: string,
  pageSize: number = 10,
  page: number = 1
): Promise<Product[] | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_ALL_PRODUCTS,
    page,
    pageSize,
  };

  if (criteria != undefined) {
    config.criteria = criteria;
  } else {
    config.criteria = `Status="Active"`;
  }

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: Product[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000) {
      console.log('Error fetching data', code, data);
      return null;
    }

    console.log('API Data Response', data);

    return data as Product[];
  } catch (error) {
    return null;
  }
}

async function APIGetRecordCountOfProducts(criteria?: string): Promise<number> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
  } = {
    appName: APP_NAME,
    reportName: REPORT_ALL_PRODUCTS,
  };

  if (criteria) {
    config.criteria = criteria;
  } else {
    config.criteria = `Status="Active"`;
  }

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, result }: { code: number; result: { records_count: string } } = await ZOHO.CREATOR.API.getRecordCount(
      config
    );
    if (code != 3000) {
      console.log('Error fetching data', code, result);
      return null;
    }

    return parseInt(result.records_count);
  } catch (error) {
    return null;
  }
}

async function APIGetAllProductCategories(): Promise<any | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_NEW_WEB_SALES_CATEGORY,
  };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: Product[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    console.log('code', code);
    if (code != 3000) {
      return null;
    }

    console.log('Categories', data);
    return data;
  } catch (error) {
    return null;
  }
}

async function APIAddProductToCart(data: APIAddCartPurchase): Promise<boolean> {
  let config: {
    appName: string;
    formName: string;
    data: {
      data: APIAddCartPurchase;
    };
  } = {
    appName: APP_NAME,
    formName: FORM_SCAN_PURCHASES_CART,
    data: {
      data: data,
    },
  };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();
    // @ts-expect-error
    var initparams = await ZOHO.CREATOR.UTIL.getInitParams();

    // @ts-expect-error
    const { code }: { code: number } = await ZOHO.CREATOR.API.addRecord(config);
    if (code != 3000) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}

async function APIGetAllCartPurchases(): Promise<CartPurchase[] | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_CART_PURCHASES,
    // page,
    // pageSize,
  };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: APICartPurchase[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000) {
      console.log('Error fetching data from cart', code, data);
      return null;
    }

    return data;
  } catch (err) {
    console.log('Error fetching data from cart', err);
    return null;
  }
}

async function APIGetCustomerPricingOfProductCode(productCode: string): Promise<APICustomerPricing | null> {
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_CUSTOMER_PRICES,
    criteria: `ProductID == "${productCode}"`,
    // pageSize: 20,
  };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    try {
      // @ts-expect-error
      const { code, data }: { code: number; data: APICustomerPricing[] } = await ZOHO.CREATOR.API.getAllRecords(config);
      if (code != 3000 || data.length == 0) {
        console.log('Error fetching pricing data', code, data);
        return null;
      }

      // console.log("Pricing", data);

      return data[0];
    } catch (e) {
      return null;
    }
  } catch (err) {
    null;
  }
}

async function APIGetCustomerPricingOfProductCodesAzure(
  customerID: string,
  productCodes: string[]
): Promise<APIAzureCustomerPricing[] | null> {
  if (productCodes.length == 0) {
    return [];
  }

  if (customerID.length == 0) {
    console.log("Invalid Tenant Code");
    return [];
  }

  let postBody: {
    customerID: string;
    productIDs: string[];
  } = {
    customerID: customerID,
    productIDs: productCodes,
  };

  try {
    const AZURE_URL = "https://redacted.azurewebsites.net/api/redacted";
    let response: { data: APIAzureCustomerPricing[] } = await fetch(AZURE_URL,{
      method: 'POST', 
      headers: {
        "Content-Type": "application/json"
      },      
      body: JSON.stringify(postBody)
    }).then(response => response.json()).catch(() => {data: []});

    let customerPrices: Array<APIAzureCustomerPricing | null> = [];
    // index the result
    for (let i = 0; i < productCodes.length; i++)
      {
        let idx = response.data.findIndex(x => x?.productID == productCodes[i]);
        if (idx == -1) {
          customerPrices.push(null);
        } else {
          customerPrices.push(response.data[idx]);
        }
      }

    return customerPrices;
  } catch (e) {
    return [];
  }
}

async function APIGetQueryParams() {
  if (state.debug) return;

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();

    console.log(queryParams);
  } catch (err) {
    return;
  }
}

// Fetches the tenant code for the current logged in user
async function APIGetTenant()
{
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_TENANT,
    // criteria: `ProductID == "${productCode}"`,
    // pageSize: 20,
  };

  // Default to DIREFA for fetching customer prices in localhost
  if (state.debug) return "DIREFA";

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    try {
      // @ts-expect-error
      const { code, data }: { code: number; data: Tenant[] } = await ZOHO.CREATOR.API.getAllRecords(config);
      if (code != 3000 || data.length == 0) {
        console.log('Error fetching tenant data');
        return "";
      }

      return data[0].Tenant_Code;
    } catch (e) {
      return "";
    }
  } catch (err) {
    console.log('Error fetching tenant data');
    return "";
  }
}

async function APIGetInstockForProducts(
  productIds: string[]
): Promise<InStockProduct[]>
{
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_IN_STOCK_PRODUCTS,
    // page,
    // pageSize,
  };

  if (state.debug) return [];
  if (productIds.length == 0) return [];

  try {

    let criteria = `Product.ID in {`;
    let first = true;
    productIds.forEach((x) => 
    {
      if (first) {
        criteria += `"${x}"`
        first = false;
      } else 
      {
        criteria += `,"${x}"`
      }
    })
    criteria += "}";
    config.criteria = criteria;

    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: InStockProduct[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000) {
      console.log('No products found', code, data);
      return [];
    }

    console.log('API Data Response APIGetInstockForProducts', data);

    return data as InStockProduct[];
  } catch (error) {
      console.log('Error APIGetInstockForProducts', error);
      return [];
  }
}

async function APIGetSpecialsForProductCodes(
  productCodes: string[]
): Promise<ProductSpecials[]>
{
  // Reasonable while there are not too many specials happening at once. Might need to adjust later
  let config: {
    appName: string;
    reportName: string;
    criteria?: string;
    page?: number;
    pageSize?: number;
  } = {
    appName: APP_NAME,
    reportName: REPORT_MARKETING_SPECIALS,
  };

  if (state.debug) return [];
  if (productCodes.length == 0) return [];

  try {

    let criteria = `Product_Code in {`;
    let first = true;
    productCodes.forEach((x) => 
    {
      if (first) {
        criteria += `"${x}"`
        first = false;
      } else 
      {
        criteria += `,"${x}"`
      }
    })
    criteria += "}";
    config.criteria = criteria;

    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const { code, data }: { code: number; data: ProductSpecials[] } = await ZOHO.CREATOR.API.getAllRecords(config);
    if (code != 3000) {
      console.log('Error fetching data APIGetSpecialsForProductCodes', code, data);
      return [];
    }

    console.log('API Data Response APIGetSpecialsForProductCodes', data);

    return data;
  } catch (error) {
      console.log('Error APIGetSpecialsForProductCodes', error);
      return [];
  }


}

// Updates API with new quantity of items, as well as updates the total cost
// Assumes data is a valid payload
async function APIUpdateCartPurchase(id: string, data: CartPurchaseUpdatePayload): Promise<boolean> {
  let config = {
    appName: APP_NAME,
    reportName: REPORT_CART_PURCHASES,
    id,
    data,
  };

  try {
    // @ts-expect-error
    await ZOHO.CREATOR.init();

    // @ts-expect-error
    const response = await ZOHO.CREATOR.API.updateRecord(config);
    if (response.code != 3000) {
      // Record failed to update
      return false;
    }
    // Record updated successfully
    return true;
  } catch (err) {
    return false;
  }
}
