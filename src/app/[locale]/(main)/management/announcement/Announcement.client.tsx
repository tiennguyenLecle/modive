'use client';

import { useState } from 'react';
import { Collapse } from 'antd';
import dayjs from 'dayjs';
import useSWR from 'swr';

import { ArrowRight, Chevron, ChevronDown } from '@/assets/icons';
import { cx } from '@/utils/method';

import { getAnnouncements } from './actions';
import styles from './Announcement.module.scss';

const AnnouncementClient = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(['2']);
  const announcements = useSWR('announcements', getAnnouncements);

  const handleChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  return (
    <div className="px-16">
      <Collapse
        activeKey={activeKeys}
        onChange={handleChange}
        className={styles.faqCollapse}
      >
        {announcements.data?.map(announcement => {
          const isActive = activeKeys.includes(announcement.id);
          return (
            <Collapse.Panel
              key={announcement.id}
              header={
                <div>
                  <h3
                    className={cx(
                      'text-14 font-normal',
                      isActive ? 'text-primary' : 'text-gray-00'
                    )}
                  >
                    {announcement.title}
                  </h3>
                  <div className="flex justify-between gap-8">
                    <time
                      className={cx(
                        'text-12 transition-colors',
                        isActive ? 'text-secondary' : 'text-gray-40'
                      )}
                    >
                      {dayjs(announcement.publication_date).format(
                        'YYYY.MM.DD'
                      )}
                    </time>
                    <ArrowRight
                      className={cx(
                        'size-18 transition-all',
                        isActive
                          ? 'rotate-90 text-primary'
                          : '-rotate-90 text-gray-70'
                      )}
                    />
                  </div>
                </div>
              }
            >
              <div className="whitespace-pre-wrap">{announcement.content}</div>
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default AnnouncementClient;
