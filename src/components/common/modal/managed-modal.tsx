'use client';

import Modal from '@components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import SignUpModal from '@components/auth/signup-modal';
import EmailVerfied from '@pages/pages/user/email-verification/EmailVerfied';
import LoginModal from '@components/auth/login-modal';
const LoginForm = dynamic(() => import('@components/auth/login-form'));
const SignUpForm = dynamic(() => import('@components/auth/sign-up-form'));
const ForgetPasswordForm = dynamic(
  () => import('@components/auth/forget-password-form'),
);
const ProductPopup = dynamic(() => import('@components/product/product-popup'));
const AddressPopup = dynamic(
  () => import('@components/common/form/add-address'),
);
const PaymentPopup = dynamic(
  () => import('@components/common/form/add-payment'),
);
const PhoneNumberPopup = dynamic(
  () => import('@components/common/form/add-contact'),
);
const DeliveryAddresses = dynamic(
  () => import('@components/address/delivery-addresses'),
);
const CategoryPopup = dynamic(
  () => import('@components/category/category-popup'),
);

export default function ManagedModal() {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  if (view === 'CATEGORY_VIEW') {
    return (
      <Modal open={isOpen} onClose={closeModal} variant="bottom">
        {view === 'CATEGORY_VIEW' && <CategoryPopup />}
      </Modal>
    );
  }
  

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <LoginForm />}
      {view === 'SIGNUP_SUCCESS' && <SignUpModal />}
      {view === 'SIGNIN_SUCCESS' && <LoginModal />}
      {view === 'SIGN_UP_VIEW' && <SignUpForm />}
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm />}
      {view === 'EMAIL_VERIFIED' && <EmailVerfied />}
      {view === 'PRODUCT_VIEW' && <ProductPopup />}
      {view === 'ADDRESS_VIEW_AND_EDIT' && <AddressPopup />}
      {view === 'PAYMENT' && <PaymentPopup />}
      {view === 'PHONE_NUMBER' && <PhoneNumberPopup />}
      {view === 'DELIVERY_VIEW' && <DeliveryAddresses />}
    </Modal>
  );
}
