import isEmpty from 'lodash/isEmpty';
interface Item {
  id: string | number;
  name: string;
  slug?: string;
  image?: string;
  // image: {
  //   thumbnail: string;
  //   [key: string]: unknown;
  // };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  stock: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const { id,title, name, slug, image, gallery, price, sale_price, quantity, unit , stock} = item;

  // console.log('generateCartItem ', typeof gallery);
  
  let img =   JSON.parse(gallery as string)[0] || image;
// console.log('------------------gallery ', item);

  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${title}`,
      // name: `${name} - ${variation.title}`,
      slug,
      unit,
      stock: stock as number,
      // stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: img ,
      // image: image?.thumbnail,
      variationId: variation.id,
    };
  }
  return {
    id,
    title,
    // name,
    slug,
    unit,
    image: img,
    // image: image?.thumbnail,
    stock: stock as number,
    price: sale_price ? sale_price : price,
  };
}
