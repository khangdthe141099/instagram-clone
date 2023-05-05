import React, { useEffect, useState } from "react";
import { Typography, Switch, Upload, Modal } from "antd";
import Avatar from "@/components/Avatar";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { getBase64 } from "@/utils";
import Image from "next/image";
import { useUserDetail } from "@/store/user/selector";
import { useRouter } from "next/router";
import { userService } from "@/services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";
import { useUserAction, useLoginMethod } from "@/store/user/selector";
import { LOGIN_TYPE } from "@/constant";

const { Text } = Typography;

function Edit() {
  const [mounted, setMounted] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const activeUser = useUserDetail();
  const handleSetUserDetail = useUserAction();
  const method = useLoginMethod();

  const onChangeSwitch = (checked: boolean) => {
    setIsPrivate(checked);
  };

  const onChangeBio = (event: any) => {
    if (event.target.value.length > 150) return;

    setBio(event.target.value);
  };


  const handleUpdateUser = () => {
    const userId = activeUser?._id;
    setLoading(true);

    if (userId) {
      userService
        .updateUserInfo(userId, {
          profileImg: fileList?.[0]?.thumbUrl || "",
          bio: bio,
          is_private: isPrivate,
        })
        .then(async (res: any) => {
          const user = res?.data?.user;
          handleSetUserDetail(user);

          toast("Update user information successfully !");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast("Update user information failed !");
          console.log("loi:>", err);
        });
    }
  };

  useEffect(() => {
    setFileList([
      {
        uid: "1",
        name: "avatar.png",
        status: "done",
        thumbUrl: activeUser?.profileImg,
      },
    ]);
    setBio(activeUser?.bio && activeUser?.bio);
    setIsPrivate(activeUser?.is_private);
  }, [activeUser]);

  //=================== Upload Image ========================

  //Change when upload image:
  const onChangeImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  //Open preview:
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  //Cancel preview:
  const handleCancel = () => setPreviewOpen(false);

  //==========================================================

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="editpage">
      <Text className="head-title">Edit profile</Text>

      {mounted && (
        <main className="main">
          <div className="group">
            <div className="avatar-wrapper">
              <ImgCrop rotationSlider>
                <Upload
                  fileList={fileList}
                  onChange={onChangeImage}
                  onPreview={handlePreview}
                  maxCount={1}
                  listType="picture-circle"
                >
                  {fileList?.length < 1 && (
                    <>
                      <Image
                        className="more-option"
                        width={66}
                        height={47}
                        src={"/svg/components/post/DragPhoto.svg"}
                        alt="Drag Photo"
                      />
                      <Text>Drag photos and videos here</Text>
                    </>
                  )}
                </Upload>
              </ImgCrop>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <Image
                  alt="preview image"
                  style={{ width: "100%" }}
                  src={previewImage}
                  width={10}
                  height={350}
                />
              </Modal>
            </div>

            <div className="info">
              <Text className="name">
                {activeUser?.username || activeUser?.email}
              </Text>
              <Text className="change-photo">Change profile photo</Text>
            </div>
          </div>

          <div className="group">
            <Text className="title">Bio</Text>
            <div className="area-wrap">
              <textarea value={bio} onChange={onChangeBio} className="bio" />
              <Text className="count-text">
                {bio?.length ? bio?.length : 0}/150
              </Text>
            </div>
          </div>

          <div className="group">
            <Text className="title">Private</Text>
            <Switch
              className="switch"
              checkedChildren="ON"
              unCheckedChildren="OFF"
              checked={isPrivate}
              onChange={onChangeSwitch}
            />
          </div>

          <div className="btn-wrapper">
            <button onClick={handleUpdateUser} className="btn btn--submit">
              {loading ? <Loading width={20} height={20} /> : "Submit"}
            </button>
            <button
              onClick={() => router.push(`/profile/${activeUser?.email}`)}
              className="btn btn--back"
            >
              Back to profile
            </button>
          </div>
        </main>
      )}
      <ToastContainer />
    </div>
  );
}

export default Edit;
