import AppModal from "@/components/AppModal";
import Avatar from "@/components/Avatar";
import { Modal, Popover, Typography } from "antd";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Picker, getBase64 } from "@/utils";
import useDebounce from '@/hooks/useDebounce'

const { Text } = Typography;

interface ICreatePost {
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
  onCloseCreatePost?: any;
}

const CreatePost = (props: ICreatePost) => {
  const { isModalOpen, onCloseCreatePost } = props;
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [captionValue, setCaptionValue] = useState("")

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  //Change when upload image:
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  //Cancel preview:
  const handleCancel = () => setPreviewOpen(false);

  //Open preview:
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleEmojiClick = (emoji: any, event: MouseEvent) => {
    setCaptionValue(prev => prev + `${emoji?.emoji}`)
    setOpen(false)
  }


  const handleChangeTextArea = (event: any) => {
    setCaptionValue(event?.target?.values)
  }


  return (
    <AppModal
      wrapClassName={"create-post-modal"}
      title="Create new post"
      onCancel={onCloseCreatePost}
      isModalOpen={isModalOpen}
      closable
    >
      <div className="create-post-wrapper">
        <div className="create-post-wrapper--left">
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={handlePreview}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <>
                  <Image
                    className="more-option"
                    width={96}
                    height={77}
                    src={"/svg/components/post/DragPhoto.svg"}
                    alt="Drag Photo"
                  />
                  <Text>Drag photos and videos here</Text>
                </>
              )}
            </Upload>
          </ImgCrop>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <Image
              alt="preview image"
              style={{ width: "100%" }}
              src={previewImage}
              width={10}
              height={350}
            />
          </Modal>
        </div>

        <div className="create-post-wrapper--right">
          <div className="top">
            <Avatar
              img={"/images/user/no_avatar.png"}
              width={28}
              height={28}
              stories={[]}
            />
            <Text className="person-name">dam tuan khang</Text>
          </div>

          <div className="body">
            <textarea 
            value={captionValue}
            onChange={handleChangeTextArea}
            id="caption" 
            placeholder="Write a caption..." />
            <div className="body--option">
              <Popover
                content={<Picker onEmojiClick={handleEmojiClick} width={300} height={350} />}
                title="Title"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <Image
                  style={{ cursor: "pointer" }}
                  width={20}
                  height={13}
                  src={"/svg/components/post/EmojiIcon.svg"}
                  alt="Emoji Icon"
                />
              </Popover>

              <span className="count-text">0/2200</span>
            </div>
          </div>

          <button className="share-btn">Share</button>
        </div>
      </div>
    </AppModal>
  );
};

export default CreatePost;
