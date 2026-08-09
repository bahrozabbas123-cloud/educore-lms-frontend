/**
 * Joins conditional class names together, filtering out falsy values.
 * A lightweight, dependency-free stand-in for libraries like `clsx`.
 *
 * Usage: cn("btn", isActive && "btn-active", error && "btn-error")
 */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
