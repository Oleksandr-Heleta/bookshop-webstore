"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Input from "@/components/ui/input";
import RadioInput from "@/components/ui/radio-input";
import Image from "next/image";
import { getArea } from "@/actions/get-newpost";

import * as z from "zod";
import Selector from "@/components/ui/select";
import Address from "@/components/ui/address";
import Select from "@/components/ui/on-adress";

const phoneRegex = /^\+380\d{9}$/;

export const formSchema = z.object({
  name: z.string().min(1),
  orderStatus: z.string().min(1),
  orderState: z.string().min(1),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message: "Телефон повинен бути у форматі +380000000000",
  }),
  address: z.string().min(1),
  // orderItems: z.array(orderItemSchema),
  isPaid: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const [isChecked, setIsChecked] = useState("new-post");

  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      orderStatus: "",
      orderState: "",
      isPaid: false,
      phone: "+380",
      address: "",
    },
    resolver: zodResolver(formSchema),
  });

 
  const { errors } = formState;

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Сплачено");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Щось пішло не за планом");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    const price = item.product.isSale
      ? item.product.price - (item.product.price * item.product.sale) / 100
      : item.product.price;
    return total + price * item.quantity;
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.productId),
      }
    );

    window.location = response.data.url;
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.value);
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Замовлення</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Загалом</div>
          <Currency value={totalPrice} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <Input
              {...register("name", { required: "Поле є обов'язковим" })}
              className="block flex-1 border-1 rounded-full bg-white w-full py-1.5 pl-2 text-gray-900 shadow-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              label="П.І.Б."
              errorMessage={errors.name?.message}
            />
            <Input
              {...register("phone", { required: "Поле є обов'язковим" })}
              className="block flex-1 border-1 rounded-full bg-white w-full py-1.5 pl-2 text-gray-900 shadow-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              label="Телефон"
              type="tel"
              value={"+380"}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="flex ">
            <RadioInput
              imageSrc="/novap.jpg"
              className=""
              label="Нова пошта"
              name="delivery"
              value="new-post"
              handleInputChange={handleInputChange}
              isChecked={isChecked === "new-post"}
            ></RadioInput>
            <RadioInput
              imageSrc="/ukrposhta.png"
              className=""
              label="Укр пошта"
              name="delivery"
              value="ykr-post"
              handleInputChange={handleInputChange}
              isChecked={isChecked === "ykr-post"}
            ></RadioInput>
          </div>
          <div className="w-full">
           <Address/>
           {/* <Select/> */}
          </div>
        </form>
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Замовити
      </Button>
    </div>
  );
};

export default Summary;
