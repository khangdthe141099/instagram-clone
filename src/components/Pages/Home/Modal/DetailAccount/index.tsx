import { Modal } from "antd";
import React, { ReactNode, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";
import { Typography } from "antd";
import { getOptionList } from "./const";
import { useGetCurrentUser } from "@/pages/login/hooks";
import Loading from "@/components/Loading";
import moment from "moment";
import { MONTH_YEAR_FORMAT } from "@/constant";
import { useRegion } from "@/hooks/useRegion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface IDetailAccountModal {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseModal?: any;
  userId?: any;
}

const { Text } = Typography;

const DetailAccountModal = (props: IDetailAccountModal) => {
  const { isModalOpen, onCancel, onCloseModal, userId } = props;
  const [loading, setLoading] = useState(false);

  const { region } = useRegion();
  const router = useRouter();

  const { currentUser } = useGetCurrentUser(userId!) as any;
  const dateJoinFormat = moment(currentUser?.createdAt).format(
    MONTH_YEAR_FORMAT
  );

  const optionList = getOptionList(dateJoinFormat, region, null);

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseModal();
  };

  const getIconStyle = (backgroundImg: string) => {
    return {
      backgroundColor: "black",
      flexShrink: 0,
      width: "24px",
      height: "24px",
      marginRight: "10px",
      "-webkit-mask-size": "contain",
      "-webkit-mask-image": backgroundImg,
    };
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
        wrapClassName={"detail-account-modal-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={false}
        title={null}
      >
        {loading ? (
          <div className="detail-loading">
            <Loading width={30} height={30} style={{ marginBottom: 50 }} />
            <button onClick={onCloseModal} className="detail-btn">
              Close
            </button>
          </div>
        ) : (
          <div className="detail-account-modal-wrapper">
            <Avatar
              img={currentUser?.profileImg || "/images/user/no_avatar.png"}
              ringWidth={80}
              ringHeight={80}
              width={77}
              height={77}
            />
            <Name
              style={{ marginTop: 15 }}
              name={currentUser?.username || "Unknown user"}
              fontSize={16}
              lineHeight={1.625}
              fontWeight={700}
            />
            <Text className="description">{`To help keep our community authentic, we're showing information about accounts on Instagram.`}</Text>
            <div className="option-list">
              {optionList.map((item, index) => (
                <div key={index} className="option-item">
                  {item?.backgroundImg ? (
                    <div style={getIconStyle(item?.backgroundImg)}></div>
                  ) : (
                    <Image
                      src="/images/user/no_avatar.png"
                      alt="no-img"
                      width={24}
                      height={24}
                    />
                  )}

                  <div className="info">
                    <Text className="title">{item?.label}</Text>
                    {item?.data ? (
                      <Text className="data">{item?.data}</Text>
                    ) : (
                      <Link
                        target="_blank"
                        href="//chrome://settings/content/location"
                      >
                        Please enable location services for this app
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onCloseModal} className="detail-account-btn">
              Close
            </button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DetailAccountModal;
