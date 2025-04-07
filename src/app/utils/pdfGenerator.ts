import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Wait for any fonts to load
  await document.fonts.ready;

  // Add a small delay to ensure all styles are applied
  await new Promise(resolve => setTimeout(resolve, 500));

  // Store original styles
  const originalWidth = element.style.width;
  const originalHeight = element.style.height;
  const originalMaxWidth = element.style.maxWidth;
  const originalOverflow = element.style.overflow;

  // Set fixed width for consistent rendering
  element.style.width = '800px'; // Fixed width for consistent rendering
  element.style.maxWidth = '800px';
  element.style.height = 'auto';
  element.style.overflow = 'visible';

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    width: 800, // Fixed width
    height: element.scrollHeight,
    onclone: (document) => {
      // Ensure all content is visible in the cloned document
      const clonedElement = document.getElementById(elementId);
      if (clonedElement) {
        clonedElement.style.width = '800px';
        clonedElement.style.maxWidth = '800px';
        clonedElement.style.height = 'auto';
        clonedElement.style.overflow = 'visible';
      }
    }
  });

  // Restore original styles
  element.style.width = originalWidth;
  element.style.height = originalHeight;
  element.style.maxWidth = originalMaxWidth;
  element.style.overflow = originalOverflow;

  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
  // A4 dimensions in mm
  const pageWidth = 210;
  const pageHeight = 297;
  
  // Calculate dimensions to fit on one page
  const aspectRatio = canvas.width / canvas.height;
  let imgWidth = pageWidth - 20; // 10mm margin on each side
  let imgHeight = imgWidth / aspectRatio;
  
  // If height is too large, scale based on height instead
  if (imgHeight > pageHeight - 20) { // 10mm margin on top and bottom
    imgHeight = pageHeight - 20;
    imgWidth = imgHeight * aspectRatio;
  }
  
  // Center the image on the page
  const x = (pageWidth - imgWidth) / 2;
  const y = (pageHeight - imgHeight) / 2;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
  pdf.save(fileName);
}; 