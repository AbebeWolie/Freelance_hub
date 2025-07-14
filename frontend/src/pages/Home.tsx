import Category from "../Components/widget/CategoryCard";
import Hero from "../Components/widget/Hero";
import InfoCard from "../Components/widget/InfoCards";
import { infoCards, upworkCategoryIcon } from "../constant";
import { useState } from "react";

const Home = () => {
    const [toggle, setToggle] = useState("hiring");

    return (
        <div>
            <Hero />

            {/* Categories Section */}
            <div className="p-10">
                <div className="p-6">
                    <h1 className="text-3xl font-inter font-semibold">
                        Explore millions of pros
                    </h1>
                </div>
                <div className="grid grid-cols-5 gap-7 p-4">
                    {upworkCategoryIcon.map((item, index) => (
                        <Category
                            key={index}
                            name={item.name}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Info Header */}
            <div className="flex justify-between p-14">
                <h1 className="text-3xl font-inter">How it works</h1>
                <div
                    className="flex justify-around w-[30%] border 
                               border-gray-400 rounded-4xl 
                               font-inter text-xl"
                >
                    <button onClick={()=>setToggle('hiring')} className={`${toggle ==="hiring" ? " border-3 border-gray-950 w-1/2 text-center py-2 rounded-4xl" : " w-1/2 text-center py-2 border-gray-700 rounded-4xl"}`}>
                        For hiring
                    </button>
                    <button onClick={()=>setToggle('working')} className={`${toggle==="working" ? "border-3 border-gray-950 w-1/2 text-center py-2 rounded-4xl px-3": "w-1/2 text-center py-2 border-gray-700 rounded-4xl"}`}>
                        For finding work
                    </button>
                </div>


            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4 p-4">
                {infoCards.map((item, index) => (
                    <InfoCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        button={item.button}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
