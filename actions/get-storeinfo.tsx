import { Info } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/info`;

const getStoreInfo = async (): Promise<Info> => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else if (!res.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Not a JSON response');
    }
    const data = await res.json();
    const info: Info = data.data;
    // Optionally, validate `data` further to match `Info` type
    return info;
  } catch (error) {
    console.error(error);
    // Consider more nuanced error handling here
    return {
      id: 'string',
      name: 'string',
      sale: 0,
      mainbillboards: [
        {
          id: 'string',
          label: 'string',
          imageUrl: '/baner.jpg',
        },
      ],
    };
  }
};

export default getStoreInfo;
