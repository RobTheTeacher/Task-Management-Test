import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

test('renders the header', () => {
  render(<Header />);
  expect(screen.getByRole('heading', { name: /task management/i })).toBeInTheDocument();
});