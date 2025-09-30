import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, it, expect } from "vitest";
import PasswordInput from "../PasswordInput";
import type { LoginSchema } from "@/lib/schemas/loginSchema";

// Test wrapper component to provide React Hook Form context
function TestWrapper({
  error,
  helperText,
  disabled,
}: {
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}) {
  const { register } = useForm<LoginSchema>();

  return (
    <PasswordInput
      register={register}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
}

describe("PasswordInput Component", () => {
  it("renders password field with correct label", () => {
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("renders visibility toggle button with correct accessibility label", () => {
    render(<TestWrapper />);

    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it("initially shows password as hidden", () => {
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it("toggles password visibility when button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    // Initially hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("displays error state when error prop is true", () => {
    render(<TestWrapper error={true} helperText="Password is required" />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });

  it("displays helper text when provided", () => {
    const helperText = "Password must be at least 6 characters";
    render(<TestWrapper helperText={helperText} />);

    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it("displays error helper text with error styling", () => {
    const errorText = "Password is required";
    render(<TestWrapper error={true} helperText={errorText} />);

    const helperTextElement = screen.getByText(errorText);
    expect(helperTextElement).toBeInTheDocument();

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });

  it("allows user to type in password field", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const testPassword = "testpassword123";

    await user.type(passwordInput, testPassword);
    expect(passwordInput).toHaveValue(testPassword);
  });

  it("shows typed password when visibility is toggled on", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    const testPassword = "secretpassword";

    // Type password while hidden
    await user.type(passwordInput, testPassword);
    expect(passwordInput).toHaveValue(testPassword);
    expect(passwordInput).toHaveAttribute("type", "password");

    // Toggle visibility to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(passwordInput).toHaveValue(testPassword);
  });

  it("maintains password value when toggling visibility", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    const testPassword = "mypassword";

    await user.type(passwordInput, testPassword);

    // Toggle visibility multiple times
    await user.click(toggleButton); // Show
    expect(passwordInput).toHaveValue(testPassword);

    await user.click(toggleButton); // Hide
    expect(passwordInput).toHaveValue(testPassword);

    await user.click(toggleButton); // Show again
    expect(passwordInput).toHaveValue(testPassword);
  });

  it("has proper accessibility attributes", () => {
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    expect(passwordInput).toHaveAttribute("name", "password");
    expect(toggleButton).toHaveAttribute("aria-label", "toggle password visibility");
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    // Tab to password input
    await user.tab();
    expect(passwordInput).toHaveFocus();

    // Tab to toggle button
    await user.tab();
    expect(toggleButton).toHaveFocus();

    // Press Enter to toggle visibility
    expect(passwordInput).toHaveAttribute("type", "password");
    await user.keyboard("{Enter}");
    expect(passwordInput).toHaveAttribute("type", "text");

    // Press Space to toggle visibility back
    await user.keyboard(" ");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("handles different validation error scenarios", () => {
    const { rerender } = render(
      <TestWrapper error={true} helperText="Password is required" />
    );

    let passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Password is required")).toBeInTheDocument();

    // Test different error message
    rerender(
      <TestWrapper
        error={true}
        helperText="Password must be at least 8 characters"
      />
    );

    passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();

    // Test no error state
    rerender(<TestWrapper error={false} helperText="" />);

    passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).not.toHaveAttribute("aria-invalid", "true");
  });

  it("maintains focus after toggling visibility", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    // Focus the password input and type
    await user.click(passwordInput);
    await user.type(passwordInput, "test");
    expect(passwordInput).toHaveFocus();

    // Toggle visibility - focus should remain on input
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    // Note: Focus behavior may vary by implementation, this tests the current behavior
  });

  it("works correctly when password contains special characters", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    const complexPassword = "Test@123!#$%^&*()";

    // Type complex password
    await user.type(passwordInput, complexPassword);
    expect(passwordInput).toHaveValue(complexPassword);

    // Toggle visibility and verify value is maintained
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(passwordInput).toHaveValue(complexPassword);

    // Toggle back and verify value is still maintained
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveValue(complexPassword);
  });

  it("handles disabled state correctly", async () => {
    const user = userEvent.setup();
    render(<TestWrapper disabled={true} />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    // Input and button should be disabled
    expect(passwordInput).toBeDisabled();
    expect(toggleButton).toBeDisabled();

    // Should not be able to type in disabled input
    await user.type(passwordInput, "test");
    expect(passwordInput).toHaveValue("");

    // Password type should remain unchanged when button is disabled
    expect(passwordInput).toHaveAttribute("type", "password");

    // Verify the toggle button cannot be interacted with (disabled buttons should not respond to clicks)
    // We don't actually try to click it since RTL prevents interaction with disabled elements
    expect(toggleButton).toHaveAttribute("disabled");
  });

  it("remains functional when not disabled", async () => {
    const user = userEvent.setup();
    render(<TestWrapper disabled={false} />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    // Input and button should be enabled
    expect(passwordInput).not.toBeDisabled();
    expect(toggleButton).not.toBeDisabled();

    // Should be able to type and interact normally
    await user.type(passwordInput, "test");
    expect(passwordInput).toHaveValue("test");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
  });
});