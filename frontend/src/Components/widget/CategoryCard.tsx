import React from "react";
interface ICategory{
  name:string,
  icon:React.ElementType
}

const Category:React.FC<ICategory> = ({icon:Icon,name})=>{
  return(

      <div className="flex flex-col justify-center shadow-2xl 
      rounded-2xl p-4 sm:p-6 md:p-7 hover:border hover:border-gray-400 transition text-base sm:text-lg md:text-xl
      font-inter"
      >
        <Icon className="mb-4 sm:mb-6 tx size-10 text-primary"/>
        {name}
      </div>
  )
}
export default Category;