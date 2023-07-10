import React, { useEffect, useState } from "react";

const Resources = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/uploads");
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + "." + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        // Refresh the file list after successful upload
        setFile(null);
        alert("File uploaded successfully");

        fetchFiles();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileDownload = (fileName) => {
    // Construct the file download URL
    const downloadURL = `${PF}/${fileName}`;
    // Trigger file download
    window.open(downloadURL, "_blank");
  };
  const extractFileName = (fileName) => {
    const dotIndex = fileName.indexOf(".");
    return fileName.substring(dotIndex + 1);
  };
  return (
    <div className="">
      <h1>Resources</h1>
      <div>
        <input
          type="file"
          id="importButton"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="importButton">Upload Files</label>
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <hr />
      <div className="cardsContainer">
        {files.map((fileName, index) => (
          <div
            key={index}
            className="file-card"
            onClick={() => handleFileDownload(fileName)}
          >
            <img className="fileIcon" src="/file.png" alt="" />
            <span className="fileName">{extractFileName(fileName)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
