# Episode Components

Hệ thống component được tổ chức theo kiến trúc provider pattern để quản lý state tập trung và tách biệt logic.

## Cấu trúc Components

### 🎯 EpisodeProvider.tsx

**Provider chính quản lý tất cả state và logic**

- Quản lý selection mode (isSelectionMode, selectedEpisodes)
- Xử lý long press và touch events
- Quản lý modals (Purchase, Viewer)
- Cung cấp tất cả handlers và UI helpers

### 📄 Item.tsx

**Component cho từng episode item**

- Sử dụng useEpisodeContext() để lấy state và functions
- Hiển thị checkbox trong selection mode
- Xử lý click, long press events
- Hiển thị status icons

### 📋 List.tsx

**Component container cho danh sách episodes**

- Render danh sách EpisodeItem
- Có thể mở rộng thêm virtualization nếu cần

### ⚙️ Header.tsx

**Component header với controls**

- Dropdown sorting (Selection/Latest Soon)
- Selection mode header với "Full choice"
- Toggle button để bật selection mode

### 🛒 BulkActions.tsx

**Component cho bulk purchase actions**

- Hiển thị khi có episodes được chọn
- Auto charge vs General charge buttons
- Selected count display

### 🔧 TabEpisodes.client.tsx

**Main component đơn giản**

- Wrap trong EpisodeProvider
- Compose tất cả sub-components
- Pass workId và episodes data

## Sử dụng

```tsx
// Trong TabEpisodes
<EpisodeProvider episodes={episodes} workId={workId}>
  <div className="relative flex h-full flex-col bg-white">
    <EpisodeHeader episodes={episodes} />
    <EpisodeList episodes={episodes} />
    <BulkActions />
  </div>
</EpisodeProvider>;

// Trong component con
const { handleEpisodeClick, isSelectionMode, selectedEpisodes } =
  useEpisodeContext();
```

## Ưu điểm của kiến trúc này

✅ **Tách biệt concerns**: Mỗi component có trách nhiệm riêng biệt
✅ **Dễ test**: Logic tập trung trong provider, UI component đơn giản  
✅ **Reusable**: Components có thể tái sử dụng ở nơi khác
✅ **Maintainable**: Dễ bảo trì và mở rộng
✅ **Type safety**: Đầy đủ TypeScript types
✅ **Provider pattern**: State management rõ ràng

## Features

- ✨ Selection mode với long press
- 🛒 Bulk purchase với 2 options (Auto/General charge)
- 📖 Episode viewer modal
- 💰 Purchase modal
- 🎨 Visual feedback cho selection
- 📱 Touch/mouse events support
- 🌍 Internationalization ready
