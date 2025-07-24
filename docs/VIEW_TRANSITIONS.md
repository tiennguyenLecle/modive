# View Transitions với Slide Animation

## Tổng quan

Dự án này đã được cấu hình để sử dụng slide animation thay vì fade animation mặc định cho page transitions sử dụng `next-view-transitions`.

## Cách hoạt động

### 1. CSS View Transitions API

- Đã enable `@view-transition` directive trong `globals.css`
- Default animation đã được override thành slide
- Hỗ trợ direction-specific animations (forward/backward)

### 2. Direction Detection

- Tự động detect direction navigation dựa trên URL structure
- Maintain navigation history để xác định backward navigation
- Add class `transition-forward` hoặc `transition-backward` vào html element

### 3. Components

#### ViewTransitionProvider

- Provider component tự động track navigation direction
- Đã được integrate vào layout chính

#### TransitionLink

- Custom Link component kết hợp next-intl và next-view-transitions
- Auto-detect direction hoặc có thể force direction

```tsx
import { TransitionLink } from '@/components/TransitionLink';

// Auto-detect direction
<TransitionLink href="/about">About</TransitionLink>

// Force direction
<TransitionLink href="/back" forceDirection="backward">Back</TransitionLink>
```

## Animation Styles

### Forward Navigation (Default)

- Old page: slide out to left
- New page: slide in from right

### Backward Navigation

- Old page: slide out to right
- New page: slide in from left

## Browser Support

- Chrome 126+
- Edge 126+
- Firefox: Không hỗ trợ (graceful fallback)
- Safari: Không hỗ trợ (graceful fallback)

## Customization

### Thay đổi animation duration

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 500ms; /* thay đổi từ 300ms */
}
```

### Thay đổi easing function

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-timing-function: ease-in-out; /* thay đổi từ cubic-bezier */
}
```

### Manual direction control

```tsx
import { setTransitionDirection } from '@/lib/view-transitions';

// Force direction before navigation
setTransitionDirection('backward');
router.push('/path');
```

## Troubleshooting

### Animation không hoạt động

1. Kiểm tra browser có hỗ trợ View Transitions API không
2. Đảm bảo sử dụng `TransitionLink` thay vì `Link` thông thường
3. Kiểm tra ViewTransitionProvider đã được wrap đúng chưa

### Direction detection không chính xác

- Có thể sử dụng `forceDirection` prop trên TransitionLink
- Hoặc call `setTransitionDirection()` manually

### Performance

- Animation được handle bởi GPU nên performance tốt
- Nếu gặp vấn đề, có thể giảm duration hoặc disable trên low-end devices
