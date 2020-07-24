# 강좌3

  - [가위바위보 게임과 인터페이스](#가위바위보-게임과-인터페이스)
  - [인터페이스 특성과 type alias](#인터페이스-특성과-type-alias)




## 가위바위보 게임과 인터페이스
[위로올라가기](#강좌2)

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
[위로올라가기](#강좌2)

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

