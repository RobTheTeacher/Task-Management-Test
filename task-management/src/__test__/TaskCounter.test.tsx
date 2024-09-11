import { render, screen } from "@testing-library/react";
import TaskCounter from "@/components/TaskCounter";
import exp from "constants";

test('Displays total and completed tasks count', () => {
    render(<TaskCounter total={10} completed={5}/>);
    expect(screen.getByText(/Total tasks: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed tasks: 5/i)).toBeInTheDocument();
});

test('Displays zero task correctly', () => {
    render(<TaskCounter total={0} completed={0} />);
    expect(screen.getByText(/Total tasks: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed tasks: 0/i)).toBeInTheDocument();
});