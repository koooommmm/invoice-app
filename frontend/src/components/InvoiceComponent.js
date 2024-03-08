import React from "react";

const InvoiceComponent = () => {
  const invoiceData = {
    companyName: "NEXTs株式会社",
    items: [
      {
        itemName: "面白くないのに笑いを取ろうとした際に生じた精神的苦痛料",
        amount: 1000000,
      },
      {
        itemName: "私がこの世に存在する尊さ料",
        amount: 20000000000,
      },
    ],
  };

  const totalAmount = invoiceData.items.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold mb-4 text-center sm:text-left">
        {invoiceData.companyName}の請求書
      </h1>
      <ul className="bg-white shadow-md rounded-lg overflow-hidden">
        {invoiceData.items.map((item, index) => (
          <li key={index} className="px-4 py-2 border-b last:border-b-0">
            {item.itemName}:
            <span className="font-semibold">
              {item.amount.toLocaleString()}円
            </span>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mt-4 text-center sm:text-left">
        合計金額:
        <span className="text-green-500">{totalAmount.toLocaleString()}円</span>
      </h2>
    </div>
  );
};

export default InvoiceComponent;
