import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsForm from './SettingsForm';

function renderForm() {
  return render(<SettingsForm />);
}

describe('SettingsForm', () => {
  it('shows a required error for Full Name when left blank and blurred', async () => {
    const user = userEvent.setup();
    renderForm();

    const fullNameInput = screen.getByLabelText(/full name/i);
    await user.click(fullNameInput);
    await user.tab();

    const error = await screen.findByText(/full name is required/i);
    expect(error).toBeInTheDocument();
    expect(fullNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(fullNameInput).toHaveAttribute('aria-describedby', 'fullName-error');
    expect(error).toHaveAttribute('id', 'fullName-error');
  });

  it('shows a required error for Email when left blank and blurred', async () => {
    const user = userEvent.setup();
    renderForm();

    const emailInput = screen.getByLabelText(/email address/i);
    await user.click(emailInput);
    await user.tab();

    const error = await screen.findByText(/email address is required/i);
    expect(error).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('rejects an invalid email format with the correct message and aria attributes', async () => {
    const user = userEvent.setup();
    renderForm();

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'notanemail');
    await user.tab();

    const error = await screen.findByText('Please enter a valid email address');
    expect(error).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    expect(error).toHaveAttribute('id', 'email-error');
  });

  it('keeps the Save button disabled until all fields are valid', async () => {
    const user = userEvent.setup();
    renderForm();

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();

    await user.type(screen.getByLabelText(/full name/i), 'Suff Sufiyan');
    expect(saveButton).toBeDisabled();

    await user.type(screen.getByLabelText(/email address/i), 'notanemail');
    expect(saveButton).toBeDisabled();

    await user.clear(screen.getByLabelText(/email address/i));
    await user.type(screen.getByLabelText(/email address/i), 'suff@example.com');
    expect(saveButton).toBeDisabled();

    await user.selectOptions(screen.getByLabelText(/theme/i), 'dark');
    expect(saveButton).toBeEnabled();
  });

  it('shows a success message after a valid save', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), 'Suff Sufiyan');
    await user.type(screen.getByLabelText(/email address/i), 'suff@example.com');
    await user.selectOptions(screen.getByLabelText(/theme/i), 'light');

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeEnabled();
    await user.click(saveButton);

    const success = await screen.findByText(/settings saved successfully/i);
    expect(success).toBeInTheDocument();
  });

  it('does not show a success message when submitted while invalid', async () => {
    renderForm();
    expect(screen.queryByText(/settings saved successfully/i)).not.toBeInTheDocument();
  });
});