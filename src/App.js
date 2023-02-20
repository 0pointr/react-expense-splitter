import logo from './logo.svg';
import './App.css';
import Table from "./Table.js"
import Log from './Log';
import { data } from './data';
import { useImmer } from 'use-immer';

import { getNameById } from './dataService';

function App() {
  const [logs, updateLogs] = useImmer([])
  function handleNewExpenseEvent({lenderId, amount}) {
    updateLogs((draftLogs) => {
      draftLogs.push(`${getNameById(data, lenderId)} lent ${amount} dollars to everyone.`)
    })
  }

  return (
    <div className="App">
      <h2>Spend Tracker</h2>
      <Table onNewExpense={handleNewExpenseEvent}/>
      <Log logs={logs}/>
    </div>
  );
}

export default App;
