import { Modal } from "antd";
import React, { ReactNode, useState, useEffect, useMemo } from "react";
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
  setDisplayLikeCount?: any;
  displayLikeCount?: any;
  displayComment?: any;
  setDisplayComment?: any;
}

const OptionPost = (props: IOptionPost) => {
  const {
    isModalOpen,
    onCloseOptionPost,
    owner,
    postId,
    userId,
    displayLikeCount,
    setDisplayLikeCount,
    setDisplayComment,
    displayComment,
  } = props;
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

  const getCoresspondingLikeCount = (arr: any) => {
    const itemCoressponding = arr.find((item: any) => item.postId === postId);

    return itemCoressponding;
  };

  const renderLabel = (name: string, otherName: string, key: string) => {
    const itemCoressponding = getCoresspondingLikeCount(displayLikeCount);
    const itemCoressponding1 = getCoresspondingLikeCount(displayComment);

    if (key === optionKey.HIDE_LIKE_COUNT) {
      return itemCoressponding?.status ? name : otherName;
    }
    if (key === optionKey.TURN_OFF_COMMENTING) {
      return itemCoressponding1?.status ? name : otherName;
    }
    return name;
  };



  const handleClickOption = (name: string, otherName: string, key: string) => {
    const label = renderLabel(name, otherName, key);

    const newArr1 = [...displayComment];
    const item1 = getCoresspondingLikeCount(newArr1);
    const newArr = [...displayLikeCount];
    const item = getCoresspondingLikeCount(newArr);

    if (key === optionKey.CANCEL) {
      onCloseOptionPost();
    }
    if (key === optionKey.DELETE) {
      onOpenDiscardPost();
    }
    if (key === optionKey.EDIT) {
      onOpenUpdatePost();
    }
    if (key == optionKey.HIDE_LIKE_COUNT && label.includes("Hide like count")) {
      item.status = false;
      setDisplayLikeCount(newArr);
      localStorage.setItem("likeCount", JSON.stringify(newArr));
    }
    if (
      key == optionKey.HIDE_LIKE_COUNT &&
      label.includes("Un hide like count")
    ) {
      item.status = true;
      setDisplayLikeCount(newArr);
      localStorage.setItem("likeCount", JSON.stringify(newArr));
    }
    if (
      key === optionKey.TURN_OFF_COMMENTING &&
      label.includes("Turn off commenting")
    ) {
      item1.status = false;
      setDisplayComment(newArr1);
      localStorage.setItem("displayCmt", JSON.stringify(newArr1));
    }
    if (
      key === optionKey.TURN_OFF_COMMENTING &&
      label.includes("Turn on commenting")
    ) {
      item1.status = true;
      setDisplayComment(newArr1);
      localStorage.setItem("displayCmt", JSON.stringify(newArr1));
    }
  };

  useEffect(() => {
    setDisplayLikeCount(JSON.parse(localStorage.getItem("likeCount")!));
    setDisplayComment(JSON.parse(localStorage.getItem("displayCmt")!));
  }, [setDisplayLikeCount, setDisplayComment]);

  const renderOption = (options: any) => {
    return options.map((item: any, key: string) => (
      <div
        className={classNames("option", {
          "option--red": item.warning,
        })}
        key={key}
        onClick={() =>
          handleClickOption(item.name, item.opposite_name, item.key)
        }
      >
        {renderLabel(item.name, item.opposite_name, item.key)}
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
