-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public._migrations (
  id integer NOT NULL DEFAULT nextval('_migrations_id_seq'::regclass),
  hash text NOT NULL,
  created_at bigint,
  CONSTRAINT _migrations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.announcements (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  title text NOT NULL,
  content text,
  publication_date timestamp with time zone,
  expiration_date timestamp with time zone,
  status USER-DEFINED DEFAULT 'draft'::announcement_status,
  CONSTRAINT announcements_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cart_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  cart_id uuid NOT NULL,
  chapter_id uuid,
  quantity integer DEFAULT 1,
  unit_price numeric DEFAULT 0.00,
  total_price numeric DEFAULT 0.00,
  good_id uuid,
  work_id uuid,
  item_type USER-DEFINED NOT NULL DEFAULT 'chapter'::order_item_type,
  CONSTRAINT cart_items_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_cart_id_carts_id_fk FOREIGN KEY (cart_id) REFERENCES public.carts(id),
  CONSTRAINT cart_items_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id),
  CONSTRAINT cart_items_good_id_goods_id_fk FOREIGN KEY (good_id) REFERENCES public.goods(id),
  CONSTRAINT cart_items_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id)
);
CREATE TABLE public.carts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  user_id uuid,
  total_items integer DEFAULT 0,
  total numeric DEFAULT 0.00,
  CONSTRAINT carts_pkey PRIMARY KEY (id),
  CONSTRAINT carts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  title character varying NOT NULL,
  parent_id uuid,
  description text,
  type USER-DEFINED DEFAULT 'work'::category_type,
  position integer DEFAULT 1,
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_parent_id_categories_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id)
);
CREATE TABLE public.chapter_actions (
  user_id uuid NOT NULL,
  chapter_id uuid NOT NULL,
  action USER-DEFINED NOT NULL,
  CONSTRAINT chapter_actions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT chapter_actions_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id)
);
CREATE TABLE public.chapter_characters (
  chapter_id uuid NOT NULL,
  character_id uuid NOT NULL,
  is_main boolean DEFAULT false,
  CONSTRAINT chapter_characters_pkey PRIMARY KEY (chapter_id, character_id),
  CONSTRAINT chapter_characters_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id),
  CONSTRAINT chapter_characters_character_id_works_id_fk FOREIGN KEY (character_id) REFERENCES public.works(id)
);
CREATE TABLE public.chapters (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  name character varying NOT NULL,
  position integer DEFAULT 1,
  work_id uuid,
  content text,
  is_published boolean DEFAULT true,
  introduction text DEFAULT ''::text,
  tags ARRAY,
  price numeric DEFAULT 0.00,
  currency USER-DEFINED DEFAULT 'krw'::currency,
  thumbnail_id uuid,
  content_media_key text,
  thumbnail_key text,
  CONSTRAINT chapters_pkey PRIMARY KEY (id),
  CONSTRAINT chapters_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id),
  CONSTRAINT chapters_thumbnail_id_medias_id_fk FOREIGN KEY (thumbnail_id) REFERENCES public.medias(id)
);
CREATE TABLE public.character_likes (
  character_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT character_likes_pkey PRIMARY KEY (character_id, user_id),
  CONSTRAINT character_likes_character_id_characters_id_fk FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT character_likes_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.character_medias (
  character_id uuid NOT NULL,
  media_id uuid NOT NULL,
  CONSTRAINT character_medias_pkey PRIMARY KEY (character_id, media_id),
  CONSTRAINT character_medias_character_id_characters_id_fk FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT character_medias_media_id_medias_id_fk FOREIGN KEY (media_id) REFERENCES public.medias(id)
);
CREATE TABLE public.characters (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  work_id uuid,
  name character varying NOT NULL,
  full_name text,
  age integer,
  gender USER-DEFINED DEFAULT 'unknown'::gender,
  date_of_birth timestamp with time zone,
  place_of_birth character varying,
  nationality character varying,
  introduction text DEFAULT ''::text,
  occupation character varying,
  quote text,
  avatar_id uuid,
  total_likes integer DEFAULT 0,
  metadata jsonb,
  avatar_key text,
  bot_id text,
  CONSTRAINT characters_pkey PRIMARY KEY (id),
  CONSTRAINT characters_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id),
  CONSTRAINT characters_avatar_id_medias_id_fk FOREIGN KEY (avatar_id) REFERENCES public.medias(id)
);
CREATE TABLE public.chat_rooms (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  name character varying,
  type USER-DEFINED DEFAULT 'general'::chat_room_type,
  session_id text,
  universe_id text,
  theme_id uuid,
  chapter_id uuid,
  user_id uuid,
  last_message text DEFAULT ''::text,
  last_accessed_at timestamp with time zone,
  is_pinned boolean DEFAULT false,
  intimacy integer DEFAULT 0,
  progress integer DEFAULT 0,
  theme_key text,
  character_id uuid,
  work_id uuid,
  pinned_at timestamp with time zone,
  room_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT chat_rooms_pkey PRIMARY KEY (id),
  CONSTRAINT chat_rooms_theme_id_medias_id_fk FOREIGN KEY (theme_id) REFERENCES public.medias(id),
  CONSTRAINT chat_rooms_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id),
  CONSTRAINT chat_rooms_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT chat_rooms_character_id_characters_id_fk FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT chat_rooms_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id)
);
CREATE TABLE public.coin_packages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  status USER-DEFINED DEFAULT 'active'::coin_package_status,
  name character varying NOT NULL,
  description text,
  position integer DEFAULT 1,
  price numeric NOT NULL,
  coins_credit integer NOT NULL,
  bonus integer DEFAULT 0,
  currency USER-DEFINED DEFAULT 'krw'::currency,
  CONSTRAINT coin_packages_pkey PRIMARY KEY (id)
);
CREATE TABLE public.comment_likes (
  comment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT comment_likes_pkey PRIMARY KEY (comment_id, user_id),
  CONSTRAINT comment_likes_comment_id_comments_id_fk FOREIGN KEY (comment_id) REFERENCES public.comments(id),
  CONSTRAINT comment_likes_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.comment_medias (
  comment_id uuid NOT NULL,
  media_id uuid NOT NULL,
  CONSTRAINT comment_medias_pkey PRIMARY KEY (comment_id, media_id),
  CONSTRAINT comment_medias_comment_id_comments_id_fk FOREIGN KEY (comment_id) REFERENCES public.comments(id),
  CONSTRAINT comment_medias_media_id_medias_id_fk FOREIGN KEY (media_id) REFERENCES public.medias(id)
);
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  work_id uuid NOT NULL,
  user_id uuid NOT NULL,
  content text,
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id),
  CONSTRAINT comments_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.debug_logs (
  id integer NOT NULL DEFAULT nextval('debug_logs_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  message text,
  CONSTRAINT debug_logs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.faq (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  publication_date timestamp with time zone,
  title text NOT NULL,
  content text,
  status USER-DEFINED DEFAULT 'draft'::faq_status,
  CONSTRAINT faq_pkey PRIMARY KEY (id)
);
CREATE TABLE public.good_categories (
  good_id uuid NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT good_categories_pkey PRIMARY KEY (good_id, category_id),
  CONSTRAINT good_categories_good_id_goods_id_fk FOREIGN KEY (good_id) REFERENCES public.goods(id),
  CONSTRAINT good_categories_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.good_storage_objects (
  good_id uuid NOT NULL,
  key text NOT NULL,
  CONSTRAINT good_storage_objects_pkey PRIMARY KEY (good_id, key),
  CONSTRAINT good_storage_objects_good_id_goods_id_fk FOREIGN KEY (good_id) REFERENCES public.goods(id)
);
CREATE TABLE public.goods (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  title character varying NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0.00,
  currency USER-DEFINED DEFAULT 'krw'::currency,
  thumbnail_id uuid,
  url text,
  thumbnail_key text,
  quantity integer DEFAULT 1,
  status USER-DEFINED DEFAULT 'draft'::good_status,
  purchase_link text,
  work_id uuid,
  CONSTRAINT goods_pkey PRIMARY KEY (id),
  CONSTRAINT goods_thumbnail_id_medias_id_fk FOREIGN KEY (thumbnail_id) REFERENCES public.medias(id),
  CONSTRAINT goods_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id)
);
CREATE TABLE public.interfaces (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  banner_key text NOT NULL,
  blocks jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT interfaces_pkey PRIMARY KEY (id)
);
CREATE TABLE public.languages (
  code character varying NOT NULL,
  name character varying NOT NULL,
  is_default boolean DEFAULT false,
  CONSTRAINT languages_pkey PRIMARY KEY (code)
);
CREATE TABLE public.medias (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  url text NOT NULL,
  type text NOT NULL,
  mime_type character varying,
  file_type character varying,
  file_size integer,
  uploader_id uuid,
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT medias_pkey PRIMARY KEY (id),
  CONSTRAINT medias_uploader_id_users_id_fk FOREIGN KEY (uploader_id) REFERENCES public.users(id)
);
CREATE TABLE public.notification_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  user_id uuid,
  token text DEFAULT ''::text,
  os USER-DEFINED DEFAULT 'web'::notification_os,
  CONSTRAINT notification_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT notification_tokens_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  sender_id uuid,
  receiver_id uuid,
  title text,
  content text,
  type USER-DEFINED DEFAULT 'new_message'::notification_type,
  data jsonb DEFAULT '{}'::jsonb,
  is_read boolean DEFAULT false,
  expiration_date timestamp without time zone,
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_sender_id_users_id_fk FOREIGN KEY (sender_id) REFERENCES public.users(id),
  CONSTRAINT notifications_receiver_id_users_id_fk FOREIGN KEY (receiver_id) REFERENCES public.users(id)
);
CREATE TABLE public.order_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  order_id uuid,
  chapter_id uuid,
  quantity integer DEFAULT 1,
  unit_price numeric DEFAULT 0.00,
  total_price numeric DEFAULT 0.00,
  good_id uuid,
  work_id uuid,
  item_type USER-DEFINED NOT NULL DEFAULT 'chapter'::order_item_type,
  item_snapshot jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_orders_id_fk FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id),
  CONSTRAINT order_items_good_id_goods_id_fk FOREIGN KEY (good_id) REFERENCES public.goods(id),
  CONSTRAINT order_items_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  user_id uuid,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::order_status,
  total_items integer DEFAULT 0,
  total_amount numeric DEFAULT 0.00,
  transaction_id uuid,
  paid_at timestamp with time zone,
  confirmed_at timestamp with time zone,
  refunded_at timestamp with time zone,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT orders_transaction_id_transactions_id_fk FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.plans (
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  position integer DEFAULT 1,
  code character varying NOT NULL,
  name character varying NOT NULL,
  description text,
  status USER-DEFINED DEFAULT 'active'::plan_status,
  coins_credit integer DEFAULT 0,
  trial_days integer DEFAULT 0,
  monthly_price numeric DEFAULT 0.00,
  yearly_price numeric DEFAULT 0.00,
  currency USER-DEFINED DEFAULT 'krw'::currency,
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT plans_pkey PRIMARY KEY (code)
);
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  status USER-DEFINED DEFAULT 'active'::subscription_status,
  user_id uuid NOT NULL,
  plan_code character varying NOT NULL,
  cycle USER-DEFINED NOT NULL,
  start_at timestamp with time zone NOT NULL,
  end_at timestamp with time zone,
  is_auto_renew boolean DEFAULT true,
  cancelled_at timestamp with time zone,
  trial_end_at timestamp with time zone,
  billing_key text,
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT subscriptions_plan_code_plans_code_fk FOREIGN KEY (plan_code) REFERENCES public.plans(code)
);
CREATE TABLE public.toss_billings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  mid text,
  customer_key text,
  authenticated_at timestamp with time zone,
  method character varying,
  billing_key text,
  card jsonb DEFAULT '{}'::jsonb,
  card_company text,
  card_number text,
  raw_data jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT toss_billings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.toss_payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  payment_key text,
  type character varying,
  customer_key text,
  order_id text,
  order_name text,
  mid text,
  currency character varying DEFAULT 'KRW'::character varying,
  method character varying,
  total_amount numeric,
  balance_amount numeric,
  status character varying,
  requested_at timestamp with time zone,
  approved_at timestamp with time zone,
  last_transaction_key text,
  vat numeric,
  metadata jsonb DEFAULT '{}'::jsonb,
  raw_data jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT toss_payments_pkey PRIMARY KEY (id)
);
CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  user_id uuid NOT NULL,
  amount numeric NOT NULL DEFAULT 0.00,
  content USER-DEFINED NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  type USER-DEFINED DEFAULT 'payment'::transaction_type,
  bonus numeric DEFAULT 0.00,
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.translations (
  key text NOT NULL,
  language_code character varying NOT NULL,
  translated_text text NOT NULL,
  CONSTRAINT translations_pkey PRIMARY KEY (key, language_code),
  CONSTRAINT translations_language_code_languages_code_fk FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  avatar_id uuid,
  avatar_url text DEFAULT ''::text,
  email character varying NOT NULL UNIQUE,
  phone text,
  password character varying,
  name character varying,
  nickname character varying,
  gender USER-DEFINED DEFAULT 'unknown'::gender,
  date_of_birth date,
  metadata jsonb DEFAULT '{}'::jsonb,
  role USER-DEFINED DEFAULT 'user'::user_role,
  notification_enabled boolean DEFAULT true,
  last_login_provider character varying,
  last_login_at timestamp with time zone DEFAULT now(),
  coins numeric DEFAULT 0.00,
  avatar_key text,
  balance numeric DEFAULT 0.00,
  language_code character varying DEFAULT 'ko'::character varying,
  current_plan_code character varying,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_avatar_id_medias_id_fk FOREIGN KEY (avatar_id) REFERENCES public.medias(id)
);
CREATE TABLE public.work_categories (
  work_id uuid NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT work_categories_pkey PRIMARY KEY (work_id, category_id),
  CONSTRAINT work_categories_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id),
  CONSTRAINT work_categories_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.work_likes (
  work_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT work_likes_pkey PRIMARY KEY (work_id, user_id),
  CONSTRAINT work_likes_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id),
  CONSTRAINT work_likes_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.work_medias (
  work_id uuid NOT NULL,
  media_id uuid NOT NULL,
  CONSTRAINT work_medias_pkey PRIMARY KEY (work_id, media_id),
  CONSTRAINT work_medias_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id),
  CONSTRAINT work_medias_media_id_medias_id_fk FOREIGN KEY (media_id) REFERENCES public.medias(id)
);
CREATE TABLE public.work_storage_objects (
  work_id uuid NOT NULL,
  key text NOT NULL,
  CONSTRAINT work_storage_objects_pkey PRIMARY KEY (work_id, key),
  CONSTRAINT work_storage_objects_work_id_works_id_fk FOREIGN KEY (work_id) REFERENCES public.works(id)
);
CREATE TABLE public.works (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  title character varying,
  thumbnail_id uuid,
  description text,
  release_date timestamp with time zone,
  tags ARRAY,
  characters_map_id uuid,
  thumbnail_key text,
  characters_map_key text,
  universe_id text,
  status USER-DEFINED DEFAULT 'draft'::work_status,
  bundle_id text,
  content_media_key text,
  CONSTRAINT works_pkey PRIMARY KEY (id),
  CONSTRAINT works_thumbnail_id_medias_id_fk FOREIGN KEY (thumbnail_id) REFERENCES public.medias(id),
  CONSTRAINT works_characters_map_id_medias_id_fk FOREIGN KEY (characters_map_id) REFERENCES public.medias(id)
);
