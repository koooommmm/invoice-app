export default class InvoiceItem {
  constructor(itemName, quantity, unit, unitPrice, taxRate) {
    this.itemName = itemName; // 品目名
    this.quantity = quantity; // 数量
    this.unit = unit; // 単位（例：個、kgなど）
    this.unitPrice = unitPrice; // 単価
    this.taxRate = taxRate; // 税率（例：0.1 = 10%）

    // 金額を計算する
    this.amount = this.calculateAmount();
  }

  // 金額（税込）を計算して切り上げるメソッド
  calculateAmount() {
    // 税抜き金額を計算
    const netAmount = this.quantity * this.unitPrice;
    // 税込み金額を計算
    const grossAmount = netAmount + netAmount * this.taxRate;
    // 税込金額を切り上げ
    const roundedAmount = Math.ceil(grossAmount);
    return roundedAmount;
  }

  // JSON形式で要素を取得するメソッド
  toJSON() {
    return {
      itemName: this.itemName,
      quantity: this.quantity,
      unit: this.unit,
      unitPrice: this.unitPrice,
      taxRate: this.taxRate,
      amount: this.amount,
    };
  }
}
