import React, { useEffect, useState } from 'react';
import Selector from './select';
import { getPosts, getArea,  getCity} from '@/actions/get-newpost';

type DataType = {
    value: string;
    name: string;
  };
  
  type DataArray = DataType[];

const Address: React.FC = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [posts, setPosts] = useState([]);

    const [area, setArea] = useState({value: '', name: ''});
    const [city, setCity] = useState({value: '', name: ''});
    const [post, setPost] = useState({value: '', name: ''});

    useEffect(() => {
        const fetchArea = async () => {
            try {
                const newAreas = await getArea();
                console.log(newAreas);
                setAreas(newAreas);
            } catch (error) {
                console.error('Error fetching address:', error);
            } 
        };
        const fetchCity = async () => {
            try {
                const newCities = await getCity({area: area.value});
                setCities(newCities);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };
        const fetchPost = async () => {
            try {
                const newPosts = await getPosts({city: city.name});
                setPosts(newPosts);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        !area.value && fetchArea();
        area.value && !city.name && fetchCity();
        city.name && !post.name && fetchPost();
    }, [area, city]);

    const handelArea = (item: DataType) => {
        setArea(item);
    };
    const handelCity = (item: DataType) => {    
        setCity(item);
    };
    const handelPost = (item: DataType) => {
        setPost(item);
    };

   console.log('rerender cities',area,  cities)
    return (
        <div className='flex flex-col gap-3'>
            <Selector items={areas as DataArray} onSelected={handelArea} />
            <Selector items={cities as DataArray} onSelected={handelCity}/>
            <Selector items={posts as DataArray} onSelected={handelPost}/>
        </div>
    );
};

export default Address;