import { push, ref, remove, set, update } from 'firebase/database';
import { database } from './firebase';

// 新規請求書の追加
export const addInvoice = async (invoice) => {
  const newInvoiceRef = push(ref(database, 'invoices'));
  await set(newInvoiceRef, invoice);
  return newInvoiceRef.key; // 新しい請求書のキー（ID）を返す
};

// 既存請求書の更新
export const updateInvoice = async (invoiceId, invoice) => {
  const invoiceRef = ref(database, `invoices/${invoiceId}`);
  await update(invoiceRef, invoice);
};

// 請求書の削除
export const deleteInvoice = async (invoiceId) => {
  const invoiceRef = ref(database, `invoices/${invoiceId}`);
  await remove(invoiceRef);
};
