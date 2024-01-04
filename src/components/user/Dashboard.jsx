import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import UpdateItem from "./UpdateItem";
import { db, storage } from "../../config/firebase";
import { collection, doc, onSnapshot, query, where, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function Dashboard() {
  const [toggleModal, setToggleModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null)
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("ratings");


  const deleteItems = async (id, images) => {
    try {
      images.forEach(async (image) => {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef);
      });
      await deleteDoc(doc(db, "Products", id));
      console.log("delete Success");
    } catch (error) {
      console.log(error);
    }
  };

  
  const updateItem = (product)=>{
    setUpdateProduct(product)
    setUpdateModal(true)
  }

  const closeUpdateModal = ()=>{
    setUpdateModal(false)
    setUpdateProduct(null)
  }
  
  useEffect(() => {
    if (filter === 'All') {
      const unsubscribe = onSnapshot(collection(db, 'Products'), (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe(); // Cleanup function
    } else {
      const q = query(collection(db, 'Products'), where('category', '==', filter));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe(); // Cleanup function
    }
  }, [filter]);

  const sortedData = sort === "price" ? data.slice().sort((a, b) => a.price - b.price) : sort === "price-desc" ? data.slice().sort((a, b) => b.price - a.price) : sort === "ratings" ? data.slice().sort((a, b) => b.ratings - a.ratings) : data.slice();

  return (
    <div className='flex md:justify-center mb-10'>
      <div className={`fixed top-0 z-40 overflow-hidden items-center h-screen w-screen ${toggleModal ? "flex" : "hidden"}`}>
        <div onClick={() => setToggleModal(false)} className={`absolute h-full w-full top-0  backdrop-blur bg-black/25 justify-center`}></div>
        <AddItem setToggleModal={setToggleModal} />
      </div>
      <div className={`fixed top-0 z-40 overflow-hidden items-center h-screen w-screen ${updateModal ? "flex" : "hidden"}`}>
        <div onClick={closeUpdateModal} className={`absolute h-full w-full top-0  backdrop-blur bg-black/25 justify-center`}></div>
    {updateProduct && <UpdateItem updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} setUpdateModal={setUpdateModal} /> }
      </div>
      <div className='md:mx-48  mt-10'>
        <div className='flex my-2 flex-wrap'>
          <button className='border p-2 rounded' onClick={() => setToggleModal(true)}>
            Add Product
          </button>
          <div className='flex items-center gap-1 mx-2 px-2'>
            <label htmlFor='filter'>Filter By:</label>
            <select className='border p-1' name='filter' id='filter' onChange={(e) => setFilter(e.target.value)}>
              <option defaultValue='All'>All</option>
              <option value='Mens'>Mens</option>
              <option value='Women'>Women</option>
              <option value='Shoes'>Shoes</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>
          <div className='flex items-center gap-1 mx-2 px-2'>
            <label htmlFor='filter'>Sort By:</label>
            <select className='border p-1' name='filter' id='filter' onChange={(e) => setSort(e.target.value)}>
              <option defaultValue=''>Default</option>
              <option value='price'>Sorting by Price:Low to High</option>
              <option value='price-desc'>Sorting by Price:High to Low</option>
              <option value='ratings'>Top Rated</option>
            </select>
          </div>
        </div>

        <div className='bg-gray-100 md:w-[80vw] w-screen h-[70vh] overflow-auto'>
          <table className='table-auto border border-slate-500 w-full'>
            <thead className='border border-slate-600'>
              <tr className='sticky top-0 bg-slate-200'>
                <th className='border border-slate-600'>Sr no.</th>
                <th className='border border-slate-600'>Product Name</th>
                <th className='border border-slate-600'>Thumbnail</th>
                <th className='border border-slate-600'>Brand</th>
                <th className='border border-slate-600'>Category</th>
                <th className='border border-slate-600'>Subcategory</th>
                <th className='border border-slate-600'>Price</th>
                <th className='border border-slate-600'>Ratings</th>
                <th className='border border-slate-600'>Actions</th>
              </tr>
            </thead>
            <tbody className=''>
              {sortedData.map((product, index) => (
                <tr key={product.id} className='text-center'>
                  <td className='border border-slate-600'>{index + 1}</td>
                  <td className='border border-slate-600'>{product.productName}</td>
                  <td className='border border-slate-600 margin-auto'>
                    <img className='w-20 h-20 mx-auto my-1' src={product.images[0]} alt='' />
                  </td>
                  <td className='border border-slate-600'>{product.brand}</td>
                  <td className='border border-slate-600'>{product.category}</td>
                  <td className='border border-slate-600'>{product.subCategory}</td>
                  <td className='border border-slate-600'>₹{product.price}</td>
                  <td className='border border-slate-600'>{product.ratings}</td>
                  <td className='border border-slate-600'>
                    <button onClick={()=>updateItem(product)} className='border py-1 px-2 flex items-center w-24 mx-auto my-1 bg-yellow-600/75 rounded'>
                      <PencilIcon className='w-4 h-4 mx-1' />
                      Update
                    </button>
                    <button onClick={() => deleteItems(product.id, product.images)} className='border flex items-center w-24 py-1 px-2 mx-auto my-1 rounded bg-red-700/75'>
                      <TrashIcon className='w-4 h-4 mx-1' />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
