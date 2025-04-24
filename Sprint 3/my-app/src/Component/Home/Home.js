
import Slider from '../Slider/Slider';
import CartView from '../ViewCart/CartView';



const Home = ({handleAddToCart}) => {
    
    return (
        <div >
            <Slider />       
            <CartView handleAddToCart={handleAddToCart} />
            
        </div>
    );
};

export default Home;