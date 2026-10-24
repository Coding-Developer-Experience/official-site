export type ModuleType = "article" | "video" | "quiz" | "exercise";

export interface ModuleItem {
  id: string;
  slug: string;
  title: string;
  orderNumber: string; // e.g. "1.1", "2.1"
  type: ModuleType;
  durationMinutes: number;
  isFree: boolean;
  content?: string;
  summary?: string;
}

export interface Chapter {
  id: string;
  title: string;
  orderIndex: number;
  modules: ModuleItem[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  totalModules: number;
  level: "Pemula" | "Menengah" | "Mahir";
  chapters: Chapter[];
}

export interface UserProgressState {
  completedModuleIds: string[];
  currentModuleId: string;
  streakDays: number;
  points: number;
}

export interface StudyNote {
  id: string;
  moduleId: string;
  content: string;
  updatedAt: string;
}
