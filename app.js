// State management
let meals = [];

// DOM elements
const mealInput = document.getElementById('meal-input');
const addMealBtn = document.getElementById('add-meal-btn');
const mealsContainer = document.getElementById('meals-container');
const totalValue = document.getElementById('total-value');
const clearAllBtn = document.getElementById('clear-all-btn');

// Constants
const STORAGE_KEY = 'calorieTrackerMeals';

/**
 * Initialize the application
 */
function initApp() {
  loadMeals();
  updateDisplay();
  setupEventListeners();

  // Focus on input field
  mealInput.focus();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Add meal on button click
  addMealBtn.addEventListener('click', handleAddMeal);

  // Add meal on Enter key (Shift+Enter for new line)
  mealInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddMeal();
    }
  });

  // Clear all meals
  clearAllBtn.addEventListener('click', handleClearAll);
}

/**
 * Handle adding a new meal
 */
function handleAddMeal() {
  const mealText = mealInput.value.trim();

  // Validate input
  if (!mealText) {
    showValidationError('Please enter a meal description');
    return;
  }

  addMeal(mealText);

  // Clear input and refocus
  mealInput.value = '';
  mealInput.focus();
}

/**
 * Show validation error message
 */
function showValidationError(message) {
  // Simple alert for now - could be enhanced with better UI
  const originalPlaceholder = mealInput.placeholder;
  mealInput.placeholder = message;
  mealInput.classList.add('error');

  setTimeout(() => {
    mealInput.placeholder = originalPlaceholder;
    mealInput.classList.remove('error');
  }, 2000);
}

/**
 * Add a new meal to the state
 */
function addMeal(mealText) {
  // Calculate calories
  const calorieInfo = estimateCalories(mealText);

  // Create meal object
  const meal = {
    id: Date.now().toString(),
    text: sanitizeText(mealText),
    calories: calorieInfo.calories,
    confidence: calorieInfo.confidence,
    timestamp: Date.now()
  };

  // Add to meals array
  meals.unshift(meal); // Add to beginning

  // Save and update display
  saveMeals();
  updateDisplay();
}

/**
 * Remove a meal by ID
 */
function removeMeal(id) {
  meals = meals.filter(meal => meal.id !== id);
  saveMeals();
  updateDisplay();
}

/**
 * Clear all meals with confirmation
 */
function handleClearAll() {
  if (meals.length === 0) return;

  if (confirm('Are you sure you want to clear all meals?')) {
    meals = [];
    saveMeals();
    updateDisplay();
  }
}

/**
 * Update the display (render all meals)
 */
function updateDisplay() {
  // Update meal list
  if (meals.length === 0) {
    mealsContainer.innerHTML = '<p class="empty-state">No meals added yet. Start tracking your calories!</p>';
  } else {
    mealsContainer.innerHTML = meals.map(meal => createMealCard(meal)).join('');

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mealId = e.target.closest('.remove-btn').dataset.id;
        removeMeal(mealId);
      });
    });
  }

  // Update total
  updateTotal();
}

/**
 * Create HTML for a meal card
 */
function createMealCard(meal) {
  const timeString = formatTime(meal.timestamp);
  const calorieColor = getCalorieColor(meal.calories);
  const confidenceIndicator = meal.confidence === 'low' ? '~' : '';

  return `
    <div class="meal-card" data-id="${meal.id}">
      <div class="meal-content">
        <div class="meal-text">${meal.text}</div>
        <div class="meal-time">${timeString}</div>
      </div>
      <div class="meal-info">
        <div class="meal-calories ${calorieColor}">
          ${confidenceIndicator}${meal.calories} cal
        </div>
        <button class="remove-btn" data-id="${meal.id}" aria-label="Remove meal">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * Get color class based on calorie amount
 */
function getCalorieColor(calories) {
  if (calories <= 200) return 'cal-low';
  if (calories <= 500) return 'cal-medium';
  return 'cal-high';
}

/**
 * Format timestamp to readable time
 */
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes} ${ampm}`;
}

/**
 * Calculate and update total calories
 */
function updateTotal() {
  const total = meals.reduce((sum, meal) => sum + meal.calories, 0);
  totalValue.textContent = total.toLocaleString();

  // Add color coding to total
  totalValue.className = 'total-value ' + getCalorieColor(total);
}

/**
 * Save meals to localStorage
 */
function saveMeals() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  } catch (error) {
    console.error('Failed to save meals to localStorage:', error);
  }
}

/**
 * Load meals from localStorage
 */
function loadMeals() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      meals = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load meals from localStorage:', error);
    meals = [];
  }
}

/**
 * Sanitize text to prevent XSS
 */
function sanitizeText(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
