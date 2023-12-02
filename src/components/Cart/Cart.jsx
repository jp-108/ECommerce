import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "../../Redux-store/cartSlice";
import { Link } from "react-router-dom";

export default function Cart({ open, setOpen }) {
  const cartItems = useSelector((state) => state.cartSlice.data);
  const item = useSelector((state) => state.cartSlice.item);
  const dispatch = useDispatch();

  const qtyId = (id) => {
    return item.filter((item) => (item._id == id ? item.qty : null))[0].qty;
  };

  let total = 0;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child as={Fragment} enter='ease-in-out duration-500' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-500' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child as={Fragment} enter='transform transition ease-in-out duration-500 sm:duration-700' enterFrom='translate-x-full' enterTo='translate-x-0' leave='transform transition ease-in-out duration-500 sm:duration-700' leaveFrom='translate-x-0' leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>Shopping cart</Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button type='button' className='relative -m-2 p-2 text-gray-400 hover:text-gray-500' onClick={() => setOpen(false)}>
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul role='list' className='-my-6 divide-y divide-gray-200'>
                            {cartItems.map((item) => {
                              const itemQty = cartItems.find((p) => p.id === item.id);
                              // Calculate total for each item
                              itemQty ? (total += item.price * qtyId(item.id)) : null;

                              return (
                                <li key={item.id} className='flex py-6'>
                                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <img src={item.images[0]} alt={item.title} className='h-full w-full object-cover object-center' />
                                  </div>

                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <h3>
                                          <Link to={item.href}>{item.title}</Link>
                                        </h3>
                                        <p className='ml-4'>${item.price * qtyId(item.id)}</p>
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500'>{item.color}</p>
                                    </div>
                                    <div className='flex flex-1 items-end justify-between text-sm'>
                                      <div className='text-gray-00 flex gap-2'>
                                        Qty :{" "}
                                        <div className='flex gap-4 border p-1'>
                                          <button onClick={() => dispatch(decreaseQty(item.id))}>
                                            <ChevronDoubleDownIcon className='w-4 h-4' />
                                          </button>
                                          {qtyId(item.id)}
                                          <button onClick={() => dispatch(increaseQty(item.id))}>
                                            <ChevronDoubleUpIcon className='w-4 h-4' />
                                          </button>
                                        </div>
                                      </div>
                                      <div className='flex'>
                                        <button onClick={() => dispatch(removeItem(item.id))} type='button' className='font-medium text-indigo-600 hover:text-indigo-500'>
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
                      <div className='mt-6'>
                        <Link to='/checkouts' onClick={() => setOpen(false)} className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                          Checkout
                        </Link>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          or
                          <button type='button' className='font-medium text-indigo-600 hover:text-indigo-500' onClick={() => setOpen(false)}>
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
