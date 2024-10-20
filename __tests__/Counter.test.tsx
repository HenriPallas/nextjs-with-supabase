import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '@/components/testing/Counter';

describe('Counter Component', () => {

  it('Starting count', () => {
    render(<Counter />);
    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
  });

  it('Increment count', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/increment/i);

    fireEvent.click(incrementButton);
    expect(screen.getByText(/counter: 1/i)).toBeInTheDocument();
  });

  it('Decrement count', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/increment/i);
    const decrementButton = screen.getByText(/decrement/i);

    fireEvent.click(incrementButton); 
    fireEvent.click(decrementButton);
    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
  });

  it('Disable decrement when count is 0', () => {
    render(<Counter />);
    const decrementButton = screen.getByText(/decrement/i);
    expect(decrementButton).toBeDisabled();
  });
});
