import {useState} from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function AddExpenseButton({lenderId, handleAddExpense}) {
    const inputRef = useRef(null)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSaveExpense();
        }
    }
    function handleSaveExpense() {
        setEditing(!editing);
        console.log(`amount added: ${inputRef.current.value}`);
        handleAddExpense({lenderId, amount:Number(inputRef.current.value)})
    }

    if (!editing) {
        return <button onClick={() => setEditing(!editing)}>Add Expense</button>
    } else {
        return <div>
                <input style={{width: '50px'}} ref={inputRef} onKeyDown={handleKeyDown}></input>
                <button onClick={handleSaveExpense}>Save</button>
            </div>
    }
}