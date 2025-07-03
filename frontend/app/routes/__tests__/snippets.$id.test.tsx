import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, Mock } from 'vitest';
import * as request from '~/utils/request';
import SnippetDetails from '../snippets.$id';
import { BrowserRouter } from 'react-router-dom';
import * as remixReact from '@remix-run/react';

vi.mock('~/utils/request');
const mockRequest = request as unknown as { getSnippet: ReturnType<typeof vi.fn> };

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual<typeof remixReact>('@remix-run/react');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});
const mockUseLoaderData = remixReact.useLoaderData as unknown as Mock;

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

describe('SnippetDetails page', () => {
  const snippetId = 'test-id';

  afterEach(() => {
    vi.resetAllMocks();
  });

  function renderWithRouter() {
    mockUseLoaderData.mockReturnValue({ snippetId });
    return render(
      <BrowserRouter>
        <SnippetDetails />
      </BrowserRouter>
    );
  }

  it('shows loading state', () => {
    mockRequest.getSnippet.mockReturnValue(new Promise(() => {}));
    renderWithRouter();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', async () => {
    mockRequest.getSnippet.mockRejectedValue(new Error('API error'));
    renderWithRouter();
    await waitFor(() => expect(screen.getByText(/snippet not found/i)).toBeInTheDocument());
  });

  it('shows snippet details', async () => {
    mockRequest.getSnippet.mockResolvedValue({
      message: 'ok',
      data: {
        id: snippetId,
        summary: 'Test Summary',
        text: 'Test content',
        createdAt: '2024-07-01T00:00:00.000Z',
        updatedAt: '2024-07-02T00:00:00.000Z',
      },
    });
    renderWithRouter();
    await waitFor(() => expect(screen.getByText('Snippet Details')).toBeInTheDocument());
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    const createdAt = formatDate('2024-07-01T00:00:00.000Z');
    const updatedAt = formatDate('2024-07-02T00:00:00.000Z');
    expect(screen.getByText(`Created: ${createdAt}`)).toBeInTheDocument();
    expect(screen.getByText(`Updated: ${updatedAt}`)).toBeInTheDocument();
  });
}); 