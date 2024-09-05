import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "@/components/CategoryFilter";

test('Renders category filter', () => {
    render(<CategoryFilter categories={['Work', 'Personal']} selectedCategory="" onChange={jest.fn()} />); 
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('Filters tasks by category', () => {
     const mockOnChange = jest.fn();
     render(<CategoryFilter categories={[ 'Work', 'Personal' ]} selectedCategory="Work" onChange={mockOnChange} />);
     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Personal'}});
     expect(mockOnChange).toHaveBeenCalledWith('Personal');
});