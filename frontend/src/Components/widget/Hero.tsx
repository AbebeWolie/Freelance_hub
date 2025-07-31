import { FiSearch } from 'react-icons/fi';

const Hero = () => {
  return (
    // h-[100vh] w-[100vw]
    <div className="min-h-screen w-full flex justify-center items-center text-white">
      <div
        className="w-full h-full md:h-[90%] md:w-[85%] lg:rounded-3xl 
                   bg-[url('../../../src/assets/hero3.jpg')] bg-cover relative bg-center md:bg-[position:60%_center]"
      >
        <div className="absolute inset-0 bg-black/40 rounded-3xl z-0" />
        {/* py-[13%] */}
        <div className=' py-24 relative z-10 text-white p-8'>
          <div className="p-6 mt-2">
            <h1 className="text-white text-4xl md:text-6xl font-inter">
              Connecting clients in <br /> need to freelancers <br /> who deliver
            </h1>
          </div>

          <div className="p-6">
            {/* w-1/2 */}
            <form className=" relative text-1xl  w-full max-w-xl " action="">
              <input
                className="w-full bg-background text-black rounded-4xl px-7 py-4"
                type="text"
                placeholder="Search by role, skill, or keywords"
              />
                <button
                // top-[-20%]
                 className="absolute top-1/2 -translate-y-1/2 right-1.5 flex justify-around items-center gap-2 font-semibold 
                                bg-black px-4 py-2 rounded-2xl mt-4 "
                    >
                    <FiSearch size={30} />
                    Search
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;