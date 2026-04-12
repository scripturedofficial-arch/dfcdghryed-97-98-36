

## Remove "My Profile" Tab and Toggle Pills

Remove the "My Profile" tab, toggle pills, and `activeView` state from the dashboard since the settings card was its only content and is redundant with the header settings icon.

### Changes

**`src/pages/Dashboard.tsx`**:
- Remove `mobileProfileItems` array
- Remove `activeView` state and all references
- Remove the toggle pills section (Quick Access / My Profile buttons)
- Remove conditional logic based on `activeView` — always show Quick Access items
- Update heading to always show "Quick Access" (or remove the heading since it's now the only view)

**`src/components/DashboardSidebar.tsx`**:
- Remove `activeView` prop and related logic
- Remove `myProfileItems` array
- Always show `quickAccessItems`
- Update the component interface

