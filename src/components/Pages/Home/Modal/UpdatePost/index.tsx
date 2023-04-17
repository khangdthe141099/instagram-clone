import AppModal from "@/components/AppModal";
import Avatar from "@/components/Avatar";
import { Modal, Popover, Typography, Upload } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Picker, getBase64, sortCurrenPost } from "@/utils";
import { MAX_LENGTH_IMAGE_CREATE, TOAST_TEXT } from "@/constant";
import { postService } from "@/services/postService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAllPostAction } from "@/store/post/selector";
import { useGetCurrentPost } from "@/pages/login/hooks";
import Loading from "@/components/Loading";
import DiscardPost from "../DiscardPost";
import { useModal } from "@/hooks/useModal";
import classNames from "classnames";
import { useGetPostById } from "./hooks";
import { useGetCurrentUser } from "@/pages/login/hooks";

const { Text } = Typography;

interface IUpdatePost {
  isModalOpen?: boolean;
  afterClose?: void;
  closable?: boolean;
  closeIcon?: ReactNode;
  title?: ReactNode;
  width?: string | number;
  onCancel?: any;
  onCloseUpdatePost?: any;
  postId?: any;
  onCloseOptionPost?: any;
  userId?: any;
}

const UpdatePost = (props: IUpdatePost) => {
  const {
    isModalOpen,
    onCloseUpdatePost,
    onCancel,
    postId,
    onCloseOptionPost,
    userId,
  } = props;

  const { currentPost } = useGetPostById(postId) as any;
  const { currentUser } = useGetCurrentUser(userId!) as any;

  const {
    open: openDiscardPost,
    onOpenModal: onOpenDiscardPost,
    onCloseModal: onCloseDiscardPost,
  } = useModal();

  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [captionValue, setCaptionValue] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const { allPost } = useGetCurrentPost() as any;

  const handleSetAllPost = useAllPostAction();

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onOpenDiscardPost();
  };

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
    setCaptionValue((prev) => (prev += `${emoji?.emoji}`));
    setOpen(false);
  };

  const handleChangeTextArea = (event: any) => {
    if (event?.target?.value.length > 2200) return;
    setCaptionValue(event?.target?.value);
  };

  const handleResetValue = () => {
    setCaptionValue("");
    setFileList([]);
  };

  const handleUpdatePost = async () => {
    if (!captionValue || fileList?.length === 0) {
      toast(TOAST_TEXT.UPDATE_POST.ERROR_NULL);
      return;
    }

    setLoading(true);

    if (postId) {
      postService
        .updatePost(postId, {
          postUrl: fileList || "",
          postDesc: captionValue || "",
        })
        .then(async (res: any) => {
          handleResetValue();
          const { data, status }: any = await postService.getAllPost();

          sortCurrenPost(data?.post);
          handleSetAllPost(data?.post);

          onCloseUpdatePost();
          onCloseOptionPost();

          toast(TOAST_TEXT.UPDATE_POST.SUCCESS);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast(TOAST_TEXT.UPDATE_POST.ERROR_CREATE_FAILED);
          console.log("loi:> ", err);
        });
    }
  };

  useEffect(() => {
    setFileList(currentPost?.postUrl);
    setCaptionValue(currentPost?.postDesc);
  }, [currentPost, isModalOpen]);

  return (
    <>
      <AppModal
        wrapClassName={"create-post-modal"}
        title="Edit post"
        onCancel={handleCancelModal}
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
              >
                {fileList?.length < MAX_LENGTH_IMAGE_CREATE && (
                  <>
                    <Image
                      className="more-option"
                      width={66}
                      height={47}
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
                img={currentUser?.profileImg}
                width={28}
                height={28}
                stories={[]}
              />
              <Text className="person-name">{currentUser?.username}</Text>
            </div>

            <div className="body">
              <textarea
                value={captionValue}
                onChange={handleChangeTextArea}
                placeholder="Write a caption..."
              />
              <div className="body--option">
                <Popover
                  content={
                    <Picker
                      onEmojiClick={handleEmojiClick}
                      width={300}
                      height={350}
                    />
                  }
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

                <span className="count-text">{captionValue?.length}/2200</span>
              </div>
            </div>

            <button
              onClick={handleUpdatePost}
              className={classNames("share-btn", {
                "share-btn--disabled": !captionValue || fileList?.length === 0,
              })}
            >
              {loading ? <Loading /> : "Edit"}
            </button>
          </div>
        </div>
      </AppModal>
      <DiscardPost
        isModalOpen={openDiscardPost}
        onCloseDiscardPost={onCloseDiscardPost}
        onCloseCreatePost={onCloseUpdatePost}
        reset={handleResetValue}
        onCancel={onCancel}
        name={"Discard post?"}
        desc={"If you leave, your edits won't be saved."}
        textAction={"Discard"}
      />
      <ToastContainer />
    </>
  );
};

export default UpdatePost;
