# GymFlow

A React Native (CLI, TypeScript) gym / fitness companion app. Browse workouts, track completions, favorite the ones you love, and watch your weekly progress animate in.

## Features

- **Onboarding & mock auth** — Welcome → Login → main app, with basic field validation.
- **Home** — today's workout, weekly summary, quick actions.
- **Workouts** — search, category filters, and a favorites-only filter.
- **Workout Detail** — exercise list, favorite toggle, animated in-progress bar, "mark as completed" flow.
- **Progress** — weekly goal ring, stat cards, an animated weekly activity chart, and a full completion history list.
- **Profile** — account summary, favorites/history counts, dark mode toggle, logout.
- **Dark mode** — toggle in Profile, persisted across app restarts.
- **Favorites** — heart any workout from the list or detail screen; persisted locally.
- **Completion history** — every workout you mark complete is logged with date, duration, and calories; persisted locally.
- **Local persistence** — favorites, history, and theme preference are all saved with `@react-native-async-storage/async-storage`, so they survive an app restart.
- **Animated progress** — goal ring, weekly bars, and the workout-detail progress bar all animate with the `Animated` API.
- **Loading / empty / error states** — Workouts, Progress, and Profile all show a real loading indicator while storage is read, a friendly empty state when there's no data yet, and an error state with a retry button if a read/write fails.
- **TypeScript throughout** — shared types live in `src/types/index.ts`.

## Project structure

```
App.tsx                        # Providers (theme, app data) + navigator
src/
  types/index.ts                # Shared TS types (Workout, CompletionEntry, ThemeColors, ...)
  theme/
    colors.ts                   # Light + dark palettes, typography, radius, spacing
    ThemeContext.tsx             # Dark mode state, persisted to AsyncStorage
  context/
    AppDataContext.tsx           # Favorites + completion history, persisted to AsyncStorage
  components/
    AppButton.tsx / AppCard.tsx / Badge.tsx / ScreenHeader.tsx
    AnimatedProgressBar.tsx      # Horizontal + vertical animated bar
    EmptyState.tsx / LoadingState.tsx / ErrorState.tsx
  data/workouts.ts               # Mock workout + user data
  navigation/AppNavigator.tsx    # Stack + bottom tabs
  screens/
    WelcomeScreen.tsx / LoginScreen.tsx
    HomeScreen.tsx / WorkoutListScreen.tsx / WorkoutDetailScreen.tsx
    ProgressScreen.tsx / ProfileScreen.tsx
```

## Setup

This project assumes an existing bare React Native CLI TypeScript app (RN 0.86) with navigation already installed. If you're merging these files into your existing `ReactNative_GymApp_Intern_Task` project:

1. Copy the `src/` folder and `App.tsx` into your project root, overwriting the matching files.
2. Install the one new dependency used for persistence:

   ```bash
   npm install @react-native-async-storage/async-storage
   # or
   yarn add @react-native-async-storage/async-storage
   ```

   For Android, no extra linking step is needed with autolinking — just rebuild:

   ```bash
   npx react-native run-android
   ```

3. Confirm you already have these (used by earlier screens, unchanged here):
   - `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
   - `react-native-screens`, `react-native-safe-area-context`
   - `@react-native-vector-icons/ionicons`
   - `react-native-linear-gradient`

4. Run Metro and the Android build as usual:

   ```bash
   npx react-native start
   npx react-native run-android
   ```

## Notes on the new features

- **Dark mode**: `ThemeProvider` reads/writes `gymflow:themeMode` in AsyncStorage and falls back to the device's OS color scheme on first launch. All screens read colors via `useTheme()` instead of the old static `colors` import, so toggling instantly re-renders every screen.
- **Favorites**: stored as an array of workout ids under `gymflow:favorites`. `WorkoutListScreen` has a heart toggle in the header to filter to favorites only; `WorkoutDetailScreen` has a heart in the top bar.
- **Completion history**: every "Mark as Completed" tap appends a `CompletionEntry` (workout id/title, duration, calories, ISO timestamp) to `gymflow:history`. `ProgressScreen` derives this week's stats, a per-weekday activity chart, and a day streak directly from that history, falling back to the original mock data only when history is empty (fresh install).
- **Animated bars**: `AnimatedProgressBar` wraps `Animated.timing` and supports both horizontal (goal ring, workout progress) and vertical (weekly chart) modes.

## Screenshots

_Add screenshots here once you've run the app on your emulator/device — for example:_

| Home | Workouts | Progress | Dark mode |
|------|----------|----------|-----------|
| _screenshot_ | _screenshot_ | _screenshot_ | _screenshot_ |

## Known limitations / next steps

- Login is mocked (no real backend) — any non-empty email/password logs you in.
- Workout data is static mock data; swapping in a real API would mean replacing `src/data/workouts.ts` with fetch calls.
- No unit tests included yet.
