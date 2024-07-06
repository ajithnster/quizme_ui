// FileUpload.js
import { FileUploader } from '@carbon/react';

export const FileUpload = ({ onFileUpload, labelDescription }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      onFileUpload(file);
      console.log("Uploaded File:", file);
    }
  };

  return (
    <FileUploader
      labelTitle="Upload files"
      labelDescription={labelDescription}
      buttonLabel="Choose File"
      buttonKind="secondary"
      accept={['.csv']}
      size="md"
      filenameStatus="edit"
      disabled={false}
      iconDescription="choose file"
      name=""
      onChange={handleFileChange}
    />
  );
};
