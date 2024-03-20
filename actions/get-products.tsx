import { Product } from "@/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    ageGroupId?: string;
    publishingId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query:Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            publishingId: query.publishingId,
            ageGroupId: query.ageGroupId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
        },
    })
    
    const res = await fetch(url);

    return res.json();
};

export default getProducts;