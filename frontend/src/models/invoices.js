import Invoice from "./Invoice";
import InvoiceItem from "./InvoiceItem";

export const invoices = [
  new Invoice(1, "株式会社ABCD", new Date(), new Date(), [
    new InvoiceItem("item1", 10, "個", 100, 0.1),
    new InvoiceItem("item2", 15, "個", 200, 0.1),
  ]),
  new Invoice(2, "株式会社EFGH", new Date(), new Date(), [
    new InvoiceItem("item3", 20, "個", 100, 0.1),
    new InvoiceItem("item4", 35, "個", 200, 0.1),
  ]),
];
