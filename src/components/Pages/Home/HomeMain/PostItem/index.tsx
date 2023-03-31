import Avatar from "@/components/Avatar";
import Image from "next/image";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useRef } from "react";

type Comment = {
  peopleId?: string | number;
  content?: string;
};

interface IPostItem {
  id?: string | number;
  avatarUrl?: string;
  name?: string;
  time?: string;
  postUrl?: string[] | string;
  likes?: number[] | string[];
  comments?: Comment[];
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "468px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const PostItem = (props: IPostItem) => {
  const { id, avatarUrl, comments, likes, name, postUrl, time } = props;

  const slider = useRef<any>("");

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div className="post-item">
      <div className="post-item--top">
        <div className="post-item--top-left">
          <div className="avatar">
            <Avatar
              img={avatarUrl}
              ringWidth={40}
              ringHeight={40}
              width={36}
              height={36}
            />
          </div>
          <h4>{name}</h4>
          <div className="time-post">
            <span>•</span>
            <time dateTime="2023-03-30T15:28:44.000Z" title="Mar 30, 2023">
              {time}
            </time>
          </div>
        </div>

        <div className="post-item--top-right">
          <Image
            className="more-option"
            width={24}
            height={24}
            src={"/svg/MoreOption.svg"}
            alt="More option"
          />
        </div>
      </div>

      <div className="post-item--body">
        <div
          className="post-btn post-btn--prev"
          onClick={() => slider.current.prev()}
        >
          <div className="post-icon-inside post-icon-inside--prev"></div>
        </div>
        <div
          className="post-btn post-btn--next"
          onClick={() => slider.current.next()}
        >
          <div className="post-icon-inside post-icon-inside--next"></div>
        </div>
        <Carousel ref={slider}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default PostItem;
