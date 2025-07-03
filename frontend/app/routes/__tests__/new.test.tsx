import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, Mock } from 'vitest';
import NewSnippet from '../new';
import { BrowserRouter } from 'react-router-dom';
import * as useCreateSnippetModule from '~/utils/useCreateSnippet';

vi.mock('~/utils/useCreateSnippet');

const mockUseCreateSnippet = useCreateSnippetModule.useCreateSnippet as unknown as Mock;

describe('NewSnippet page', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  function renderWithRouter() {
    return render(
      <BrowserRouter>
        <NewSnippet />
      </BrowserRouter>
    );
  }

  it('renders the form and header', () => {
    mockUseCreateSnippet.mockReturnValue({ submit: vi.fn(), loading: false, error: null, snippet: null });
    renderWithRouter();
    expect(screen.getByText('Create New Snippet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your text to be summarized here...')).toBeInTheDocument();
    expect(screen.getByText('Save Snippet')).toBeInTheDocument();
  });

  it('disables the button when textarea is empty', () => {
    mockUseCreateSnippet.mockReturnValue({ submit: vi.fn(), loading: false, error: null, snippet: null });
    renderWithRouter();
    const button = screen.getByText('Save Snippet');
    expect(button).toBeDisabled();
  });

  it('enables the button when textarea has text', () => {
    mockUseCreateSnippet.mockReturnValue({ submit: vi.fn(), loading: false, error: null, snippet: null });
    renderWithRouter();
    const textarea = screen.getByPlaceholderText('Enter your text to be summarized here...');
    fireEvent.change(textarea, { target: { value: 'console.log("hi")' } });
    const button = screen.getByText('Save Snippet');
    expect(button).not.toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockUseCreateSnippet.mockReturnValue({ submit: vi.fn(), loading: true, error: null, snippet: null });
    renderWithRouter();
    const button = screen.getByText('Save Snippet');
    expect(button).toBeDisabled();
  });

  it('shows error state', async () => {
    mockUseCreateSnippet.mockReturnValue({ submit: vi.fn(), loading: false, error: 'API error', snippet: null });
    renderWithRouter();
    expect(screen.getByText('API error')).toBeInTheDocument();
  });

  it('calls submit with the correct text', async () => {
    const submitMock = vi.fn().mockResolvedValue({ id: '123' });
    mockUseCreateSnippet.mockReturnValue({ submit: submitMock, loading: false, error: null, snippet: null });
    renderWithRouter();
    const textarea = screen.getByPlaceholderText('Enter your text to be summarized here...');
    fireEvent.change(textarea, { target: { value: 'console.log("hi")' } });
    const button = screen.getByText('Save Snippet');
    fireEvent.click(button);
    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledWith('console.log("hi")');
    });
  });
}); 