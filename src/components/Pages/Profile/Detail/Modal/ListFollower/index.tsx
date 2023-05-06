import { Modal } from "antd";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonTag from '@/components/Pages/Home/HomeSider/PersonTag'

interface IListFollowerModal {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseModal?: any;
}

const ListFollowerModal = (props: IListFollowerModal) => {
  const { isModalOpen, onCancel, onCloseModal } = props;

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseModal();
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"list-follower-modal-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={true}
        title="Followers"
      >
        <div className="list-follower-modal-wrapper">
        {[1,2,3,4].map((item: any, index: any) => (
            <div className="list-person" key={index}>
             Follower
            </div>
          ))}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ListFollowerModal;
