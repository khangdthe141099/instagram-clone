import { Modal } from "antd";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IDiscardPost {
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
  onCloseDiscardPost?: any;
  onCloseCreatePost?: any;
  reset?: any;
  name?: string;
  desc?: string;
  textAction?: any;
  onCloseOptionPost?: any;
  handleDeletePost?: any;
  type?: string;
  setLoadingDelete?: any
}

const DiscardPost = (props: IDiscardPost) => {
  const {
    isModalOpen,
    onCloseDiscardPost,
    onCloseCreatePost,
    reset,
    onCancel,
    name,
    desc,
    textAction,
    onCloseOptionPost,
    handleDeletePost,
    type,
    setLoadingDelete
  } = props;

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseDiscardPost();
  };

  const handleDiscard = (params?: any) => {
    setLoadingDelete && setLoadingDelete(true)
    params !== "delete" && onCloseDiscardPost();
    onCloseCreatePost && onCloseCreatePost();
    reset && reset();
    onCancel && onCancel();
    handleDeletePost && handleDeletePost();
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"discard-post-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={false}
        title={null}
      >
        <div className="discard-post-wrapper">
          <div className="discard-post-wrapper--top">
            <div className="title">{name}</div>
            <div className="desc">{desc}</div>
          </div>

          <div onClick={() => handleDiscard(type)} className="btn-wrapper">
            <span className="text text--discard">{textAction}</span>
          </div>

          <div onClick={onCloseDiscardPost} className="btn-wrapper">
            <span className="text">Cancel</span>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DiscardPost;
