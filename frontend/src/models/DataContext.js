import React, { createContext, useContext, useState } from "react";
import Invoice from "./Invoice"; // Invoice クラスのパスを正しく指定してください
import InvoiceItem from "./InvoiceItem"; // InvoiceItem クラスのパスを正しく指定してください

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

  // データを更新する関数
  const updateInvoice = (id, updatedInvoice) => {
    console.log(updatedInvoice);
    console.log(id);
    setInvoices((prevInvoices) => {
      const newInvoices = [updatedInvoice, updatedInvoice];
      console.log(newInvoices); // 更新後の状態を確認
      return newInvoices;
    });
  };

  return (
    <DataContext.Provider value={{ invoices, updateInvoice }}>
      {children}
    </DataContext.Provider>
  );
};

// Contextを利用するためのカスタムフック
export const useData = () => useContext(DataContext);
