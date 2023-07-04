import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";

export const handleGoBack = () => {
  if (window.location.pathname === "/admin/inventory") {
    window.location.href = "/admin/inventory";
  } else {
    window.location.href = "/user/products";
  }
};

export const copyPageLinkToClipboard = (productId) => {
  navigator.clipboard.writeText(
    "http://localhost:3000/user/product/" + productId
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
    .center()
    .spacing({ after: 300 });

  const response = await fetch(product.image);
  const blob = await response.blob();

  const name = new TextRun("Name").size(24).font("Arial").bold();
  const nameParagraph = new Paragraph().addRun(name).spacing({ before: 300 });
  const nameValue = new TextRun(product.name).size(20).font("Arial");
  const nameValueParagraph = new Paragraph()
    .addRun(nameValue)
    .spacing({ after: 100 });

  const price = new TextRun("Price").size(24).font("Arial").bold();
  const priceParagraph = new Paragraph().addRun(price).spacing({ before: 300 });
  const priceValue = new TextRun("$" + product.price).size(20).font("Arial");
  const priceValueParagraph = new Paragraph()
    .addRun(priceValue)
    .spacing({ after: 100 });

  const description = new TextRun("Description").size(24).font("Arial").bold();
  const descriptionParagraph = new Paragraph()
    .addRun(description)
    .spacing({ before: 300 });
  const descriptionValue = new TextRun(product.description)
    .size(20)
    .font("Arial");
  const descriptionValueParagraph = new Paragraph()
    .addRun(descriptionValue)
    .spacing({ after: 100 });

  doc.addParagraph(titleParagraph);
  doc.createImage(blob, 200, 200).Paragraph.center();
  doc.addParagraph(nameParagraph);
  doc.addParagraph(nameValueParagraph);
  doc.addParagraph(priceParagraph);
  doc.addParagraph(priceValueParagraph);
  doc.addParagraph(descriptionParagraph);
  doc.addParagraph(descriptionValueParagraph);

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

  const response = await fetch(product.image);
  const blob = await response.blob();

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64String = reader.result.split(",")[1];
    pdfDoc.addImage(base64String, "JPEG", 62, 30, 80, 80);

    pdfDoc.setTextColor("black");

    pdfDoc.setFont("Arial", "bold");
    pdfDoc.setFontSize(16);
    pdfDoc.text("Name", 20, 120);
    pdfDoc.setFont("Arial", "normal");
    pdfDoc.setFontSize(12);
    pdfDoc.text(product.name, 20, 125);

    pdfDoc.setFont("Arial", "bold");
    pdfDoc.setFontSize(16);
    pdfDoc.text("Price", 20, 140);
    pdfDoc.setFont("Arial", "normal");
    pdfDoc.setFontSize(12);
    pdfDoc.text("$" + product.price, 20, 145);

    pdfDoc.setFont("Arial", "bold");
    pdfDoc.setFontSize(16);
    pdfDoc.text("Description", 20, 160);
    pdfDoc.setFont("Arial", "normal");
    pdfDoc.setFontSize(12);
    const descriptionLines = pdfDoc.splitTextToSize(product.description, 165);
    pdfDoc.text(descriptionLines, 20, 165);

    pdfDoc.save(`${product.name}.pdf`);
  };
  reader.readAsDataURL(blob);
};
