import { AgeGroup } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/age-groups`;

const getAgeGroups = async (): Promise<AgeGroup[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getAgeGroups;