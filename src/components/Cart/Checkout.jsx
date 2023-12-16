import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const InputElement = React.memo(({ type, name, id, className, value, onChange, placeholder = "", ...props }) => {
  return <input type={type} name={name} id={id} className={className} value={value} onChange={onChange} placeholder={placeholder} {...props} />;
});

function Checkout() {
  const [pincodeData, setPincodeData] = useState([]);
  const cartItems = useSelector((state) => state.cartSlice.data);
  const item = useSelector((state) => state.cartSlice.item);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    state: "",
    landmark: "",
    district: "",
    pincode: "",
  });

  const hasPincodeData = pincodeData && pincodeData.length > 0;

  const handleInputChange = useCallback((inputType, e) => {
    setInput((prevValues) => ({
      ...prevValues,
      [inputType]: e.target.value,
    }));
  }, []);

  useEffect(() => {
    fetch(`https://api.postalpincode.in/pincode/${input.pincode}`)
      .then((res) => {
        if (!res.status) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => (data[0].PostOffice !== undefined ? (data[0].PostOffice !== null ? setPincodeData(data[0].PostOffice) : setPincodeData([])) : setPincodeData([])))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [input.pincode]);

  const qtyId = (id) => {
    return item.filter((item) => (item._id == id ? item.qty : null))[0].qty;
  };

  useEffect(() => {
    if (!pincodeData || pincodeData.length === 0) {
      return;
    } else {
      setInput((prevValues) => ({ ...prevValues, state: pincodeData[0].State, country: pincodeData[0].Country, district: pincodeData[0].District }));
    }
  }, [pincodeData]);

  let total = 0;

  return (
    <div className='grid bg-gray-100 grid-cols-6'>
      <div className='min-h-screen col-span-6 lg:order-1  order-2 lg:col-span-4 p-6 bg-gray-100 flex items-center justify-center'>
        <div className='container max-w-screen-lg mx-auto'>
          <div>
            <h2 className='font-semibold mb-6 ml-4 text-xl text-gray-600'>Checkout</h2>

            <div className='bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6'>
              <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
                <div className='text-gray-600'>
                  <p className='font-medium text-lg'>Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className='lg:col-span-2'>
                  <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                    <div className='md:col-span-5'>
                      <label htmlFor='full_name'>Full Name</label>
                      <InputElement type='text' name='full_name' id='full_name' className='h-10 border mt-1 rounded px-4 w-full bg-gray-50' placeholder='Full Name' />
                    </div>

                    <div className='md:col-span-5'>
                      <label htmlFor='email'>Email Address</label>
                      <InputElement type='email' name='email' id='email' className='h-10 border mt-1 rounded px-4 w-full bg-gray-50' placeholder='email@domain.com' />
                    </div>

                    <div className='md:col-span-5'>
                      <label htmlFor='address'>Address / Street</label>
                      <InputElement type='text' name='address' id='address' className='h-10 border mt-1 rounded px-4 w-full bg-gray-50' placeholder='Address / Street' />
                    </div>

                    <div className='md:col-span-5'>
                      <label htmlFor='landmark'>Landmark</label>
                      <InputElement type='text' name='landmark' id='landmark' className='h-10 border mt-1 rounded px-4 w-full bg-gray-50' placeholder='Landmark' />
                    </div>

                    <div className='md:col-span-2'>
                      <label htmlFor='city'>City / Village</label>

                      {hasPincodeData ? (
                        <select name='city' id='city' className='h-10 form-select border mt-1 rounded px-4 w-full bg-gray-50' value={input.city} onChange={(e) => handleInputChange("city", e)}>
                          {pincodeData.map((data, index) => (
                            <option value={data.Name} key={index}>
                              {data.Name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <InputElement list='pincodeData' name='city' id='city' className='h-10 form-select border mt-1 rounded px-4 w-full bg-gray-50' placeholder='City / Village' value={input.city} onChange={(e) => handleInputChange("city", e)} />
                      )}
                    </div>

                    <div className='md:col-span-3'>
                      <label htmlFor='district'>District</label>
                      <div className='h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                        <InputElement type='text' name='district' id='district' placeholder='District' className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent' value={input.district} onChange={(e) => handleInputChange("district", e)} />
                      </div>
                    </div>

                    <div className='md:col-span-2'>
                      <label htmlFor='country'>Country</label>
                      <div className='h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                        <InputElement type='text' name='country' id='country' placeholder='Country' className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent' value={input.country} onChange={(e) => handleInputChange("country", e)} />
                      </div>
                    </div>

                    <div className='md:col-span-2'>
                      <label htmlFor='state'>State</label>
                      <div className='h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                        <InputElement type='text' name='state' id='state' placeholder='State' className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent' value={input.state} onChange={(e) => handleInputChange("state", e)} />
                      </div>
                    </div>

                    <div className='md:col-span-1'>
                      <label htmlFor='pincode'>Pincode</label>
                      <InputElement onChange={(e) => handleInputChange("pincode", e)} value={input.pincode} type='text' name='pincode' id='pincode' className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50' placeholder='Pincode' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-6 lg:col-span-2 max-h-screen overflow-auto order-1 p-12 lg:order-2 bg-white flex-col items-center'>
        <div className='max-w-screen mx-auto'>
          <ul role='list' className='w-full'>
            {cartItems.map((item) => {
              const itemQty = cartItems.find((p) => p.id === item.id);
              // Calculate total for each item
              itemQty ? (total += item.price * qtyId(item.id)) : null;

              return (
                <li key={item.id} className='flex py-8'>
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
                        <button onClick={() => dispatch(removeItem(item.id))} type='button' className='font-medium text-blue-950 hover:text-blue-800'>
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

      <div className='border-t container max-w-screen grid lg:grid-cols-6 col-span-6 order-3 p-6 bg-white border-gray-200 px-4 py-6 sm:px-6'>
        <div className='container lg:col-span-4 mx-auto max-w-xl'>
          <div className='flex justify-between text-base font-medium  text-gray-900'>
            <p>Subtotal</p>
            <p>${total}</p>
          </div>

          <p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
          <div className='mt-6'>
            <Link to='#' className='flex items-center justify-center rounded-md border border-transparent bg-blue-950 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-800'>
              Checkout
            </Link>
          </div>
          <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
            <p>
              or
              <button type='button' className='font-medium px-2 text-blue-950 hover:text-blue-800' onClick={() => setOpen(false)}>
                Continue Shopping
                <span aria-hidden='true'> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
