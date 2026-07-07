// src/data/workouts.js
// All mock data for the app lives here so screens stay presentation-only.
// In a real app this file would be replaced by API calls.

export const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Full Body'];

export const workouts = [
  {
    id: 'w1',
    title: 'Full Body Strength',
    category: 'Full Body',
    duration: 35,
    level: 'Intermediate',
    calories: 320,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    description:
      'A balanced full-body session that hits every major muscle group. Great for building a solid strength base.',
    exercises: [
      { id: 'e1', name: 'Warm-up Stretch', detail: '5 min', duration: '5 min' },
      { id: 'e2', name: 'Squats', detail: '3 sets x 12' },
      { id: 'e3', name: 'Push Ups', detail: '3 sets x 10' },
      { id: 'e4', name: 'Lunges', detail: '3 sets x 12' },
      { id: 'e5', name: 'Plank', detail: '3 rounds' },
    ],
  },
  {
    id: 'w2',
    title: 'Morning Cardio Burn',
    category: 'Cardio',
    duration: 25,
    level: 'Beginner',
    calories: 250,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800',
    description: 'A quick, low-impact cardio flow designed to wake up your body and get your heart rate up.',
    exercises: [
      { id: 'e1', name: 'Jumping Jacks', detail: '3 sets x 30s' },
      { id: 'e2', name: 'High Knees', detail: '3 sets x 30s' },
      { id: 'e3', name: 'Butt Kicks', detail: '3 sets x 30s' },
      { id: 'e4', name: 'Mountain Climbers', detail: '3 sets x 20' },
      { id: 'e5', name: 'Cool Down Walk', detail: '3 min' },
    ],
  },
  {
    id: 'w3',
    title: 'HIIT Power Session',
    category: 'HIIT',
    duration: 20,
    level: 'Advanced',
    calories: 290,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800',
    description: 'Short, intense intervals designed to maximize calorie burn in minimal time.',
    exercises: [
      { id: 'e1', name: 'Burpees', detail: '4 sets x 15' },
      { id: 'e2', name: 'Jump Squats', detail: '4 sets x 15' },
      { id: 'e3', name: 'Battle Rope Slams', detail: '4 sets x 30s' },
      { id: 'e4', name: 'Box Jumps', detail: '4 sets x 12' },
      { id: 'e5', name: 'Sprint Intervals', detail: '4 sets x 20s' },
    ],
  },
  {
    id: 'w4',
    title: 'Yoga Mobility Flow',
    category: 'Yoga',
    duration: 30,
    level: 'Beginner',
    calories: 120,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    description: 'A gentle mobility-focused flow to improve flexibility and reduce muscle tension.',
    exercises: [
      { id: 'e1', name: "Child's Pose", detail: '1 min' },
      { id: 'e2', name: 'Cat-Cow Stretch', detail: '2 min' },
      { id: 'e3', name: 'Downward Dog', detail: '1 min' },
      { id: 'e4', name: "Warrior II", detail: '1 min / side' },
      { id: 'e5', name: 'Seated Forward Fold', detail: '2 min' },
    ],
  },
  {
    id: 'w5',
    title: 'Core Builder',
    category: 'Strength',
    duration: 18,
    level: 'Beginner',
    calories: 180,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    description: 'Focused core work to build a stronger, more stable midsection.',
    exercises: [
      { id: 'e1', name: 'Crunches', detail: '3 sets x 20' },
      { id: 'e2', name: 'Russian Twists', detail: '3 sets x 20' },
      { id: 'e3', name: 'Leg Raises', detail: '3 sets x 15' },
      { id: 'e4', name: 'Side Plank', detail: '3 rounds / side' },
      { id: 'e5', name: 'Bicycle Crunches', detail: '3 sets x 20' },
    ],
  },
];

export const weeklyActivity = [
  { day: 'M', percent: 30, type: 'workout' },
  { day: 'T', percent: 70, type: 'workout' },
  { day: 'W', percent: 45, type: 'workout' },
  { day: 'T', percent: 90, type: 'workout' },
  { day: 'F', percent: 75, type: 'workout' },
  { day: 'S', percent: 20, type: 'rest' },
  { day: 'S', percent: 95, type: 'rest' },
];

export const weeklySummary = {
  workouts: 4,
  minutes: 145,
  calories: 980,
  goalTarget: 5,
  goalCompleted: 4,
  dayStreak: 7,
};

export const mockUser = {
  name: 'Alex Morgan',
  email: 'alex@email.com',
  goal: 'Build Muscle',
  level: 'Intermediate',
  height: '178 cm',
  weight: '74 kg',
  age: 26,
};
