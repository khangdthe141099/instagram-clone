import Image from "next/image";
import { Carousel } from "antd";
import { useRef, useState, useEffect } from "react";
import { HeartFilled } from "@ant-design/icons";
import classNames from "classnames";
import { postService } from "@/services/postService";
import { useUserDetail } from "@/store/user/selector";
import { useGetPostById } from "@/components/Pages/Home/Modal/UpdatePost/hooks";
import {
  useGetCurrentUser,
  useGetAllUser,
  useGetCurrentPost,
} from "@/pages/login/hooks";
import Link from "next/link";

interface PostImageProps {
  postUrl?: string[];
  widthImg?: number;
  heightImg?: number;
  setLikeCount?: any;
  setLiked?: any;
  postId?: string;
  setListUserLike?: any;
  setTextHideLike?: any;
  currentPost?: any;
}

const PostImage = (props: PostImageProps) => {
  const {
    postUrl,
    widthImg,
    heightImg,
    setLikeCount,
    setLiked,
    postId,
    setListUserLike,
    setTextHideLike,
    currentPost
  } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slider = useRef<any>("");
  //active user
  const userDetail = useUserDetail();
  const { allUser } = useGetAllUser();

  const onCarouselChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  //============== HANDLE LIKE POST WHEN CLICK INTO THE IMAGE ==============
  const [heartActive, setHeartActive] = useState(false);

  const checkExistLike = (arr: any) => {
    if (arr) {
      const idx = arr?.findIndex((item: any) => item === userDetail?.email);

      return idx;
    }
  };

  const getListLikeUpdate = () => {
    const idx = checkExistLike(currentPost?.likes);
    if (idx === -1) currentPost?.likes.push(userDetail?.email);
    else currentPost?.likes.splice(idx, 1);

    return currentPost?.likes;
  };

  const listLikedUsersRendering = () => {
    const listLikedUsers: any = allUser?.filter((user: any) =>
      currentPost?.likes?.includes(user.email)
    );

    setListUserLike(listLikedUsers);

    listLikedUsers.length
      ? setTextHideLike(
          <span>
            Liked by <Link href={""}>{listLikedUsers?.[0]?.username}</Link>{" "}
            {listLikedUsers.length > 1 && <span>and others</span>}
          </span>
        )
      : setTextHideLike(null);
  };

  const handleLikePost = () => {
    setLiked((prev: any) => !prev);

    const idx = checkExistLike(currentPost?.likes);
    console.log('idx', idx)

    if (idx === -1) setLikeCount((prev: any) => prev + 1);
    else setLikeCount((prev: any) => prev - 1);

    postService
      .likePost(postId, {
        likes: getListLikeUpdate() || [],
      })
      .then((res: any) => {
        console.log(res);
        listLikedUsersRendering();
      })
      .catch((err) => {
        console.log("loi:> ", err);
      });
  };

  const handleHeart = () => {
    setHeartActive(true);

    handleLikePost()

    setTimeout(() => {
      setHeartActive(false);
    }, 500);
  };

  //===================================================================

  return (
    <>
      {postUrl?.length && postUrl?.length > 1 && (
        <div>
          {currentSlide && currentSlide > 0 ? (
            <div
              className="post-btn post-btn--prev"
              onClick={() => slider.current.prev()}
            >
              <div className="post-icon-inside post-icon-inside--prev"></div>
            </div>
          ) : null}
          {currentSlide !== postUrl?.length - 1 ? (
            <div
              className="post-btn post-btn--next"
              onClick={() => slider.current.next()}
            >
              <div className="post-icon-inside post-icon-inside--next"></div>
            </div>
          ) : null}
        </div>
      )}
      <HeartFilled
        onDoubleClick={handleHeart}
        className={classNames("heart-filled", {
          "heart-filled--trigger": heartActive,
        })}
      />
      <Carousel afterChange={onCarouselChange} ref={slider}>
        {postUrl?.map((url: any, index) => (
          <Image
            onDoubleClick={handleHeart}
            key={index}
            width={widthImg || 550}
            height={heightImg || 468}
            src={url?.thumbUrl}
            alt="More option"
          />
        ))}
      </Carousel>
    </>
  );
};

export default PostImage;
