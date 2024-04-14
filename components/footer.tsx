import Link from 'next/link';
import Contacts from './ui/contacts';

const footerItems = [
    {
        title: 'Доставка і оплата',
        link: '/delivery',
    },
    {
        title: 'Договір публічної оферти',
        link: '/agreement',
    }

]

const Footer = () => {  
    return(
<footer className="bg-white border-t">
    <div className="container flex flex-col md:flex-row justify-around items-center mx-auto py-10">   
    <div>
        Мишка
    </div> 
    <ul className="flex flex-col justify-center py-5">
       { footerItems.map((item) => (<Link href={item.link} key={item.title}>
            <div className="text-neutral-500 transition-colors hover:text-black">{item.title}</div>
            </Link>))}
     </ul>
     <Contacts/>   
    </div>
<div className="mx-auto py-10">
    <p className="text-center text-xs text-black">
&copy; 2023 Книгарня Мишка. Всі права захищені.
    </p>
</div>
   </footer>
    );
};

export default Footer;