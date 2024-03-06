import { useEffect, useState, useRef } from "react";
import Panel from "./Panel";

function DropDown({ options, value, onChanged }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divEl.current) {
                return;
            }

            if (!divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handler, true);

        // cleanup function biar ga watch setelah hide
        return () => {
            document.removeEventListener('click', handler);
        }
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChanged(option)
    }

    const renderedOptions = options.map((option) => {
        return (
            <div
                onClick={() => handleOptionClick(option)}
                key={option.value}
                className="hover:bg-sky-100 rounded cursor-pointer p-1"
            >
                {option.label}
            </div>
        )
    })

    return (
        <div ref={divEl} className="w-48 relative">
            <Panel onClick={handleClick} className="flex justify-between items-center cursor-pionter">
                {value?.label || "select..."}
            </Panel>
            {isOpen && <Panel className="absolute top-full w-full">{renderedOptions}</Panel>}
        </div>
    )
}

export default DropDown;