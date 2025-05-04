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
  variations?:any;
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
  const { id,title, name, slug, image, gallery, price, sale_price, delivery, quantity, unit , variations, stock, promo_price_pkr} = item;

  // console.log('generateCartItem ', typeof gallery);
  
  let img =   JSON.parse(gallery as string)[0] || image;
// console.log('------------------gallery ', variation, item);

if (!isEmpty(variation)) {
        return {
      id: `${id}.${variation.size}`,
      productId: id,
        title,
      slug,
      unit,
      stock: Number(variation.stock)  || stock as number  ,
      // stock: variation.quantity,
      price: variation?.promo_price_pkr ? variation?.promo_price_pkr : variation?.price,
      image: img ,
      delivery:delivery,
      variant:variation.size,
      // promo_price_pkr:promo_price_pkr,
      // image: image?.thumbnail,
      // variationId: variation.id,
    };
  }
  return {
    id,
    title,
    // name,
    slug,
    unit,
    image: img,
    delivery:delivery,
    // image: image?.thumbnail,
    stock: stock as number,
    price: promo_price_pkr ? promo_price_pkr : price,
  };
}
