import { Modal } from "antd";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { getReportSuccessList } from "../const";
import classNames from "classnames";
import { useRouter } from "next/router";

interface IReportSuccessModal {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseModal?: any;
  content?: string;
}

const { Text } = Typography;

const ReportSuccessModal = (props: IReportSuccessModal) => {
  const { isModalOpen, onCancel, onCloseModal, content } = props;

  const route = useRouter();

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseModal();
  };

  const reportSuccessList = getReportSuccessList("KhangDT");

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"report-success-modal-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={false}
        title={null}
      >
        <div className="report-success-modal-wrapper">
          <Image
            className="success-icon"
            width={48}
            height={48}
            alt="arrow right"
            src={"/svg/components/post/SuccessIcon.svg"}
          />
          <Text className="success-title">{`Don't want to see this?`}</Text>
          <Text className="success-desc">
            {`When you see something ${content} on Instagram, you can report it if it doesn't follow our `}{" "}
            <Link
              target="_blank"
              className="success-link"
              href={"https://help.instagram.com/477434105621119"}
            >
              Community Guidelines
            </Link>
            ,{" "}
            {`or you can remove the person who shared it from your experience.`}
          </Text>
          <div className="success-list">
            {reportSuccessList.map((item, key) => (
              <div key={key} className="success-wrapper">
                <div
                  className={classNames("success-label", {
                    "success-label--warning": item.error,
                  })}
                >
                  {item.label}
                </div>
                <Image
                  className="success-image"
                  width={17}
                  height={17}
                  alt="arrow right"
                  src={"/svg/components/post/ArrowIcon.svg"}
                />
              </div>
            ))}
            <Link
              target="_blank"
              href={"https://help.instagram.com/477434105621119"}
              className="success-wrapper"
            >
              <div className="success-label">Learn more</div>
              <Image
                className="success-image"
                width={17}
                height={17}
                alt="arrow right"
                src={"/svg/components/post/ArrowIcon.svg"}
              />
            </Link>
          </div>
          <button onClick={onCloseModal} className="success-btn">
            Close
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ReportSuccessModal;
