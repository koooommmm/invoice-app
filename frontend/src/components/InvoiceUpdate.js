import { getAuth } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { updateInvoice } from '../firebaseFunctions';
import Invoice from '../models/Invoice';
import InvoiceItem from '../models/InvoiceItem';
import InvoiceForm from './InvoiceForm';

const InvoiceUpdate = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [invoice, setInvoice] = useState(null);
  let { invoiceId } = useParams();

  useEffect(() => {
    const invoiceIdRef = ref(database, `invoices/${user.uid}/${invoiceId}`);
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
  }, [user, invoiceId]);

  const handleSubmit = async (invoice) => {
    await updateInvoice(
      user.uid,
      invoiceId,
      JSON.parse(JSON.stringify(invoice))
    );
  };

  if (!invoice) {
    return;
  }

  return (
    <div className='max-w-5xl mx-auto mt-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>請求書の編集</h1>
      </div>
      <InvoiceForm
        initialValues={invoice}
        onSubmit={handleSubmit}
      ></InvoiceForm>
    </div>
  );
};

export default InvoiceUpdate;
