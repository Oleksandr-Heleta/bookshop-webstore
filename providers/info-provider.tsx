"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

import getStoreInfo from "@/actions/get-storeinfo";
import { Info } from "@/type";

const InfoContext = createContext<Info | null>(null);

export const InfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
       
        const response = await getStoreInfo();
        setInfo(response);
      } catch (error) {
        console.error("Не вдалося отримати інформацію про магазин", error);
      }
    };

    fetchInfo();
  }, []);

  return (
    <InfoContext.Provider value={info}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);