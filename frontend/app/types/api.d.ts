export interface Summary {
  id: string;
  summary: string;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Snippet {
  id: string;
  summary: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
} 