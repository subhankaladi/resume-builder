import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Wait for any fonts to load
  await document.fonts.ready;

  // Add a small delay to ensure all styles are applied
  await new Promise(resolve => setTimeout(resolve, 500));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    width: element.scrollWidth,
    height: element.scrollHeight,
    onclone: (document) => {
      // Ensure all content is visible in the cloned document
      const clonedElement = document.getElementById(elementId);
      if (clonedElement) {
        clonedElement.style.height = 'auto';
        clonedElement.style.overflow = 'visible';
      }
    }
  });

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