import React, { useState, useEffect } from 'react';
import Select from '@/components/ui/select';
import { getPosts as getNewPost, getCityOn as getNewCity } from '@/actions/get-newpost';
import { getPosts as getUkrPost, getCity as getUkrCity } from '@/actions/get-ykrpost';
import { courier, novaposhta } from '@/app/(routes)/cart/components/summary';
import Input from './input';


interface Item {
    id: string;
    name: string;
  }

  interface AddressProps {
    postType: string;
    delivery: string;
    onComplete: (data: { city: Item | null; post: Item | null; address?: string }) => void;
  }

const Address: React.FC<AddressProps> = ({ postType, delivery, onComplete }) => {

  let getPosts, getCity;
if (postType === novaposhta) {
   getPosts = getNewPost;
   getCity = getNewCity;
} else {
  getPosts = getUkrPost;
  getCity = getUkrCity;
}

  const [city, setCity] = useState<Item | null>(null);
  const [post, setPost] = useState<Item | null>(null);
  const [address, setAddress] = useState('');

  const fetchPost = async (FindByString: string) => {
    if (!city) return [];
    const body = { city: city.id, FindByString };
    const newPosts = await getPosts(body);
    return newPosts;
  };
  const handleComplete = () => {
    if (delivery === courier) {
      onComplete({ city, post: null, address });
    } else {
      onComplete({ city, post });
    }
  };

  useEffect(() => {
    if ((delivery !== courier && post) || (delivery === courier && address)) {
      handleComplete();
    }
  }, [post, address, delivery]);

  const handleCity = (item: Item| null) => {
    setCity(item);
    
  };

  const handlePost = (item: Item | null) => {
    setPost(item);
  };

  
  return (
    <div className='flex flex-col gap-3'>
       <div className="text-base font-medium text-gray-900">Адреса доставки</div>
      <p>Місто</p>
      <Select getFn={getCity} onItemSelect={handleCity} key={postType}/>
      {(delivery !== courier) ? <>
      <p>Відділення</p>
      <Select getFn={fetchPost} onItemSelect={handlePost} key={city ? city.id : ''} />
      </> : <Input label='Адреса' placeholder='Вулиця, будинок, квартира' value={address}
          onChange={(e) => setAddress(e.target.value)}  />}
    </div>
  );
};

export default Address;