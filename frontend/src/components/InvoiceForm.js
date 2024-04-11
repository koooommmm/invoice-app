import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../models/DataContext";

const InvoiceForm = () => {
  const { invoices, updateInvoice } = useData();
  let { invoiceId } = useParams();
  const navigation = useNavigate();
  const invoiceData = invoices.find(
    (inv) => inv.id === parseInt(invoiceId, 10)
  );

  const [invoice, setInvoice] = useState({
    ...invoiceData,
    items: [...invoiceData.items],
  });

  // 明細を追加する関数
  const addInvoiceItem = (event) => {
    event.preventDefault();
    const newItem = {
      itemName: "",
      quantity: 0,
      unit: "",
      unitPrice: 0,
      taxRate: 0,
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
  };

  // 明細の値が変更されたときに呼ばれる関数
  const handleItemChange = (index, field, value) => {
    const updatedItems = invoice.items.map((item, i) => {
      if (i === index) {
        const updatedValue =
          field === "quantity" || field === "unitPrice" || field === "taxRate"
            ? parseFloat(value) || 0 // 数値に変換、無効な入力は0にする
            : value;
        return { ...item, [field]: updatedValue };
      }
      return item;
    });
    setInvoice({ ...invoice, items: updatedItems });
  };

  // 各項目の金額を計算する関数
  const calculateItemAmount = (quantity, unitPrice, taxRate) => {
    return quantity * unitPrice * (1 + taxRate);
  };

  // 小計を計算
  const getSubTotal = () => {
    return invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  };

  // 税額を計算
  const getTax = () => {
    return invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice * item.taxRate,
      0
    );
  };

  // 合計を計算
  const getTotal = () => {
    return getSubTotal() + getTax();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateInvoice(invoiceId, invoice); // invoices配列を更新する疑似関数
    navigation(`/invoice/${invoiceId}`); // 保存後に請求書リストページに遷移
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="p-5 bg-white shadow-md rounded-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-bold mb-4">取引先情報</h1>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  取引先
                </label>
                <input
                  type="text"
                  value={invoice.companyName}
                  onChange={(e) =>
                    setInvoice({ ...invoice, companyName: e.target.value })
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  請求書番号
                </label>
                <span>{invoice.id}</span>
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  請求日
                </label>
                <input
                  type="date"
                  value={invoice.billingDate.toLocaleDateString("sv-SE")}
                  onChange={(e) =>
                    setInvoice({ ...invoice, billingDate: e.target.value })
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  お支払い期間
                </label>
                <input
                  type="date"
                  value={invoice.dueDate.toLocaleDateString("sv-SE")}
                  onChange={(e) =>
                    setInvoice({ ...invoice, dueDate: e.target.value })
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-4">自社情報</h1>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  自社名
                </label>
                <input
                  type="text"
                  value={invoice.author}
                  onChange={(e) =>
                    setInvoice({ ...invoice, author: e.target.value })
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">詳細</h1>
        <div className="mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-left">品目・品名</th>
                  <th className="text-left">数量</th>
                  <th className="text-left">単位</th>
                  <th className="text-left">単価</th>
                  <th className="text-left">税率</th>
                  <th className="text-left">金額</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="h-12 border-gray-300 border-b">
                    <td>
                      <input
                        type="text"
                        value={item.itemName}
                        onChange={(e) =>
                          handleItemChange(index, "itemName", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(index, "unit", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleItemChange(index, "unitPrice", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.taxRate}
                        onChange={(e) =>
                          handleItemChange(index, "taxRate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      {calculateItemAmount(
                        item.quantity,
                        item.unitPrice,
                        item.taxRate
                      ).toLocaleString()}
                      円
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={addInvoiceItem}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + 項目を追加
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <div className="w-1/3">
            <p className="text-right">
              小計: {getSubTotal().toLocaleString()}円
            </p>
            <p className="text-right">消費税: {getTax().toLocaleString()}円</p>
            <p className="text-right font-bold">
              合計: {getTotal().toLocaleString()}円
            </p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        保存
      </button>
    </form>
  );
};

export default InvoiceForm;
