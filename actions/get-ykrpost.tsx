import axios from 'axios';

const query_type = 'GET'; // replace with your HTTP method: 'GET', 'POST', 'PUT', 'DELETE', etc.
const bearer_Uuid = '8f0ceccf-1680-36c6-b077-f083711da047'; // replace with your bearer token
const app_name = 'address-classifier-ws'; // replace with your app name
const proxy_url = 'https://www.ukrposhta.ua';
const URL = `${process.env.NEXT_PUBLIC_API_URL}/ykrpost`;

type queryDataType = {
  area?: string;
  city?: string;
  FindByString?: string;
};


const performRequest = async (request: string) => {
  try {
    const response = await axios({
      method: query_type,
      url: `${proxy_url}/${app_name}/${request}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer_Uuid}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getCity = async (query: string) => {
    // const request = `get_city_by_name?city_name=
    // ${query}&lang=UA&fuzzy=1`;
    // const response = await performRequest(request);
    const response = await fetch(`${URL}/cities?cityNamePart=${query}`);
    const data = await response.json();
    // console.log(data.data);
  return data.data;
};

export const getPosts = async (queryData: queryDataType) => {
  const response = await fetch(`${URL}/posts?city_id=${queryData.city}&postindex=${queryData.FindByString}`);
  const data = await response.json();
  // console.log(data.data);
return data.data;
};