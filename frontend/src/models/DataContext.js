import React, { createContext, useContext, useState } from "react";
import Invoice from "./Invoice";
import InvoiceItem from "./InvoiceItem";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([
    new Invoice(1, "株式会社ABCD", new Date(), new Date(), "山田太郎", [
      new InvoiceItem("item1", 10, "個", 100, 0.1),
      new InvoiceItem("item2", 15, "個", 200, 0.1),
    ]),
    new Invoice(2, "株式会社EFGH", new Date(), new Date(), "山田太郎", [
      new InvoiceItem("item3", 20, "個", 100, 0.1),
      new InvoiceItem("item4", 35, "個", 200, 0.1),
    ]),
  ]);

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((inv) => (inv.id === id ? updatedInvoice : inv))
    );
  };

  const addInvoice = (newInvoice) => {
    console.log(newInvoice);
    // setInvoices((prevInvoices) => {
    //   // 新しいIDを決定する
    //   const newId =
    //     prevInvoices.length > 0
    //       ? Math.max(...prevInvoices.map((inv) => inv.id)) + 1
    //       : 1;
    //   // 新しい請求書オブジェクトにIDをセットする
    //   const invoiceToAdd = new Invoice(newId, ...newInvoice);
    //   return [...prevInvoices, invoiceToAdd];
    // });
  };

  return (
    <DataContext.Provider value={{ invoices, updateInvoice, addInvoice }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
