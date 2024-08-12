"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Input from "@/components/ui/input";
import RadioInput from "@/components/ui/radio-input";
import Image from "next/image";

import * as z from "zod";
import { useInfo } from "@/providers/info-provider";

import Address from "@/components/ui/address";
import Checkbox from "@/components/ui/checkboks";
import { on } from "events";

export const ukrposhta = "ukr-post";
export const novaposhta = "new-post";
export const post = "post";
export const courier = "courier";

const phoneRegex = /^\+380\d{9}$/;
const nameRegex = /^(?=.{2,})[A-Za-zА-Яа-яІіЇїЄєҐґ-]+$/;
const addressRegex = /^(?=.*[a-zA-Zа-яА-Я])(?=.*[0-9]).+$/;

interface Item {
  id: string;
  name: string;
}

export const formSchema = z.object({
  name: z.string().refine((value) => nameRegex.test(value), {
    message: "Напишіть своє ім'я",
  }),
  surname: z.string().refine((value) => nameRegex.test(value), {
    message: "Напишіть своє  прізвище",
  }),
  orderStatus: z.string().min(1),
  payment: z.string().min(1),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message: "Телефон повинен бути у форматі +380000000000",
  }),
  city: z.string().min(1,  {
    message: "Введіть назву населеного пункту.",
  }),
  cityId: z.string().min(1,  {
    message: " Виберіть населений пункт із списку.",
  }),
  address: z.string().refine((value) => addressRegex.test(value), {
    message: "Введіть номер чи адресу.",
  }),
  addressId: z.string().min(1,  {
    message: " Виберіть відділення із списку",
  }).optional(),
  post: z.string().min(1),
  delivery: z.string().min(1),
  // orderItems: z.array(orderItemSchema),
  isPaid: z.boolean().default(false),
  call: z.boolean().default(false),
  agree: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const { sale } = useInfo() || { sale: 0 };

  const [postType, setPostType] = useState(novaposhta);
  const [delivType, setDelivType] = useState(post);
  const [paymentType, setPaymentType] = useState("byIBAN");
  const [call, setCall] = useState(false);
  const [agree, setAgree] = useState(true);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, formState: { errors }, control, setValue, getValues } =
    useForm<FormValues>({
      defaultValues: {
        name: "",
        surname: "",
        orderStatus: "new",
        payment: "byIBAN",
        isPaid: false,
        call: false,
        agree: true,
        phone: "+380",
        city: "",
        cityId: "",
        address: "",
        addressId: "",
        post: novaposhta,
        delivery: post,
      },
      resolver: zodResolver(formSchema),
    });

    const methods = useForm({
      resolver: zodResolver(formSchema),
    });

    // useEffect(() => {
    //   console.log(errors);
    // }, [errors]);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Замовлення успішне");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Щось пішло не за планом");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total: number, item) => {
    const salePercent = sale > item.product.sale ? sale : item.product.sale;
    const price =
      item.product.isSale || sale
        ? item.product.price - (item.product.price * salePercent) / 100
        : item.product.price;
    return total + price * item.quantity;
  }, 0);

  const onCheckout = async () => {
    // console.log("click chechout");
    setSending(true);
    try {
      const data = onSubmit(getValues());
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          ...data,
          orderItems: items,
          totalPrice,
          isPaid: false,
          call,
          agree,
        }
      );

      // Перевірка статусу відповіді
      if (response.status === 200) {
        // Успішна відповідь, перенаправлення користувача
        window.location = response.data.url;
      } else {
        // Обробка відповіді з помилкою
        console.error("Error during checkout:", response.statusText);
        // Тут можна додати відображення повідомлення користувачу
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      // Тут можна додати відображення повідомлення користувачу
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (data: FormValues) => {
    // console.log('click');
    // console.log(data);
    return data;
  };

  const handlePostChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostType(event.target.value);
    setValue("post", event.target.value);
    if (event.target.value === ukrposhta) {
      setValue("delivery", post);
      setDelivType(post);
      setValue("payment", "byIBAN");
      setPaymentType("byIBAN");
    }
  };

  const handleDelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelivType(event.target.value);
    setValue("delivery", event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
    setValue("payment", event.target.value);
  };

  const handleAddress = (data: {
    city: Item | null;
    post: Item | null;
    address?: string;
  }) => {
    console.log(data);
    setValue("city", data.city?.name || "");
    setValue("cityId", data.city?.id || "");
    if (data.post) {
      setValue("address", data.post?.name || "");
      setValue("addressId", data.post?.id || "");
    } else {
    setValue("address", data.address || "" );
    setValue("addressId", data.address?.replace(/ /g, '_') || "")
  }
console.log(getValues());

  };

  const handleTrim = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value.trim(), { shouldValidate: true });
  };

  return (
    <div className="mt-16 rounded-lg bg-amber-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-semibold text-amber-950">Замовлення</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-amber-800 pt-4">
          <div className="text-base font-medium text-amber-950">До сплати</div>
          <Currency value={totalPrice} />
        </div>
    
        <form
          onSubmit={handleSubmit(onCheckout)}
          className="mt-6 text-amber-950"
        >
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 ">
            <div className="basis-1/2">
              <Input
                {...register("name", { required: "Поле є обов'язковим" })}
                className=""
                label="Ім'я"
                errorMessage={errors.name?.message as string | undefined}
                onChange={handleTrim("name")}
              />
            </div>
            <div className="basis-1/2 mb-4">
              <Input
                {...register("surname", { required: "Поле є обов'язковим" })}
                className=""
                label="Прізвище "
                errorMessage={errors.surname?.message as string | undefined}
                onChange={handleTrim("surname")}
              />
            </div>
          </div>
          <div className="mb-4">
            <Input
              {...register("phone", { required: "Поле є обов'язковим" })}
              className=""
              label="Телефон"
              type="tel"
              // value={"+380"}
              errorMessage={errors.phone?.message as string | undefined}
              onChange={handleTrim("phone")}
            />
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            <div className="flex gap-2">
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
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2">
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
                disabled={postType === ukrposhta}
                name="delivery"
                value={courier}
                handleInputChange={handleDelChange}
                isChecked={delivType === courier}
              ></RadioInput>
            </div>
          </div>
          <div className="w-full">
            <Address
              postType={postType}
              delivery={delivType}
              onComplete={handleAddress}
              errors={errors}
            />
          </div>
          <h3 className="my-3 text-amber-950">Метод оплати</h3>
          <div className="flex  gap-2 flex-wrap sm:flex-nowrap">
            <RadioInput
              className=""
              label="У відділенні"
              name="payment"
              disabled={postType === ukrposhta}
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
              disabled
              className="opacity-50"
              label="Оплата online"
              name="payment"
              value="online"
              handleInputChange={handlePayChange}
              isChecked={paymentType === "online"}
            ></RadioInput>
          </div>
          <div className="w-full">
            <Checkbox checked={call} onChange={setCall} name="call" />
            <span className="p-2 text-sm">Зателефонувати мені</span>
          </div>
          <div className="w-full">
            <Checkbox checked={agree} onChange={setAgree} name="agree" />
            <span className="p-2 text-sm">Я погоджуюсь з  <Link href='/agreement' target="_blank" className="underline hover:text-amber-800">умовами публічної оферти</Link></span>
          </div>
          <Button
            disabled={items.length === 0 || !agree || sending}
            type="submit"
            // onClick={onCheckout}
            className="w-full mt-6"
          >
            Замовити
          </Button>
        </form>
        
      </div>
    </div>
  );
};

export default Summary;
