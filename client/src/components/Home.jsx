import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from 'axios'

function Home() {
    const [selectedFile, setSelectedFile] = useState();
    const [convert, setConvert] = useState()
    const [downloadError, setDownloadError] = useState("")

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setConvert("please select a file")
            return;
        }
        const formData = new FormData()
        formData.append("file", selectedFile)
        try {
            const response = await axios.post(`${window.location.origin}/upload`, formData, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url;
            link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf")
            document.body.appendChild(link);
            link.click()
            link.parentNode.removeChild(link);
            setSelectedFile(null);
            setDownloadError("")
            setConvert("file converted successfully !!")
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setDownloadError("Error occured : ", error.response.data.message)
            } else {
                setConvert("");
            }
        }
    }

    return (
        <>
            <div className="max-w-screen mx-auto container px-6 md:px-40">
                <div className="flex h-screen items-center justify-center flex-col">
                    <form className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-blue-500 rounded-md shadow-2xl">
                        <div>
                            <h1 className="text-3xl font-bold text-center mb-3">
                                Convert Word to PDF online
                            </h1>
                            <p className="text-center">
                                Make DOC and DOCX files easy to read by converting them to PDF.
                            </p>
                        </div>
                        <data className="flex flex-col items-center space-y-4">
                            <input
                                onChange={handleFileChange}
                                type="file"
                                accept=".doc, .docx"
                                id="fileInput"
                                className="hidden"
                            />
                            <label
                                title="Choose single word file"
                                htmlFor="fileInput"
                                className="w-full flex items-center justify-center px-4 py-5 text-white font-bold  bg-blue-500 rounded-md shadow-lg cursor-pointer hover:bg-blue-600 "
                            >
                                <FaFileWord className="text-2xl mr-2" />
                                {selectedFile ? selectedFile.name : "Choose Word file"}
                            </label>
                            <button
                                onClick={handleSubmit}
                                title="choose file first"
                                disabled={!selectedFile}
                                className="font-bold text-white border disabled:cursor-not-allowed  bg-blue-500 enabled:hover:bg-blue-600  rounded-md py-1 px-2">
                                Convert File
                            </button>
                            {convert && (<div className="text-green-600 font-bold">{convert}</div>)}
                            {downloadError && (<div className="text-red-600 font-bold">{downloadError}</div>)}
                        </data>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;
