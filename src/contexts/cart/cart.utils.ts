export interface Item {
  id: string | number;
  price: number | any;
  quantity?: number;
  delivery?: any;
  variations?:any;
  stock?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, 'id'>> {}

// export function addItemWithQuantity(
//   items: Item[],
//   item: Item,
//   quantity: number,
// ) {
//   if (quantity <= 0)
//     throw new Error("cartQuantity can't be zero or less than zero");
//   const existingItemIndex = items.findIndex(
//     (existingItem) => existingItem.id === item.id,
//   );
//   console.log('existingItemIndex ', existingItemIndex);

//   if (existingItemIndex > -1) {
//     const newItems = [...items];
//     newItems[existingItemIndex].quantity! += quantity;
//     return newItems;
//   }
//   return [...items, { ...item, quantity }];
// }
// export function addItemWithQuantity(
//   items: Item[],
//   item: Item,
//   quantity: number,
// ) {
//   if (quantity <= 0)
//     throw new Error("cartQuantity can't be zero or less than zero");

//   const existingItemIndex = items.findIndex(
//     (existingItem) => existingItem.id === item.id,
//   );

//   console.log('existingItemIndex ', item);

//   if (existingItemIndex > -1) {
//     const newItems = [...items];
//     newItems[existingItemIndex] = {
//       ...newItems[existingItemIndex],
//       quantity: (newItems[existingItemIndex].quantity || 0) + quantity,
//     };
//     return newItems;
//   }
// // console.log("<<<< ", item);

//   return [...items, { ...item, quantity }];
// }

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number,
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");

  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === item.id,
  );

  // console.log('existingItemIndex ', item);
  // console.log('existingItemIndex ', quantity);

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex] = {
      ...newItems[existingItemIndex],
      quantity: (newItems[existingItemIndex].quantity || 0) + quantity,
    };
    return newItems;
  }
// console.log("<<<< ", item);

  return [...items, { ...item, quantity }];
}
export function removeItemOrQuantity(
  items: Item[],
  id: Item['id'],
  quantity: number,
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  console.log(item);
  
  return [...items, item];
}

export function getItem(items: Item[], id: Item['id']) {
  return items.find((item) => item.id === id);
}

export function updateItem(
  items: Item[],
  id: Item['id'],
  item: UpdateItemInput,
) {
  return items.map((existingItem) =>{
    // console.log("Items after adding quantity:", items);
    existingItem.id === id ? { ...existingItem, ...item } : existingItem}
  );
}

export function removeItem(items: Item[], id: Item['id']) {
  return items.filter((existingItem) => existingItem.id !== id);
}

export function inStock(items: Item[], id: Item['id']) {
  const item = getItem(items, id);
  
  if (item){ 
    // console.log("-------------------- test",item)
    return item['quantity']! < item['stock']!;}
  return true;
}

export const calculateItemTotals = (items: Item[]) => 
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity!,
  }));

// export const calculateTotal = (items: Item[]) =>
//   items?.reduce((total, item) => total + item.quantity! * item.price, 0);

// export const calculateItemTotals = (items: Item[]) =>
//   items.map((item) => ({
//     ...item,
//     itemTotal: item.price * item.quantity! + (item.delivery || 0), 
//   }));

export const calculateTotal = (items: Item[]) =>
  items?.reduce(
    (total, item) =>
      total + item.quantity! * item.price + (item.delivery || 0), 
    0
  );


export const calculateTotalItems = (items: Item[]) =>
  items?.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
