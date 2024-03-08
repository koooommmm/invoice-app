export default class Invoice {
  constructor(id, companyName, items) {
    this.id = id;
    this.companyName = companyName;
    this.items = items; // InvoiceItemのインスタンスの配列
  }

  // 合計金額を計算
  getTotalAmount() {
    return this.items.reduce((total, item) => total + item.amount, 0);
  }
}
