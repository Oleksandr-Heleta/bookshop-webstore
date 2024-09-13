module.exports = {
  siteUrl: process.env.DOMAIN || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/cart', '/delivery', '/agreement'],
  transform: async (config, path) => {
    if (path === '/cart') {
      return null;
    }

    let priority = 0.3;
    if (path === '/') {
      priority = 1.0;
    } else if (path.startsWith('/product/')) {
      priority = 0.5;
    }

    return {
      loc: path, // The URL of the page
      changefreq: 'daily',
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    const productPaths = await fetchProductPaths();
    const categoryPaths = await fetchCategoryPaths();
    const publishingPaths = await fetchPublishingPaths();
    const ageGroupPaths = await fetchAgeGroupPaths();

    return [
      ...productPaths.map((path) => ({
        loc: path,
        changefreq: 'daily',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      })),
      ...categoryPaths.map((path) => ({
        loc: path,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...publishingPaths.map((path) => ({
        loc: path,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...ageGroupPaths.map((path) => ({
        loc: path,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
    ];
  },
};

const url = process.env.NEXT_PUBLIC_API_URL;

async function fetchProductPaths() {
  const response = await fetch(`${url}/products`);
  const products = await response.json();
  return products.data.map((product) => `/product/${product.id}`);
}

async function fetchCategoryPaths() {
  const response = await fetch(`${url}/categories`);
  const categories = await response.json();
  return categories.map((category) => `/category/${category.id}`);
}

async function fetchPublishingPaths() {
  const response = await fetch(`${url}/publishings`);
  const publishings = await response.json();
  return publishings.map((publishing) => `/publishings/${publishing.id}`);
}

async function fetchAgeGroupPaths() {
  const response = await fetch(`${url}/age-groups`);
  const ageGroups = await response.json();
  return ageGroups.map((ageGroup) => `/age-groups/${ageGroup.id}`);
}
