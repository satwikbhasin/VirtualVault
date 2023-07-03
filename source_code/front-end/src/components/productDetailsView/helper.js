import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

export const downloadProductInfo = async (product) => {
  const doc = new Document();

  const title = new TextRun("Product Information")
    .bold()
    .size(30)
    .font("Futura")
    .color("#137252");
  const titleParagraph = new Paragraph().addRun(title).center();

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
