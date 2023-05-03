import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAllComment } from "@/store/comment/selector";

interface IPostItem {
  postUrl?: any;
  likes?: any;
  comments?: any;
  postId?: string;
  setFakeLoading?: any;
}

function PostItem(props: IPostItem) {
  const { postUrl, likes, postId, setFakeLoading } = props;
  const [cmtLength, setCmtLength] = useState(0);

  const comments = useAllComment();

  const route = useRouter();

  const handleClickPost = () => {
    setFakeLoading(true);
    setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    route.push(`/post/${postId}`);
  };

  useEffect(() => {
    const comment = comments?.filter((item: any) => item.postId === postId);

    setCmtLength(comment?.length || 0);
  }, [comments, postId]);


  return (
    <div onClick={handleClickPost} className="post-item">
      <Image
        className="post-img"
        width={309}
        height={309}
        src={postUrl?.[0]?.thumbUrl}
        alt="post item"
      />

      {postUrl?.length > 1 && (
        <Image
          className="carousel"
          width={22}
          height={22}
          src={"/svg/components/post/Carousel.svg"}
          alt="carousel"
        />
      )}

      <div className="mask">
        <div className="mask--item">
          <span className="icon icon--heart"></span>
          <span className="number">{likes?.length || 0}</span>
        </div>

        <div className="mask--item">
          <span className="icon icon--comment"></span>
          <span className="number">{cmtLength || 0}</span>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
