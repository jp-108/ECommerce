import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";

function AddItem({ setToggleModal }) {
  const { register, handleSubmit, reset } = useForm();
  const [progress, setProgress] = useState("Submit");
  const newId = Date.now();
  const userData = useSelector((state) => state.authSlice.userData);

  //   console.log(newId)

  const onSubmit = async (data) => {
    setProgress("loading...");
    try {
      const storageRef = ref(storage, `images/${newId}/`);

      // Upload all images to Firebase Storage
      await Promise.all(
        Array.from(data.images).map(async (file, index) => {
          const fileRef = ref(storageRef, file.name);
          await uploadBytes(fileRef, file);
        })
      );

      // Retrieve download URLs for all images
      const images = await Promise.all(
        Array.from(data.images).map(async (file) => {
          const imageRef = ref(storageRef, file.name);
          const downloadUrl = await getDownloadURL(imageRef);
          return downloadUrl;
        })
      );

      const docRef = await addDoc(collection(db, "Products"), {
        productName: data.productName,
        discription: data.discription,
        price: Number(data.price),
        brand: data.brand,
        category: data.category,
        subCategory: data.subCategory,
        ratings: Number(data.ratings),
        discountPercentage: Number(data.discountPercentage),
        imageRefId:newId,
        images: images,
        seller: {
          name: userData.username,
          email: userData.email,
        },
      });

      // Reset form after successfully submitted
      setProgress("Success");
      reset();
      setToggleModal(false);
      console.log("Document written with ID: ", docRef.id);
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
          <Input
            labelName='Images'
            name='images'
            className='file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
            type='file'
            required={true}
            register={register}
            multiple={true}
          />
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

export default AddItem;
