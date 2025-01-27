import { Product } from '@/type';

export const generateProductSchema = (product: Product) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description,
    isbn: product.isbn,
    author: product.author,
    brand: {
      '@type': 'Brand',
      name: product.publishing?.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.DOMAIN}/product/${product.id}`,
      priceCurrency: 'UAH',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.isArchived
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
    additionalType: 'https://schema.org/Book',
    bookFormat:
      product.titleSheet == 'Solid'
        ? 'https://schema.org/Hardcover'
        : 'https://schema.org/Paperback',
    numberOfPages: product.sheets,
    publisher: product.publishing?.name,
    inLanguage: 'uk',
  };
};
