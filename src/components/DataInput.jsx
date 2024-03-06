function DataInput({ jsonData, handleJsonDataChange }) {

    const handleInputChange = (event) => {
        handleJsonDataChange(event.target.value);
    }

    return (
        <textarea
            className="w-full h-36 p-2 border border-gray-200 rounded"
            value={jsonData}
            onChange={handleInputChange}
            placeholder="Enter JSON data"
        />
    )
}

export default DataInput