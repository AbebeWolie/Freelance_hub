import Advert from "../Components/widget/Advert";
import Category from "../Components/widget/CategoryCard";
import Hero from "../Components/widget/Hero";
import InfoCard from "../Components/widget/InfoCards";
import PricingCard from "../Components/widget/PricingCard";
import { testimonials } from "../constant/testimonal";
import { infoCards, pricinngs, upworkCategoryIcon } from "../constant";
import { useState } from "react";
import ClientTestimonialCard from "../Components/widget/ClientTestimonialCard";
import Explore from "../Components/widget/Explore";
import Footer from "../Components/widget/Footer";

const Home = () => {
    const [toggle, setToggle] = useState("hiring");

    return (
        <div>
            {/* <Hero /> */}

            {/* Categories Section */}
            <div className="p-1 md:p-4 lg:p-10">
                <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-inter font-semibold">
                        Explore millions of pros
                    </h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 p-4">
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
            <div className="flex flex-col md:flex-row justify-between p-1 md:p-14 gap-y-6 md:gap-0 bg-red-500">
                <h1 className="text-3xl font-inter bg-white flex justify-center items-center md:justify-start md:items-start">How it works</h1>
                <div
                    className="flex justify-around w-full md:w-[50%] lg:w-[30%] border 
                               border-gray-400 rounded-4xl 
                               font-inter text-xl"
                >
                    <button onClick={()=>setToggle('hiring')} className={`${toggle ==="hiring" ? " border-3 border-gray-950 w-1/2 text-center py-1 md:py-2 rounded-4xl" : " w-1/2 text-center py-1 md:py-2 border-gray-700 rounded-4xl"}`}>
                        For hiring
                    </button>
                    <button onClick={()=>setToggle('working')} className={`${toggle==="working" ? "border-3 border-gray-950 w-1/2 text-center py-1 md:py-2 rounded-4xl px-1 md:px-3": "w-1/2 text-center py-1 md:py-2 border-gray-700 rounded-2xl md:rounded-4xl"}`}>
                        For finding work
                    </button>
                </div>
            </div>

            {/* Info Cards */}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                {infoCards.map((item, index) => (
                    <InfoCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        button={item.button}
                    />
                ))}
            </div>

            {/* ADVERT SECTION */}

            <Advert />

            {/* PRICING SECTION */}

            <div className="w-[90%] mx-auto flex flex-col gap-10 relative" >
                <h1 className="flex justify-center items-center text-4xl font-inter p-10">Clients only pay after hiring</h1>
                {/* <button className=" felx justify-center items-center w-[7%] bg-black  text-white mx-auto rounded-2xl absolute right-103 top-52"> Popular</button> */}
                <div className="grid grid-cols-3 gap-4">
                    {pricinngs.map((price,index)=>(
                        <PricingCard key={index} title={price.title} plan={price.plan} description={price.description} benefits={price.benefits} button={price.button} isPopular={price.isPopular} />
                    ))}
                </div>
            </div>
{/* CLIENT TESTIMONIALS SECTION */}
            <div className="flex justify-center items-center pt-15 pb-15 ">
                <div><a href="#" className="hover:underline font-sans font-semibold text-primary">Compare all plan features</a></div>
            </div>
            <h1 className="px-10 py-5 text-2xl font-semibold font-inter text-gray-800">Real resualts from Clients</h1>
            <div className="grid grid-cols-3 p-8 gap-4">
                {testimonials.map((testimonials,index)=>(
                    <ClientTestimonialCard key={index} icon={testimonials.icon} category={testimonials.category} quote={testimonials.quote} rating={testimonials.rating} author={testimonials.author}  />
                ))}
            </div>
{/* EXPLORE SECTION */}

                <Explore />
                <Footer />


        </div>
    );
};

export default Home;
