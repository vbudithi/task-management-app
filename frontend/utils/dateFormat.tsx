//Format date as MM/DD/YYYY (US format)
export function dateFormat(date?: string | null): string {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString("en-US");
}
// Convert API/DB date (ISO) → input[type=date] value
export function toInputDate(date?: string | Date | null): string {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

// Convert input[type=date] → API/DB date (ISO)
export function toApiDate(date?: string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
}
