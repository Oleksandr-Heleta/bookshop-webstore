import Contacts from '@/components/ui/contacts';
import Container from '@/components/ui/container';

const Delivery = () => {
  return (
    <Container>
      <article className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl font-bold p-5">
          Повернення товару в інтернет-магазині дитячих книг &quot;Мишка&quot;
        </h1>
        <p>
          Відповідно до Постанови Кабінету Міністрів України від 19 березня 1994
          р. № 172 &quot;Про реалізацію окремих положень Закону України
          &quot;Про захист прав споживачів&quot; друковані видання належної
          якості не підлягають обміну, поверненню.
          <br />У випадку виявлення поліграфічного браку книжкової продукції
          буде повернення коштів покупцю у розмірі вартості повернутої
          продукції. <br /> Поліграфічний брак – це брак, отриманий внаслідок
          недотримання технології виробництва, що призводить до перекручування
          або втрати інформації: розмазування фарби, непродруковування фарби,
          нечіткий друк, склеєні сторінки, нерівне обрізання, перевернуті
          аркуші, відсутність аркушів, або їх повторення, невідповідність назви
          книжки на обкладинці її змісту, тощо). А також у випадку не правильної
          комплектації товару. <br /> Покупець має право повернути браковану
          книжкову продукцію протягом 14 днів з моменту отримання. Для цього
          слід звернутися до менеджера, написавши в телеграм, інстаграм чи
          надіславши листа на електронну пошту mousekidsbooks@gmail.com. При
          зверненні слід зазначити, кому і коли був проданий товар та які саме
          дефекти має товар. Кошти будуть повернуті покупцю у розмірі вартості
          повернутої продукції, після повернення книжкової продукції з
          елементами поліграфічного браку. Повернення бракованої продукції
          здійснюється за рахунок продавця.
        </p>
        <hr className="m-2" />

        <Contacts />
      </article>
    </Container>
  );
};

export default Delivery;
