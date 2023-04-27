import React from "react";
import Image from "next/image";

function PostItem() {
  return (
    <div className="more-post-item">
      <Image
        width={309}
        height={309}
        src={'/images/post/flower1.jpg'}
        alt={'post item'}
      />
    </div>
  );
}

export default PostItem;
