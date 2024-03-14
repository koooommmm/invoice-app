export default class Invoice {
  constructor(id, companyName, billingDate, dueDate, items, status = "未請求") {
    this.id = id;
    this.companyName = companyName;
    this.billingDate = billingDate;
    this.dueDate = dueDate;
    this.items = items;
    this.status = status;
  }

  // 合計金額を計算
  getTotalAmount() {
    return this.items.reduce((total, item) => total + item.amount, 0);
  }

  // 税込合計金額を計算（ここでは消費税率を10%とする）
  getTotalAmountWithTax(taxRate = 0.1) {
    const subtotal = this.getTotalAmount();
    return subtotal + subtotal * taxRate;
  }

  // 請求状況ステータスを更新
  updateStatus(newStatus) {
    this.status = newStatus;
  }
}
