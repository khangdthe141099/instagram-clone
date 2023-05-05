import { Modal, QRCode, Button } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { options, OPTION_KEY, listColor, COLOR } from "./const";
import { useModal } from "@/hooks/useModal";
import { signOut } from "next-auth/react";
import usePostStore from "@/store/post/usePostStore";
import useUserStore from "@/store/user/useUserStore";

interface IOwnSetting {
  isModalOpen?: boolean;
  onCloseOwnSetting?: any;
  user?: any;
}

function OwnSetting(props: IOwnSetting) {
  const { isModalOpen, onCloseOwnSetting, user } = props;

  const postStore = usePostStore as any;
  const userStore = useUserStore as any;

  const [color, setColor] = useState(COLOR.ORANGE);

  const {
    open: openQRCode,
    onOpenModal: onOpenQRCode,
    onCloseModal: onCloseQRCode,
  } = useModal();

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseOwnSetting();
  };

  const handleClickOption = (key: string) => {
    if (key === OPTION_KEY.QR_CODE) {
      onOpenQRCode();
      onCloseOwnSetting();
    }
    if (key === OPTION_KEY.LOGOUT) {
      signOut();
      postStore.persist.clearStorage();
      userStore.persist.clearStorage();
    }
    if (key === OPTION_KEY.CANCEL) {
      onCloseOwnSetting();
    }
  };

  const renderOption = () => {
    return options.map((item: any, key: any) => (
      <div
        className="option"
        key={key}
        onClick={() => handleClickOption(item.key)}
      >
        {item.name}
      </div>
    ));
  };

  const downloadQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas?.toDataURL();
      const a = document?.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleClickColor = (color: string) => {
    setColor(color);
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"own-setting-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={false}
        title={null}
      >
        <div className="own-setting-wrapper">{renderOption()}</div>
      </Modal>

      <Modal
        footer={null}
        wrapClassName={"qr-container"}
        width={300}
        onCancel={onCloseQRCode}
        open={openQRCode}
        centered={true}
        closable={false}
        title={null}
      >
        <div className="qr-wrapper" id="myqrcode">
          <QRCode
            color={color}
            value={`${process.env.NEXT_PUBLIC_URL}/profile/${user?.email}`}
            style={{ marginBottom: 16 }}
            icon="/images/logo.png"
            errorLevel="H"
          />
          <div className="color-list">
            {listColor.map((item, key) => (
              <div
                onClick={() => handleClickColor(item?.color)}
                key={key}
                className={classNames(`color-item ${item.class}`, {
                  "color-item--active": item.color === color,
                })}
              ></div>
            ))}
          </div>
          <button className="btn-download" onClick={downloadQRCode}>
            Download QR Code
          </button>
        </div>
      </Modal>
    </>
  );
}

export default OwnSetting;
