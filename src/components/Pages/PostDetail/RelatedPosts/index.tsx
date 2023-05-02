import React, { useEffect, useState } from "react";
import { Typography, Skeleton } from "antd";
import PostItem from "./PostItem";
import { useRouter } from "next/router";
import { useGetCurrentUser } from "@/pages/login/hooks";
import { useGetPostByUserId } from "@/components/Pages/Home/Modal/UpdatePost/hooks";
import PostSkeleton from "@/components/AppSkeleton/PostSkeleton";
import { useAllPost } from "@/store/post/selector";

const { Text } = Typography;

function RelatedPosts(props: any) {
  const { setFakeLoading } = props;

  const [listPost, setListPosts] = useState<any>([]);
  const [currentPost, setCurrentPost] = useState<any>([]);

  const allPost = useAllPost();

  const route = useRouter();
  const { postId } = route.query;
  const { currentUser } = useGetCurrentUser(currentPost?.userId) as any;

  const { isLoading: postLoading } = useGetPostByUserId(currentUser?.email);

  useEffect(() => {
    const crrPost = allPost.find((item: any) => item?._id === postId);

    setCurrentPost(crrPost);
  }, [allPost, postId]);

  useEffect(() => {
    const lstPost = allPost.filter(
      (item: any) => item.userId == currentUser?.email
    );

    setListPosts(lstPost);
  }, [allPost, currentUser?.email]);

  return (
    <div className="relatedposts">
      <div className="relatedposts-wrapper">
        <Text className="title">
          <span>More posts from</span>
          <span className="name">
            {currentUser?.username || (
              <Skeleton.Input
                style={{ height: 10, marginTop: 6, marginLeft: 10 }}
                active={true}
                size={"small"}
                block={true}
              />
            )}
          </span>
        </Text>

        <div className="post-list">
          <div className="post-list--wrapper">
            {!postLoading ? (
              listPost
                .slice(0, 3)
                .map((item: any, index: string) => (
                  <PostItem
                    {...item}
                    key={index}
                    postId={item?._id}
                    setFakeLoading={setFakeLoading}
                  />
                ))
            ) : (
              <div className="post-loading">
                {Array(3)
                  .fill("")
                  .map((item: any, index) => (
                    <PostSkeleton
                      imgClassname={"post-loading--item"}
                      key={index}
                      hasHeader={false}
                      heightImg={309}
                      widthImg={309}
                    />
                  ))}
              </div>
            )}
          </div>

          <div className="post-list--wrapper">
            {!postLoading ? (
              listPost
                .slice(3, 6)
                .map((item: any, index: string) => (
                  <PostItem
                    {...item}
                    key={index}
                    postId={item?._id}
                    setFakeLoading={setFakeLoading}
                  />
                ))
            ) : (
              <div className="post-loading">
                {Array(3)
                  .fill("")
                  .map((item: any, index) => (
                    <PostSkeleton
                      imgClassname={"post-loading--item"}
                      key={index}
                      hasHeader={false}
                      heightImg={309}
                      widthImg={309}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedPosts;
