import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";
import Backend from "../../assets/backendLink.js";

export const handleGoBack = () => {
  if (window.location.pathname === "/admin/inventory") {
    window.location.href = "/admin/inventory";
  } else {
    window.location.href = "/user/products";
  }
};

export const copyPageLinkToClipboard = (productId) => {
  navigator.clipboard.writeText(
    "https://digital-catalog-frontend.onrender.com/user/product/" + productId
  );
};

export const downloadImage = (image) => {
  saveAs(image, "image.png");
};

export const downloadProductInfoWord = async (product) => {
  const doc = new Document();

  const title = new TextRun("Healthkare")
    .bold()
    .size(30)
    .font("Futura")
    .color("#137252");
  const titleParagraph = new Paragraph()
    .addRun(title)
    .spacing({ after: 300 })
    .center();

  const name = new TextRun(product.name).size(24).font("Arial").bold();
  const nameParagraph = new Paragraph()
    .addRun(name)
    .spacing({ before: 200, after: 100 });
  const description = new TextRun(product.description).size(20).font("Arial");
  const descriptionParagraph = new Paragraph()
    .addRun(description)
    .spacing({ after: 100 });

  doc.addParagraph(titleParagraph);
  doc.addParagraph(nameParagraph);
  doc.addParagraph(descriptionParagraph);

  const packer = new Packer();
  const mimeType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType);
    saveAs(docblob, `${product.name}.docx`);
  });
};

export const downloadProductInfoPDF = async (product) => {
  const pdfDoc = new jsPDF();

  pdfDoc.setFontSize(30);
  pdfDoc.setTextColor("#137252");
  pdfDoc.setFont("Futura");
  pdfDoc.text("Healthkare", pdfDoc.internal.pageSize.getWidth() / 2, 20, {
    align: "center",
  });

  pdfDoc.setTextColor("black");

  pdfDoc.setFont("Arial", "bold");
  pdfDoc.setFontSize(16);
  pdfDoc.text(product.name, 35, 125);

  pdfDoc.setFont("Arial", "normal");
  pdfDoc.setFontSize(12);
  const descriptionLines = pdfDoc.splitTextToSize(product.description, 135);
  pdfDoc.text(descriptionLines, 35, 135);

  pdfDoc.save(`${product.name}.pdf`);
};
