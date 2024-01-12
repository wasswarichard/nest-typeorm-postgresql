const richard_wasswa1 = (cash, purchaseCost) => {
  const supportedNotes = [50000, 20000, 10000, 5000, 2000, 1000];
  let amountBalance = parseInt(cash) - parseInt(purchaseCost);
  let notesBalance = [];

  for (let x in supportedNotes) {
    if (amountBalance >= supportedNotes[x]) {
      const possibleNotes = Math.trunc(amountBalance / supportedNotes[x]);
      notesBalance.push({ note: supportedNotes[x], number: possibleNotes });
      const amount = (possibleNotes * supportedNotes[x]);
      amountBalance -= amount;
    }
  }

  return notesBalance;
}

function richard_wasswa2(cash, purchaseCost) {
  const supportedNotes = [50000, 20000, 10000, 5000, 2000, 1000];
  let amountBalance = parseInt(cash) - parseInt(purchaseCost);
  let notesBalance = [];

  for (let x = 0; x <= supportedNotes.length; x++) {
    if (amountBalance >= supportedNotes[x]) {
      const possibleNotes = Math.trunc(amountBalance / supportedNotes[x]);
      notesBalance.push({ note: supportedNotes[x], number: possibleNotes });
      const amount = (possibleNotes * supportedNotes[x]);
      amountBalance -= amount;
    }

  }

  return notesBalance;

}


console.log(richard_wasswa2(50000, 10000))

