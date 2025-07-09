const APP_NAME = 'mymarketpluswithtenant';
const REPORT_ALL_PRODUCTS = 'All_Product_Image_Banks_Widget_View';
const REPORT_ALL_CUSTOMER_PRICES = 'Master_Price_File_Report';
const REPORT_NEW_WEB_SALES_CATEGORY = 'New_Web_Sales_Category';
const REPORT_CART_PURCHASES = 'Cart_Purchases';
const REPORT_CUSTOMER_PRICES = 'Master_Price_File_Report';
const FORM_SCAN_PURCHASES_CART = 'Scan_Purchases_Cart';
const REPORT_ALL_TECHNICAL_DATA_SHEETS = 'Technical_Data_File_Report';
const REPORT_ALL_SAFETY_DATA_SHEETS = 'Safety_Data_Sheets1_Report';
const REPORT_SHIPMENT_UPDATES = 'ShipmentUpdates_Report';
const REPORT_TENANT = 'Get_Tenant_Widget_View';
const REPORT_IN_STOCK_PRODUCTS = 'In_Stock_Products_Widget_View';
const REPORT_MARKETING_SPECIALS = 'AddMarketingSpecial_Report';

const LOCAL_NUMBER_FORMAT = 'en-AU';
const MESSAGE_TIMEOUT = 3000;

const MAXIMUM_FILTER_VALUES_BEFORE_VIEW_ALL = 4;
const IMAGE_WIDTH = '50px';
const MINIMUM_TABLE_ROWS = 5;

const TABLE_SHIPPING_AVAILABILITY_ORDER = ['NSW', 'NZ', 'QLD','VIC', 'WA'];

const SUPPLIER_ZID = '3932514000007121003'; // Hard coded supplier ZID

