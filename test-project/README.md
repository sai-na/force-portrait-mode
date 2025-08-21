# Test Project - Force Portrait Mode

This folder contains a test page to verify the force-portrait-mode library works correctly on your phone before pushing to GitHub.

## Test File

### `index.html` - JavaScript API Test  
- **Purpose**: Test the JavaScript/TypeScript API with interactive configuration
- **Features**:
  - Preset configuration options (Default, Custom Position, Red Background, Neon Theme, Custom Icon)
  - Copy functionality for npm package format
  - All animation types and customization options
  - Real-time testing without page reload

## How to Test on Your Phone

### Method 1: Local Server (Recommended)

1. **Start a local server** from the main project directory:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Or using Node.js (if you have npx)
   npx serve .
   
   # Or using PHP (if installed)  
   php -S localhost:8000
   ```

2. **Find your computer's IP address**:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`

3. **Access from phone**:
   - Open browser on phone
   - Go to `http://YOUR_IP:8000/test-project/`
   - Example: `http://192.168.1.100:8000/test-project/`

### Method 2: File Access (if local server doesn't work)

1. **Copy files to phone**:
   - Email the HTML file to yourself
   - Or use cloud storage (Google Drive, etc.)
   - Download and open in mobile browser

## What to Test

### ✅ Portrait Mode Tests
- [ ] Page displays normally in portrait orientation
- [ ] All content is visible and properly styled
- [ ] Configuration buttons work correctly

### 🔄 Landscape Mode Tests  
- [ ] **Critical**: Rotate to landscape - should see overlay immediately
- [ ] **Positioning**: Icon appears at 40% from top (Default)
- [ ] **Positioning**: Text appears at 70% from top (Default)
- [ ] **Animation**: Icon rotates smoothly (15-degree rotation)
- [ ] **Styling**: Dark background overlay covers entire screen
- [ ] **Typography**: Text is readable and properly sized

### ⚙️ Configuration Tests
- [ ] **Default (40%/70%)**: Standard positioning with dark theme
- [ ] **Custom Position (30%/80%)**: Modified positioning works
- [ ] **Red Background**: Background color changes to red with yellow text
- [ ] **Neon Theme**: Black background with green text and phone icon
- [ ] **Custom Icon 🔄**: Different rotation icon displays
- [ ] **Disable**: Portrait mode deactivates completely

### 📋 Copy Functionality Tests
- [ ] **Copy buttons**: Generate proper npm package format code
- [ ] **Code format**: Copied code is ready for production use
- [ ] **Options accuracy**: Generated options match current configuration

### 📱 Device Compatibility Tests
- [ ] **iOS Safari**: Works correctly
- [ ] **Android Chrome**: Works correctly  
- [ ] **Other mobile browsers**: Test if available
- [ ] **Different screen sizes**: Test on different devices
- [ ] **Portrait ↔ Landscape**: Smooth transitions both ways

### 🐛 Edge Cases
- [ ] **Rapid rotation**: Fast orientation changes handled smoothly
- [ ] **Multiple toggles**: Enable/disable multiple times
- [ ] **Browser tabs**: Works when switching between tabs
- [ ] **Configuration switching**: Rapid config changes work smoothly

## Expected Behavior

### ✅ Correct Behavior
- **Portrait**: Normal app display, configuration buttons visible
- **Landscape**: Overlay with phone icon (40%) and message (70%) for default
- **Animation**: Smooth rotation animation on icon
- **Responsive**: Elements scale appropriately for screen size
- **Smooth transitions**: No flickering or layout jumps
- **Copy functionality**: Clean, production-ready code generation

### ❌ Issues to Watch For
- Icon and text overlapping (especially on small screens)
- Text getting cut off or overflowing
- Animation not working or too fast/slow
- Overlay not covering entire screen
- Wrong positioning percentages
- Configuration not applying correctly
- Copy buttons not generating proper code

## Troubleshooting

### If overlay doesn't appear:
1. Check browser console for errors (F12 → Console)
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. Test different configuration options

### If positioning is wrong:
1. Check if screen size is very small/large
2. Test with different preset configurations
3. Verify custom positioning options work

### If animations don't work:
1. Check if `prefers-reduced-motion` is enabled in system settings
2. Try different configuration presets
3. Verify CSS animations are supported

## Success Criteria

✅ **Ready for GitHub push when**:
- Test page works correctly on your target devices
- All preset configurations work properly (40%/70%, custom positions, themes)
- Copy functionality generates correct npm package code
- No layout issues or overlapping
- Smooth animations and transitions
- No console errors
- All device orientations handle correctly

## Report Issues

If you find any issues during testing, document:
1. **Device/Browser**: What device and browser
2. **Issue**: What went wrong
3. **Configuration**: Which preset was being tested
4. **Steps**: How to reproduce
5. **Screenshot**: If possible

This ensures we fix problems before the public release!