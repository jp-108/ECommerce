import React from 'react'

function Input({labelName, name, register, type="text", required=false, min, max, multiple, className=""}) {
  return (
    <div className='m-4'>
        <label className='block'>{labelName}:</label>
        <input type={type} className={`md:w-[25vw] rounded border-black/40 bg-transparent p-2 border ${className} ${type==="file"?"h-12":"h-7"}`} {...register(name, { required, min, max})} multiple={multiple}/>
    </div>
  )
}

export default Input