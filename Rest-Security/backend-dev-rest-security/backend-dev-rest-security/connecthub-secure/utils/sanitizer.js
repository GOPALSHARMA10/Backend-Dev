import sanitizeHtml from "sanitize-html";

export function cleanHTML(input) {
    return sanitizeHtml(input, {
        allowedTags: ["b", "i", "em", "strong", "a"],
        allowedAttributes: { a: ["href"] }
    });
}