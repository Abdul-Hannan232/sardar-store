import StripePaymentForm from '@components/common/form/stripe-inline-form';
import { useCart } from '@contexts/cart/cart.context';

const StripeCheckoutInlineForm = () => {
  const { total } = useCart();
  return <StripePaymentForm item={{ price: total, buttonText: 'Pay Now' }} />;
};

export default StripeCheckoutInlineForm;
