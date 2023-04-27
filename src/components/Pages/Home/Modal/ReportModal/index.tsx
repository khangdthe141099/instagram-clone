import { Modal } from "antd";
import React, { ReactNode, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "antd";
import { reportList } from "./const";
import Image from "next/image";
import ReportSuccessModal from "./ReportSuccess";
import { useModal } from "@/hooks/useModal";
import Loading from "@/components/Loading";

interface IReportModal {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseModal?: any;
}

const { Text } = Typography;

const ReportModal = (props: IReportModal) => {
  const { isModalOpen, onCancel, onCloseModal } = props;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState({
    key: "",
    status: false,
  });

  const {
    open: openReport,
    onOpenModal: onOpenReport,
    onCloseModal: onCloseReport,
  } = useModal();

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseModal();
  };

  const handleOpenReportSuccess = (item: any) => {
    setNextLoading({
      key: item?.key,
      status: true,
    });

    setTimeout(() => {
      setNextLoading({
        key: item?.key,
        status: false,
      });
      onOpenReport();
      onCloseModal();
      setContent(item?.content);
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isModalOpen]);

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"report-modal-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={true}
        title="Report"
      >
        <div className="report-modal-wrapper">
          {loading ? (
            <div className="loading-report">
              <Loading />
            </div>
          ) : (
            <>
              <div className="report-title">
                <Text className="text">Why are you reporting this post?</Text>
              </div>
              <div className="report-list">
                {reportList.map((item, index) => (
                  <div
                    onClick={() => handleOpenReportSuccess(item)}
                    className="report-item"
                    key={index}
                  >
                    <div className="report-label">{item.label}</div>
                    {nextLoading.status && nextLoading.key === item?.key ? (
                      <Loading
                        width={17}
                        height={17}
                        style={{ marginRight: "10px" }}
                      />
                    ) : (
                      <Image
                        className="report-image"
                        width={17}
                        height={17}
                        alt="arrow right"
                        src={"/svg/components/post/ArrowIcon.svg"}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Modal>
      <ToastContainer />
      <ReportSuccessModal
        isModalOpen={openReport}
        onCloseModal={onCloseReport}
        content={content}
      />
    </>
  );
};

export default ReportModal;
