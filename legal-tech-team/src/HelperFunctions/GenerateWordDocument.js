import { patchDocument, PatchType, TextRun } from "docx";
import { saveAs } from 'file-saver';
import { chatPatches } from "./apiCalls";

const font = "Times New Roman";

const getPatches = fields => {
  const patches = {};

  for (const field in fields) {
    patches[field] = {
      type: PatchType.PARAGRAPH,
      children: [new TextRun({ text: fields[field], font })]
    };
  }

  return patches;
};


function patchDocumentWithBlob(blob, patches) {
  return patchDocument(blob, {
    outputType: "blob",
    patches,
  });
}

function uint8ArrayToWordDoc(uint8Array) {
  const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  saveAs(blob, 'My Document.docx');
}

function unescapeDoubleQuotes(str) {
    return str.replace(/\\"/g, '"');
}

export const handleTemplateInput = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const data = event.target.result;
      const uint8Array = new Uint8Array(data);
      console.log(chatPatches);
      const patches = getPatches(chatPatches);
      patchDocumentWithBlob(uint8Array, patches)
        .then(patchedData => uint8ArrayToWordDoc(patchedData))
        .catch(error => console.error('Error patching document:', error));
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  reader.onerror = function (event) {
    console.error('File reading error:', event.target.error);
  };

  if (file) {
    reader.readAsArrayBuffer(file);
  }
};
