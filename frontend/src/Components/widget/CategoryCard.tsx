import React from "react";
interface ICategory{
  name:string,
  icon:React.ElementType
}

const Category:React.FC<ICategory> = ({icon:Icon,name})=>{
  return(

      <div className="flex flex-col justify-center bg-white shadow-2xl 
      rounded-2xl p-7 hover:border hover:border-gray-400 transition text-2xl
      font-inter"
      >
        <Icon className="mb-7 size-10 text-primary"/>
        {name}
      </div>
  )
}
export default Category;