'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { shippingFormAtom } from '@/atoms/goodsAtom';
import CheckboxComponent from '@/components/Checkbox';
import { useAuth } from '@/lib/authentication/auth-context';
import {
  getShippingAddressList,
  SHIPPING_KEY,
  ShippingAddressType,
} from '@/lib/supabase/swr/shipping';

import styles from './ShippingForm.module.scss';

export default function ShippingForm() {
  const t = useTranslations('ordering');
  const [shippingForm, setShippingForm] = useAtom(shippingFormAtom);
  const [form] = Form.useForm();
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const [isDaumApiReady, setIsDaumApiReady] = useState(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState(true);
  const { user } = useAuth();

  const { data: shippingListData, error } = useSWR(
    SHIPPING_KEY.all,
    user ? () => getShippingAddressList(user?.id) : null
  );

  const addressList = shippingListData?.data ?? [];

  useEffect(() => {
    if (addressList) {
      const defaultAddress = addressList.findLast(
        (address: ShippingAddressType) => address.is_default
      );

      if (defaultAddress) {
        const isDirectInput =
          defaultAddress?.note !== SHIPPING_OPTIONS[0].value &&
          defaultAddress?.note !== SHIPPING_OPTIONS[1].value;
        const address = {
          ...defaultAddress,
          note: isDirectInput
            ? SHIPPING_OPTIONS[2].value
            : defaultAddress?.note,
          note_custom: isDirectInput ? defaultAddress?.note : '',
        };
        form.setFieldsValue(address);
        setShippingForm(address);
      }
    }
  }, [addressList]);

  const SHIPPING_OPTIONS = [
    {
      label: t('please_place_it_in_front_of_the_door_in_case_of_absence'),
      value: 'Please place it in front of the door in case of absence.',
    },
    {
      label: t('please_place_it_in_the_guard_room_in_the_absence'),
      value: 'Please place it in the guard room in the absence.',
    },
    {
      label: t('direct_input'),
      value: 'Direct input',
    },
  ];

  // start of Daum Postcode API
  const openDaumPostcode = (searchTerm: string) => {
    // Check if Daum Postcode API is loaded
    if (typeof window === 'undefined' || !(window as any).daum) {
      console.error('Daum Postcode API is not loaded');
      return;
    }

    try {
      new (window as any).daum.Postcode({
        theme: {
          color: '#000000',
          bgColor: '#ffffff',
          borderColor: '#000000',
          textColor: '#000000',
          outlineColor: '#000000',
          searchBgColor: '#ffffff',
          pageBgColor: '#ffffff',
          windowWidth: '100%',
          windowHeight: '100%',
        },
        oncomplete: (data: any) => {
          const updatedForm = {
            ...shippingForm,
            address: data.address,
          };

          setShippingForm(updatedForm);
          form.setFieldsValue({
            address: data.address,
          });
        },
        maxSuggestItems: 5,
        showMoreHName: true,
        hideMapBtn: false,
        hideEngBtn: false,
        alwaysShowEngAddr: false,
        submitMode: false,
        useBanner: true,
        useSuggest: true,
        autoMapping: true,
        autoMappingRoad: true,
        autoMappingJibun: true,
        shorthand: true,
        pleaseReadGuide: 0,
        pleaseReadGuideTimer: 1.5,
      }).open({
        q: searchTerm,
      });
    } catch (error) {
      console.error('Error opening Daum Postcode:', error);
    }
  };

  // const onSearch = (value: string) => {
  //   const newQuery = value;

  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }

  //   // wait, e.g. 500ms after user stopped typing
  //   const timeout = setTimeout(() => {
  //     if (newQuery.trim() !== '') {
  //       if (isDaumApiReady) {
  //         openDaumPostcode(newQuery.trim());
  //       } else {
  //         console.warn('Daum Postcode API is not ready yet');
  //         // Try to open anyway in case the API loaded after our check
  //         openDaumPostcode(newQuery.trim());
  //       }
  //     }
  //   }, 500);
  //   setTypingTimeout(timeout);
  // };

  // Listen to form field changes
  const onValuesChange = (changedValues: any, allValues: any) => {
    setShippingForm(allValues);
  };

  // Check if Daum Postcode API is ready
  useEffect(() => {
    const checkDaumApi = () => {
      if (typeof window !== 'undefined' && (window as any).daum) {
        setIsDaumApiReady(true);
        console.log('Daum Postcode API is ready');
      } else {
        // Retry after a short delay
        setTimeout(checkDaumApi, 100);
      }
    };

    checkDaumApi();
  }, []);

  // end of Daum Postcode API

  // Initialize form with existing atom values
  useEffect(() => {
    if (shippingForm && Object.keys(shippingForm).length > 0) {
      form.setFieldsValue(shippingForm);
    }
  }, [form, shippingForm]);

  useEffect(() => {
    setShippingForm({
      ...shippingForm,
      is_default: isDefaultShipping,
    });
  }, [isDefaultShipping]);

  return (
    <div className="flex flex-col gap-16 bg-white p-16">
      <h5 className="text-16 font-semibold text-gray-00">
        {t('shipping_information')}
      </h5>
      <Form
        name="shippingForm"
        layout="horizontal"
        className={styles.shippingForm}
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="receiver_name" label={t('conferee')} required>
          <Input placeholder={t('conferee_placeholder')} />
        </Form.Item>
        <Form.Item name="phone_number" label={t('phone_number')} required>
          <Input placeholder={t('phone_number_placeholder')} type="number" />
        </Form.Item>
        <Form.Item name="address" label={t('address')} required>
          <Input.Search
            onClick={() => {
              if (isDaumApiReady) {
                openDaumPostcode('');
              }
            }}
            onSearch={() => {
              if (isDaumApiReady) {
                openDaumPostcode('');
              }
            }}
            placeholder={t('address_placeholder')}
            loading={!isDaumApiReady}
          />
        </Form.Item>
        <div id="daumPostcodeEmbed" className="mb-24" />
        <Form.Item name="detailed_address" label={t('detail_address')} required>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="is_default"
          label={t('set_default_shipping')}
          className="hidden"
        />
        <div className="mb-16 flex flex-row items-center gap-8 text-14 font-semibold text-gray-00">
          <CheckboxComponent
            disabled={false}
            defaultChecked={isDefaultShipping}
            onChange={e => setIsDefaultShipping(e.target.checked)}
            className="h-20 min-w-20"
          />
          {t('set_default_shipping')}
        </div>
        <Form.Item name="note">
          <Select
            options={SHIPPING_OPTIONS}
            onChange={value => {
              setShippingForm({
                ...shippingForm,
                note: value,
                note_custom: '',
              });
              form.setFieldsValue({ note: value, note_custom: '' });
            }}
          />
        </Form.Item>
        {shippingForm?.note &&
          shippingForm?.note !== SHIPPING_OPTIONS[0].value &&
          shippingForm?.note !== SHIPPING_OPTIONS[1].value && (
            <Form.Item name="note_custom">
              <Input.TextArea
                maxLength={80}
                rows={2}
                value={shippingForm?.note}
                placeholder={t('delivery_request_placeholder')}
              />
            </Form.Item>
          )}
      </Form>
    </div>
  );
}
