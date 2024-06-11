"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Input from "@/components/ui/input";
import RadioInput from "@/components/ui/radio-input";
import Image from "next/image";

import * as z from "zod";

import Address from "@/components/ui/address";
import Checkbox from "@/components/ui/checkboks";

export const ukrposhta = "ukr-post";
export const novaposhta = "new-post";
export const post = "post";
export const courier = "courier";

const phoneRegex = /^\+380\d{9}$/;

export const formSchema = z.object({
  name: z.string().min(1),
  orderStatus: z.string().min(1),
  payment: z.string().min(1),
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

  const [postType, setPostType] = useState(novaposhta);
  const [delivType, setDelivType] = useState(post);
  const [paymentType, setPaymentType] = useState("online");
  const [call, setCall] = useState(false);
  const [agree, setAgree] = useState(true);


  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      orderStatus: "",
      payment: "",
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

  const handlePostChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostType(event.target.value);
  };

  const handleDelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelivType(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
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
              className=""
              label="П.І.Б."
              errorMessage={errors.name?.message}
            />
            <Input
              {...register("phone", { required: "Поле є обов'язковим" })}
              className=""
              label="Телефон"
              type="tel"
              value={"+380"}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col">
          <div className="flex ">
            <RadioInput
              imageSrc="/novap.jpg"
              className="opacity-0 w-0 h-0"
              label="Нова пошта"
              name="post"
              value={novaposhta}
              handleInputChange={handlePostChange}
              isChecked={postType === novaposhta}
            ></RadioInput>
            <RadioInput
              imageSrc="/ukrposhta.png"
              className="opacity-0 w-0 h-0"
              label="Укр пошта"
              name="post"
              value={ukrposhta}
              handleInputChange={handlePostChange}
              isChecked={postType === ukrposhta}
            ></RadioInput>
          </div>
          <div className="flex flex-row sm:flex-col lg:flex-row gap-1">
            <RadioInput
              className=""
              label="До відділення"
              name="delivery"
              value={post}
              handleInputChange={handleDelChange}
              isChecked={delivType === post}
            ></RadioInput>
            <RadioInput
              className=""
              label="За адресою"
              name="delivery"
              value={courier}
              handleInputChange={handleDelChange}
              isChecked={delivType === courier}
            ></RadioInput>
          </div>
          </div>
          <div className="w-full">
            <Address postType={postType} delivery={delivType} />
          </div>
          <h3 className="my-3">Метод оплати</h3>
          <div className="flex  gap-1">
            <RadioInput
              className=""
              label="У відділенні"
              name="payment"
              value="afterrecive"
              handleInputChange={handlePayChange}
              isChecked={paymentType === "afterrecive"}
            ></RadioInput>
            <RadioInput
              className=""
              label="За реквізитами"
              name="payment"
              value="byIBAN"
              handleInputChange={handlePayChange}
              isChecked={paymentType === "byIBAN"}
            ></RadioInput>
            <RadioInput
              className=""
              label="Оплата online"
              name="payment"
              value="online"
              handleInputChange={handlePayChange}
              isChecked={paymentType === "online"}
            ></RadioInput>
          </div>
          <div className="w-full">
            <Checkbox checked={call} onChange={setCall} />
            <span className="p-2 text-sm">Зателефонувати мені</span>
          </div>
          <div className="w-full">
            <Checkbox checked={agree} onChange={setAgree} />
            <span className="p-2 text-sm">Я погоджуюсь з умовами сайту</span>
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
