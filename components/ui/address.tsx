import React, { useState, useEffect } from 'react';
import Select from '@/components/ui/on-adress';
import { getPosts, getCityOn } from '@/actions/get-newpost';

interface Item {
    id: string;
    name: string;
  }

const Address: React.FC = () => {
  const [city, setCity] = useState<Item | null>(null);
  const [post, setPost] = useState<Item | null>(null);

  const fetchPost = async (FindByString: string) => {
    if (!city) return [];
    const body = { city: city.id, FindByString };
    const newPosts = await getPosts(body);
    return newPosts;
  };

  const handleCity = (item: Item| null) => {
    setCity(item);
    
  };

  const handlePost = (item: Item | null) => {
    setPost(item);
  };

  
  return (
    <div className='flex flex-col gap-3'>
      <Select getFn={getCityOn} onItemSelect={handleCity} />
      <Select getFn={fetchPost} onItemSelect={handlePost} key={city ? city.id : ''} />
    </div>
  );
};

export default Address;