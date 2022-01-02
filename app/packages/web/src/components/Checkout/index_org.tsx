import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

export interface CheckoutContextState {
  dropCheckout: () => void;
}

const CheckoutContext = React.createContext<CheckoutContextState>({
  dropCheckout: () => {},
});

export const CheckoutProvider = ({
  children = null,
}: {
  children: ReactNode;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dropCheckout = useMemo(
    () => () => {
    },
    [],
  );

  useEffect(() => {

  }, []);

  return (
    <CheckoutContext.Provider value={{ dropCheckout }}>
      <canvas ref={canvasRef} id="metaplex-checkout" />
      {children}
    </CheckoutContext.Provider>
  );
};

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
