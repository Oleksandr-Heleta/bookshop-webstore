import React, { useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

import {
  getCityOn as getNewCity,
  getPosts as getNewPost,
} from '@/actions/get-newpost';
import {
  getCity as getUkrCity,
  getPosts as getUkrPost,
} from '@/actions/get-ykrpost';
import { courier, novaposhta } from '@/app/(routes)/cart/components/summary';
import Select from '@/components/ui/select';
import Input from './input';

type queryDataType = {
  area?: string;
  city?: string;
  FindByString?: string;
};

interface Item {
  id: string;
  name: string;
}

interface AddressProps {
  postType: string;
  delivery: string;
  onComplete: (data: {
    city: Item | null;
    post: Item | null;
    address?: string;
  }) => void;
  errors: FieldErrors;
}

const Address: React.FC<AddressProps> = ({
  postType,
  delivery,
  onComplete,
  errors,
}) => {
  let getPosts: (queryData: queryDataType) => Promise<any[]>;
  let getCity: (query: string) => Promise<any[]>;

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
    // console.log("newPosts", newPosts);
    return newPosts;
  };
  // const handleComplete = () => {
  //   if (delivery === courier) {
  //     onComplete({ city, post: null, address });
  //   } else {
  //     onComplete({ city, post });
  //   }
  // };

  useEffect(() => {
    const handleComplete = () => {
      if (delivery === courier) {
        onComplete({ city, post: null, address });
      } else {
        onComplete({ city, post });
      }
    };

    if ((delivery !== courier && post) || (delivery === courier && address)) {
      handleComplete();
    }
  }, [city, post, address, delivery, onComplete]);

  const handleCity = (item: Item | null) => {
    // console.log("city", item);
    setCity(item);
  };

  const handlePost = (item: Item | null) => {
    // console.log("post", item);
    setPost(item);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-medium text-amber-950">
        Адреса доставки
      </div>
      <p>Населений пункт</p>
      <Select
        getFn={getCity}
        onItemSelect={handleCity}
        key={postType}
        errorName={errors.city?.message as string}
        errorId={errors.cityId?.message as string}
      />
      {delivery !== courier ? (
        <>
          {postType === novaposhta ? (
            <p>Номер відділення</p>
          ) : (
            <p>Індекс відділення</p>
          )}
          <Select
            getFn={fetchPost}
            onItemSelect={handlePost}
            key={city ? city.id : ''}
            errorName={errors.address?.message as string}
            errorId={errors.addressId?.message as string}
          />
        </>
      ) : (
        <Input
          label="Адреса"
          placeholder="Вулиця, будинок, квартира"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          errorMessage={errors.address?.message ? 'Введіть адресу' : ''}
        />
      )}
    </div>
  );
};

export default Address;
