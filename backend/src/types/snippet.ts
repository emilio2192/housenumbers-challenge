export interface CreateSnippetRequest {
  text: string;
}

export interface Snippet {
  id: string;
  text: string;
  summary: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SnippetResponse {
  message: string;
  data: Snippet;
}

export interface SnippetsListResponse {
  message: string;
  data: Snippet[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
  error?: string;
}
