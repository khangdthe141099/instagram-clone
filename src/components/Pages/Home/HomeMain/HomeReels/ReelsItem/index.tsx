import type { FC } from "react";
import { Tooltip } from "antd";
import Avatar from '@/components/Avatar'

interface IReelsItem {
  img?: any;
  name?: string;
}

const ReelsItem: FC = (props: IReelsItem) => {

  return (
    <section className="avatar-detail">
      <Avatar img={props.img} ringWidth={60} ringHeight={60} width={56} height={56}/>
      <Tooltip title={props.name}>
        <p className="avatar-name">{props.name}</p>
      </Tooltip>
    </section>
  );
};

export default ReelsItem;
