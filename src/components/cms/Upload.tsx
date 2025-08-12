'use client';

import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { useCMSInterface } from '@/lib/context/CMSInterface';

const RECT_WIDTH = 400;
const RECT_HEIGHT = 200;

const BannerUpload: React.FC = () => {
  const { heroBanner, setHeroBanner } = useCMSInterface();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1));
    if (fileList.length && fileList[0].originFileObj) {
      const reader = new FileReader();
      reader.onload = e => setHeroBanner(e.target?.result as string);
      reader.readAsDataURL(fileList[0].originFileObj as File);
    } else {
      setHeroBanner('');
    }
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <div
      style={{
        width: RECT_WIDTH,
        height: RECT_HEIGHT,
        border: '2px dashed #d9d9d9',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: heroBanner ? '#fafafa' : '#fff',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Upload
        accept="image/*"
        listType="picture"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
        showUploadList={false}
        style={{ width: '100%', height: '100%' }}
      >
        {!heroBanner ? (
          <div style={{ textAlign: 'center' }}>
            <UploadOutlined style={{ fontSize: 32, color: '#999' }} />
            <div style={{ marginTop: 8, color: '#999' }}>
              Upload Banner Image
            </div>
          </div>
        ) : (
          <img
            src={heroBanner}
            alt="Banner Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 8,
              display: 'block',
            }}
          />
        )}
      </Upload>
    </div>
  );
};

export default BannerUpload;
