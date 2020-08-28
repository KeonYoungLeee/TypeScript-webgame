# 강좌7

  - [짝맞추기 게임](#짝맞추기-게임)
  - [틱택토 게임](#틱택토-게임)





## 짝맞추기 게임
[위로올라가기](#강좌7)

#### cardMatch.ts
```js
const horizontal: number = 4;
const vertical: number = 3;
const colors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];

let colorCandiate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;
let clickCard: HTMLDivElement[] = [];
let completedCard: HTMLDivElement[] = [];
let startTime: Date | null = null;

function shuffle(): void {
  for ( let i:number = 0; colorCandiate.length > 0; i+=1 ) {
    color = color.concat(colorCandiate.splice(Math.floor(Math.random() * colorCandiate.length), 1));
  }
}

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    const card: HTMLDivElement = document.createElement('div'); 
    card.className = 'card';
    const cardInner: HTMLDivElement = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront: HTMLDivElement = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack: HTMLDivElement = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', function (this: HTMLDivElement) {
      if (clickFlag && !completedCard.includes(this)) {
        this.classList.toggle('flipped');
        clickCard.push(this);
        if ( clickCard.length == 2 ) {
          const firstBackgrond: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          const secondBackgrond: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          if (firstBackgrond === secondBackgrond) {
            completedCard.push(clickCard[0]);
            completedCard.push(clickCard[1]);
            clickCard = [];
            if ( completedCard.length === horizontal * vertical ) {
              const endTime: number = new Date().getTime();
              alert(`축하합니다 ${((endTime - startTime!.getTime()) / 1000)}초 걸렸습니다.`);
              // document.querySelector('#wrapper')?.innerHTML; 
              (document.querySelector('#wrapper') as HTMLDivElement).innerHTML = '';
              colorCandiate = colors.slice();
              color = [];
              completedCard = [];
              startTime = null;
              shuffle();
              setCard(horizontal, vertical);
            } 
          } else {
            clickFlag = false;
            setTimeout(() => {
              clickCard[0].classList.remove('flipped');
              clickCard[1].classList.remove('flipped');
              clickFlag = true;
              clickCard = [];
            }, 1000)
          }
        }
      }
    });

    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }

  Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    startTime = new Date();
  }, 5000);
}

shuffle();
setCard(horizontal, vertical);

```


## 틱택토 게임
[위로올라가기](#강좌7)

#### tictactoe.ts
```js
const table: HTMLTableElement = document.createElement('table');
const rows: HTMLTableRowElement[] = [];
const cells: HTMLTableCellElement[][] =[];
let turn: 'O' | 'X' = 'X';
const result: HTMLDivElement = document.createElement('div');
let count: number = 0;

function callback(event: MouseEvent) {
  const rowIndex: number = rows.indexOf((event.currentTarget as HTMLTableCellElement).parentNode as HTMLTableRowElement);
  const cellIndex: number = cells[rowIndex].indexOf((event.currentTarget as HTMLTableCellElement));
  count++;
  if (cells[rowIndex][cellIndex].textContent !== '') {
    console.log('빈 칸이 아닙니다.');
  } else {
    cells[rowIndex][cellIndex].textContent = turn;
    let full: boolean = false;
    if (
        cells[rowIndex][0].textContent === turn &&
        cells[rowIndex][1].textContent === turn &&
        cells[rowIndex][2].textContent === turn
    ) {
        full = true;
    }
    if (
        cells[0][cellIndex].textContent === turn &&
        cells[1][cellIndex].textContent === turn &&
        cells[2][cellIndex].textContent === turn
    ) {
        full = true;
    }
    if (
        cells[0][0].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][2].textContent === turn
    ) {
        full = true;
    }
    if (
        cells[0][2].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][0].textContent === turn
    ) {
        full = true;
    }
    if (full) {
      result.textContent = `${turn}님이 승리`;
      turn = 'X';
      cells.forEach((row) => {
        row.forEach((cell) => {
          cell.textContent = ''; 
        });
      })
    } else if (count === 9) {
      result.textContent = `무승부!`;
      turn = 'X';
      cells.forEach((row) => {
        row.forEach((cell) => {
          cell.textContent = ''; 
        });
      })
    } else {
      turn = turn === 'O' ? 'X' : 'O';
    }
  }
}

for (let i:number = 1; i <= 3; i++) {
  const row: HTMLTableRowElement = document.createElement('tr');
  rows.push(row);
  cells.push([]);
  for ( let j: number = 1; j <=3; j++ ) {
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.addEventListener('click', callback);
    cells[i-1].push(cell);
    row.appendChild(cell);
  }
  table.appendChild(row);
} 
document.body.appendChild(table);
document.body.appendChild(result);
```