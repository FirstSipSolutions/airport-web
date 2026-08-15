import '@testing-library/jest-dom';
import "@testing-library/jest-dom/vitest";
import userEvent from '@Testing-library/user-event';

import {render, screen} from '@testing-library/react';
import { describe, it, expect} from 'vitest';

import Login from '@/pages/Login';

describe('Login Component', () => {

    it('displays the email and password inputs', () => {
        render(<Login />);

        expect(screen.getByText(/Log in/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign in with:/i)).toBeInTheDocument();

        expect(screen.getByText(/or:/i)).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText(/Name/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email')

        const passwordInput = screen.getByPlaceholderText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');

        expect(screen.getByRole('button', { name: /Log in/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Google/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Facebook/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /GitHub/i})).toBeInTheDocument();
    })

    // TODO - Finish test for user typing and submitting their username and password for Logging in.

    // it('allows a user to type and submit the login form', async () => {
    //     const user = userEvent.setup();
    //     render(<Login />);

    //     const emailInput = screen.getByPlaceholderText(/Name/i);
    //     await user.type(emailInput, 'test@airport.com');

    //     const passwordInput = screen.getByPlaceholderText(/Password/i);
    //     await user.type(passwordInput, 'SecurePassword123');
        
    //     const loginButton = screen.getByRole('button', {name: /Log in/i });
    //     await user.click(loginButton);
    // })
})
