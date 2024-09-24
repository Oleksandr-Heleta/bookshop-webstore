import Container from '@/components/ui/container';

const Delivery = () => {
  return (
    <Container>
      <article className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl font-bold p-5">
          Виникли запитання? З нами Ви можете зв&apos;язатись за наступними
          контактами:
        </h1>
        <ul>
          <li>
            1. Телефон:
            <a
              aria-label="Зателефонуйте"
              href="tel:+380936482295"
              target="_blank"
              className="amber-950 px-4 py-2  hover:opacity-75 transition"
            >
              +380936482295
            </a>
          </li>
          <li>
            2. Email:
            <a
              aria-label="Напишіть на пошту"
              href="mailto:mousekidsbooks@gmail.com"
              target="_blank"
              className="amber-950 px-4 py-2  hover:opacity-75 transition"
            >
              mousekidsbooks@gmail.com
            </a>
          </li>
          <li>
            3. Instagram:
            <a
              aria-label="Слідкуйте в Instagram"
              href="https://www.instagram.com/mouse_kidsbooks"
              target="_blank"
              className="amber-950 px-4 py-2  hover:opacity-75 transition"
            >
              @mouse_kidsbooks
            </a>
          </li>
          <li>
            4. Telegram:
            <a
              aria-label="Напишіть в Telegram"
              href="https://t.me/mouse_kidsbooks"
              target="_blank"
              className="amber-950 px-4 py-2  hover:opacity-75 transition"
            >
              @mouse_kidsbooks
            </a>
          </li>
        </ul>
      </article>
    </Container>
  );
};

export default Delivery;
