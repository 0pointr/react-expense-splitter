export function getNameById(data, id) {
    return data.filter(item => item.id === id)[0].name
}

export function getOwesById(data, selfId, borrowerId) {
    if (borrowerId === selfId) {
        return {
            amount: 0
        }
    }
    let lender = data.filter(item => item.id === selfId)[0]
    let borrower = lender.owed.filter(borrower => borrower.id === borrowerId)
    if (borrower.length) {
        return borrower[0]
    }
}

export function getIds(data) {
    return data.map(item => item.id)
}

export function addExpense(data, lenderId, amount) {
    let lender = data.filter(lender => lender.id === lenderId)[0];
    lender.owed = lender.owed.map(oweRecord => { return {...oweRecord, amount: oweRecord.amount + amount/(data.length-1)}; })
    return data
}

export function reconcileSpends(data) {
    data.forEach(lender => {
        lender.owed.forEach(lent => {
            let borrowedBySelf = getOwesById(data, lent.id, lender.id);
            if (borrowedBySelf.amount === lent.amount) {
                borrowedBySelf.amount = lent.amount = 0;
            } else {
                let borrowedBySelfAmmount = borrowedBySelf.amount;
                borrowedBySelf.amount = Math.max(0, borrowedBySelf.amount - lent.amount);
                lent.amount = Math.max(0, lent.amount - borrowedBySelfAmmount);
            }
        })
    })
}