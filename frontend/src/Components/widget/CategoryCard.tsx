import React from "react";
interface ICategory{
  name:string,
  icon:React.ElementType
}

const Category:React.FC<ICategory> = ({icon:Icon,name})=>{
  return(

      <div>
        <Icon/>
        {name}
      </div>
  )
}
export default Category;