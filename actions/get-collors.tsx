import { Collor } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/collors`;

const getCollors = async (): Promise<Collor[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getCollors;