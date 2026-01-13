export const dateFormat = (value?: string | null) => {
    if (!value) return '-'
    return new Date(value).toISOString().split("T")[0]
}