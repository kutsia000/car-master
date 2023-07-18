import React, { useState } from 'react';

const InputFileComponent = ({
  label,
  placeholder,
  type,
  required,
  name,
  validationRegex,
  multiple,
  onFileSelected,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // event.preventDefault();
    //console.log(event);
    if (!multiple) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileSelected(file);
    } else {
      const files = event.target.files;
      onFileSelected(files);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
      ></input>
    </div>
  );
};

export default InputFileComponent;
