# ResQLink - Emergency Response Network

A professional, production-ready disaster response application built with React Native and Expo. ResQLink enables decentralized emergency communication through mesh networking technology.

## 🎨 Design System

### Visual Identity
- **Professional & Utilitarian**: Clean, government-style interface optimized for emergency situations
- **High Contrast**: Ensures readability in stress situations and various lighting conditions
- **Material 3 Guidelines**: Follows Google's Material Design 3 typography and spacing standards
- **Accessibility First**: Meets WCAG guidelines for emergency response applications

### Color Palette
```
Primary Blue:     #1565C0 (Professional, trustworthy)
Emergency Red:    #C62828 (Critical alerts, danger)
Background:       #FAFAFA (Neutral, clean)
Surface:          #FFFFFF (Cards, containers)
Text Primary:     #212121 (High contrast)
Text Secondary:   #757575 (Supporting information)
```

### Typography Scale (Material 3)
- **Display Large**: 57px - Hero text
- **Headline Large**: 32px - Page titles
- **Title Large**: 22px - Section headers
- **Body Large**: 16px - Primary content
- **Label Large**: 14px - Buttons, badges

## 🏗️ Architecture

### Component Library
- **Layout Components**: Grid system, responsive containers
- **Typography**: Semantic text components with proper hierarchy
- **UI Components**: Professional buttons, cards, headers
- **Status Indicators**: Emergency status badges and indicators
- **Interactive Elements**: Action sheets, modals, forms
- **State Management**: Loading states, empty states, error handling

### Key Features
- **Role-Based Interface**: Sender, Transporter, Handler dashboards
- **Emergency Request System**: Structured request creation and tracking
- **Status Management**: Real-time request status updates
- **Offline-First**: Works without internet connectivity
- **Mesh Networking**: Peer-to-peer communication capability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- React Native development environment

### Installation
```bash
npm install
npm start
```

### Development
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## 📱 User Interface

### Role Selection Screen
- Clean, card-based role selection
- Clear iconography for each role type
- Professional branding with ResQLink identity

### Sender Dashboard
- Emergency request overview with statistics
- Status indicators for request tracking
- Floating action button for quick access
- Pull-to-refresh functionality

### Create Request Screen
- Structured emergency type selection
- Rich text input with character limits
- Request summary and validation
- Clear call-to-action buttons

### Design Principles
1. **Clarity Over Aesthetics**: Function over form for emergency use
2. **Consistent Patterns**: Reusable components and interactions
3. **Accessible Design**: High contrast, proper touch targets
4. **Progressive Disclosure**: Show relevant information when needed
5. **Error Prevention**: Validation and confirmation dialogs

## 🛠️ Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 7
- **State Management**: Zustand
- **Storage**: Expo SQLite + AsyncStorage
- **Icons**: Lucide React Native
- **Typography**: Material 3 Design System
- **Platform**: iOS, Android, Web

## 📋 Component Documentation

### Layout Components
- `Layout`: Main container with safe area handling
- `Grid/GridItem`: Responsive grid system
- `Divider`: Visual separators

### Typography
- `Typography`: Base text component with Material 3 variants
- `Headline/Title/Body/Label`: Semantic text components

### UI Components
- `Button`: Multiple variants (primary, secondary, outline, danger, ghost)
- `Card`: Elevated, outlined, and filled variants
- `Header`: Navigation headers with back buttons and actions
- `Badge`: Status and category indicators

### Status Components
- `StatusIndicator`: Request status with color coding
- `InfoCard`: Statistics and metrics display
- `EmptyState`: No-data states with actions
- `LoadingSpinner`: Loading indicators

## 🎯 Production Readiness

### Performance
- Optimized component rendering
- Efficient state management
- Minimal bundle size
- Smooth animations and transitions

### Accessibility
- Screen reader support
- High contrast ratios
- Proper focus management
- Touch target sizing (44px minimum)

### Error Handling
- Graceful error states
- User-friendly error messages
- Retry mechanisms
- Offline capability

### Testing
- Component unit tests
- Integration testing
- Accessibility testing
- Cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the design system guidelines
4. Ensure accessibility compliance
5. Submit a pull request

---

**ResQLink** - Professional emergency response technology for when it matters most.