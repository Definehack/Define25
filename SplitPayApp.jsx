import React, { useState, useEffect } from 'react';
import './SplitPay.css'; // We'll move the styles to a separate CSS file

const SplitPayApp = () => {
  const [splitPay] = useState(() => new SplitPay());
  const [transactions, setTransactions] = useState([]);
  const [settlementOutput, setSettlementOutput] = useState('');
  const [creditOutput, setCreditOutput] = useState('');

  useEffect(() => {
    splitPay.loadState();
    setTransactions(splitPay.transactions);
  }, [splitPay]);

  const createGroup = (e) => {
    e.preventDefault();
    const name = e.target.groupName.value;
    const members = e.target.members.value;
    const contacts = e.target.memberContacts.value;
    if (name && members && contacts) {
      splitPay.createGroup(name, members, contacts);
      alert(`Group "${name}" created successfully!`);
      e.target.reset();
    }
  };

  const addBill = (e) => {
    e.preventDefault();
    const groupName = e.target.billGroup.value;
    const payer = e.target.payer.value;
    const amount = parseFloat(e.target.amount.value);
    const description = e.target.description.value;
    if (groupName && payer && amount && description) {
      splitPay.addBill(groupName, payer, amount, description);
      setTransactions([...splitPay.transactions]);
      e.target.reset();
    }
  };

  const settleBalances = (e) => {
    e.preventDefault();
    const groupName = e.target.settleGroup.value;
    if (groupName) {
      const settlements = splitPay.settleBalances(groupName);
      setSettlementOutput(
        settlements.length > 0 ? (
          <div>
            <h3>Settlement Instructions (Notifications Sent):</h3>
            <ul>
              {settlements.map((s, index) => (
                <li key={index}>{`${s.from} pays ${s.to} ₹${s.amount.toFixed(2)}`}</li>
              ))}
            </ul>
          </div>
        ) : (
          'No settlements needed or group not found.'
        )
      );
    }
  };

  const requestSplitCredit = (e) => {
    e.preventDefault();
    const groupName = e.target.creditGroup.value;
    const amount = parseFloat(e.target.creditAmount.value);
    if (groupName && amount) {
      const credit = splitPay.requestSplitCredit(groupName, amount);
      if (credit) {
        setCreditOutput(
          <div className="settlement-result">
            <h3>Credit Approved!</h3>
            <p>Total: ₹{credit.totalAmount}</p>
            <p>Per Person: ₹{credit.splitAmount.toFixed(2)}</p>
            <p>Due: {credit.repaymentTerms.dueDate.toLocaleDateString()}</p>
          </div>
        );
      }
    }
  };

  return (
    <div className="container">
      <h1 className="header">SplitPay</h1>

      <div className="card">
        <h2>Create Group</h2>
        <form onSubmit={createGroup}>
          <input type="text" name="groupName" placeholder="Group Name (e.g., Goa Trip)" />
          <input type="text" name="members" placeholder="Names (comma-separated: John, Rahul)" />
          <input type="text" name="memberContacts" placeholder="Phone or Email (comma-separated: +1234567890, rahul@example.com)" />
          <button type="submit">Create Group</button>
        </form>
      </div>

      <div className="card">
        <h2>Add Bill</h2>
        <form onSubmit={addBill}>
          <input type="text" name="billGroup" placeholder="Group Name" />
          <input type="text" name="payer" placeholder="Who Paid" />
          <input type="number" name="amount" placeholder="Amount (₹)" />
          <input type="text" name="description" placeholder="Description (e.g., Dinner)" />
          <button type="submit">Add Bill</button>
        </form>
      </div>

      <div className="card">
        <h2>Transactions</h2>
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t.id} className="transaction-item">
              {t.description}: ₹{t.amount} paid by {t.payer} (₹{t.splitAmount.toFixed(2)} each) - {t.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Settle Balances</h2>
        <form onSubmit={settleBalances}>
          <input type="text" name="settleGroup" placeholder="Group Name" />
          <button type="submit">Calculate & Notify</button>
        </form>
        <div className="settlement-result">{settlementOutput}</div>
      </div>

      <div className="card">
        <h2>Request Split Credit</h2>
        <form onSubmit={requestSplitCredit}>
          <input type="text" name="creditGroup" placeholder="Group Name" />
          <input type="number" name="creditAmount" placeholder="Amount (₹)" />
          <button type="submit">Request Credit</button>
        </form>
        <div>{creditOutput}</div>
      </div>
    </div>
  );
};

