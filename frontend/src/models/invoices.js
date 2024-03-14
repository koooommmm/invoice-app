import Invoice from "./Invoice";
import InvoiceItem from "./InvoiceItem";

export const invoices = [
  new Invoice(1, "株式会社ABCD", new Date(), new Date(), [
    new InvoiceItem(
      "面白くないのに笑いを取ろうとした際に生じた精神的苦痛料",
      1000000
    ),
    new InvoiceItem("私がこの世に存在する尊さ料", 20000000000),
  ]),
];
