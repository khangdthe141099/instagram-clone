import { Modal } from "antd";
import React, { ReactNode, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  options,
  optionKey,
  ownOptions,
  ownDetailOption,
  detailOptions,
} from "./const";
import classNames from "classnames";
import DiscardPost from "@/components/Pages/Home/Modal/DiscardPost";
import { useModal } from "@/hooks/useModal";
import { postService } from "@/services/postService";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import Loading from "@/components/Loading";
import UpdatePost from "@/components/Pages/Home/Modal/UpdatePost";
import { copyToClipboard } from "@/utils";
import { TOAST_TEXT } from "@/constant";
import { useRouter } from "next/router";
import { TYPE_OPTION_MODAL } from "@/constant";
import ReportModal from "@/components/Pages/Home/Modal/ReportModal";
import DetailAccountModal from "@/components/Pages/Home/Modal/DetailAccount";

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
  typeModal?: "detail" | "all" | any;
  initialState?: any;
  initialState1?: any;
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
    typeModal,
  } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleSetAllPost = useAllPostAction();
  const allPost = useAllPost();
  const router = useRouter();

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

  const {
    open: openReport,
    onOpenModal: onOpenReport,
    onCloseModal: onCloseReport,
  } = useModal();

  const {
    open: openDetailAccount,
    onOpenModal: onOpenDetailAccount,
    onCloseModal: onCloseDetailAccount,
  } = useModal();

  //Call when user cancel modal or click X button:
  const handleCancelModal = () => {
    onCloseOptionPost();
  };

  //Delete post when user click delete button
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

  //Get corresponding display/hide like count:
  const getCoresspondingLikeCount = (arr: any) => {
    if (!arr) return;

    const itemCoressponding = arr.find((item: any) => item.postId === postId);
    return itemCoressponding;
  };

  //Get corresponding display/hide comment:
  const getCoresspondingComment = (arr: any) => {
    if (!arr) return;

    const itemCoressponding = arr.find((item: any) => item.postId === postId);
    return itemCoressponding;
  };

  //Render label option
  const renderLabel = (name: string, otherName: string, key: string) => {
    const itemCoressponding = getCoresspondingLikeCount(displayLikeCount);
    const itemCoressponding1 = getCoresspondingComment(displayComment);

    if (key === optionKey.HIDE_LIKE_COUNT) {
      return itemCoressponding?.status ? name : otherName;
    }
    if (key === optionKey.TURN_OFF_COMMENTING) {
      return itemCoressponding1?.status ? name : otherName;
    }
    return name;
  };

  //Handle event when user clicks on options
  const handleClickOption = (name: string, otherName: string, key: string) => {
    const label = renderLabel(name, otherName, key);

    const newArr1 = [...displayComment];
    const item1 = getCoresspondingComment(newArr1);
    const newArr = [...displayLikeCount];
    const item = getCoresspondingLikeCount(newArr);

    //Close modal:
    if (key === optionKey.CANCEL) {
      onCloseOptionPost();
    }
    //Delete post:
    if (key === optionKey.DELETE) {
      onOpenDiscardPost();
    }
    //Update post:
    if (key === optionKey.EDIT) {
      onOpenUpdatePost();
    }
    if (key == optionKey.HIDE_LIKE_COUNT && label.includes("Hide like count")) {
      item.status = false;
      setDisplayLikeCount(newArr);
      localStorage.setItem("likeCount", JSON.stringify(newArr));
      onCloseOptionPost();
    }
    if (
      key == optionKey.HIDE_LIKE_COUNT &&
      label.includes("Un hide like count")
    ) {
      item.status = true;
      setDisplayLikeCount(newArr);
      localStorage.setItem("likeCount", JSON.stringify(newArr));
      onCloseOptionPost();
    }
    if (
      key === optionKey.TURN_OFF_COMMENTING &&
      label.includes("Turn off commenting")
    ) {
      item1.status = false;
      setDisplayComment(newArr1);
      localStorage.setItem("displayCmt", JSON.stringify(newArr1));
      onCloseOptionPost();
    }
    if (
      key === optionKey.TURN_OFF_COMMENTING &&
      label.includes("Turn on commenting")
    ) {
      item1.status = true;
      setDisplayComment(newArr1);
      localStorage.setItem("displayCmt", JSON.stringify(newArr1));
      onCloseOptionPost();
    }

    if (key === optionKey.GO_TO_POST) {
      router.push(`/post/${postId}`);
    }

    if (key === optionKey.REPORT) {
      onOpenReport();
      onCloseOptionPost();
    }

    if (key === optionKey.COPY_LINK) {
      copyToClipboard(`${process.env.NEXT_PUBLIC_URL}/post/${postId}`);
      toast("Link copied to clipboard.");
      onCloseOptionPost();
    }

    if (key === optionKey.ABOUT_THIS_ACCOUNT) {
      onOpenDetailAccount();
      onCloseOptionPost();
    }
  };

  //Render list options by corresponding array option
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

  //Get corresponding array of options for render list option:
  const getListOptions = () => {
    if (owner) {
      return typeModal === TYPE_OPTION_MODAL.DETAIL
        ? ownDetailOption
        : ownOptions;
    }
    if (!owner) {
      return typeModal === TYPE_OPTION_MODAL.DETAIL ? detailOptions : options;
    }
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
          {renderOption(getListOptions())}
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
      <ReportModal isModalOpen={openReport} onCloseModal={onCloseReport} />
      <DetailAccountModal
        isModalOpen={openDetailAccount}
        onCloseModal={onCloseDetailAccount}
        userId={userId}
      />
    </>
  );
};

export default OptionPost;
