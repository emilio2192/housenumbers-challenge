import { SummaryRequest, SummaryResponse } from '../claude.service';

// Mock implementation of ClaudeService
class MockClaudeService {
    private mockSummaries: Map<string, string> = new Map();
    private shouldFail: boolean = false;
    private failureMessage: string = 'Mock failure';

    // Method to set up mock responses
    setMockSummary(text: string, summary: string): void {
        this.mockSummaries.set(text, summary);
    }

    // Method to simulate failures
    setShouldFail(shouldFail: boolean, message: string = 'Mock failure'): void {
        this.shouldFail = shouldFail;
        this.failureMessage = message;
    }

    // Reset mock state
    reset(): void {
        this.mockSummaries.clear();
        this.shouldFail = false;
        this.failureMessage = 'Mock failure';
    }

    async generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
        if (this.shouldFail) {
            throw new Error(this.failureMessage);
        }

        const { text, maxLength = 30 } = request;

        if (!text || text.trim().length === 0) {
            throw new Error('Text is required for summary generation');
        }

        // Check if we have a specific mock for this text
        if (this.mockSummaries.has(text)) {
            return {
                summary: this.mockSummaries.get(text)!,
                tokensUsed: 150
            };
        }

        // Default mock summary based on text length
        const defaultSummary = text.length > 100 
            ? text.substring(0, maxLength) + '...'
            : text.substring(0, Math.min(maxLength, text.length));

        return {
            summary: defaultSummary,
            tokensUsed: 150
        };
    }

    async healthCheck(): Promise<boolean> {
        return !this.shouldFail;
    }

    isConfigured(): boolean {
        return true;
    }
}

// Export singleton mock instance
export const mockClaudeService = new MockClaudeService(); 