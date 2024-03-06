function TokenInput({ token, onTokenChanged }) {

    const handleTokenChange = (event) => {
        onTokenChanged(event.target.value);
    } 
    
    return (
        <input 
            className="w-full p-2 border border-gray-200 rounded"
            value={token}
            onChange={handleTokenChange}
            placeholder="Enter  Token"
        />
    )
}

export default TokenInput