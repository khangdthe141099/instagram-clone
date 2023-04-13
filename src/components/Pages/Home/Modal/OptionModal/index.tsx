import { Modal } from "antd";
import React, { ReactNode, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options, optionKey, ownOptions } from "./const";
import classNames from "classnames";
import DiscardPost from "@/components/Pages/Home/Modal/DiscardPost";
import { useModal } from "@/hooks/useModal";
import { postService } from "@/services/postService";
import { useAllPostAction } from "@/store/post/selector";
import Loading from "@/components/Loading";
import UpdatePost from "@/components/Pages/Home/Modal/UpdatePost";
import { sortCurrenPost } from "@/utils";
import { TOAST_TEXT } from "@/constant";

interface IOptionPost {
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
  openOptionPost?: any;
  onCloseOptionPost?: any;
  owner?: boolean;
  postId?: any;
  userId?: any;
}

const OptionPost = (props: IOptionPost) => {
  const { isModalOpen, onCloseOptionPost, owner, postId, userId } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleSetAllPost = useAllPostAction();

  const {
    open: openDiscardPost,
    onOpenModal: onOpenDiscardPost,
    onCloseModal: onCloseDiscardPost,
  } = useModal();

  const {
    open: openUpdatePost,
    onOpenModal: onOpenUpdatePost,
    onCloseModal: onCloseUpdatePost,
  } = useModal();

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseOptionPost();
  };

  const handleClickOption = (key: string) => {
    if (key === optionKey.CANCEL) {
      onCloseOptionPost();
    }
    if (key === optionKey.DELETE) {
      onOpenDiscardPost();
    }
    if (key === optionKey.EDIT) {
      onOpenUpdatePost();
    }
  };

  const handleDeletePost = async () => {
    const { data }: any = await postService.getAllPost();
    const allPost = data?.post;

    try {
      postService
        .deletePost(postId)
        ?.then((res) => {
          //remove element from arr and update state:
          const postDeleted = res?.data?.post;
          const idx = allPost?.findIndex(
            (item: any) => item?._id === postDeleted?._id
          );
          allPost.splice(idx, 1);

          sortCurrenPost(allPost);

          handleSetAllPost(allPost);

          //Close options modal:
          onCloseDiscardPost();
          onCloseOptionPost();

          toast(TOAST_TEXT.DELETE_POST.SUCCESS);
        })
        ?.catch((err) => setLoadingDelete(false));
    } catch (err) {
      setLoadingDelete(false);
    } finally {
      setLoadingDelete(false);
    }
  };

  const renderOption = (options: any) => {
    return options.map((item: any, key: string) => (
      <div
        className={classNames("option", {
          "option--red": item.warning,
        })}
        key={key}
        onClick={() => handleClickOption(item.key)}
      >
        {item.name}
      </div>
    ));
  };

  return (
    <>
      <Modal
        footer={null}
        wrapClassName={"option-post-container"}
        width={400}
        onCancel={handleCancelModal}
        open={isModalOpen}
        centered={true}
        closable={false}
        title={null}
      >
        <div className="option-post-wrapper">
          {renderOption(owner ? ownOptions : options)}
        </div>
      </Modal>
      <ToastContainer />
      <DiscardPost
        isModalOpen={openDiscardPost}
        onCloseDiscardPost={onCloseDiscardPost}
        onCloseOptionPost={onCloseOptionPost}
        name={"Delete post?"}
        desc={"You sure want to delete this post ?"}
        textAction={loadingDelete ? <Loading /> : "Delete"}
        handleDeletePost={handleDeletePost}
        type="delete"
        setLoadingDelete={setLoadingDelete}
      />
      <UpdatePost
        postId={postId}
        userId={userId}
        isModalOpen={openUpdatePost}
        onCloseUpdatePost={onCloseUpdatePost}
        onCloseOptionPost={onCloseOptionPost}
      />
    </>
  );
};

export default OptionPost;
