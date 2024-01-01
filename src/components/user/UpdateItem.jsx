import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { db } from "../../config/firebase";
import { doc,  updateDoc } from "firebase/firestore";

function UpdateItem({ updateProduct,setUpdateProduct, setUpdateModal }) {
  const { register, handleSubmit, reset } = useForm({defaultValues:updateProduct});
  const [progress, setProgress] = useState("Submit");

  const onSubmit = async (data) => {
    setProgress("loading...");
    try {
        await updateDoc(doc(db, "Products", updateProduct.id ), {
        productName: data.productName,
        discription: data.discription,
        price: Number(data.price),
        brand: data.brand,
        category: data.category,
        subCategory: data.subCategory,
        ratings: Number(data.ratings),
        discountPercentage: Number(data.discountPercentage),
      });

      // Reset form after successfully submitted
      setProgress("Success");
      reset();
      setUpdateProduct(null)
      setUpdateModal(false);
      } catch (e) {
      setProgress("Failed");
      console.error("Error adding document: ", e);
    }
  };


  return (
    <div className='flex z-50 overflow-auto bg-teal-700/50 mx-auto md:w-[60vw] h-[90vh] md:h-[75vh]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex mt-10 flex-wrap justify-center w-full'>
          <Input labelName='Product Name' name='productName' register={register} required={true} />
          <Input labelName='Discription' name='discription' register={register} required={true} />
          <Input labelName='Price' name='price' type='number' register={register} required={true} />
          <Input labelName='Brand' name='brand' register={register} required={true} />
          <Input labelName='Category' name='category' register={register} required={true} />
          <Input labelName='Subcategory' name='subCategory' register={register} required={true} />
          <Input labelName='Ratings' name='ratings' type='text' min='0' max='10' register={register} required={true} />
          <Input labelName='Discount percentage' name='discountPercentage' type='number' min='0' max='100' register={register} required={true} />
        </div>
        <div className='flex justify-center my-4'>
          <button type='submit' className='hover:bg-black/70 bg-teal-900 text-white border-black/70 mx-auto border py-2 px-10 h-10 rounded mb-4 '>
            {progress}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateItem;





// {

//   id: 'uNOO3r96tzaSiBH6prp9',

//   discountPercentage: 20,

//   seller: { name: 'JP', email: 'jp@mail.com' },

//   subCategory: 'Kurta',

//   ratings: 8.4,

//   discription: 'Brand new teal kurta for beautiful girl.',

//   images: [

    

//       'https://firebasestorage.googleapis.com/v0/b/e-commerce-108.appspot.com/o/images%2F1703875856234%2Fteal-ladies-kurta-1.jpg?alt=media&token=86ff1ebc-2d47-48be-9b1e-5c25d9719368', 

//       'https://firebasestorage.googleapis.com/v0/b/e-commerce-108.appspot.com/o/images%2F1703875856234%2Fteal-ladies-kurta-2.jpg?alt=media&token=5f4b8344-4829-47b4-911c-acb438b10244',

    

//       'https://firebasestorage.googleapis.com/v0/b/e-commerce-108.appspot.com/o/images%2F1703875856234%2Fteal-ladies-kurta-3.jpg?alt=media&token=7467bbf1-efc6-4c13-b0d3-e0606bede0ec',

    

//       'https://firebasestorage.googleapis.com/v0/b/e-commerce-108.appspot.com/o/images%2F1703875856234%2Fteal-ladies-kurta-4.jpg?alt=media&token=8ca186fe-79ed-4fa9-934c-f88f2b394bfc',

    

//       'https://firebasestorage.googleapis.com/v0/b/e-commerce-108.appspot.com/o/images%2F1703875856234%2Fteal-ladies-kurta-5.jpg?alt=media&token=1b298db4-fa5b-41c0-bcc2-a9e3375397c3'

//   ],

//   brand: 'silk matrix',

//   productName: 'Kurta(Teal)',

//   category: 'Women',

//   price: 899

// }
