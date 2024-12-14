import Image from '@components/ui/image';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7">
      <div className="flex mx-auto w-[220px] md:w-auto">
        <Image
          src="/assets/images/empty-cart.png"
          alt="Your cart is empty."
          width={190}
          height={190}
          className="aspect-square"
        />
      </div>
      <Heading variant="titleMedium" className="mb-1.5 pt-8">
        Your cart is empty.
      </Heading>
      <Text>Please add product to your cart list</Text>
    </div>
  );
}

export default EmptyCart;
