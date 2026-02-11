// Comprehensive calorie database with common foods
const calorieDatabase = {
  // Fruits
  "apple": 95,
  "banana": 105,
  "orange": 62,
  "grapes": 100,
  "strawberries": 50,
  "blueberries": 85,
  "watermelon": 46,
  "mango": 99,
  "pear": 101,
  "pineapple": 82,
  "peach": 59,
  "plum": 46,

  // Vegetables
  "salad": 150,
  "lettuce": 10,
  "tomato": 22,
  "cucumber": 16,
  "carrot": 25,
  "broccoli": 55,
  "spinach": 7,
  "bell pepper": 24,
  "onion": 44,
  "avocado": 234,

  // Proteins
  "chicken breast": 165,
  "chicken": 165,
  "turkey": 125,
  "beef": 250,
  "pork": 242,
  "salmon": 206,
  "fish": 150,
  "tuna": 132,
  "shrimp": 99,
  "egg": 70,
  "eggs": 70,
  "tofu": 94,
  "bacon": 43,

  // Grains & Carbs
  "rice": 200,
  "pasta": 220,
  "bread": 80,
  "toast": 80,
  "bagel": 275,
  "tortilla": 104,
  "quinoa": 222,
  "oatmeal": 150,
  "cereal": 200,
  "granola": 298,
  "crackers": 120,

  // Dairy
  "milk": 150,
  "cheese": 115,
  "yogurt": 100,
  "greek yogurt": 100,
  "butter": 102,
  "cream": 50,
  "ice cream": 273,

  // Common Meals
  "pizza slice": 285,
  "pizza": 285,
  "burger": 540,
  "hamburger": 540,
  "sandwich": 350,
  "burrito": 500,
  "taco": 210,
  "burrito bowl": 450,
  "sushi roll": 200,
  "sushi": 200,
  "wrap": 300,
  "quesadilla": 480,
  "sub": 410,
  "hot dog": 290,

  // Snacks
  "chips": 152,
  "popcorn": 93,
  "nuts": 170,
  "almonds": 164,
  "peanuts": 161,
  "cashews": 157,
  "cookie": 140,
  "brownie": 227,
  "chocolate": 155,
  "candy": 150,
  "pretzel": 108,
  "trail mix": 131,

  // Beverages
  "coffee": 5,
  "latte": 190,
  "cappuccino": 120,
  "mocha": 260,
  "tea": 2,
  "juice": 110,
  "orange juice": 112,
  "apple juice": 114,
  "soda": 140,
  "energy drink": 110,
  "smoothie": 200,
  "protein shake": 220,
  "beer": 153,
  "wine": 125,

  // Condiments & Extras
  "dressing": 75,
  "mayo": 94,
  "ketchup": 15,
  "mustard": 3,
  "sauce": 50,
  "oil": 120,
  "syrup": 52,
  "jam": 56,
  "peanut butter": 188,
  "hummus": 70,
  "guacamole": 45,

  // Fast Food
  "fries": 365,
  "french fries": 365,
  "nuggets": 280,
  "chicken nuggets": 280,
  "onion rings": 331,
  "milkshake": 530,

  // Breakfast Items
  "pancake": 175,
  "pancakes": 175,
  "waffle": 218,
  "french toast": 240,
  "muffin": 425,
  "donut": 269,
  "croissant": 231,
  "danish": 266,
  "scone": 362,

  // Soups & Sides
  "soup": 150,
  "chili": 250,
  "mac and cheese": 350,
  "mashed potatoes": 237,
  "potato": 130,
  "sweet potato": 112,
  "beans": 127,
  "corn": 86,
  "coleslaw": 150
};

// Portion size multipliers
const portionSizes = {
  "small": 0.7,
  "medium": 1.0,
  "large": 1.5,
  "extra large": 2.0,
  "xl": 2.0
};

// Cooking methods that don't significantly add calories
const cookingMethods = [
  "grilled", "baked", "boiled", "steamed", "roasted",
  "scrambled", "fried", "poached", "sauteed", "broiled"
];

/**
 * Normalize text for matching (lowercase, trim, remove extra spaces)
 */
function normalizeText(text) {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Extract portion size from text
 * Returns {size: string, multiplier: number} or null
 */
function extractPortionSize(text) {
  const normalized = normalizeText(text);

  for (const [size, multiplier] of Object.entries(portionSizes)) {
    if (normalized.includes(size)) {
      return { size, multiplier };
    }
  }

  return null;
}

/**
 * Extract quantity from text (e.g., "2 eggs" -> 2)
 * Returns the quantity number or 1 if not found
 */
function extractQuantity(text, keyword) {
  const normalized = normalizeText(text);

  // Look for patterns like "2 eggs", "three apples", etc.
  const patterns = [
    new RegExp(`(\\d+)\\s+${keyword}`, 'i'),
    new RegExp(`(one|two|three|four|five|six|seven|eight|nine|ten)\\s+${keyword}`, 'i')
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) {
      const num = match[1];
      // Convert word numbers to digits
      const wordNumbers = {
        "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10
      };
      return wordNumbers[num] || parseInt(num, 10);
    }
  }

  return 1;
}

/**
 * Find all keyword matches in text and calculate total calories
 */
function findKeywordMatches(text) {
  const normalized = normalizeText(text);
  const matches = [];
  let totalCalories = 0;

  // Check each food item in the database
  for (const [food, calories] of Object.entries(calorieDatabase)) {
    if (normalized.includes(food)) {
      // Check if this food already matched (to avoid double counting)
      const alreadyMatched = matches.some(m => m.food === food);
      if (!alreadyMatched) {
        const quantity = extractQuantity(normalized, food);
        const itemCalories = calories * quantity;

        matches.push({
          food,
          baseCalories: calories,
          quantity,
          calories: itemCalories
        });

        totalCalories += itemCalories;
      }
    }
  }

  return { matches, totalCalories };
}

/**
 * Main function to estimate calories from a meal description
 * Returns {calories: number, confidence: string, breakdown: array}
 */
function estimateCalories(mealText) {
  if (!mealText || mealText.trim() === '') {
    return {
      calories: 0,
      confidence: 'none',
      breakdown: []
    };
  }

  const normalized = normalizeText(mealText);

  // Extract portion size if present
  const portionInfo = extractPortionSize(normalized);

  // Find all keyword matches
  const { matches, totalCalories } = findKeywordMatches(normalized);

  let finalCalories = totalCalories;
  let confidence = 'high';

  // Apply portion size multiplier if found
  if (portionInfo && matches.length > 0) {
    finalCalories = Math.round(totalCalories * portionInfo.multiplier);
  }

  // If no matches found, return a default estimate
  if (matches.length === 0) {
    finalCalories = 250; // Default for unknown meals
    confidence = 'low';
    matches.push({
      food: 'unknown meal',
      baseCalories: 250,
      quantity: 1,
      calories: 250
    });
  } else if (matches.length === 1) {
    confidence = 'medium';
  }

  return {
    calories: Math.round(finalCalories),
    confidence,
    breakdown: matches,
    portionSize: portionInfo ? portionInfo.size : null
  };
}
