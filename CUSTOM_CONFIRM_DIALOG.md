# Custom Confirm Dialog Component

A modern, accessible confirmation dialog component that replaces the browser's native `confirm()` function with a beautiful UI that matches the project's design system.

## Features

- 🎨 Modern UI with smooth animations
- 🌓 Dark mode support
- 🎯 Three dialog types: danger, warning, and info
- ♿ Accessible with backdrop click to dismiss
- 🎭 Smooth fade-in and scale animations
- 📱 Fully responsive

## Component Location

`src/components/ConfirmDialog.tsx`

## Usage

### 1. Import the Component

```tsx
import ConfirmDialog from "../src/components/ConfirmDialog";
```

### 2. Add State Management

```tsx
const [confirmDialog, setConfirmDialog] = useState<{
  isOpen: boolean;
  // Add any additional data you need
}>({
  isOpen: false,
});
```

### 3. Trigger the Dialog

```tsx
const handleDelete = () => {
  setConfirmDialog({ isOpen: true });
};
```

### 4. Add the Component to JSX

```tsx
<ConfirmDialog
  isOpen={confirmDialog.isOpen}
  title="Delete Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  type="danger"
  onConfirm={handleConfirmAction}
  onCancel={() => setConfirmDialog({ isOpen: false })}
/>
```

## Props

| Prop          | Type                              | Default     | Description                                 |
| ------------- | --------------------------------- | ----------- | ------------------------------------------- |
| `isOpen`      | `boolean`                         | -           | Controls dialog visibility                  |
| `title`       | `string`                          | -           | Dialog title                                |
| `message`     | `string`                          | -           | Dialog message/description                  |
| `confirmText` | `string`                          | `"Confirm"` | Text for confirm button                     |
| `cancelText`  | `string`                          | `"Cancel"`  | Text for cancel button                      |
| `type`        | `"danger" \| "warning" \| "info"` | `"warning"` | Dialog type (affects icon and button color) |
| `onConfirm`   | `() => void`                      | -           | Callback when user confirms                 |
| `onCancel`    | `() => void`                      | -           | Callback when user cancels                  |

## Dialog Types

### Danger (Red)

Use for destructive actions like deleting items.

```tsx
type = "danger";
```

- Icon: `delete`
- Button color: Red

### Warning (Yellow)

Use for actions that require caution.

```tsx
type = "warning";
```

- Icon: `warning`
- Button color: Primary

### Info (Blue)

Use for informational confirmations.

```tsx
type = "info";
```

- Icon: `info`
- Button color: Primary

## Examples

### Delete Confirmation (Danger)

```tsx
const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  itemId: null,
});

const handleDelete = (id: string) => {
  setConfirmDialog({ isOpen: true, itemId: id });
};

const confirmDelete = async () => {
  await deleteItem(confirmDialog.itemId);
  setConfirmDialog({ isOpen: false, itemId: null });
};

<ConfirmDialog
  isOpen={confirmDialog.isOpen}
  title="Delete Address"
  message="Are you sure you want to delete this address? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  type="danger"
  onConfirm={confirmDelete}
  onCancel={() => setConfirmDialog({ isOpen: false, itemId: null })}
/>;
```

### Warning Confirmation

```tsx
<ConfirmDialog
  isOpen={showWarning}
  title="Unsaved Changes"
  message="You have unsaved changes. Are you sure you want to leave?"
  confirmText="Leave"
  cancelText="Stay"
  type="warning"
  onConfirm={handleLeave}
  onCancel={() => setShowWarning(false)}
/>
```

### Info Confirmation

```tsx
<ConfirmDialog
  isOpen={showInfo}
  title="Confirm Action"
  message="Do you want to proceed with this action?"
  confirmText="Proceed"
  cancelText="Cancel"
  type="info"
  onConfirm={handleProceed}
  onCancel={() => setShowInfo(false)}
/>
```

## Implementation Details

### Animations

The component uses CSS animations defined in `index.css`:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Backdrop Dismiss

Clicking the backdrop (dark overlay) will trigger the `onCancel` callback, allowing users to dismiss the dialog by clicking outside.

### Z-Index

The dialog uses `z-[9999]` to ensure it appears above all other content.

## Current Usage in Project

The custom confirm dialog is currently used in:

1. **Profile Page** (`pages/Profile.tsx`)
   - Confirming address deletion

2. **Manage Products Page** (`pages/ManageProducts.tsx`)
   - Confirming product deletion

## Migration from Browser Confirm

### Before (Browser Confirm)

```tsx
const handleDelete = async (id: string) => {
  if (window.confirm("Are you sure?")) {
    await deleteItem(id);
  }
};
```

### After (Custom Dialog)

```tsx
const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  itemId: null,
});

const handleDelete = (id: string) => {
  setConfirmDialog({ isOpen: true, itemId: id });
};

const confirmDelete = async () => {
  await deleteItem(confirmDialog.itemId);
  setConfirmDialog({ isOpen: false, itemId: null });
};

// In JSX
<ConfirmDialog
  isOpen={confirmDialog.isOpen}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  type="danger"
  onConfirm={confirmDelete}
  onCancel={() => setConfirmDialog({ isOpen: false, itemId: null })}
/>;
```

## Styling

The component uses Tailwind CSS classes and follows the project's design system:

- Primary color for confirm buttons (except danger type)
- Slate colors for cancel buttons
- Dark mode support with `dark:` variants
- Rounded corners with `rounded-2xl`
- Material Icons for visual feedback

## Accessibility

- Backdrop can be clicked to dismiss
- Clear visual hierarchy with icons
- High contrast colors for readability
- Smooth animations for better UX
