export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-EN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};