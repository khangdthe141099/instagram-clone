import Avatar from "@/components/Avatar";
import React from "react";
import { Typography } from "antd";
import NormalButton from "@/components/AppButton/NormalButton";
import Image from "next/image";

const { Text } = Typography;

function Detail() {
  const owner = false

  const renderAction = () => {
    if(owner){
      return (
        <div className="action--list-owner">
          <NormalButton 
          width={102}
          height={32}
          text="Edit profile"
          />
          <Image 
          width={24}
          height={24}
          src="/svg/components/post/ProfileOptions.svg"
          alt="profile options"
          />
        </div>
      )
    }else {
      return (
        <div className="action--list-guest">
        <NormalButton 
          width={118}
          height={32}
          text="Following"
          suffix={true}
          srcIcon="/svg/components/post/ArrowBtn.svg"
          />
          <NormalButton 
          width={88}
          height={32}
          text="Message"
          />
          <Image 
          width={32}
          height={32}
          src="/svg/MoreOption.svg"
          alt="more options"
          />
        </div>
      )
    }
  }

  return (
    <div className="profile-detail">
      <div className="profile-detail--left">
      <Avatar
        img="https://i.pinimg.com/736x/71/fe/83/71fe83b3f2423bb24a925ff72565fd0e.jpg"
        width={150}
        height={150}
        stories={[]}
      />
      </div>

      <div className="profile-detail--right">
        <div className="action">
          <Text>KhangDT</Text>
          {renderAction()}
        </div>
      </div>
    </div>
  );
}

export default Detail;
