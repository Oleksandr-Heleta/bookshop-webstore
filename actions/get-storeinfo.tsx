import { Info } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/info`;

const getStoreInfo = async (): Promise<Info> => {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        } else if (!res.headers.get("content-type")?.includes("application/json")) {
            throw new Error("Not a JSON response");
        }
        const data: Info = await res.json();
        // Optionally, validate `data` further to match `Info` type
        return data;
    } catch (error) {
        console.error(error);
        // Consider more nuanced error handling here
        return {
            id: "string",
            name: "string",
            sale: 0,
            mainbillboards: [{
                id: "string",
                label: "string",
                imageUrl: '/logo.png'
            }],
        };
    }
};

export default getStoreInfo;