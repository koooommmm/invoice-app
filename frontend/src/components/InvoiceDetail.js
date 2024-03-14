import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { invoices } from "../models/invoices";

const InvoiceDetail = () => {
  let { invoiceId } = useParams();
  const invoiceData = invoices.find(
    (inv) => inv.id === parseInt(invoiceId, 10)
  );

  // invoiceの状態をReactのstateで管理
  const [invoice, setInvoice] = useState({
    ...invoiceData,
    items: [...invoiceData.items],
  });

  // 明細を追加する関数
  const addInvoiceItem = () => {
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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      {/* 請求書情報 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            請求先情報
          </label>
          <p className="mb-4">{invoice.companyName} 様</p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            請求書情報
          </label>
          <p className="mb-2">請求書番号: {invoice.id}</p>
          <p className="mb-2">
            発行日: {invoice.billingDate.toLocaleDateString()}
          </p>
          <p>お支払い期限: {invoice.dueDate.toLocaleDateString()}</p>
        </div>
      </div>

      {/* 明細表 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          明細
        </label>
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

      {/* 合計金額 */}
      <div className="flex justify-end mt-6">
        <div className="w-1/3">
          <p className="text-right">小計: {getSubTotal().toLocaleString()}円</p>
          <p className="text-right">消費税: {getTax().toLocaleString()}円</p>
          <p className="text-right font-bold">
            合計: {getTotal().toLocaleString()}円
          </p>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-end mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          キャンセル
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          保存
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;
