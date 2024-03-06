import DropDown from "../components/DropDown";
import Button from "../components/Button";
import UrlBar from "../components/UrlBar";
import DataInput from "../components/DataInput";
import TokenInput from "../components/TokenInput";
import { useState } from "react";
import axios from "axios";
import Panel from "../components/Panel";

function DefaultPage() {

    const baseUrl = "http://localhost:8000/";

    const options = [
        { label: 'GET', value: 'get'},
        { label: 'POST', value: 'post'},
        { label: 'PUT', value: 'put'},
        { label: 'DELETE', value: 'delete' },
        { label: 'PATCH', value: 'patch'},
    ]

    const [selection, setSelection] = useState(options[0])
    const [url, setUrl] = useState("");
    const [token, setToken] = useState("")
    const [result, setResult] = useState();
    const [jsonData, setJsonData] = useState("");
    const [error, setError] = useState("")
    
    const handleSelect = (option) => {
        setSelection(option);
    }

    const handleUrlChange = (newUrl) => {
        setUrl(newUrl);
        setError('')
    }

    const handleTokenChange = (newToken) => {
        setToken(newToken)
        setError('')
    }

    const handleJsonChange = (newJson) => {
        setJsonData(newJson);
        setError('')
    }

    const parseToJson = (JsonString) => {
        const parsedAndStatus = {parsed: true, data: {}}
        try {
            if (jsonData !== "") {
                const parsedJson = JSON.parse(JsonString);
                parsedAndStatus['data'] = parsedJson;
            }
        } catch (e) {
            parsedAndStatus['parsed'] = false;
        }

        return parsedAndStatus
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setResult()

        const parsedData = parseToJson(jsonData);
        const head = {
            'Content-Type': 'application/json'
        }

        if (token) head['Authorization'] = `Token ${token}`

        if (parsedData['parsed']) {
            try {
                const requestConfig = {
                    method: selection.value,
                    url: `${baseUrl}${url}`,
                    headers: head,
                    data: parsedData['data'],
                };
                console.log(requestConfig)
                const apiResult = await axios.request(requestConfig);
                setResult(JSON.stringify(apiResult.data, null, 2));
            } catch (error) {
                if (error.response) {
                    setError(`Server responded with status code ${error.response.status}`);
                } else if (error.request) {
                    setError("The request was made but no response was received");
                }
            }
        } else {
            setError("Invalid JSON String")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Panel className={"w-4/5"}>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-x-2 mb-4">
                    <DropDown 
                        options={options}
                        value={selection}
                        onChanged={handleSelect}
                    />
                    <UrlBar 
                        url={url}
                        onUrlChanged={handleUrlChange}
                    />
                </div>
                <div className="mb-4">
                    <TokenInput
                        token={token}
                        onTokenChanged={handleTokenChange}
                    />
                </div>
                <div className="mb-4">
                    <DataInput handleJsonDataChange={handleJsonChange}/>
                </div>
                <div className="flex justify-end">
                    <Button>Tembak!</Button>
                </div>
            </form>
            <div className="mt-4 h-56 bg-white overflow-auto shadow rounded p-2">
                <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
            {error && <div className="error-message-class">{error}</div>}   
        </Panel>
        </div>
    );
}

export default DefaultPage;