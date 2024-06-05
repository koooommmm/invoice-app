import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Invoice from '../models/Invoice';
import InvoiceItem from '../models/InvoiceItem';

const InvoiceForm = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(
    initialValues.companyName || ''
  );
  const [billingDate, setBillingDate] = useState(
    initialValues.billingDate || new Date()
  );
  const [dueDate, setDueDate] = useState(initialValues.dueDate || new Date());
  const [author, setAuthor] = useState(initialValues.author || '');
  const [status, setStatus] = useState(initialValues.status || '下書き');
  const [items, setItems] = useState(
    initialValues.items || [
      {
        itemName: '',
        quantity: '',
        unit: '',
        unitPrice: '',
        taxRate: 0.1,
        amount: '',
      },
    ]
  );
  const [error, setError] = useState('');

  const addInvoiceItem = () => {
    setItems([
      ...items,
      {
        itemName: '',
        quantity: '',
        unit: '',
        unitPrice: '',
        taxRate: 0.1,
        amount: '',
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          [field]: value,
        };

        const quantity = parseFloat(updatedItem.quantity) || 0;
        const unitPrice = parseFloat(updatedItem.unitPrice) || 0;
        const taxRate = parseFloat(updatedItem.taxRate) || 0.1;

        updatedItem.amount = Math.floor(quantity * unitPrice * (1 + taxRate));
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteInvoiceItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // フォームの検証
    if (!companyName || !billingDate || !dueDate || !author || !status) {
      setError('すべての必須項目を入力してください。');
      return;
    }

    if (items.length === 0) {
      setError('1つ以上の明細を入力してください。');
      return;
    }

    if (
      items.some(
        (item) =>
          !item.itemName || isNaN(item.quantity) || isNaN(item.unitPrice)
      )
    ) {
      setError('明細を正しく入力してください');
      return;
    }

    const newInvoiceItems = items.map(
      (item) =>
        new InvoiceItem(
          item.itemName,
          item.quantity,
          item.unit,
          item.unitPrice,
          item.taxRate
        )
    );
    const newInvoice = new Invoice(
      initialValues.id || null,
      companyName,
      billingDate,
      dueDate,
      author,
      newInvoiceItems,
      status
    );

    const id = await onSubmit(newInvoice);
    if (newInvoice.id) {
      navigate(`/invoice/${newInvoice.id}`);
    } else {
      navigate(`/invoice/${id}`);
    }
  };

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const tax = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice * item.taxRate,
      0
    );
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
          role='alert'
        >
          {error}
        </div>
      )}
      <div className='max-w-5xl mx-auto mt-10'>
        <div className='p-5 bg-white shadow-md rounded-lg'>
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl font-bold mb-4'>取引先情報</h1>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  取引先
                </label>
                <input
                  type='text'
                  value={companyName}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  請求日
                </label>
                <input
                  type='date'
                  value={billingDate.toISOString().slice(0, 10)}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(e) => setBillingDate(new Date(e.target.value))}
                  required
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  お支払い期間
                </label>
                <input
                  type='date'
                  value={dueDate.toISOString().slice(0, 10)}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                  required
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  ステータス
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  <option value='下書き'>下書き</option>
                  <option value='送信済み'>送信済み</option>
                  <option value='支払い済み'>支払い済み</option>
                  <option value='延滞'>延滞</option>
                  <option value='キャンセル'>キャンセル</option>
                </select>
              </div>
            </div>
            <div>
              <h1 className='text-xl font-bold mb-4'>自社情報</h1>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  自社名
                </label>
                <input
                  type='text'
                  value={author}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-5 bg-white shadow-md rounded-lg'>
        <h1 className='text-xl font-bold mb-4'>詳細</h1>
        <div className='mb-4'>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white'>
              <thead>
                <tr className='w-full h-16 border-gray-300 border-b py-8'>
                  <th className='text-left'>品目・品名</th>
                  <th className='text-left'>数量</th>
                  <th className='text-left'>単位</th>
                  <th className='text-left'>単価</th>
                  <th className='text-left'>税率</th>
                  <th className='text-left'>金額</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className='h-12 border-gray-300 border-b'>
                    <td>
                      <input
                        type='text'
                        className='col-span-2'
                        value={item.itemName}
                        onChange={(e) =>
                          handleItemChange(index, 'itemName', e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, 'quantity', e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(index, 'unit', e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleItemChange(index, 'unitPrice', e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        step='0.01'
                        value={item.taxRate}
                        onChange={(e) =>
                          handleItemChange(index, 'taxRate', e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>{item.amount.toLocaleString()}円</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => deleteInvoiceItem(index)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <span className='i-lucide-trash w-5'></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type='button'
              onClick={addInvoiceItem}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              明細を追加
            </button>
          </div>
        </div>
        <div className='flex justify-end mt-6'>
          <div className='w-1/3'>
            <p className='text-right'>小計: {subtotal.toLocaleString()}円</p>
            <p className='text-right'>消費税: {tax.toLocaleString()}円</p>
            <p className='text-right font-bold'>
              合計: {total.toLocaleString()}円
            </p>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        保存
      </button>
    </form>
  );
};

export default InvoiceForm;
