
import Product from './Product'
import { useState, useEffect, useContext } from 'react';
// import contents from './Contents';
import { CartContext } from '../CartContext'
const url = 'Data.json'
const Products = () => {

    const [contents, setContents] = useState([]);

    useEffect(() => {
        fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

        )
            .then(response => {
                return response.json();
            })
            .then(contents => {
                setContents(contents);
            });
    }, []);

    const { name } = useContext(CartContext);


    return (
        <div className="container mx-auto pb-24">

            <h1 className="text-lg font-bold my-8">Products{name}</h1>
            <div className="grid grid-cols-5 my-8 gap-24">

                {
                    contents.map((content) => {//we are using map so that we can get every element from the content or we can say we can loop through every element
                        return (<Product name={content.name} img={content.img} price={content.price} _id={content._id} key={content._id} />)
                    })
                }



            </div>
        </div>

    )
}

export default Products