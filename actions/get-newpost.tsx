import axios from "axios";
export const novaPoshtaApi = axios.create({
  baseURL: "https://api.novaposhta.ua/v2.0/json/",
});

const apiKeyNP = `0b9148efd708cee76617577c7575085c`;

type queryDataType = {
  area?: string;
  city?: string;
  FindByString?: string;
};



export const getCityOn = async (query:string) => {
  try {
    const body: {
      apiKey: string;
      modelName: string;
      calledMethod: string;
      methodProperties: {
        CityName: string;
        Limit: string;
        Page: string;
      };
    } = {
      apiKey: apiKeyNP,
      modelName: "AddressGeneral",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: query || "",
        Limit: "150",
        Page: "1",
      },
    };
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    // console.log(data.data[0].Addresses);
    return data.data[0].Addresses.map((city: { DeliveryCity : string; Present: string }) => ({
      id: city.DeliveryCity,
      name: city.Present,
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getPosts = async (queryData: queryDataType) => {
  try {
    const body: {
      apiKey: string;
      modelName: string;
      calledMethod: string;
      methodProperties: {
        CityRef: string;

        Limit: string;
        Language: string;
        FindByString: string;
      };
    } = {
      apiKey: apiKeyNP,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: queryData.city || "Київ",

        Limit: "100",
        Language: "UA",
        FindByString: queryData.FindByString || "",
      },
    };
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data.data.map((post: { Ref: string; Description: string }) => ({
      id: post.Ref,
      name: post.Description,
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
};
