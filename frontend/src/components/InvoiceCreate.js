import React from 'react';
import { addInvoice } from '../firebaseFunctions';
import InvoiceForm from './InvoiceForm';

const InvoiceCreate = () => {
  const handleSubmit = async (invoice) => {
    const id = await addInvoice(invoice.toJSON());
    return id;
  };

  return (
    <div className='max-w-5xl mx-auto mt-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>請求書の作成</h1>
      </div>
      <InvoiceForm initialValues={NaN} onSubmit={handleSubmit}></InvoiceForm>
    </div>
  );
};

export default InvoiceCreate;
