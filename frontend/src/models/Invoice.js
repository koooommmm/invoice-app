export default class Invoice {
  constructor(
    id,
    companyName,
    billingDate,
    dueDate,
    author,
    items,
    status = "未請求"
  ) {
    this.id = id;
    this.companyName = companyName;
    this.billingDate = billingDate;
    this.dueDate = dueDate;
    this.author = author;
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

  updateInvoice(updateInvoice) {
    this.companyName = updateInvoice.companyName;
    this.billingDate = updateInvoice.billingDate;
    this.dueDate = updateInvoice.dueDate;
    this.author = updateInvoice.author;
    this.items = updateInvoice.items;
    this.status = updateInvoice.status;
  }
}
