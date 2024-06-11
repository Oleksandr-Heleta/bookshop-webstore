import axios from 'axios';

const query_type = 'GET'; // replace with your HTTP method: 'GET', 'POST', 'PUT', 'DELETE', etc.
const bearer_Uuid = '5dcdb7bf-5690-403f-a21e-53e23f1c2bac'; // replace with your bearer token
const app_name = 'address-classifier-ws'; // replace with your app name


const performRequest = async (request: string) => {
  try {
    const response = await axios({
      method: query_type,
      url: `https://www.ukrposhta.ua/${app_name}/${request}`,
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

export const getCity = async (city: any) => {
    const request = `get_city_by_name?city_name=
    ${city}&lang=UA&fuzzy=1`;
    const response = await performRequest(request);
    console.log(response);
  return [{
    id: "city.DeliveryCityID",
    name: "city.PresentCityName",
  }];
};

export const getPosts = async (city: any) => {
    const request = `get_city_by_region_id_and_district_id_and_city_ua?city_ua=${city}`;
  return await performRequest(request);
};