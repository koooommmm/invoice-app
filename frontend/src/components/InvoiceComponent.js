import React from "react";

const InvoiceComponent = () => {
  // 仮データの定義
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

  // 合計金額の計算
  const totalAmount = invoiceData.items.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div>
      <h1>{invoiceData.companyName}の請求書</h1>
      <ul>
        {invoiceData.items.map((item, index) => (
          <li key={index}>
            <div>
              {item.itemName}: {item.amount.toLocaleString()}円
            </div>
          </li>
        ))}
      </ul>
      <h2>合計金額: {totalAmount.toLocaleString()}円</h2>
    </div>
  );
};

export default InvoiceComponent;
