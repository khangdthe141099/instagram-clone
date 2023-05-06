import { Modal } from "antd";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonTag from '@/components/Pages/Home/HomeSider/PersonTag'

interface IListFollowingModal {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseModal?: any;
}

const ListFollowingModal = (props: IListFollowingModal) => {
  const { isModalOpen, onCancel, onCloseModal } = props;

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseModal();
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"list-following-modal-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={true}
        title="Following"
      >
        <div className="list-following-modal-wrapper">
        {[1,2,3,4].map((item: any, index: any) => (
            <div className="list-person" key={index}>
             Following
            </div>
          ))}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ListFollowingModal;
