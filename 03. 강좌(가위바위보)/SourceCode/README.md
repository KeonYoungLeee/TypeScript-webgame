# 강좌3

  - [가위바위보 게임과 인터페이스](#가위바위보-게임과-인터페이스)
  - [인터페이스 특성과 type alias](#인터페이스-특성과-type-alias)
  - [기본 d.ts 문제 해결하기](#기본-d.ts-문제-해결하기)
  - [this와 타입 범위의 이해](#this와-타입-범위의-이해)
  - [가위바위보 완성하기](#가위바위보-완성하기)
  - [총 정리와 질문](#총-정리와-질문)




## 가위바위보 게임과 인터페이스
[위로올라가기](#강좌3)

```js
let imgCoords = 0;

interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
}

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords) :'ROCK' | 'SCISSORS' |  'PAPER' {
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

## 인터페이스 특성과 type alias
[위로올라가기](#강좌3)

```js
let imgCoords = 0;

interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
}

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
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


## 기본 d.ts 문제 해결하기
[위로올라가기](#강좌3)

```js
let imgCoords = 0;

interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
}

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
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

## this와 타입 범위의 이해
[위로올라가기](#강좌3)

```js
let imgCoords: RSP[keyof RSP] = '0';

interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
}

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) {
    const myChoice = this.textContent as keyof RSP; 
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

## 가위바위보 완성하기
[위로올라가기](#강좌3)


```js
let imgCoords: RSP[keyof RSP] = '0';

interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
}

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}
let interval: number;
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) {
    clearInterval(interval);
    setTimeout(intervalMaker, 2000);
    const myChoice = this.textContent as keyof RSP; 
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;

    if (diff === 0 ) {
      console.log('비겼습니다.');
    } else if ( [-1, 2].includes(diff) ) {
      console.log('이겼습니다.');
    } else {
      console.log('졌습니다.');
    }
  });
});

function intervalMaker() {
  interval = setInterval(function () {
    if (imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if (imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }
    if (document.querySelector('#computer')) {
      (document.querySelector('#computer') as HTMLDivElement).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
    }
    
  }, 100);
}

intervalMaker();
```

## 총 정리와 질문
[위로올라가기](#강좌3)

없음