import { useImmer } from 'use-immer'

import {data as initialData} from './data';
import { getIds, reconcileSpends, getOwesById, addExpense } from './dataService'
import AddExpenseButton from './AddExpenseButton.js'
import { useState } from 'react';

export default function Table({onNewExpense}) {
    const [data, updateData] = useImmer(initialData);
    const [reconcile, setReconcile] = useState(false);

    function handleAddExpense({lenderId, amount}) {
        updateData((dataDraft) => {
            console.log(`looking for ${lenderId} in ${data}`)
            addExpense(dataDraft, lenderId, amount);
            if (reconcile) {
                reconcileSpends(dataDraft)
            }
        })
        onNewExpense({lenderId, amount});
    }

    function handleReconcileSpends() {
        if (!reconcile) {
            updateData((dataDraft) => reconcileSpends(dataDraft))
        }
        setReconcile(!reconcile)
    }

    return (
        <div>
            <table className='table horizontal-center'>
                <thead>
                    <tr>
                    <th>Name</th>
                    {
                        data.map(item => (<th>{item.name}</th>))
                    }
                    <th>Add Expense</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => (
                        <tr>
                            <td>{item.name}</td>
                            {getIds(data).map(id => {
                                if (id === item.id) {
                                    return <td>0</td>
                                } else {
                                    return <td>{getOwesById(data, item.id, id).amount.toFixed(2)}</td>
                                }
                            })}
                            <td>
                                <div>
                                    <AddExpenseButton lenderId={item.id} handleAddExpense={handleAddExpense}/>
                                </div>
                            </td>
                        </tr>))
                    }
                </tbody>
            </table>
            <div className="horizontal-center padding-top-10">
                <input type="checkbox" name="reconcile" onChange={handleReconcileSpends}/>
                <label htmlFor="reconcile">Reconcile spends</label>
            </div>
        </div>
    )
}