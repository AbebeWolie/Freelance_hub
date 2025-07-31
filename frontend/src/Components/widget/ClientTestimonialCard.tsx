import { ReactElement } from "react";

interface IAuthor{
  name:string;
  role:string;
  date:string|Date;
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
    <div className="flex flex-col shadow shadow-gray-300 transition p-8 border border-gray-200 rounded-2xl">
     <div className="flex">
        <h3 className="flex justify-center items-center p-1.5">{icon}</h3>
        <h3 className="flex justify-center items-center p-1.5">{category}</h3>
     </div>
      <div className="mb-11">
        "{quote}"
        {rating}
      </div>
      <div className=" flex mt-2.5 justify-between">
        <div className="flex flex-col justify-center">
          <h1>Worked done by {author.name}</h1>
          <p>{author.role}</p> 
          <p>{new Date(author.date).toLocaleDateString()}</p>
        </div>
        <img className="rounded-[50%] border border-gray-300 size-20" src={author.avatar} alt={author.name} />
      </div>
    </div>
  )
}

export default ClientTestimonialCard;