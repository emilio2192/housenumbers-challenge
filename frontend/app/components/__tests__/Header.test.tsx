import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../Header';

describe('Header', () => {
  const mockOnButtonClick = vi.fn();

  beforeEach(() => {
    mockOnButtonClick.mockClear();
  });

  it('renders the logo and title', () => {
    render(<Header buttonText="Test Button" onButtonClick={mockOnButtonClick} />);
    
    expect(screen.getByAltText('AI Snippets Service')).toBeInTheDocument();
    expect(screen.getByText('AI Snippets Service')).toBeInTheDocument();
  });

  it('renders the button with correct text', () => {
    render(<Header buttonText="Custom Button" onButtonClick={mockOnButtonClick} />);
    
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
  });

  it('calls onButtonClick when button is clicked', () => {
    render(<Header buttonText="Click Me" onButtonClick={mockOnButtonClick} />);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct header classes', () => {
    render(<Header buttonText="Test" onButtonClick={mockOnButtonClick} />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-row');
    expect(header).toHaveClass('justify-between');
    expect(header).toHaveClass('items-center');
    expect(header).toHaveClass('px-12');
    expect(header).toHaveClass('py-8');
    expect(header).toHaveClass('w-full');
    expect(header).toHaveClass('max-w-6xl');
    expect(header).toHaveClass('mx-auto');
  });

  it('renders logo with correct attributes', () => {
    render(<Header buttonText="Test" onButtonClick={mockOnButtonClick} />);
    
    const logo = screen.getByAltText('AI Snippets Service');
    expect(logo).toHaveAttribute('src', '/logo.avif');
    expect(logo).toHaveAttribute('width', '150');
    expect(logo).toHaveAttribute('height', '48');
  });

  it('renders title with correct styling', () => {
    render(<Header buttonText="Test" onButtonClick={mockOnButtonClick} />);
    
    const title = screen.getByText('AI Snippets Service');
    expect(title).toHaveClass('text-4xl');
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('text-gray-800');
  });

  it('renders button with correct styling', () => {
    render(<Header buttonText="Test Button" onButtonClick={mockOnButtonClick} />);
    
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-primary-500');
    expect(button).toHaveClass('text-white');
  });
}); 