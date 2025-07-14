import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
interface IPricingCard{
  title:string;
  plan:string;
  description:string;
  benefits:string[];
  button:string;
}

const PricingCard:React.FC<IPricingCard> = ({title,plan,description,benefits,button})=>{
  const [hover , setHover] = useState(false);
  return(
    <div onMouseEnter={()=>setHover(true)}onMouseLeave ={()=>setHover(false)} className="p-12 shadow-2xl rounded-2xl shadow-gray-400 transition hover:border-[0.5px] border-primary">
      <div className="flex flex-col gap-7">
        <div>
          <h3>{title}</h3>
          <h1 className="text-2xl font-semibold">{plan}</h1>
        </div>
        <p>{description}</p>
        <div className="flex flex-col gap-4">
          {benefits.map((benefits,index)=>(
            <p key={index} className="flex gap-3 items-center "><FiCheck className="min-w-[20px] text-xl font-bold text-black mt-[2px]" /> {benefits}</p>
          ))}
        </div>
        <button className={`${hover? "bg-primary text-white font-sans font-semibold border-2 border-primary rounded py-2":"text-primary font-sans font-semibold border-2 border-primary rounded py-2"}`}>{button}</button>
      </div>
    </div>
  )
}
export default PricingCard;