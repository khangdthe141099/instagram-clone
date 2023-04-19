import { Modal } from "antd";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonTag from '@/components/Pages/Home/HomeSider/PersonTag'

interface IListLikeModal {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseModal?: any;
  listUserLike?: any;
}

const ListLikeModal = (props: IListLikeModal) => {
  const { isModalOpen, onCancel, onCloseModal, listUserLike } = props;

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseModal();
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"list-like-modal-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={true}
        title="Likes"
      >
        <div className="list-like-modal-wrapper">
        {listUserLike.map((item: any, index: string) => (
            <div className="list-person" key={index}>
              <PersonTag
                width={44}
                height={44}
                ringWidth={48}
                ringHeight={48}
                stories={[]}
                nicknameSz={14}
                nameSz={14}
                typeFollow="button"
                data={item}
              />
            </div>
          ))}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ListLikeModal;
