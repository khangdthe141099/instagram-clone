import { Modal, Typography } from "antd";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options, optionKey } from "./const";
import classNames from "classnames";

interface IOptionPost {
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
  openOptionPost?: any;
  onCloseOptionPost?: any;
}

const OptionPost = (props: IOptionPost) => {
  const { isModalOpen, onCloseOptionPost, onCancel } = props;

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseOptionPost();
  };

  const handleClickOption = (key: string) => {
    if (key === optionKey.CANCEL) {
      onCloseOptionPost();
    }
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"option-post-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={false}
        title={null}
      >
        <div className="option-post-wrapper">
          {options.map((item, key) => (
            <div
              className={classNames("option", {
                "option--red": item.warning,
              })}
              key={key}
              onClick={() => handleClickOption(item.key)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default OptionPost;
