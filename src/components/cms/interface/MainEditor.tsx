'use client';

import React, { useRef, useState } from 'react';
import { Button, Card, Input, Select } from 'antd';

import BannerUpload from '@/components/cms/Upload';
import Modal, { ModalHandle } from '@/components/Modal';
import { useCMSInterface } from '@/lib/context/CMSInterface';

export default function MainEditor() {
  const {
    contentBlocks,
    updateBlock,
    addContentBlock,
    deleteContentBlock,
    addSubBlock,
  } = useCMSInterface();
  const modalRef = useRef<ModalHandle>(null);

  // Local state for modal form
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedContent, setSelectedContent] = useState<string | undefined>(
    undefined
  );
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const handleOpenModal = (blockId: string) => {
    setActiveBlockId(blockId);
    modalRef.current?.open();
  };

  const handleLoadConfirm = () => {
    if (!activeBlockId) return;
    // TODO: you can update context here to set content for that sub block
    console.log('Load content into block:', activeBlockId, {
      category: selectedCategory,
      content: selectedContent,
    });
    modalRef.current?.close();
  };

  return (
    <>
      <div className="flex-1 space-y-12 p-8">
        {/* Hero Banner */}
        <Card title="Hero Banner">
          <BannerUpload />
        </Card>

        {/* Content Blocks */}
        {contentBlocks.map(block => (
          <Card
            key={block.id}
            title="Content Block"
            extra={
              <Button
                danger
                size="small"
                onClick={() => deleteContentBlock(block.id)}
              >
                Delete
              </Button>
            } // optional delete
            styles={{
              body: { display: 'flex', flexDirection: 'column', gap: '8px' },
            }}
            className="shadow-sm"
          >
            {/* Title Input */}
            <div className="mb-3 flex">
              <label className="text-sm mb-1 block w-200 font-medium">
                Content Block Title
              </label>
              <Input
                value={block.title}
                onChange={e => updateBlock(block.id, { title: e.target.value })}
                placeholder="Enter block title..."
              />
            </div>

            {/* Sub Blocks placeholder */}
            <div className="mb-3 flex">
              <label className="text-sm mb-1 block w-200 font-medium">
                Content Block Title
              </label>
              <div className="flex w-full flex-col gap-12">
                {block.subBlocks.map(sub => (
                  <div key={sub.id} className="flex gap-8">
                    <Button block onClick={() => handleOpenModal(block.id)}>
                      Load Content
                    </Button>
                    <Button>⇅</Button>
                    <Button danger>Delete</Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  block
                  onClick={() => addSubBlock(block.id)}
                >
                  + Add Sub Block
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add Content Block */}
        <Button type="primary" block onClick={addContentBlock}>
          + Add Content Block
        </Button>
      </div>

      <Modal
        ref={modalRef}
        title="Load Content"
        cancelText="Cancel"
        confirmText="Load"
        onCancel={() => modalRef.current?.close()}
        onConfirm={handleLoadConfirm}
      >
        <div className="space-y-12 p-16">
          <Select
            placeholder="Select Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: '100%' }}
            options={[
              { label: 'Sports', value: 'sports' },
              { label: 'News', value: 'news' },
              { label: 'Entertainment', value: 'entertainment' },
            ]}
          />
          <Select
            placeholder="Select Content Name"
            value={selectedContent}
            onChange={setSelectedContent}
            style={{ width: '100%' }}
            options={[
              { label: 'Item 1', value: 'item1' },
              { label: 'Item 2', value: 'item2' },
              { label: 'Item 3', value: 'item3' },
            ]}
          />
        </div>
      </Modal>
    </>
  );
}
