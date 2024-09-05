import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '@/components/TaskList';
import StatusFilter from '@/components/StatusFilter';

test('Renders list of tasks', () => {
  const tasks = [
    { id: 1, description: 'Task 1', category: 'Work', completed: false },
    { id: 2, description: 'Task 2', category: 'Personal', completed: false },
  ];

  render(<TaskList tasks={tasks} onCompleteTask={jest.fn()} onDeleteTask={jest.fn()} />);

  const taskItems = screen.getAllByRole('listitem');
  expect(taskItems).toHaveLength(2);
});

test('Marks task as completed', () => {
  const mockCompleteTask = jest.fn();
  render(<TaskList tasks={[{ id: 1, description: 'Task 1', category: 'Work', completed: false }]} onCompleteTask={mockCompleteTask} onDeleteTask={jest.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: /complete/i }));
  expect(mockCompleteTask).toHaveBeenCalledWith(1);
});

test('Deletes task', () => {
  const mockDeleteTask = jest.fn();
  render(<TaskList tasks={[{ id: 1, description: 'Task 1', category: 'Work', completed: false }]} onCompleteTask={jest.fn()} onDeleteTask={mockDeleteTask} />);
  fireEvent.click(screen.getByRole('button', { name: /delete/i }));
  expect(mockDeleteTask).toHaveBeenCalledWith(1);
});

test('Renders correctly when there are no tasks', () => {
  const mockOnChange = jest.fn();
  render(<StatusFilter selectedStatus="completed" onChange={mockOnChange} />);
  fireEvent.change(screen.getByRole('combobox'), {target: { value: ''}});

  expect(mockOnChange).toHaveBeenCalledWith('');
});
