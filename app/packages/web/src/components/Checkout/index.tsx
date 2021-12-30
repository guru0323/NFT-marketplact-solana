import React, { ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';

export const CheckoutModal = (
  props: Partial<ModalProps> & {
    children: ReactNode;
  },
) => {
  const { children, ...rest } = props;

  return (
    <Modal footer={null} width={850} {...rest}>
      {children}
    </Modal>
  );
};