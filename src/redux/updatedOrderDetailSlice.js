import { createSlice } from "@reduxjs/toolkit";

const tables =
  localStorage.getItem("tables") !== null
    ? JSON.parse(localStorage.getItem("tables"))
    : [];

const setUpdatedOrderDetails = (tables) => {
  localStorage.setItem("tables", JSON.stringify(tables));
};

const addOrUpdateItem = (itemsArray, newItem) => {
  const existingItemIndex = itemsArray.findIndex(item => item.id === newItem.id);

  if (existingItemIndex !== -1) {
    // If the item exists, update its quantity
    const updatedItems = [...itemsArray];
    updatedItems[existingItemIndex].quantity += newItem.quantity;
    return updatedItems;
  } else {
    // If the item doesn't exist, add it to the array
    return [...itemsArray, newItem];
  }
};

const initialState = {
  tables: tables
};

const updatedOrderDetailSlice = createSlice({
  name: "updatedOrderDetails",
  initialState,
  reducers: {

    // =========== add item ============
    addUpdatedOrderDetail(state, action) {
      /**
         payload: {
            tableId: tableId,
            products: [
              {
                id: ,
                quantity:
              }
            ],
            combos: [
              {
                id: ,
                quantity:
              }
            ]
        }
       */
      const newTable = action.payload;
      const tableIndex = state.tables.findIndex(table => table.tableId === newTable.tableId);
      if (tableIndex !== -1) {
        const { _ , products, combos } = newTable
        products.forEach(newProduct => {
          const existingProductIndex = state.tables[tableIndex].products.findIndex(item => item.id === newProduct.id);
          if (existingProductIndex !== -1) {
            state.tables[tableIndex].products[existingProductIndex].quantity += newProduct.quantity;
          } else {
            state.tables[tableIndex].products.push({ ...newProduct });
          }
        });
        combos.forEach(newCombo => {
          const existingComboIndex = state.tables[tableIndex].combos.findIndex(item => item.id === newCombo.id);
          if (existingComboIndex !== -1) {
            state.tables[tableIndex].combos[existingComboIndex].quantity += newCombo.quantity;
          } else {
            state.tables[tableIndex].combos.push({ ...newCombo });
          }
        });
      } else {
        state.tables.push(newTable)
      }
      setUpdatedOrderDetails(state.tables)
    },

    //============ delete item ===========
    deleteNotification(state, action) {
      const tableId = action.payload.tableId;
      const item = action.payload.item;   
      const tableIndex = state.tables.findIndex(table => table.tableId === tableId);
      if (item.product !== null) {
        state.tables[tableIndex].products = state.tables[tableIndex].products.filter(product => product.id !== item.product.id);
      }
      if (item.combo !== null) {
        state.tables[tableIndex].combos = state.tables[tableIndex].combos.filter(combo => combo.id !== item.combo.id);
      }
      setUpdatedOrderDetails(state.tables)
    },
  },
});
export default updatedOrderDetailSlice;
