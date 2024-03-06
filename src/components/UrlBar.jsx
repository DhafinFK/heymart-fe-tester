function UrlBar({ url, onUrlChanged }) {

    const handleUrlChange = (event) => {
        onUrlChanged(event.target.value);
    } 
    
    return (
        <input 
            className="w-full p-2 border border-gray-200 rounded"
            value={url} 
            onChange={handleUrlChange}
            placeholder="Enter URI endpoint"
        />
    )
}

export default UrlBar