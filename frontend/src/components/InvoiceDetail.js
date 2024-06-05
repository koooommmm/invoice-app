import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { database } from '../firebase';
import Invoice from '../models/Invoice';
import InvoiceItem from '../models/InvoiceItem';
import InvoicePDF from './InvoicePDF';

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState(null);
  let { invoiceId } = useParams();

  useEffect(() => {
    const invoiceIdRef = ref(database, `invoices/${invoiceId}`);
    const unsubscribe = onValue(invoiceIdRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Invoiceクラスのインスタンスを作成し、データを格納
        const invoice = new Invoice(
          snapshot.key,
          data.companyName,
          data.billingDate ? new Date(data.billingDate) : null,
          data.dueDate ? new Date(data.dueDate) : null,
          data.author,
          data.items.map(
            (itemData) =>
              new InvoiceItem(
                itemData.itemName,
                itemData.quantity,
                itemData.unit,
                itemData.unitPrice,
                itemData.taxRate
              )
          ),
          data.status
        );
        setInvoice(invoice);
      } else {
        setInvoice();
      }
    });

    return () => unsubscribe();
  }, [invoiceId]);

  if (!invoice) {
    return;
  }
  return (
    <div>
      <div className='max-w-5xl mx-auto mt-10'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>請求書リスト</h1>
          <Link
            to={`/invoice/${invoice.id}/update`}
            className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition duration-300'
          >
            編集
          </Link>
        </div>
      </div>
      <div className='max-w-5xl mx-auto mt-10'>
        <div className='p-5 bg-white shadow-md rounded-lg'>
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl font-bold mb-4'>請求先情報</h1>
              <p className='mb-2'>取引先: {invoice.companyName}</p>
              <p className='mb-2'>
                請求日: {invoice.billingDate.toLocaleDateString()}
              </p>
              <p>お支払い期間: {invoice.dueDate.toLocaleDateString()}</p>
            </div>
            <div>
              <h1 className='text-xl font-bold mb-4'>自社情報</h1>
              <p>自社名: {invoice.author}</p>
            </div>
          </div>
        </div>
        <div className='p-5 bg-white shadow-md rounded-lg'>
          <h1 className='text-xl font-bold mb-4'>請求書</h1>
          <PDFViewer width='100%' height='600'>
            <InvoicePDF invoiceData={invoice} />
          </PDFViewer>
          <BlobProvider document={<InvoicePDF invoiceData={invoice} />}>
            {({ blob, url, loading, error }) => {
              return (
                <a href={url} download='invoice.pdf'>
                  Download
                </a>
              );
            }}
          </BlobProvider>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
