'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { Info } from '@/assets/icons';
import { Button } from '@/components';
import Checkbox from '@/components/Checkbox/Checkbox';
import { Link, useRouter } from '@/lib/navigation';
import { APP_LINKS, ROUTES } from '@/utils/constants';
import { cx, debounce } from '@/utils/method';

import ModalNotOldEnough from './_modal/ModalNotOldEnough';
import { isUniqueNickname, signUpData } from './actions';
import styles from './JoinMembership.module.scss';

type JoinMembershipClientProps = {
  initialValues: {
    userId?: string;
    name?: string;
    phone?: string;
    nickname?: string;
  };
};

type FormData = {
  userId: string;
  name: string;
  phone: string;
  nickname: string;
  birthday: {
    year: string;
    month: string;
    day: string;
  };
  agree_all: boolean;
  agree_service_terms_and_conditions: boolean;
  agree_privacy_policy: boolean;
  agree_third_party_personal_information_collection_and_use_agreement: boolean;
};

const JoinMembershipClient: React.FC<JoinMembershipClientProps> = ({
  initialValues,
}) => {
  const t = useTranslations('join_membership');
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRedirect = searchParams?.get('redirect') || null;
  const [form] = Form.useForm();
  const values = Form.useWatch<FormData>([], form);
  const [submitable, setSubmitable] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const modalNotOldEnoughRef =
    useRef<React.ElementRef<typeof ModalNotOldEnough>>(null);
  const { mutate } = useSWRConfig();
  const yearRef = useRef<any>(null);
  const monthRef = useRef<any>(null);
  const dayRef = useRef<any>(null);

  const handleSubmit = useSWRMutation(
    'sign-up-data',
    async (url: string, { arg }: { arg: any }) => {
      try {
        const {
          userId,
          name,
          phone,
          nickname,
          birthday: { year, month, day },
          agree_service_terms_and_conditions,
          agree_privacy_policy,
          agree_third_party_personal_information_collection_and_use_agreement,
        } = arg;

        const userAge = new Date().getFullYear() - parseInt(year);
        if (userAge < 14) {
          modalNotOldEnoughRef.current?.open();
          throw new Error('User is not old enough');
        }

        await signUpData({
          userId,
          name,
          phone,
          nickname,
          date_of_birth: `${year}-${month}-${day}`,
          metadata: {
            agree_service_terms_and_conditions,
            agree_privacy_policy,
            agree_third_party_personal_information_collection_and_use_agreement,
          },
        });
      } catch (error) {
        console.error('handleSubmit: ', error);
      }
    },
    {
      onSuccess: async () => {
        mutate('me');
        router.push(nextRedirect || ROUTES.HOME);
      },
    }
  );

  const validateNickname = useSWRMutation(
    'validate-nickname',
    (url: string, { arg }: { arg: any }) => {
      return isUniqueNickname(arg);
    }
  );

  const validateNicknameDebounced = useMemo(
    () => debounce(validateNickname.trigger, 500),
    [validateNickname.trigger]
  );

  // Format Korean mobile number to 010-1234-5678 while typing
  const formatPhone = (raw: string) => {
    const digits = (raw || '').replace(/\D/g, '').slice(0, 11);
    const head = digits.slice(0, 3);
    const mid = digits.slice(3, 7);
    const tail = digits.slice(7, 11);
    if (digits.length <= 3) return head;
    if (digits.length <= 7) return `${head}-${mid}`;
    return `${head}-${mid}-${tail}`;
  };

  useEffect(() => {
    const isAgreeAll =
      values?.agree_service_terms_and_conditions &&
      values?.agree_privacy_policy &&
      values?.agree_third_party_personal_information_collection_and_use_agreement;

    form.setFieldsValue({
      agree_all: isAgreeAll,
    });
  }, [values, form]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmitable(true);
      })
      .catch(() => {
        setSubmitable(false);
      });
  }, [values, form]);

  return (
    <>
      <Form
        form={form}
        className={styles.joinMembership}
        initialValues={initialValues}
        onFinish={handleSubmit.trigger}
        colon={false}
        layout="vertical"
      >
        <Form.Item name="userId" noStyle hidden />
        <Form.Item
          name="name"
          label={t('name')}
          rules={[{ required: true, message: '' }]}
          className="mb-16"
        >
          <Input
            size="large"
            placeholder={t('name_placeholder')}
            disabled={!!initialValues.name}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t('phone')}
          rules={[{ required: true, message: '' }]}
          className="mb-16"
          getValueFromEvent={e => formatPhone(e.target.value)}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Input
            size="large"
            inputMode="numeric"
            maxLength={13}
            disabled={!!initialValues.phone}
            placeholder={t('phone_placeholder')}
          />
        </Form.Item>
        <Form.Item
          name="nickname"
          label={t('nickname')}
          rules={[
            { required: true, message: '' },
            {
              validator: (_, value) => {
                console.log('validate value: ', value);
                return new Promise<void>(async (resolve, reject) => {
                  if (!value) return resolve();

                  const unique = await validateNicknameDebounced(value);
                  if (!unique) {
                    setNicknameError(t('nickname_already_exists'));
                    return reject('');
                  } else {
                    setNicknameError(null);
                  }
                  resolve();
                });
              },
            },
          ]}
          validateTrigger={['onChange', 'onBlur']}
          className="mb-8"
        >
          <Input
            size="large"
            placeholder={t('nickname_placeholder')}
            disabled={!!initialValues.nickname}
            maxLength={12}
          />
        </Form.Item>
        <div className="mb-16 flex items-center text-12 text-gray-50">
          {nicknameError && (
            <div className="flex items-center gap-4 text-primary">
              <Info className="text-priamary size-14" />
              {nicknameError}
            </div>
          )}
          <span className="ml-auto">
            {t('limit_letters', {
              limit: 12,
              current: values?.nickname?.length || 0,
            })}
          </span>
        </div>
        <Form.Item
          label={t('birthday')}
          rules={[{ required: true, message: '' }]}
          className="mb-32"
        >
          <div className="birthdate-container flex items-center border-b border-gray-70">
            <Form.Item
              name={['birthday', 'year']}
              noStyle
              rules={[{ required: true, message: '' }]}
              className="mb-0"
            >
              <InputNumber
                size="large"
                placeholder="YYYY"
                maxLength={4}
                className="flex-1 text-center"
                max={new Date().getFullYear()}
                ref={yearRef}
                onChange={value => {
                  const str = String(value ?? '');
                  if (str.length >= 4) {
                    monthRef.current?.focus?.();
                  }
                }}
              />
            </Form.Item>
            <span className="text-14 text-gray-70">/</span>
            <Form.Item
              name={['birthday', 'month']}
              noStyle
              rules={[{ required: true, message: '' }]}
              className="mb-0"
            >
              <InputNumber
                size="large"
                placeholder="MM"
                maxLength={2}
                max={12}
                className="flex-1 text-center"
                ref={monthRef}
                onChange={value => {
                  const str = String(value ?? '');
                  if (str.length >= 2) {
                    dayRef.current?.focus?.();
                  }
                }}
              />
            </Form.Item>
            <span className="text-14 text-gray-70">/</span>
            <Form.Item
              name={['birthday', 'day']}
              noStyle
              rules={[{ required: true, message: '' }]}
              className="mb-0"
            >
              <InputNumber
                size="large"
                placeholder="DD"
                maxLength={2}
                max={31}
                className="flex-1 text-center"
                ref={dayRef}
              />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          name="agree_all"
          required
          className="mb-12"
          valuePropName="checked"
        >
          <Checkbox
            className="text-16 font-bold text-gray-00"
            onChange={event => {
              const checked = event.target.checked;
              form.setFieldsValue({
                agree_service_terms_and_conditions: checked,
                agree_privacy_policy: checked,
                agree_third_party_personal_information_collection_and_use_agreement:
                  checked,
              });
            }}
          >
            <div className="leading-normal">
              {t('agree_all_terms_and_conditions')}
            </div>
          </Checkbox>
        </Form.Item>
        <div className="selection-container rounded-4 border border-gray-70 bg-gray-90 p-8 text-12 font-semibold text-gray-40">
          <Form.Item
            name="agree_service_terms_and_conditions"
            required
            className="mb-0"
            valuePropName="checked"
            rules={[
              {
                validator: async (_, checked) => {
                  if (!checked) {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Checkbox>
              <span className="mr-4 text-primary">[{t('essential')}]</span>
              <Link
                href={APP_LINKS.SERVICE_TERMS_AND_CONDITIONS}
                target="_blank"
                className="text-gray-40 underline hover:!text-primary"
              >
                {t('service_terms_and_conditions')}
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="agree_privacy_policy"
            required
            className="mb-0"
            valuePropName="checked"
            rules={[
              {
                validator: async (_, checked) => {
                  if (!checked) {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Checkbox>
              <span className="mr-4 text-primary">[{t('essential')}]</span>
              <Link
                href={APP_LINKS.PRIVACY_POLICY}
                target="_blank"
                className="text-gray-40 underline hover:!text-primary"
              >
                {t('privacy_policy')}
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="agree_third_party_personal_information_collection_and_use_agreement"
            className="mb-0"
            valuePropName="checked"
          >
            <Checkbox>
              <span className="mr-4 text-gray-40">[{t('optional')}]</span>
              <span className="text-gray-40">
                {t(
                  'third_party_personal_information_collection_and_use_agreement'
                )}
              </span>
            </Checkbox>
          </Form.Item>
        </div>
      </Form>
      <Button
        variant="primary"
        type="submit"
        className={cx(
          'sticky bottom-0 mt-auto !rounded-0 !p-16 text-16 font-semibold !opacity-100',
          !submitable && '!bg-gray-02 !text-gray-50'
        )}
        disabled={!submitable}
        onClick={() => {
          form.submit();
        }}
        loading={validateNickname.isMutating || handleSubmit.isMutating}
      >
        {!submitable ? t('please_fill_in_all_information') : t('submit')}
      </Button>
      <ModalNotOldEnough ref={modalNotOldEnoughRef} />
    </>
  );
};

export default JoinMembershipClient;
