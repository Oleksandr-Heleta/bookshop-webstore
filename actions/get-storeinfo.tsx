import { Info } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/info`;

const getStoreInfo = async (): Promise<Info> => {
    const res = await fetch(URL);

    return res.json();
};

export default getStoreInfo;