// Define the tailwind css styles of each of the different components used on the front end.
const COMPONENT_STYLES = {
  SelectedRootCategoryStyle: ['!bg-client-yellow'],
  ProductTableStyles: {
    GridColsWithImage: `8fr 8fr 28fr 100fr 20fr 12fr 16fr 12fr 20fr 16fr 14fr 20fr`,
    GridColsWithoutImage: '8fr 28fr 100fr 20fr 12fr 16fr 12fr 20fr 16fr 14fr 20fr',
    Container: ['p-4', 'bg-white', 'rounded', 'relative'],
    Table: [
      'w-full',
      'text-left',
      'grid',
      'text-sm',
      // 'grid-cols-product-table',
      'overflow-x-auto',
      'overflow-y-scoll',
      // 'min-h-[700px]'
    ],
    Row: ['contents', 'group', 'h-12', 'delay-50', 'ease-in-out', 'transition-colors', 'delay-50'],
    ColumnWidths: {
      Dropdown: ['min-w-8'],
      Code: ['min-w-28'],
      Description: ['min-w-[22rem]'],
      PackPrice: ['min-w-20'],
      PackQty: ['min-w-12'],
      PackType: ['min-w-12'],
      PricePerUOM: ['min-w-20'],
      BuyQty: ['min-w-24'],
      MinBuy: ['min-w-12'],
      SupplierSOH: ['min-w-16'],
      MySOH: ['min-w-14'],
      Add: ['min-w-20'],
      Image: ['min-w-[100px]'],
    },
    HeadingElement: {
      Dropdown: [],
      Code: ['text-center'],
      Description: [],
      BuyQty: ['text-left', 'text-wrap'],
      PackType: ['text-left', 'text-wrap'],
      PackQty: ['text-left', 'text-wrap'],
      PricePerUOM: ['text-wrap'],
      MinBuy: ['text-wrap', 'text-center', 'justify-center'],
      SupplierSOH: ['text-wrap', 'text-center', 'justify-center'],
      MySOH: [],
      Image: [],
      PackPrice: ['text-left', 'w-full', 'text-wrap'],
      Add: [],
      Shared: ['px-2', 'text-white', 'min-h-12', 'max-h-12', 'border-b', 'flex', 'items-center', 'font-bold', 'capitalize'],
    },
    HeaderRow: ['contents', 'text-white', 'text-left'],
    RowSkeleton: ['bg-gray-50', 'col-span-full', 'my-1', 'h-8', 'animate-pulse'],
    RowBlank: ['col-span-full', 'my-1', 'h-8'],
    CellElement: {
      Dropdown: ['justify-center', 'cursor-pointer'],
      Code: ['text-center'],
      Description: [],
      BuyQty: ['relative'],
      PackType: ['text-center', 'uppercase'],
      PackQty: [],
      Image: [],
      PricePerUOM: [],
      MinBuy: ['justify-center'],
      SupplierSOH: ['justify-center'],
      MySOH: [],
      PackPrice: ['justify-end'],
      Add: ['p-2'],
      Shared: ['px-2', 'min-h-12', 'max-h-16', 'border-b', 'flex', 'items-center'],
    },
    EvenRowColours: [
      '[&>*]:bg-white',
      '[&>*]:hover:bg-table-row-hover-background',
      '[&>*]:group-hover:bg-table-row-hover-background',
    ],
    OddRowColours: [
      '[&>*]:bg-slate-100',
      '[&>*]:hover:bg-table-row-hover-background',
      '[&>*]:group-hover:bg-table-row-hover-background',
    ],
    HeadingRowColour: 'bg-table-header-row-background',
    SelectedRowColours: [
      '[&>*]:!bg-table-row-selected-background',
      '[&>*]:hover:!bg-table-row-selected-hover-background',
      '[&>*]:group-hover:!bg-table-row-selected-hover-background',
    ],
  },
  ProductDetailsTable: {
    Table: ['text-left', 'text-sm', 'w-full', 'max-w-[600px]'],
    HeaderRow: ['font-medium', 'uppercase', 'flex'],
    RecordRow: ['border-b', 'flex', 'odd:bg-gray-50', 'even:bg-client-background'],
    HeadingElement: {
      Details: ['bg-client-yellow', 'px-2', 'py-1'],
      Documents: ['flex-1', 'bg-banner-dark', 'text-slate-50', 'px-2', 'py-1'],
    },
    CellElement: {
      Details: ['px-2', 'font-medium'],
      Documents: ['px-2'],
    },
    ColumnSizes: {
      Details: ['w-32'],
      Documents: ['flex-1'],
    },
  },
  QtyBreakTable: {
    Table: ['text-left', 'text-sm', 'table-auto', 'border', 'border-client-dark'],
    HeaderRow: ['font-medium', 'bg-gray-50'],
    RecordRow: ['odd:bg-gray-50', 'even:bg-client-background', 'last:border-b', 'border-client-dark'],
    HeadingElement: {
      Qty: ['py-1', 'px-2'],
      Price: ['py-1', 'px-2'],
    },
    CellElement: {
      Qty: ['px-2'],
      Price: ['px-2'],
    },
    ColumnSizes: {
      Qty: ['py-1'],
      Price: ['py-1', 'w-full'],
    },
  },
  DocumentsTable: {
    Table: ['text-left', 'text-sm', 'table-auto', 'w-full', 'max-w-[600px]'],
    HeaderRow: ['font-medium', 'bg-slate-100'],
    RecordRow: ['odd:bg-gray-50', 'even:bg-client-background', 'last:border-b'],
    CellElement: {
      File: ['px-2', 'min-h-5'],
    },
  },
  ShippingInfoTable: {
    Table: ['text-left', 'text-sm', 'table-auto', 'w-full', 'max-w-[320px]', 'border', 'border-client-dark'],
    HeaderRow: ['font-medium', 'bg-gray-50'],
    RecordRow: ['odd:bg-gray-50', 'even:bg-client-background', 'last:border-b', 'border-client-dark'],
    HeadingElement: {
      Location: ['py-1', 'px-2', 'font-medium'],
      Qty: ['py-1', 'px-2', 'font-medium', 'text-right', 'border-r', 'border-client-dark'],
      Due: ['py-1', 'px-2', 'font-medium'],
      Date: ['py-1', 'px-2', 'font-medium'],
    },
    CellElement: {
      Location: ['px-2', 'font-medium'],
      Qty: ['px-2', 'border-r', 'text-right', 'border-client-dark'],
      Due: ['px-2', 'text-right'],
      Date: ['px-2'],
    },
    ColumnSizes: {
      Location: ['py-1'],
      Qty: ['py-1'],
      Due: ['py-1'],
      Date: ['py-1'],
    },
  },
  FooterStyles: {
    pageListItemSelected: ['px-1', 'text-client-yellow', 'underline'],
    pageListItem: ['px-1', 'text-slate-50', 'underline', 'cursor-pointer'],
    pageListItemDots: ['px-1', 'text-slate-50'],
  },
};
