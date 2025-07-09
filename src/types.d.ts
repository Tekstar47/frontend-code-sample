type Product = {
  ID: string;
  Barcode: string;
  Buy_Price: string;
  Cost_Price: string;
  Discount: string;
  Group_Name: {
    ID: string;
    display_value: string;
  };
  In_Stock: string;
  Lot_Size_Multiple: string;
  Minimum_Order_Quantity: string;
  Product_Code: string;
  Product_Description: string;
  Product_Group: {
    ID: string;
    display_value: string;
  };
  'Product_Group.Product_Group': string;
  Image: string;
  Product_Name: string;
  Product_Sub_Group: {
    ID: string;
    display_value: string;
  };
  Reorder_Level: string;
  Retail_Recommended_Price: string;
  Status: string;
  Supplier_Code: string;
  Supplier_Name?: {
    ID: string;
    display_value: string;
  };
  Unit_Of_Measure: string;
  Supplier_Stock_Local?: string;
  Supplier_Stock_National?: string;
  Supplier_Stock_QLD?: string;
  Supplier_Stock_NSW?: string;
  Supplier_Stock_NZ?: string;
  Supplier_Stock_WA?: string;
  Supplier_Stock_SA?: string;
  Supplier_Stock_VIC?: string;
  Supplier_Stock_Other?: string;
  Pack?: string;
  PackQty?: string;
  Filter1?: string;
  Filter2?: string;
  Filter3?: string;
  Filter4?: string;
};

type TechnicalDataSheet = {
  ID: string;
  File_upload: string;
  Product_Code: string;
};

type SafetyDataSheet = {
  ID: string;
  File_upload: string;
  Product_Code: string;
};

type APIAddCartPurchase = {
  Barcode: string;
  Cost_Price: string;
  Order_Quantity: string;
  // 'Product.In_Stock': string;
  // 'Product.Minimum_Order_Quantity': string;
  Product_Code: string;
  Product_Name: string;
  Total: string;
  Unit_of_Measure: string;
  Supplier?: string; // The id
  Product: string; // The id
};

type TableTemplate = {
  Name: 'Main Categories';
  Categories: Array<TableTemplateMainCategory>;
};

type TableTemplateMainCategory = {
  Name: string;
  ID: string;
  ImageUrl: string;
  CategoryGroupName: string;
  Categories: Array<TableTemplateCategoryGroup>;
  Filter1Name: string;
  Filter1Values: Array<string>;
  Filter2Name: string;
  Filter2Values: Array<string>;
  Filter3Name: string;
  Filter3Values: Array<string>;
  Filter4Name: string;
  Filter4Values: Array<string>;
};

type TableTemplateCategoryGroup = {
  Name: string;
  ID: string;
  Categories: Array<TableTemplateGroupName>;
};

type TableTemplateGroupName = {
  Name: string;
  ID: string;
  Filters: Array<any>;
};

type CartPurchase = {
  Barcode: string;
  Cost_Price: string;
  ID: string;
  Order_Quantity: string;
  'Product.In_Stock': string;
  'Product.Minimum_Order_Quantity': string;
  'Product.PackQty': string;
  'Product.Lot_Size_Multiple': string;
  Product_Code: string;
  Product_Name: string;
  Total: string;
  Unit_of_Measure: string;
  Product?: {
    ID: string;
    display_value: string;
  };
  Supplier?: {
    ID: string;
    display_value: string;
  };
};

type CartPurchaseUpdatePayload = {
  data: {
    ID: string;
    Order_Quantity: string;
    Total: string;
  };
};

// The pricing coming back from azure is required to be in this format. I could convert this to an array format in the future if needed TODO:
type APICustomerPricing = {
  ID: string;
  ProductID: string;
  Product_UID: string;
  Price: string;
  Qty: string;
  Price2: string;
  Qty2: string;
  Price3: string;
  Qty3: string;
  Price4: string;
  Qty4: string;
  Price5: string;
  Qty5: string;
  Price6: string;
  Qty6: string;
  Price7: string;
  Qty7: string;
  Price8: string;
  Qty8: string;
  Price9: string;
  Qty9: string;
  Price10: string;
  Qty10: string;
};

// The pricing coming back from azure is required to be in this format. I could convert this to an array format in the future if needed TODO:
type APIAzureCustomerPricing = {
  productID: string;
  customerID: string;
  price: number | null;
  qty: number;
  price2: number | null;
  qty2: number;
  price3: number | null;
  qty3: number;
  price4: number | null;
  qty4: number;
  price5: number | null;
  qty5: number;
  price6: number | null;
  qty6: number;
  price7: number | null;
  qty7: number;
  price8: number | null;
  qty8: number;
  price9: number | null;
  qty9: number;
  price10: number | null;
  qty10: number;
};

type ShipmentUpdate = {
  Product: string;
  QtyOrdered: string;
  ETADate: string;
  Location: string;
};

type Tenant = {
  Admin_Name: {
    display_value: string;
    first_name: string;
    last_name: string;
  };
  Email: string;
  ID: string;
  Organisation_Name: string;
  Tenant: string;
  Tenant_Code: string;
};

type InStockProduct = {
  SumCost: string;
  Product: {
    display_value: string;
    ID: string;
  };
  ID: string;
  In_Stock: string;
  Reorder_Level: string;
};

// The pricing coming back from azure is required to be in this format. I could convert this to an array format in the future if needed TODO:
type ProductSpecials = {
  ID: string;
  Product_Code: string;
  Qty: string;
  Qty2?: string;
  Qty3?: string;
  Qty4?: string;
  Qty5?: string;
  Qty6?: string;
  Qty7?: string;
  Qty8?: string;
  Qty9?: string;
  Qty10?: string;
  Price: string;
  Price2?: string;
  Price3?: string;
  Price4?: string;
  Price5?: string;
  Price6?: string;
  Price7?: string;
  Price8?: string;
  Price9?: string;
  Price10?: string;
};
