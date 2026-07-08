import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompletionEntry, FavoriteIds, Workout } from '../types';

const FAVORITES_KEY = 'gymflow:favorites';
const HISTORY_KEY = 'gymflow:history';

interface AppDataContextValue {
  favorites: FavoriteIds;
  history: CompletionEntry[];
  isLoading: boolean;
  error: string | null;
  isFavorite: (workoutId: string) => boolean;
  toggleFavorite: (workoutId: string) => void;
  addCompletion: (workout: Workout) => void;
  clearHistory: () => void;
  retry: () => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteIds>([]);
  const [history, setHistory] = useState<CompletionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [favRaw, historyRaw] = await Promise.all([
          AsyncStorage.getItem(FAVORITES_KEY),
          AsyncStorage.getItem(HISTORY_KEY),
        ]);
        if (cancelled) return;
        setFavorites(favRaw ? JSON.parse(favRaw) : []);
        setHistory(historyRaw ? JSON.parse(historyRaw) : []);
      } catch (e) {
        if (!cancelled) setError('Could not load your saved data. Pull to retry.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const isFavorite = useCallback((workoutId: string) => favorites.includes(workoutId), [favorites]);

  const toggleFavorite = useCallback((workoutId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(workoutId) ? prev.filter((id) => id !== workoutId) : [...prev, workoutId];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next)).catch(() => {
        setError('Could not save favorites.');
      });
      return next;
    });
  }, []);

  const addCompletion = useCallback((workout: Workout) => {
    const entry: CompletionEntry = {
      id: `${workout.id}-${Date.now()}`,
      workoutId: workout.id,
      workoutTitle: workout.title,
      category: workout.category,
      duration: workout.duration,
      calories: workout.calories,
      completedAt: new Date().toISOString(),
    };
    setHistory((prev) => {
      const next = [entry, ...prev];
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next)).catch(() => {
        setError('Could not save workout history.');
      });
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([])).catch(() => {
      setError('Could not clear history.');
    });
  }, []);

  const retry = useCallback(() => setReloadToken((t) => t + 1), []);

  const value = useMemo<AppDataContextValue>(
    () => ({ favorites, history, isLoading, error, isFavorite, toggleFavorite, addCompletion, clearHistory, retry }),
    [favorites, history, isLoading, error, isFavorite, toggleFavorite, addCompletion, clearHistory, retry],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataContextValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return ctx;
}
