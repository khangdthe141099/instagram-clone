import React, { FC, Fragment, PropsWithChildren, ReactNode } from "react";
import Image from "next/image";

import { Button, Modal, Typography } from "antd";

const { Title } = Typography;

const AppModal: FC<
  PropsWithChildren<{
    isModalOpen?: boolean;
    centered?: boolean;
    afterClose?: void;
    closable?: boolean;
    closeIcon?: ReactNode;
    footer?: ReactNode | null;
    maskClosable?: boolean;
    title?: ReactNode;
    width?: string | number;
    onCancel?: any;
    wrapClassName?: any;
  }>
> = ({
  children,
  isModalOpen = false,
  centered = true,
  closable = false,
  closeIcon,
  footer = null,
  title,
  width,
  onCancel,
  wrapClassName
}) => {
  return (
    <Modal
      footer={footer}
      wrapClassName={wrapClassName}
      closable={closable}
      width={width ?? 565}
      onCancel={onCancel}
      open={isModalOpen}
      centered={centered}
      title={title}
      closeIcon={closeIcon}
    >
      <Fragment>{children}</Fragment>
    </Modal>
  );
};

export default AppModal;
