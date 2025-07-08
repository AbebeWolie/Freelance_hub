import { FiSearch } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center text-white">
      <div
        className="w-full h-full md:h-[90%] md:w-[85%] lg:rounded-3xl 
                   bg-[url('../../../src/assets/hero.jpg')] bg-center bg-cover"
      >
        <div className='py-[13%]'>
          <div className="p-6 mt-2">
            <h1 className="text-white text-6xl font-inter">
              Connecting clients in <br /> need to freelancers <br /> who deliver
            </h1>
          </div>

          <div className="p-6">
            <form className=" relative text-1xl w-1/2 " action="">
              <input
                className="w-full bg-background text-black rounded-4xl px-7 py-4"
                type="text"
                placeholder="Search by role, skill, or keywords"
              />
                <button
                 className="absolute top-[-20%] right-1.5 flex justify-around items-center gap-2 font-semibold 
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