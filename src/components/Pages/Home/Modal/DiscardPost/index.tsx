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
}

const DiscardPost = (props: IDiscardPost) => {
  const { isModalOpen, onCloseDiscardPost, onCloseCreatePost, reset, onCancel } = props;

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseDiscardPost();
    // onCancel();
  };

  const handleDiscard = () => {
    onCloseDiscardPost();
    onCloseCreatePost();
    reset();
    onCancel();
  }

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
            <div className="title">Discard post?</div>
            <div className="desc">{`If you leave, your edits won't be saved.`}</div>
          </div>

          <div onClick={handleDiscard} className="btn-wrapper">
            <span className="text text--discard">Discard</span>
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
