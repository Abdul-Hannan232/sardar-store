// import usePrice from '@framework/product/use-price';
// import React, { useEffect, useState } from 'react';

// export const CalculatePrice = (
//   product: any,
//   productVariations: any,
//   // variationName?: string
// ) => {
//   const [displayPrice, setDisplayPrice] = useState<number | null>(null);
//   const [delPrice, setDelPrice] = useState<number | null>(null);
//   const [variationName, setVariationName ]= useState("")
// // console.log(product, productVariations, variationName);

//   // Parse variations
//   let variations = productVariations;
//   // let variations = [];
//   // try {
//   //   // variations = JSON.parse(productVariations);
//   //   variations = productVariations;
//   // } catch (error) {
//   //   console.error("Error parsing product variations:", error);
//   // }

//   // For price display
//   const { price: finalPrice, basePrice, discount } = usePrice({
//     amount: displayPrice || product?.promo_price_pkr || product?.price,
//     baseAmount: delPrice || product?.price,
//     currencyCode: 'PKR',
//   });

//   useEffect(() => {
//     if (variations.length === 0) {
//       setDisplayPrice(product?.promo_price_pkr || product?.price || null);
//       // setDelPrice(null);
//       setDelPrice(product?.promo_price_pkr > 0 ? product?.price  : null);
//       return;
//     }

//     let filteredVariations = variations;

//     // Filter variations by variationName if provided
//     if (variationName) {
//       filteredVariations = variations.filter(
//         (v: any) => v.size === variationName
//       );
//     }

//     if (filteredVariations.length > 0) {
      
//       try {
//         const minPrice = Math.min(
//           ...filteredVariations?.map((v: any) => parseFloat(v.price || '0'))
//         );

//         const minPromoPrice = Math.min(
//           ...filteredVariations?.map((v: any) =>
//             // v.promo_price_pkr ? parseFloat(v.promo_price_pkr) : Infinity
//           v.promo_price_pkr && parseFloat(v.promo_price_pkr  || '0')
//           )
//         );

//         const calculatedDisplayPrice =
//           minPromoPrice && minPromoPrice > 0
//             ? minPromoPrice
//             : minPrice || product.promo_price_pkr || product.price;

//         const calculatedDelPrice =
//           minPromoPrice && minPromoPrice > 0
//             ? minPrice
//             : product.promo_price_pkr
//             ? product.price
//             : null;

//         setDisplayPrice(calculatedDisplayPrice);
//         setDelPrice(calculatedDelPrice);
//       } catch (error) {
//         console.error('Error calculating prices:', error);
//       }
//     }
//   }, [variationName, variations, product?.price, product?.promo_price_pkr]);

//   return {
//     delPrice,
//     displayPrice,
//     discount,
//     variationName,
//     setVariationName
//   };
// };

// export default CalculatePrice;



import usePrice from '@framework/product/use-price';
import React, { useEffect, useState } from 'react';

