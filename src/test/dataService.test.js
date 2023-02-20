import { data } from "../data";
import { addExpense, reconcileSpends } from "../dataService";

test("Data integrity", () => {
    expect(data[0].owed.map(lent => lent.id)).toStrictEqual([1,2,3]);
    expect(data[1].owed.map(lent => lent.id)).toStrictEqual([0,2,3]);
    expect(data[2].owed.map(lent => lent.id)).toStrictEqual([0,1,3]);
    expect(data[3].owed.map(lent => lent.id)).toStrictEqual([0,1,2]);

    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
})

test("Spend 12 dollars by each", () => {
    addExpense(data, 0, 12);
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([4,4,4]);

    addExpense(data, 1, 12);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([4,4,4]);

    addExpense(data, 2, 12);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([4,4,4]);

    addExpense(data, 3, 12);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([4,4,4]);

    reconcileSpends(data)
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
})

test("Spend 60 dollars by Alice,Bob,Dan, 30 dollars by Taylor, Reconcile at end", () => {
    addExpense(data, 0, 60);
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([20,20,20]);

    addExpense(data, 1, 60);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([20,20,20]);

    addExpense(data, 2, 30);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([10,10,10]);

    addExpense(data, 3, 60);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([20,20,20]);

    reconcileSpends(data)
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([0,10,0]);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([0,10,0]);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([0,0,10]);

    addExpense(data, 2, 30);
    reconcileSpends(data)
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
})

test("Spend 60 dollars by Alice,Bob,Dan, 30 dollars by Taylor, always reconcile", () => {
    addExpense(data, 0, 60);
    reconcileSpends(data);
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([20,20,20]);

    addExpense(data, 1, 60);
    reconcileSpends(data);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([0,20,20]);

    addExpense(data, 2, 30);
    reconcileSpends(data);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([0,0,10]);

    addExpense(data, 3, 60);
    reconcileSpends(data);
    
    expect(data[0].owed.map(lent => lent.amount)).toStrictEqual([0,10,0]);
    expect(data[1].owed.map(lent => lent.amount)).toStrictEqual([0,10,0]);
    expect(data[2].owed.map(lent => lent.amount)).toStrictEqual([0,0,0]);
    expect(data[3].owed.map(lent => lent.amount)).toStrictEqual([0,0,10]);
})