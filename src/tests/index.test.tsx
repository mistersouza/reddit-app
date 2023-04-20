import Navbar from "@/pages/components/navbar";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

it('renders Navbar', () => {
    render(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
});