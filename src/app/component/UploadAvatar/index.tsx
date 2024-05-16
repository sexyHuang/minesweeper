import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import { type GetProp, type UploadFile, type UploadProps, Image } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useSession } from 'next-auth/react';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type UploadAvatarProps = {};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export const UploadAvatar: React.FC<UploadAvatarProps> = () => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data, update } = useSession();
  const onChange: GetProp<UploadProps, 'onChange'> = ({
    fileList: newFileList
  }) => {
    setFileList(newFileList);
    if (newFileList[0]?.status === 'done') {
      update({
        ...data,
        user: {
          ...data?.user,
          image: newFileList[0].url
        }
      });
      message.success('上传成功');
    }
  };

  useEffect(() => {
    if (data?.user.image) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: data?.user.image
        }
      ]);
    }
  }, [data?.user.image]);

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 < 10;
    if (!isLt2M) {
      message.error('Image must smaller than 10KB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          listType="picture-circle"
          fileList={fileList}
          action={'/api/user/avatar'}
          data={file => {
            return {
              filename: file.name
            };
          }}
          beforeUpload={beforeUpload}
          onChange={onChange}
          onPreview={handlePreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage('')
          }}
          src={previewImage}
          alt="preview"
        />
      )}
    </>
  );
};
