import { twMerge } from "tailwind-merge";
import classnames from "classnames";

/**
 * Button Component
 * @param {string} [type="button"] - The type of the button element (e.g., button, submit).
 * @param {function} onClick - The function to be called when the button is clicked.
 * @param {boolean} [disabled=false] - Indicates whether the button is disabled.
 * @param {string} [className=""] - Additional CSS classes to apply to the button.
 * @param {ReactNode} children - The content of the button.
 * @param {string} [variant="primary"] - The variant style of the button (e.g., primary, secondary).
 * @param {string} size - The size of the button (e.g., xs, sm, md, lg).
 * @param {ReactNode} icon - Optional icon element to be displayed alongside the button text.
 */

const Button = ({
  type = "button",
  onClick,
  disabled = false,
  className = "",
  children,
  variant = "primary",
  size,
  icon,
  title = "",
}) => {
  const baseStyles = `font-medium rounded-lg shadow-sm px-4 py-2 focus:outline-none transition}`;

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return classnames("bg-primary-500 text-white", {
          "hover:bg-primary-600": !disabled,
        });
      case "primary-light":
        return classnames("bg-primary-light text-black", {
          "hover:bg-primary-50": !disabled,
        });
      case "secondary":
        return classnames("bg-secondary-50 text-black", {
          "hover:bg-secondary-100": !disabled,
        });
      case "accent":
        return classnames("bg-accent-500 text-white", {
          "hover:bg-accent-600": !disabled,
        });
      case "accent-light":
        return classnames("bg-accent-50 text-black", {
          "hover:bg-accent-100": !disabled,
        });
      case "danger":
        return classnames("bg-red-500 text-white", {
          "hover:bg-red-700": !disabled,
        });
      case "primary-skeleton":
        return classnames(
          "bg-white text-primary-500 border border-primary-500",
          {
            "hover:text-primary-600 hover:border-primary-600": !disabled,
          }
        );
      case "danger-skeleton":
        return classnames("bg-white text-red-500 border border-red-500", {
          "hover:text-red-600 hover:border-red-600": !disabled,
        });
      case "accent-skeleton":
        return classnames("bg-white text-accent-500 border border-accent-500", {
          "hover:text-accent-600 hover:border-accent-600": !disabled,
        });
      default:
        return classnames(
          "bg-primary-200 text-white focus:ring focus:ring--primary bg-primary",
          {
            "hover:bg-primary": !disabled,
          }
        );
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "xs":
        return "text-xs py-1 px-2";
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        `${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${className}`
      )}
    >
      <div className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
