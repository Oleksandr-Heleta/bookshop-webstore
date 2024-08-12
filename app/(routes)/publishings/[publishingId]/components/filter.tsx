"use client";

import qs from "query-string";
import { AgeGroup, Category, Publishing } from "@/type";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
    data:(Publishing | AgeGroup | Category)[];
    name: string;
    valueKey: string;
};

const Filter: React.FC<FilterProps> = ({
    data,
    name,
    valueKey,
}) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const selectValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id,
        };

        if(current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipNull: true });

        router.push(url);
    }

    return(
        <div className="mb-8">
            <h3 className="font-semibold text-lg text-amber-950">{name}</h3>
            <hr className="my-4 border-amber-800"/>
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button 
                            className={cn(
                                "rounded-md text-sm text-amber-950 p-2 bg-inherit border border-amber-800",
                                selectValue === filter.id && "bg-amber-950 text-white"
                            )}
                            onClick={() => onClick(filter.id)}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
           
        </div>
    )
};

export default Filter;