# 강좌3

  - [가위바위보 게임과 인터페이스](#가위바위보-게임과-인터페이스)

## 가위바위보 게임과 인터페이스
[위로올라가기](#강좌2)


#### 상수 설정
```js
const rsp = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
} as const; 

// 뒤에 상수(const)를 설정하면 밑과 같이 나타난다.
// const rsp: {
//   readonly ROCK: "0";
//   readonly SCISSORS: "-142px";
//   readonly PAPER: "-284px";
// }
```

#### this 에러 해결 ( 나중에 )
```js
// html
// <button id="ROCK" class="btn">바위</button>
// <button id="SCISSORS" class="btn">가위</button>
// <button id="PAPER" class="btn">보</button>

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function() {
    // 위에 html에서 '바위, 가위, 보'를 가져올려는 코드
    const myChoice = this.textContent;  
    // 여기서 this를 사용하면 에러가 나온다.
    // 'this' implicitly has type 'any' because it does not have a type annotation.ts(2683)
  });
});

```

#### score에도 상수 설정
```js
let imgCoords = 0;

const rsp = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
} as const;

// 추가
const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;


document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function() {
    const myChoice = this.textContent;
    // 일단 추가하였음.
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;
  });
});

```

#### 인터페이스가 안 된 경우
```js
let imgCoords = 0;

const rsp = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
} as const;

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords) :'ROCK' | 'SCISSORS' |  'PAPER' {
  // imgCoords가 ROCK, SCISSORS, PAPER가 되어야한다.

  // return Object.keys(rsp); // 이 의미는 rsp가 배열이 된다.
  return Object.keys(rsp).find((k) => rsp[k] === imgCoords);
}

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function() {
    const myChoice = this.textContent;
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;

    if (diff === 0 ) {
      console.log('비겼습니다.');
    } else if ( [-1, 2].indexOf(diff) ) {
      console.log('이겼습니다.');
    } else {
      console.log('졌습니다.');
    }
  });
});

```

### 인터페이스(Interface)
**인터페이스 특징** <br>
1. 세미콜론(;), 콤마(,) 상관없이 다 되지만, 반드시 줄 바꿔줌을 해야한다. <br>
2. 인터페이스는 값을 대입하기 보다는 타입을 설정한다. <br>
3. 인터페이스에서 **상수**를 해줄려면 **readonly**를 설정해줘야 한다. <br>

```js
// 1. 인터페이스 설정
interface RSP {
  ROCK: '0';
  SCISSORS: '-142px';
  PAPER: '-284px';
}

// 2. 인터페이스는 위처럼 값을 적어주기 보다는 타입을 설정한다.
interface RSP {
  ROCK: string;
  SCISSORS: string;
  PAPER: string;
}

// 3. 인터페이스 상수(readonly) 설정
interface RSP {
  readonly ROCK: string;
  readonly SCISSORS: string;
  readonly PAPER: string;
}

```