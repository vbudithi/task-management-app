/**
 * Format date as MM/DD/YYYY (US format)
 */
export function dateFormat(date?: string | null): string {
    if (!date) return "—";

    const d = new Date(date);
    return d.toLocaleDateString("en-US");
}