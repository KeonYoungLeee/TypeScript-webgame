# 강좌7

  - [짝맞추기 게임](#짝맞추기-게임)
  - [틱택토 게임](#틱택토-게임)





## 짝맞추기 게임
[위로올라가기](#강좌7)

#### 화면 그려주기
```js
const horizontal: number = 4; // 가로
const vertical: number = 3; // 세로
const colors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink']; // 카드 색깔

let colorCandiate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;
let clickCard: HTMLDivElement[] = []; // 눌렀던 카드
let completedCard: HTMLDivElement[] = []; // 뒤집었던 카드가 짝이 맞았을 때
let startTime: Date;

function shuffle(): void { // 카드 섞어주기
  for ( let i:number = 0; colorCandiate.length > 0; i+=1 ) { // 섞는 알로리즘 : 피셔 예이츠 셔플
    color = color.concat(colorCandiate.splice(Math.floor(Math.random() * colorCandiate.length), 1));
    // 섞었던 카드를 새로운 배열에 넣어준다.
  }
}

function setCard(horizontal: number, vertical: number) { // 카드 만들어주기
  clickFlag = false; // 카드를 눌렀는지 여부
  for ( let i: number = 0; i < horizontal * vertical; i++ ) { // 12장 카드를 화면에 그려줄 것이다.
    const card: HTMLDivElement = document.createElement('div'); 
    card.className = 'card';
    const cardInner: HTMLDivElement = document.createElement('div'); // 카드 내부
    cardInner.className = 'card-inner';
    const cardFront: HTMLDivElement = document.createElement('div'); // 카드 앞면
    cardFront.className = 'card-front';
    const cardBack: HTMLDivElement = document.createElement('div'); // 카드 뒷면
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card); // 타입 캐스팅
  }


}

shuffle(); // 카드 섞어주기
setCard(horizontal, vertical); // 카드 세팅
```

#### 카드 뒤집어 주기 (setTimeout 적용)
```js
const horizontal: number = 4;
const vertical: number = 3;
const colors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];

let colorCandiate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;
let clickCard: HTMLDivElement[] = [];
let completedCard: HTMLDivElement[] = [];
let startTime: Date;

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

    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }
  // call의 함수는 타입추론을 해야한다. (제네릭)
  Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => { // 5초 뒤에 카드를 감춰주는 역할
    Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    startTime = new Date(); // 시간측정
  }, 5000);
}

shuffle();
setCard(horizontal, vertical);

```

#### 카드 클릭이벤트
```js
...생략
...생략

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    ...생략
    ...생략


    // EventListenr을 만들 것이다.
    card.addEventListener('click', function (this: HTMLDivElement) { // 카드를 클릭할 때
      if (clickFlag && !completedCard.includes(this)) { // 클릭이 가능 And 짝을 맞춘 가드가 아닌 경우
        this.classList.toggle('flipped');
        clickCard.push(this);
        if ( clickCard.length == 2 ) { // 2개를 뒤집었을 경우
          // querySelector는 타입 캐스팅
          const firstBackgrond: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          const secondBackgrond: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          if (firstBackgrond === secondBackgrond) { // 2개의 카드 색이 같은 경우
            completedCard.push(clickCard[0]); // 완성된 카드 데이터에 넣어주기 
            completedCard.push(clickCard[1]); // 완성된 카드 데이터에 넣어주기
            clickCard = []; // 초기화
          } else { // 2개의 카드 색이 다른 경우

          }
        }
      }
    });
    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }
  ...생략
  ...생략
}
shuffle();
setCard(horizontal, vertical);
```

#### 카드게임이 끝났을 경우(12개 전부 맞췄을 떄), 카드 클릭했을 떄 2개의 카드가 다를 경우
```js
...생략
...생략

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    ...생략
    ...생략

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

            if ( completedCard.length === horizontal * vertical ) { // 카드의 짝이 다 맞췄을 경우
              const endTime: number = new Date().getTime();
              alert(`축하합니다 ${((endTime - startTime.getTime()) / 1000)}초 걸렸습니다.`)
            } 

          } else { // 2개의 카드 색이 다른 경우
            clickFlag = false; // 잠깐 클릭 할 수 없게 만든다.
            setTimeout(() => {
              clickCard[0].classList.remove('flipped');
              clickCard[1].classList.remove('flipped');
              clickFlag = true; // 1초 후에 클릭할 수 있도록 한다.
              clickCard = [];
            }, 1000)
          }
        }
      }
    });


    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }

  ...생략
  ...생략
}

shuffle();
setCard(horizontal, vertical);
```

#### 카드게임이 끝났을 때 초기화 - 수정, ?의 의미
```js
...생략
let completedCard: HTMLDivElement[] = [];
let startTime: Date | null = null; // null부분 추가

function shuffle(): void {
  for ( let i:number = 0; colorCandiate.length > 0; i+=1 ) {
    color = color.concat(colorCandiate.splice(Math.floor(Math.random() * colorCandiate.length), 1));
  }
}

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    ...생략

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

            if ( completedCard.length === horizontal * vertical ) { // 카드의 짝이 다 맞췄을 경우
              const endTime: number = new Date().getTime();
              alert(`축하합니다 ${((endTime - startTime!.getTime()) / 1000)}초 걸렸습니다.`); // 여기서도 또 에러가 나온다. 그래서 확신을 갖고 !를 넣어준다.
              // document.querySelector('#wrapper')?.innerHTML; 
              (document.querySelector('#wrapper') as HTMLDivElement).innerHTML = '';
              colorCandiate = colors.slice();
              color = [];
              completedCard = [];
              startTime = null; // startTime이 null이 되니까 startTime 선언한 부분에도 null을 입력해줘야햐한다.
              shuffle();
              setCard(horizontal, vertical);
            } 
          } else { // 2개의 카드 색이 다른 경우
            clickFlag = false; // 잠깐 클릭 할 수 없게 만든다.
            setTimeout(() => {
              clickCard[0].classList.remove('flipped');
              clickCard[1].classList.remove('flipped');
              clickFlag = true; // 1초 후에 클릭할 수 있도록 한다.
              clickCard = [];
            }, 1000)
          }
        }
      }
    });
    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }

  ...생략

shuffle();
setCard(horizontal, vertical);

```

> `document.querySelector('#wrapper')?.innerHTML;` 이 부분에서 ***`?`***의 의미는? <br>
> ***`?`***는 확신을 못 가질 떄 사용한다. <br>
> wrapper가 존재하면 innerHTML, 존재하지않으면 undefined이다. <br>


## 틱택토 게임
[위로올라가기](#강좌7)

#### 기초 틀 잡기
```js
const table: HTMLTableElement = document.createElement('table'); // 테이블 생성
const rows: HTMLTableRowElement[] = []; // rows의 데이터 생성 (데이터라는 것이 중점)
const cells: HTMLTableCellElement[] =[]; // cells의 데이터 생성 (데이터라는 것이 중점)
let turn: 'O' | 'X' = 'X'; // O 아니면 X, 일단 X로 초기화 설정
const result: HTMLDivElement = document.createElement('div');

function callback() {}
for (let i:number = 1; i <= 3; i++) {
  const row: HTMLTableRowElement = document.createElement('tr'); // tr 3개 생성(데이터가 아니라 화면에서 보여 줄것)
  rows.push(row); // 줄 추가

  cells.push([]);
  // rgument of type 'never[]' is not assignable to parameter of type 'HTMLTableCellElement'.
  // Type 'never[]' is missing the following properties from type 'HTMLTableCellElement': abbr, align, axis, bgColor, and 248 more.ts(2345)

  for ( let j: number = 1; j <=3; j++ ) {
    const cell: HTMLTableCellElement = document.createElement('td'); // cell 3개 생성(데이터가 아니라 화면에서 보여 줄것)
    cell.addEventListener('click', callback); // 칸에 클릭 이벤트
    cells[i-1].push(cell); // Property 'push' does not exist on type 'HTMLTableCellElement'.ts(2339)
    row.appendChild(cell);
  }
  table.appendChild(row);
} 
document.body.appendChild(table);
document.body.appendChild(result);
```

> 자세히보면 `cells.push([]);`, `cells[i-1].push(cell);`의 부분가 에러가 걸린다. <br>
> 해결방법 <br>
>> 수정 전 : `const cells: HTMLTableCellElement[] =[];` <br>
>> 수정 후 : `const cells: HTMLTableCellElement[][] =[];` **2차원 배열**로 생성해주면 된다. <br>


#### 클릭 이벤트 발생 (클릭 했을 때 O, X 표시하기)
```js
const table: HTMLTableElement = document.createElement('table');
const rows: HTMLTableRowElement[] = [];
const cells: HTMLTableCellElement[][] =[];
let turn: 'O' | 'X' = 'X';
const result: HTMLDivElement = document.createElement('div');

function callback(event: MouseEvent) { // Event가 아닌 MouseEvent로 정확하게 적어주는 것도 나쁘지 않다.
  // const rowIndex: number = rows.indexOf(event.currentTarget.parentNode); // 에러가 나기 때문에 정확한 티입을 적어주면 에러가 사라진다.
  const rowIndex: number = rows.indexOf((event.currentTarget as HTMLTableCellElement).parentNode as HTMLTableRowElement);
  const cellIndex: number = cells[rowIndex].indexOf((event.currentTarget as HTMLTableCellElement));

  if (cells[rowIndex][cellIndex].textContent !== '') { // 빈 칸이 아니면 
    console.log('빈 칸이 아닙니다.');
  } else {
    cells[rowIndex][cellIndex].textContent = turn;
    turn = turn === 'O' ? 'X' : 'O';
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


#### 게임 승리 여부 확인하기
```js
...생략
...생략

function callback(event: MouseEvent) {
  const rowIndex: number = rows.indexOf((event.currentTarget as HTMLTableCellElement).parentNode as HTMLTableRowElement);
  const cellIndex: number = cells[rowIndex].indexOf((event.currentTarget as HTMLTableCellElement));
  if (cells[rowIndex][cellIndex].textContent !== '') {
    console.log('빈 칸이 아닙니다.');
  } else {
    cells[rowIndex][cellIndex].textContent = turn;
    // turn = turn === 'O' ? 'X' : 'O'; // 다른 쪽에 옮겨주기
    
    let full: boolean = false; // 다 찼는지 검사하기
    if ( // 가로줄 검사
        cells[rowIndex][0].textContent === turn &&
        cells[rowIndex][1].textContent === turn &&
        cells[rowIndex][2].textContent === turn
    ) {
        full = true;
    }
    if ( // 세로줄 검사
        cells[0][cellIndex].textContent === turn &&
        cells[1][cellIndex].textContent === turn &&
        cells[2][cellIndex].textContent === turn
    ) {
        full = true;
    }
    if ( // 대각선 검사
        cells[0][0].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][2].textContent === turn
    ) {
        full = true;
    }
    if ( // 반대인 대각선 검사
        cells[0][2].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][0].textContent === turn
    ) {
        full = true;
    }
    if (full) { // 다 찼으면
      result.textContent = `${turn}님이 승리`;
      turn = 'X';
      cells.forEach((row) => { // 줄, 칸 초기화 시켜주기
        row.forEach((cell) => {
          cell.textContent = ''; 
        })
      })
    } else {
      turn = turn === 'O' ? 'X' : 'O';
    }
  }
}

...생략
...생략

```


#### 무승부 판단하기
```js
...생략
...생략
const result: HTMLDivElement = document.createElement('div');
let count: number = 0; // count가 9가 되었을 떄 무승부로 해줄 것이다.

function callback(event: MouseEvent) {
  const rowIndex: number = rows.indexOf((event.currentTarget as HTMLTableCellElement).parentNode as HTMLTableRowElement);
  const cellIndex: number = cells[rowIndex].indexOf((event.currentTarget as HTMLTableCellElement));
  count++; // 한 칸 클릭할 때마다 1을 추가해준다.
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
    } else if (count === 9) { // 무승부 판단하기, 9번 클릭하면 무승부
      result.textContent = `무승부!`;
      turn = 'X'; // 초기화 시켜주기
      cells.forEach((row) => { // 초기화 시켜주기
        row.forEach((cell) => { // 초기화 시켜주기
          cell.textContent = ''; 
        });
      })
    } else {
      turn = turn === 'O' ? 'X' : 'O';
    }
  }
}

...생략
...생략
```

### 총 정리

> 타입스크립트는 HTML을 모르기 떄문에(즉, TR, TD의 관계) `as`를 많이 사용해줘야 한다. <br>
> 2차원배열 타입 사용해보기 <br>
> Optional chaining <br>

