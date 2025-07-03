import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SummaryCard from '../SummaryCard';

describe('SummaryCard', () => {
  const mockSummary = 'This is a test summary';
  const mockId = 'test-123';

  it('renders the summary text', () => {
    render(<SummaryCard summary={mockSummary} id={mockId} />);
    expect(screen.getByText(mockSummary)).toBeInTheDocument();
  });

  it('renders the correct link href', () => {
    render(<SummaryCard summary={mockSummary} id={mockId} />);
    const link = screen.getByText(mockSummary).closest('a');
    
    expect(link).toHaveAttribute('href', `/snippets/${mockId}`);
  });

  it('applies correct default classes', () => {
    render(<SummaryCard summary={mockSummary} id={mockId} />);
    const link = screen.getByText(mockSummary);
    
    expect(link).toHaveClass('border-b-2');
    expect(link).toHaveClass('border-gray-300');
    expect(link).toHaveClass('p-4');
    expect(link).toHaveClass('text-gray-800');
    expect(link).toHaveClass('hover:border-primary-500');
    expect(link).toHaveClass('transition-colors');
    expect(link).toHaveClass('duration-200');
    expect(link).toHaveClass('break-words');
    expect(link).toHaveClass('whitespace-pre-line');
    expect(link).toHaveClass('w-full');
  });

  it('renders with different summary and id', () => {
    const differentSummary = 'Another summary text';
    const differentId = 'different-456';
    
    render(<SummaryCard summary={differentSummary} id={differentId} />);
    
    expect(screen.getByText(differentSummary)).toBeInTheDocument();
    expect(screen.getByText(differentSummary).closest('a')).toHaveAttribute('href', `/snippets/${differentId}`);
  });

  it('renders as an anchor tag', () => {
    render(<SummaryCard summary={mockSummary} id={mockId} />);
    const link = screen.getByText(mockSummary).closest('a');
    
    expect(link).toBeInTheDocument();
    expect(link?.tagName).toBe('A');
  });

  it('preserves whitespace in summary text', () => {
    const summaryWithWhitespace = 'Summary\nwith\nline\nbreaks';
    render(<SummaryCard summary={summaryWithWhitespace} id={mockId} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('whitespace-pre-line');
    expect(link).toHaveAttribute('href', `/snippets/${mockId}`);
  });

  it('handles long summary text', () => {
    const longSummary = 'This is a very long summary text that should be handled properly by the component and should wrap correctly due to the break-words class';
    render(<SummaryCard summary={longSummary} id={mockId} />);
    
    const link = screen.getByText(longSummary);
    expect(link).toHaveClass('break-words');
    expect(link).toHaveClass('w-full');
  });
}); 