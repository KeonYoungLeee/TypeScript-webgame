# 강좌3

  - [가위바위보 게임과 인터페이스](#가위바위보-게임과-인터페이스)
  - [인터페이스 특성과 type alias](#인터페이스-특성과-type-alias)




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
**인터페이스** <br>
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

## 인터페이스 특성과 type alias
[위로올라가기](#강좌2)

### 인터페이스 특징

1. 인터페이스도 역시 상속이 가능하다.
```js
interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

interface Example extends RSP {
  
}
```

2. 같은 이름의 인터페이스를 여러개 만들 수 있다. 
3. 따로 분해해도 합쳐진다.
```js
interface RSP {
  readonly ROCK: '0';
}

interface RSP {
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

// 위 2개가 아래랑 같은 것이다.
interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}


```
> 이 특징 덕분에, 엄청난 강점이 있다. <br>
>> 예로들면, 남의 라이브러리에서 문제점이 있거나, 조금 수정이 있다면, <br>타입 수정할 때 힘들다. 그래서 남의 라이브러리에서도 수정을 할 수 있다. <br>


### type alias

1. type alias는 중복할 수 없다. 하나로 해줘야한다. 
```js

type RSP = {
  readonly ROCK: '0';
}
type RSP = {
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}
// Duplicate identifier 'RSP'.ts(2300)
```

### 인터페이스 vs type alias <br>
*인터페이스*는 객체에서 많이 사용한다. <br>
*type alias*가 좀 더 넒은 범위이다. 또한, 새로운 타입을 만들어 낼 수 있다. <br>
```js
// type alias의 예시 1
type hello = string | number; 

// type alias의 예시 2
type Hello = {
  ROCK: string;
  PAPER: string;
} | string; // 타입 또는 객체가 될수 있다.
// 하지만, 객체가 사용하면 인터페이스로 하는게 좋다.

```
Tip) 객체면 인터페이스하는 편이 좋다. 그리고 타입이 복잡하면 type alias가 사용된다. <br>



### keyof 사용 ('ROCK', 'SCISSORS', 'PAPER'의 중복제거)
```js

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

// 바꾸기 이전
function computerChoice(imgCoords: '0' | '-142px' | '-284px' ) :'ROCK' | 'SCISSORS' |  'PAPER' {
  return Object.keys(rsp).find((k) => rsp[k] === imgCoords);
}

// 바꾸기 이후
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return Object.keys(rsp).find((k) => rsp[k] === imgCoords);
}

```

### 인터페이스 응용
가끔씩 인터페이스 안에 뭐가 들어올지 모를 때가 있다. <br>
```js
interface Exapmle {
  a: 3;
  b: 7;
  [key: string]: number; // 뭐가 들어 올지 모르겠는데 범위를 넓게 잡아준다.
}

// 객체 선언
const example: Exapmle {
  a: 3;
  b: 7;

  //key가 문자열이고, 값이 숫자로 되어야한다.
  // c: 1; or d: 100 or hello : 3 ( 문자열: 숫자 ) <- 형식으로 만들어주면 된다.
  c: 1;
}

```
> 왠만하면 이 방법을 사용하지 않지만 불가피한 상황에서 사용하면 된다.