// Move the SplitPay class outside the component
class SplitPay {
  constructor() {
    this.groups = new Map();
    this.transactions = [];
    this.loadState();
  }

  createGroup(name, members, contacts) {
    const memberList = members.split(',').map(m => m.trim());
    const contactList = contacts.split(',').map(c => c.trim());
    if (memberList.length !== contactList.length) {
      alert('Number of members and contacts must match!');
      return;
    }

    const group = { name, members: new Map(), totalSpent: 0 };
    memberList.forEach((member, index) => {
      group.members.set(member, {
        paid: 0,
        owes: 0,
        name: member,
        contact: contactList[index]
      });
    });

    this.groups.set(name, group);
    this.saveState();
    return group;
  }

  addBill(groupName, payer, amount, description) {
    if (!this.groups.has(groupName)) {
      alert('Group not found!');
      return;
    }

    const group = this.groups.get(groupName);
    const splitAmount = amount / group.members.size;
    group.totalSpent += amount;

    const payerData = group.members.get(payer);
    if (!payerData) {
      alert('Payer not found in group!');
      return;
    }

    payerData.paid += amount;
    group.members.forEach((memberData, memberName) => {
      if (memberName !== payer) memberData.owes += splitAmount;
    });

    const transaction = {
      id: Date.now(),
      groupName,
      payer,
      amount,
      splitAmount,
      description,
      timestamp: new Date()
    };

    this.transactions.push(transaction);
    this.saveState();
    return transaction;
  }

  settleBalances(groupName) {
    if (!this.groups.has(groupName)) {
      alert('Group not found!');
      return [];
    }

    const group = this.groups.get(groupName);
    const settlements = [];
    group.members.forEach((memberData, memberName) => {
      const netBalance = memberData.paid - memberData.owes;
      settlements.push({ name: memberName, netBalance, contact: memberData.contact });
    });

    const instructions = this.calculateSettlements(settlements);
    this.notifyDebtors(groupName, instructions);
    return instructions;
  }

  calculateSettlements(settlements) {
    const creditors = settlements.filter(s => s.netBalance > 0);
    const debtors = settlements.filter(s => s.netBalance < 0);
    const instructions = [];

    creditors.forEach(creditor => {
      while (creditor.netBalance > 0 && debtors.length > 0) {
        const debtor = debtors[0];
        const amount = Math.min(creditor.netBalance, Math.abs(debtor.netBalance));
        instructions.push({ from: debtor.name, to: creditor.name, amount, debtorContact: debtor.contact });
        creditor.netBalance -= amount;
        debtor.netBalance += amount;
        if (debtor.netBalance === 0) debtors.shift();
      }
    });

    return instructions;
  }

  async notifyDebtors(groupName, instructions) {
    instructions.forEach(instruction => {
      const message = `Hi ${instruction.from}, you owe ${instruction.to} ₹${instruction.amount.toFixed(2)} for ${groupName}. Pay now: [Payment Link]`;
      console.log(`Sending to ${instruction.debtorContact}: ${message}`);
      alert(`Notification sent to ${instruction.from} (${instruction.debtorContact}): ${message}`);
    });
  }

  requestSplitCredit(groupName, amount) {
    if (!this.groups.has(groupName)) {
      alert('Group not found!');
      return;
    }
    const group = this.groups.get(groupName);
    const splitAmount = amount / group.members.size;
    const credit = {
      groupName,
      totalAmount: amount,
      splitAmount,
      status: 'approved',
      repaymentTerms: { perPerson: splitAmount, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
    };
    this.saveState();
    return credit;
  }

  saveState() {
    localStorage.setItem('splitpay_groups', JSON.stringify([...this.groups]));
    localStorage.setItem('splitpay_transactions', JSON.stringify(this.transactions));
  }

  loadState() {
    const groups = localStorage.getItem('splitpay_groups');
    const transactions = localStorage.getItem('splitpay_transactions');
    if (groups) this.groups = new Map(JSON.parse(groups));
    if (transactions) this.transactions = JSON.parse(transactions);
  }
}

export default SplitPayApp;
