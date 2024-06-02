import axios from "axios";
export const novaPoshtaApi = axios.create({
  baseURL: "https://api.novaposhta.ua/v2.0/json/",
});

const apiKeyNP = `0b9148efd708cee76617577c7575085c`;

type queryDataType = {
  area?: string;
  city?: string;
  FindByStrin?: string;
};

export const getArea = async () => {
  try {
    const body: {
      apiKey: string;
      modelName: string;
      calledMethod: string;
      methodProperties: {};
    } = {
      apiKey: apiKeyNP,
      modelName: "AddressGeneral",
      calledMethod: "getAreas",
      methodProperties: {},
    };
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    console.log(data.data);
    return data.data.map((area: { Ref: string; Description: string }) => ({
      value: area.Ref,
      name: area.Description,
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCity = async (queryData: queryDataType) => {
  try {
    const body: {
      apiKey: string;
      modelName: string;
      calledMethod: string;
      methodProperties: {
        Warehouse: string;
        Area: string;
        Limit: string;
        Language: string;
        FindByStrin: string;
      };
    } = {
      apiKey: apiKeyNP,
      modelName: "AddressGeneral",
      calledMethod: "getSettlements",
      methodProperties: {
        Area: queryData.area || "",
        Warehouse: "1",
        Limit: "",
        Language: "UA",
        FindByStrin: queryData.city || "",
      },
    };
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data.data.map((city: { Ref: string; Description: string }) => ({
      value: city.Ref,
      name: city.Description,
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCityOn = async (queryData: queryDataType) => {
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
        CityName: queryData.city || "",
        Limit: "150",
        Page: "1",
      },
    };
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    console.log(data.data[0].Addresses);
    return data.data[0].Addresses.map((city: { Ref: string; Present: string }) => ({
      id: city.Ref,
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
        CityName: string;

        Limit: string;
        Language: string;
        FindByStrin: string;
      };
    } = {
      apiKey: apiKeyNP,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: queryData.city || "Київ",

        Limit: "",
        Language: "UA",
        FindByStrin: queryData.FindByStrin || "",
      },
    };
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data.data.map((post: { Ref: string; Description: string }) => ({
      value: post.Ref,
      name: post.Description,
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
};
