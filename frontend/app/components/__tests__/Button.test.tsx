import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct default classes', () => {
    render(<Button>Styled</Button>);
    const button = screen.getByText('Styled');
    
    expect(button).toHaveClass('bg-primary-500');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('border-primary-500');
    expect(button).toHaveClass('hover:bg-white');
    expect(button).toHaveClass('hover:text-primary-500');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText('Custom');
    
    expect(button).toHaveClass('custom-class');
  });

  it('sets correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('defaults to button type', () => {
    render(<Button>Default</Button>);
    const button = screen.getByText('Default');
    
    expect(button).toHaveAttribute('type', 'button');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders without onClick prop', () => {
    render(<Button>No Click</Button>);
    const button = screen.getByText('No Click');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
}); 