import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import * as request from '~/utils/request';
import Index from '../_index';
import { vi, Mock } from 'vitest';

vi.mock('~/utils/request');

describe('Index page', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  function renderWithRemixStub() {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Index,
      },
    ]);
    return render(<RemixStub initialEntries={["/"]} />);
  }

  it('shows loading state', () => {
    (request.getSummaries as Mock).mockReturnValue(new Promise(() => {}));
    renderWithRemixStub();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', async () => {
    (request.getSummaries as Mock).mockRejectedValue(new Error('API error'));
    renderWithRemixStub();
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });

  it('shows empty state', async () => {
    (request.getSummaries as Mock).mockResolvedValue({ message: 'ok', data: [] });
    renderWithRemixStub();
    await waitFor(() => expect(screen.getByText(/no summaries yet/i)).toBeInTheDocument());
  });

  it('shows summaries', async () => {
    (request.getSummaries as Mock).mockResolvedValue({
      message: 'ok',
      data: [
        { id: '1', summary: 'Summary 1', text: 'Text 1' },
        { id: '2', summary: 'Summary 2', text: 'Text 2' },
      ],
    });
    renderWithRemixStub();
    await waitFor(() => expect(screen.getByText('Summary 1')).toBeInTheDocument());
    expect(screen.getByText('Summary 2')).toBeInTheDocument();
  });
}); 