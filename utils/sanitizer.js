/**
 * Sanitizes the project name to ensure it's safe for use in directory paths and shell commands.
 * Allows only alphanumeric characters and hyphens.
 * 
 * @param {string} name 
 * @returns {string|null} The sanitized name or null if invalid
 */
function sanitizeProjectName(name) {
    if (typeof name !== 'string') return null;

    // Convert to lowercase and trim
    let sanitized = name.toLowerCase().trim();

    // Must be between 3 and 50 characters
    if (sanitized.length < 3 || sanitized.length > 50) return null;

    // Regex to allow only letters, numbers, and hyphens (must start and end with alphanumeric)
    const validPattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

    if (!validPattern.test(sanitized)) {
        return null;
    }

    // Explicitly reject known command injection sequences just in case
    const dangerousChars = [';', '|', '&', '$', '>', '<', '`', '\\', '/'];
    for (const char of dangerousChars) {
        if (sanitized.includes(char)) {
            return null;
        }
    }

    return sanitized;
}

module.exports = {
    sanitizeProjectName
};
