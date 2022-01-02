import React, {
  useContext,
  useEffect,
} from 'react';

export interface CheckoutContextState {
  dropCheckout: () => void;
}

const CheckoutContext = React.createContext<CheckoutContextState>({
  dropCheckout: () => {},
});

export const Checkout = () => {
  const { dropCheckout } = useCheckout();

  useEffect(() => {
    dropCheckout();
  }, [dropCheckout]);

  return <></>;
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  return context;
};
