/**
 * Utilities for exporting text content to various file formats.
 */

/**
 * Downloads text as a .txt file
 * @param {string} content The text content to export
 * @param {string} filename The name of the file
 */
export const downloadAsTxt = (content, filename = 'kris-ai-story.txt') => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Downloads text as a simple .docx file using hidden HTML formatting
 * Note: For a "real" docx we would usually use a library like 'docx', 
 * but this approach works without extra dependencies for basic uses.
 */
export const downloadAsDocx = (content, filename = 'kris-ai-story.docx') => {
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Export</title></head><body>`;
  const footer = "</body></html>";
  const sourceHTML = header + content.replace(/\n/g, '<br>') + footer;
  
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileLink = document.createElement("a");
  document.body.appendChild(fileLink);
  fileLink.href = source;
  fileLink.download = filename;
  fileLink.click();
  document.body.removeChild(fileLink);
};
