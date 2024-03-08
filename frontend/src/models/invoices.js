import Invoice from "./Invoice";
import InvoiceItem from "./InvoiceItem";

export const invoices = [
  new Invoice(1, "NEXTs株式会社", [
    new InvoiceItem(
      "面白くないのに笑いを取ろうとした際に生じた精神的苦痛料",
      1000000
    ),
    new InvoiceItem("私がこの世に存在する尊さ料", 20000000000),
  ]),
  new Invoice(2, "めんどくさいからテストと言う名前にする", [
    new InvoiceItem("めんどくさいからテストと言う名前にする", 1000000),
  ]),
  new Invoice(3, "ああああ", [new InvoiceItem("いいいい", 10)]),
];
