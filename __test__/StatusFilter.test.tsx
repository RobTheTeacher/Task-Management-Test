import { render, screen, fireEvent } from "@testing-library/react";
import StatusFilter from "@/components/StatusFilter";

test('Renders status filter', () => {
    render(<StatusFilter selectedStatus="" onChange={jest.fn}/>)
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('Filters tasks by status', () => {
    const mockOnChange = jest.fn();
    render(<StatusFilter selectedStatus="" onChange={mockOnChange}/>);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'completed' }});
    expect(mockOnChange).toHaveBeenCalledWith('completed');
});

test('Resets to show all statuses', () => {
    const mockOnChange = jest.fn();
    render(<StatusFilter selectedStatus="completed" onChange={mockOnChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ''}});

    expect(mockOnChange).toHaveBeenCalledWith('');
})