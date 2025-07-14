import { ReactElement } from "react";

interface IAuthor{
  name:string;
  role:string;
  date:Date;
  avatar:string;
}

interface ITestimonial{
  icon:ReactElement;
  category:string;
  quote:string;
  rating:ReactElement;
  author:IAuthor
}

const ClientTestimonialCard:React.FC<ITestimonial> = ({icon,category,quote,rating,author})=>{
  return(
    <div>
      {icon}
      {category}
      {quote}
     
    </div>
  )
}