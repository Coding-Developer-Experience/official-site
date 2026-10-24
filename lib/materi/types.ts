export type ModuleType = "article" | "video" | "quiz" | "exercise";
export type ClassLevel = "beginner" | "intermediate" | "advanced" | "Pemula" | "Menengah" | "Mahir";

export interface ModuleItem {
  id: string;
  class_id?: number | string;
  chapter_title?: string;
  slug: string;
  title: string;
  orderNumber: string; // e.g. "1.1", "2.1"
  order_index?: number;
  type?: ModuleType;
  durationMinutes: number; // estimated_minutes in PRD
  estimated_minutes?: number;
  isFree?: boolean;
  is_published?: boolean;
  content?: string;
  summary?: string;
  is_completed?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  chapter_title?: string; // PRD key
  orderIndex: number;
  order_index?: number;
  modules: ModuleItem[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  totalModules: number;
  total_modules?: number;
  level: ClassLevel;
  chapters: Chapter[];
  thumbnail_path?: string;
  is_published?: boolean;
}

export interface UserProgressState {
  completedModuleIds: string[];
  currentModuleId: string;
  streakDays: number;
  points: number; // points_ledger in PRD (default: completedModules * 5)
}

export interface StudyNote {
  id: string;
  moduleId: string;
  content: string;
  updatedAt: string;
}
