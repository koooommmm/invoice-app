import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInvoice } from "../firebaseFunctions";
import Invoice from "../models/Invoice";
import InvoiceItem from "../models/InvoiceItem";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [billingDate, setBillingDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState("");
  const [items, setItems] = useState([
    {
      itemName: "",
      quantity: 1,
      unit: "",
      unitPrice: 0,
      taxRate: 0.1,
      amount: 0,
    },
  ]);

  const addInvoiceItem = () => {
    setItems([
      ...items,
      {
        itemName: "",
        quantity: 1,
        unit: "",
        unitPrice: 0,
        taxRate: 0.1,
        amount: 0,
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          [field]:
            field === "quantity" || field === "unitPrice" || field === "taxRate"
              ? parseFloat(value)
              : value,
        };
        updatedItem.amount = Math.floor(
          updatedItem.quantity *
            updatedItem.unitPrice *
            (1 + updatedItem.taxRate)
        );
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInvoiceItems = items.map(
      (item) =>
        new InvoiceItem(
          item.itemName,
          item.quantity,
          item.unit,
          item.unitPrice,
          item.taxRate
        )
    );
    const newInvoice = new Invoice(
      null,
      companyName,
      billingDate,
      dueDate,
      author,
      newInvoiceItems
    );
    await addInvoice(JSON.parse(JSON.stringify(newInvoice)));
    navigate("/invoices");
  };

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const tax = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice * item.taxRate,
      0
    );
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

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
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  請求日
                </label>
                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  お支払い期間
                </label>
                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {items.map((item, index) => (
                  <tr key={index} className="h-12 border-gray-300 border-b">
                    <td>
                      <input
                        type="text"
                        className="col-span-2"
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
                        step="0.01"
                        value={item.taxRate}
                        onChange={(e) =>
                          handleItemChange(index, "taxRate", e.target.value)
                        }
                      />
                    </td>
                    <td>{item.amount.toLocaleString()}円</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addInvoiceItem}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              明細を追加
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <div className="w-1/3">
            <p className="text-right">小計: {subtotal.toLocaleString()}円</p>
            <p className="text-right">消費税: {tax.toLocaleString()}円</p>
            <p className="text-right font-bold">
              合計: {total.toLocaleString()}円
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
