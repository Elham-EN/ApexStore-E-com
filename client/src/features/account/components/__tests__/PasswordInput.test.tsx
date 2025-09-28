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
}: {
  error?: boolean;
  helperText?: string;
}) {
  const { register } = useForm<LoginSchema>();

  return (
    <PasswordInput
      register={register}
      error={error}
      helperText={helperText}
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

  it("initially shows password as hidden with visibility icon", () => {
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    // Check for visibility icon (should be present when password is hidden)
    const visibilityIcon = screen.getByTestId("VisibilityIcon");
    expect(visibilityIcon).toBeInTheDocument();
  });

  it("toggles password visibility when icon is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    // Initially hidden
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(screen.getByTestId("VisibilityIcon")).toBeInTheDocument();

    // Click to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByTestId("VisibilityOffIcon")).toBeInTheDocument();

    // Click again to hide password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(screen.getByTestId("VisibilityIcon")).toBeInTheDocument();
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
});