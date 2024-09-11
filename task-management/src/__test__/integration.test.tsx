import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";

test('Adds a new task and updates the task list and counter', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/task description/i), { target: { value: 'New Task'}});
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Work'}});
    fireEvent.click(screen.getByRole( 'button', { name: /add task/i }));

    expect(screen.getByText(/New Task \(Work\)/i)).toBeInTheDocument();

    expect(screen.getByText(/Total tasks: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed tasks: 0/i)).toBeInTheDocument();
});

test('Marks a task as completed and updates the task list and counter', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/task description/i), { target: { value: 'Task to Complete'}});
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Work'}});
    fireEvent.click(screen.getByRole('button', { name: /add task/i}));

    const completeButtons = screen.getAllByRole('button', { name: /complete/i});
    fireEvent.click(completeButtons[0]);

    expect(screen.getByText(/Task to Complete \(Work\)/i)).toBeInTheDocument();

    expect(screen.getByText(/Total tasks: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed tasks: 1/i)).toBeInTheDocument();
  });

  test('Deletes a task and updates the task list and counter', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/task description/i), { target: { value: 'Task to Complete'}});
    fireEvent.change(screen.getByLabelText(/category/i), {target: { value: 'Work'}});
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i});
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText(/Task to Delete \(Work\)/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Total tasks: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed tasks: 0/i)).toBeInTheDocument();
  });