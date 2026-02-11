# 🍽️ Calorie Tracker

A simple, elegant frontend application for tracking meals and calories. Built with vanilla JavaScript to demonstrate a clean, minimal calorie tracking interface without any backend infrastructure.

## ✨ Features

- **Easy Meal Entry**: Type in what you ate and get instant calorie estimates
- **Smart Calorie Detection**: Automatically recognizes 100+ common foods and meals
- **Portion Size Recognition**: Detects "small", "large", and quantity modifiers (e.g., "2 eggs")
- **Color-Coded Display**: Visual indicators for low (green), medium (orange), and high (red) calorie meals
- **Daily Total**: Automatic calculation of total calories consumed
- **Persistent Storage**: Meals are saved locally and persist across browser sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Minimal, modern interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/stillwagon89/february-11-test-calories.git
   cd february-11-test-calories
   ```

2. Open `index.html` in your web browser:
   ```bash
   open index.html
   ```

   Or simply double-click the `index.html` file.

That's it! The app runs entirely in your browser with no server required.

## 📖 Usage

1. **Add a Meal**: Type what you ate in the text area (e.g., "2 scrambled eggs and toast")
2. **View Calories**: The app will automatically estimate calories based on the food items
3. **Track Your Day**: See your meals list with timestamps and individual calorie counts
4. **Monitor Total**: Check your daily total at the bottom of the page
5. **Remove Meals**: Click the × button on any meal to remove it
6. **Clear All**: Use the "Clear All" button to start fresh

### Example Inputs

- "apple" → ~95 calories
- "2 eggs and toast" → ~220 calories
- "large burger and fries" → ~900+ calories
- "chicken salad with dressing" → ~425 calories
- "coffee" → ~5 calories

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: For data persistence

## 📂 Project Structure

```
february-11-test-calories/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js              # Core application logic
├── calorieData.js      # Food database and calorie estimation
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🎨 Design Principles

- **Simplicity**: Clean, uncluttered interface focused on the core functionality
- **Responsiveness**: Mobile-first design that works on all screen sizes
- **Performance**: Lightweight vanilla JavaScript with no external dependencies
- **Accessibility**: Semantic HTML and ARIA labels for screen readers
- **Visual Feedback**: Color coding and animations provide clear user feedback

## 🧮 How Calorie Estimation Works

The app uses a comprehensive dummy food database with 100+ common items. The estimation algorithm:

1. **Normalizes** your input (lowercase, removes extra spaces)
2. **Detects quantities** (e.g., "2" in "2 eggs")
3. **Detects portion sizes** (small, medium, large, extra large)
4. **Matches keywords** against the food database
5. **Sums calories** from all matched food items
6. **Applies multipliers** for portions and quantities
7. **Returns estimate** with confidence level

### Food Categories

The database includes:
- Fruits & Vegetables
- Proteins (chicken, beef, fish, eggs, tofu)
- Grains & Carbs (rice, pasta, bread)
- Dairy Products
- Common Meals (pizza, burgers, sandwiches)
- Beverages (coffee, juice, smoothies)
- Snacks & Desserts
- Condiments & Extras

## 🔒 Privacy

All data is stored locally in your browser using LocalStorage. No data is sent to any server or third party. Your meal tracking is completely private.

## 🚧 Limitations

- **Dummy Data Only**: Calorie estimates are based on a simple keyword matching algorithm, not real nutritional databases
- **Single Day View**: Currently only tracks today's meals (no historical data)
- **No Macros**: Only tracks total calories, not protein/carbs/fat breakdown
- **Estimation Only**: For demonstration purposes; not intended for precise nutritional tracking

## 🔮 Future Enhancement Ideas

- Multi-day tracking with date navigation
- Meal categories (breakfast, lunch, dinner, snacks)
- Macro tracking (protein, carbs, fat)
- Charts and visualization
- Export data (JSON/CSV)
- Goal setting and progress tracking
- Recipe builder
- Integration with real nutritional APIs

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a frontend demonstration project.

## 🙏 Acknowledgments

- Built with vanilla JavaScript for simplicity and performance
- Designed with modern CSS features
- Inspired by minimalist UI design principles
