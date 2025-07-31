import React from "react";
interface IInfoCard{
    title:string;
    description:string;
    button:string
}

const InfoCard:React.FC<IInfoCard> = ({title, description,button})=>{
    return(
        <div className="border-black p-5">
            <div>
                <div className="rounded-2xl bg bg-[url('../../../src/assets/infoImage.jpg')] bg-cover bg-center h-48 md:h-64 lg:h-72 w-full">
                </div>  
                <div className="flex justify-around flex-col mt-6 p-2">
                    <h1 className="text-2xl font-semibold font-inter py-1.5">{title}</h1>
                    <p className="py-1.5">{description}</p>
                    <button className="bg-primary w-full rounded-md p-2 text-white font-semibold font-inter">{button}</button>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;