export const CalculatePrice = (
  product: any,
  productVariations: any,
) => {
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [delPrice, setDelPrice] = useState<number | null>(null);
  const [variationName, setVariationName] = useState(productVariations[0]?.size || "");


 
  // Parse variations
  const variations = productVariations;

  // For price display
  const { price: finalPrice, basePrice, discount } = usePrice({
    amount: displayPrice || product?.promo_price_pkr || product?.price,
    baseAmount: delPrice || product?.price,
    currencyCode: 'PKR',
  });

  useEffect(()=>{
    const minPriceVariation = variations.reduce(
      (min: any, current: any) => {
        const currentPrice = parseFloat(current.promo_price_pkr || current.price || 'Infinity');
        const minPrice = parseFloat(min.promo_price_pkr || min.price || 'Infinity');
        return currentPrice < minPrice ? current : min;
      },
      // Provide a safe initial value
      { price: product?.price || 'Infinity', promo_price_pkr: product?.promo_price_pkr || null }
    );
    setVariationName(minPriceVariation.size || "");

  },[])

  // Set initial prices and variation name
  useEffect(() => {
    if (!variations || variations.length === 0) {
      setDisplayPrice(product?.promo_price_pkr || product?.price || null);
      setDelPrice(product?.promo_price_pkr > 0 ? product?.price : null);
      return;
    }


    try {
      const minPriceVariation = variations.reduce((min: any, current: any) => {
        const currentPrice = parseFloat(current.promo_price_pkr || current.price || 'Infinity');
        const minPrice = parseFloat(min.promo_price_pkr || min.price || 'Infinity');
        return currentPrice < minPrice ? current : min;
      });

      // Set initial variation name and prices
      // setVariationName(minPriceVariation.size || "");
      const calculatedDisplayPrice =
        minPriceVariation.promo_price_pkr && parseFloat(minPriceVariation.promo_price_pkr) > 0
          ? parseFloat(minPriceVariation.promo_price_pkr)
          : parseFloat(minPriceVariation.price) || product.promo_price_pkr || product.price;

      const calculatedDelPrice =
        minPriceVariation.promo_price_pkr && parseFloat(minPriceVariation.promo_price_pkr) > 0
          ? parseFloat(minPriceVariation.price)
          : product.promo_price_pkr
          ? product.price
          : null;

      setDisplayPrice(calculatedDisplayPrice);
      setDelPrice(calculatedDelPrice);
    } catch (error) {
      console.error('Error calculating initial prices:', error);
    }
  }, [variations, product?.price, product?.promo_price_pkr]);

  // Update prices when variationName changes
  useEffect(() => {
    if (!variationName || variations.length === 0) return;

    const filteredVariation = variations.find(
      (v: any) => v.size === variationName
    );

    if (filteredVariation) {
      const calculatedDisplayPrice =
        filteredVariation.promo_price_pkr && parseFloat(filteredVariation.promo_price_pkr) > 0
          ? parseFloat(filteredVariation.promo_price_pkr)
          : parseFloat(filteredVariation.price) || product.promo_price_pkr || product.price;

      const calculatedDelPrice =
        filteredVariation.promo_price_pkr && parseFloat(filteredVariation.promo_price_pkr) > 0
          ? parseFloat(filteredVariation.price)
          : product.promo_price_pkr
          ? product.price
          : null;

      setDisplayPrice(calculatedDisplayPrice);
      setDelPrice(calculatedDelPrice);
    }
  }, [variationName, variations]);

  return {
    delPrice,
    displayPrice,
    discount,
    variationName,
    setVariationName,
  };
};

export default CalculatePrice;


// import usePrice from '@framework/product/use-price';
// import React, { useEffect, useState } from 'react';

// export const CalculatePrice = (product: any, productVariations: any) => {
//   const [displayPrice, setDisplayPrice] = useState<number | null>(null);
//   const [delPrice, setDelPrice] = useState<number | null>(null);
//   const [minPrice, setMinPrice] = useState<number | null>(null);
//   const [maxPrice, setMaxPrice] = useState<number | null>(null);

//   const {
//     price: finalPrice,
//     basePrice,
//     discount,
//   } = usePrice({
//     amount:
//       product?.promo_price_pkr ||
//       product?.price ||
//       displayPrice ||
//       delPrice,
//     baseAmount: product?.price || delPrice,
//     currencyCode: 'PKR',
//   });

//   useEffect(() => {
//     let minPrice: number | null = null;
//     let maxPrice: number | null = null;
//     let minPromoPrice: number | null = null;
  
//     if (productVariations) {
//       try {
//         // Parse variations if they are in string format
//         const parsedVariations =
//           typeof productVariations === "string"
//             ? JSON.parse(productVariations)
//             : productVariations;
  
//         const allPrices = parsedVariations.map((v: any) =>
//           parseFloat(v.price || "0")
//         );
  
//         const allPromoPrices = parsedVariations.map((v: any) =>
//           v.promo_price_pkr ? parseFloat(v.promo_price_pkr) : Infinity
//         );
  
//         // Calculate minimum and maximum prices
//         if (allPrices.length > 0) {
//           minPrice = Math.min(...allPrices);
//           maxPrice = Math.max(...allPrices);
//         }
//         if (allPromoPrices.length > 0) {
//           minPromoPrice = Math.min(...allPromoPrices);
//         }
//       } catch (error) {
//         console.error("Error parsing variations:", error);
//       }
//     }
  
//     // Determine the display and delete prices
//     const calculatedDisplayPrice =
//       minPromoPrice && minPromoPrice > 0
//         ? minPromoPrice
//         : minPrice || product.promo_price_pkr || product.price;
  
//     const calculatedDelPrice =
//       minPromoPrice && minPromoPrice > 0
//         ? minPrice
//         : product.promo_price_pkr
//         ? product.price
//         : null;
  
//     setDisplayPrice(calculatedDisplayPrice);
//     setDelPrice(calculatedDelPrice);
//     setMinPrice(minPrice);
//     setMaxPrice(maxPrice);
//   }, [productVariations, product.price, product.promo_price_pkr]);
  
// console.log(minPrice);

//   return {
//     delPrice,
//     displayPrice,
//     minPrice,
//     maxPrice,
//     discount,
//   };
// };

// export default CalculatePrice;
