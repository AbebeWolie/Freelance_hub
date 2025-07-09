import Category from "../Components/widget/CategoryCard";
import Hero from "../Components/widget/Hero";
import {upworkCategoryIcon} from '../constant'

const Home = ()=>{
    return(
        <div>
            <Hero />
            {upworkCategoryIcon.map((item,index)=>(
                 <Category key={index} name={item.name} icon={item.icon} />
            ))}
           
        </div>
    )
}
export default Home;