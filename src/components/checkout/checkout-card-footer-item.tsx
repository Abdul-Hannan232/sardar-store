type FooterItemProps = {
  id: string;
  name: string;
  price: string;
  delivery?: string | number
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {

  // console.log("footer ", item);
  
  return (
    <div className="flex items-center w-full py-4 text-sm font-medium border-b lg:py-5 border-border-base text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
      {item.name}
      <span className="flex flex-col font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
        {item.price} 
         {/* {item?.delivery &&  <span className='text-13px sm:text-sm text-brand-muted  font-normal'>Delivery:<span className='    ltr:pl-3 rtl:pr-3 '>Rs {item?.delivery}</span> </span>}  */}
      </span>
    </div>
  );
};
