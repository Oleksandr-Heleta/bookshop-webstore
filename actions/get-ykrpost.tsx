const URL = `${process.env.NEXT_PUBLIC_API_URL}/ukr-post`;

type queryDataType = {
  area?: string;
  city?: string;
  FindByString?: string;
};

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
  const response = await fetch(
    `${URL}/posts?city_id=${queryData.city}&postindex=${queryData.FindByString}`
  );
  const data = await response.json();
  // console.log(data.data);
  return data.data;
};
