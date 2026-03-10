# Donation Page - Quick Reference Guide

## 🎯 Overview
Your new donation page has been created with best-in-class design and conversion optimization features.

## 📍 Location
- **File**: `donate.html`
- **URL**: Navigate from any page using the "Donate" link in the header (positioned after "Our Partners")

## 💳 Update Donation Details

### Bank Transfer Information (Lines 165-199 in donate.html)
Update the following details in the "Bank Transfer" section:
- **Bank Name**: Currently "State Bank of India"
- **Account Name**: Currently "IIT Bombay Racing Team"
- **Account Number**: Currently "123456789012"
- **IFSC Code**: Currently "SBIN0001234"

### UPI Payment (Lines 202-241 in donate.html)
- **UPI ID**: Currently "iitbracing@sbi"
- **QR Code**: Replace the placeholder SVG with your actual UPI QR code image

### International Donations (Lines 244-274 in donate.html)
- **SWIFT Code**: Currently "SBININBB123"
- **Account Number**: Currently "123456789012"
- **Branch Address**: Currently "IIT Bombay, Mumbai, India 400076"

### Contact Information (Lines 278-288 in donate.html)
- **Email**: Currently "donations@iitbracing.org"
- **Phone**: Currently "+91 98765 43210"

## 🎨 Key Features

### 1. **Hero Section**
- Animated statistics counter
- Floating badge with pulse animation
- Gradient text effects
- Scroll indicator

### 2. **Impact Cards**
- Three donation tiers (₹10,000 / ₹50,000 / ₹1,00,000)
- Featured "Popular" card with special styling
- Hover effects with elevation
- Icon animations

### 3. **Donation Methods**
- Bank Transfer with copy-to-clipboard functionality
- UPI with QR code display (featured)
- International wire transfer option
- One-click copy buttons for all details

### 4. **Interactive Elements**
- **Copy Buttons**: Click any copy button to instantly copy details to clipboard
- **Toast Notifications**: Visual feedback when copying
- **Hover Effects**: All cards have smooth elevation and glow effects
- **Counter Animations**: Numbers animate when scrolling into view
- **Scroll Progress Bar**: Shows reading progress at top of page

### 5. **Recognition & Benefits**
- Official recognition on website
- Team merchandise for significant contributions
- Tax benefits (80G certificate)
- Behind-the-scenes access

### 6. **Social Proof**
- Donor testimonials with ratings
- Statistics: 500+ supporters, ₹50L+ raised, 10+ cars built

## 🛠️ Customization Guide

### Change Donation Amounts
Edit lines 142-178 in `donate.html` to modify the three donation tiers.

### Update Statistics
- Hero stats (lines 78-96): Years, Cars Built, Competitions
- CTA section stats (lines 491-505): Supporters, Amount Raised, Cars Built

### Modify Colors
All colors are defined in `css/donate.css` using CSS variables:
- `--primary-pink`: #8B2FC9
- `--accent-pink`: #C026D3
- `--highlight-pink`: #F472B6

### Add More Donation Methods
Copy any `.method-card` div (lines 154-274) and modify the content.

## 📱 Mobile Responsive
- Automatically adapts to all screen sizes
- Touch-friendly buttons
- Optimized typography
- Stacked cards on mobile

## 🚀 Performance Features
- Lazy-loaded animations (only animate when in view)
- Optimized SVG icons
- Smooth scroll behavior
- Efficient JavaScript with intersection observers

## 🎯 Conversion Optimization
1. **Urgency**: "Fuel Our Journey" messaging
2. **Social Proof**: Testimonials and statistics
3. **Easy Copy**: One-click copy for all payment details
4. **Visual Hierarchy**: Featured UPI option (most popular in India)
5. **Trust Signals**: Tax benefits, official recognition
6. **Multiple Options**: Bank, UPI, International
7. **Clear Impact**: Shows exactly where money goes
8. **Recognition**: Donor benefits clearly stated

## 📝 To-Do List
- [ ] Update bank account details
- [ ] Replace UPI QR code with actual image
- [ ] Update contact email and phone number
- [ ] Add real team merchandise images (optional)
- [ ] Test all copy buttons
- [ ] Update statistics with real numbers
- [ ] Add actual donor testimonials (optional)
- [ ] Upload donation receipts/certificates (optional)

## 🔗 Navigation
The "Donate" link has been added to the header of all pages:
- ✅ index.html
- ✅ team.html
- ✅ achievements.html
- ✅ cars.html
- ✅ partners.html
- ✅ about.html
- ✅ media.html

## 💡 Tips for Maximum Donations
1. Keep donation details up-to-date
2. Respond quickly to donation inquiries
3. Share success stories on social media
4. Send thank you emails to donors
5. Update the impact statistics regularly
6. Feature top donors (with permission)
7. Create urgency with specific goals/campaigns

## 📧 Support
For any customization needs or issues, refer to:
- `css/donate.css` - All styling
- `js/donate.js` - Interactive features
- `donate.html` - Page structure
