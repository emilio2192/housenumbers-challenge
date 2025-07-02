import Anthropic from '@anthropic-ai/sdk';

export interface SummaryRequest {
  text: string;
  maxLength?: number;
}

export interface SummaryResponse {
  summary: string;
  tokensUsed?: number;
}

class ClaudeService {
  private client: Anthropic | null = null;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  private initialized: boolean = false;

  constructor() {
    this.model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
    this.maxTokens = parseInt(process.env.CLAUDE_MAX_TOKENS || '1000');
    this.temperature = parseFloat(process.env.CLAUDE_TEMPERATURE || '0.7');
  }

  private initialize(): void {
    if (this.initialized) return;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is required in environment variables');
    }

    this.client = new Anthropic({
      apiKey: apiKey,
    });

    this.initialized = true;
  }

  async generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
    try {
      this.initialize();

      const { text, maxLength = 30 } = request;

      if (!text || text.trim().length === 0) {
        throw new Error('Text is required for summary generation');
      }

      if (!this.client) {
        throw new Error('Claude client not initialized');
      }

      const prompt = this.buildSummaryPrompt(text, maxLength);

      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const summary = response.content[0]?.type === 'text' ? response.content[0].text.trim() : '';

      if (!summary) {
        throw new Error('Failed to generate summary');
      }

      return {
        summary,
        tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens,
      };
    } catch (error) {
      console.error('Claude API Error:', error);

      if (error instanceof Error) {
        // Handle specific API errors
        if (error.message.includes('authentication')) {
          throw new Error('Invalid API key');
        }
        if (error.message.includes('quota')) {
          throw new Error('API quota exceeded');
        }
        if (error.message.includes('rate limit')) {
          throw new Error('Rate limit exceeded');
        }
      }

      throw new Error('Failed to generate summary');
    }
  }

  private buildSummaryPrompt(text: string, maxLength: number): string {
    return (
      `Please provide a concise summary of the following text. The summary should be no more than ` +
      `${maxLength} characters and capture the main points clearly.\n\n` +
      `Text to summarize:"${text}"`
    );
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      this.initialize();

      if (!this.client) {
        return false;
      }

      await this.client.messages.create({
        model: this.model,
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: 'Hello',
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('Claude health check failed:', error);
      return false;
    }
  }

  // Check if service is configured
  isConfigured(): boolean {
    return !!process.env.ANTHROPIC_API_KEY;
  }
}

// Export singleton instance
export const claudeService = new ClaudeService();
