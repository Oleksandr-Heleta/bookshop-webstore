"use client";

import {useState, useEffect} from 'react';
import PreviewModal from "@/components/preview-modal";
import SearchModal from "@/components/search-modal"; 



const ModalProvider = ()=> {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
        
    },[]);

    if(!isMounted) {
        return null;
    };

    return (
        <>
            <PreviewModal/>
            <SearchModal />
        </>
    );
};

export default ModalProvider;