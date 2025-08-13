'use client';

import React, { useRef, useState } from 'react';
import { Button, Card, Input, Select } from 'antd';
import { useTranslations } from 'next-intl';

import { Trash } from '@/assets/icons';
import SubBlockEditor from '@/components/cms/interface/SubBlockEditor';
import BannerUpload from '@/components/cms/Upload';
import Modal, { ModalHandle } from '@/components/Modal';
import { useCMSInterface } from '@/lib/context/CMSInterface';

export default function MainEditor() {
  const t = useTranslations('cms.interface');

  const {
    contentBlocks,
    updateBlock,
    addContentBlock,
    deleteContentBlock,
    addSubBlock,
    updateSubBlock,
  } = useCMSInterface();
  const modalRef = useRef<ModalHandle>(null);

  // Local state for modal form
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedContent, setSelectedContent] = useState<string>();
  const [activeBlockId, setActiveBlockId] = useState<string>('');
  const [activeSubBlockId, setActiveSubBlockId] = useState<string>('');

  const handleOpenModal = (blockId: string, subId: string) => {
    setActiveBlockId(blockId);
    setActiveSubBlockId(subId);
    modalRef.current?.open();
  };

  const handleLoadConfirm = () => {
    if (!activeBlockId || !selectedCategory) return;
    // TODO: you can update context here to set content for that sub block
    updateSubBlock(activeBlockId, activeSubBlockId, {
      category: selectedCategory,
      content: selectedContent,
    });
    modalRef.current?.close();
  };

  return (
    <>
      <div className="flex-1 space-y-12 p-8">
        {/* Hero Banner */}
        <Card title={t('heroBanner')} className="shadow-lg">
          <BannerUpload />
        </Card>

        {/* Content Blocks */}
        <label className="text-sm mb-1 block w-200 font-medium">
          {t('contentBlocks')}
        </label>
        {contentBlocks.map(block => (
          <Card
            key={block.id}
            title={block.title || t('new_block')}
            extra={
              <Button
                type="primary"
                size="small"
                onClick={() => deleteContentBlock(block.id)}
              >
                <Trash width={16} height={16} />
              </Button>
            } // optional delete
            styles={{
              body: { display: 'flex', flexDirection: 'column', gap: '12px' },
            }}
            className="shadow-lg"
          >
            {/* Title Input */}
            <div className="mb-3 flex">
              <label className="text-sm mb-1 block w-200 font-medium">
                {t('blockTitle')}
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
                {t('subContentBlocks')}
              </label>
              <div className="flex w-full flex-col gap-12">
                <SubBlockEditor
                  blockId={block.id}
                  handleOpenModal={handleOpenModal}
                />
                <Button
                  type="primary"
                  block
                  onClick={() => addSubBlock(block.id)}
                >
                  {t('addSubBlock')}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add Content Block */}
        <Button type="primary" block onClick={addContentBlock}>
          {t('addContentBlock')}
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
