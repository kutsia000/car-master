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
  containerClass,
  className,
  labelClass,
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
    <div className="form-group row">
      <label className={labelClass}>{label}</label>
      <div className={containerClass}>
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
    </div>
  );
};

export default InputFileComponent;
