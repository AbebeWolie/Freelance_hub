import { FaReact } from "react-icons/fa";
const Advert = ()=>{
  return(
    <div className="p-1 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between  bg-[#111] md:rounded-2xl text-white font-sans px-8 md:px-12 py-10 md:py-20">
        <div className="w-full md:w-1/2 flex gap-y-6 flex-col sm:full"> 
          <h1 className="text-2xl md:text-5xl font-sans leading-tight font-bold">Get insights into
             freelancer pricing
          </h1>
          <p className="text-lg text-gray-300 font-sans">We’ll calculate the average cost for freelancers with the skills <br />
            you need.
          </p>
          <form action="" className="bg-background text-black lg:w-[95%] md:w-full rounded-3xl relative pb-5">
              <input className="w-full text-black p-3 pb-12 focus:outline-none" type="text" placeholder="To start,describe what you need to deone." />
              <div className="bg-black text-white w-[20%] rounded-3xl p-2 absolute bottom-2 right-2">
                <button className="flex justify-between items-center w-full px-2">
                  <span>NEXT</span> 
                  <FaReact className="animate-spin-slow" />     
                </button>
              </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2 bg-red-500">
        </div>
      </div>
    </div>
  )
}

export default Advert;

