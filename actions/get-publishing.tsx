import { Publishing } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/publishings`;

const getPublishings = async (): Promise<Publishing[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getPublishings;