# 강좌3

  - [가위바위보 게임과 인터페이스](#가위바위보-게임과-인터페이스)
  - [인터페이스 특성과 type alias](#인터페이스-특성과-type-alias)
  - [기본 d.ts 문제 해결하기](#기본-d.ts-문제-해결하기)
  - [this와 타입 범위의 이해](#this와-타입-범위의-이해)
  - [가위바위보 완성하기](#가위바위보-완성하기)




## 가위바위보 게임과 인터페이스
[위로올라가기](#강좌3)


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
[위로올라가기](#강좌3)

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


## 기본 d.ts 문제 해결하기
[위로올라가기](#강좌3)

#### 타입스크립트 범위
find가 범위로 인해서 문제가 일어난다. 그래서 범위를 좁게 잡아줘야한다.

#### 수정 전
```js
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return Object.keys(rsp).find((k) => rsp[k] === imgCoords);
}
```
> 
> `Property 'find' does not exist on type 'string[]'.ts(2339)` <br>
>> find가 오류가 걸려있다. <br>


#### 수정 후
```js
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords);
}
```
> **keys(o: object): string[];** <br>
>> keys가 위와 같이 정의 되어져있다. string가 배열로 정의 되어져있다. <br>
>> 그래서 ['ROCK', 'SCISSORS', 'PAPER']를 입력했다. <br>


#### 수정 후의 또 다른 에러 원인
```js
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords);
}
```
> `Type '"ROCK" | "SCISSORS" | "PAPER" | undefined' is not assignable to type '"ROCK" | "SCISSORS" | "PAPER"'. `<br>
> `Type 'undefined' is not assignable to type '"ROCK" | "SCISSORS" | "PAPER"'.ts(2322)` <br>

#### 에러 원인 해결해주기 위한 tsconfig.json 수정
> **find는 ES6에 추가되어서 tsconfig.json을 수정**해줘야한다.
```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext", "DOM"]
  },
  "exclude": [".js"]
}
```

#### tsconfig.json수정 후 에러 -> find의 속성보기 (find)
```js
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords);
}
```
> `find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;` <br>
>> 여기서 find를 보면 T 또는 undefined가 되어져있다. <br>

#### 에러 해결 방안 ( !(느낌표) 붙이기)
```js
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}

```
> **!(느낌표)**의 의미는 타입시스템에서 값이 없어서 경고하지만, <br>
> 프로그래머인 내가 값이 있다고 보증하는 것이다. (프로그래머의 재량이다. 프로그래밍이 안 될 수가 있다.)<br>
>> **undefined를 없애주기 위해서 !(느낌표)를 사용**하였다. 


## this와 타입 범위의 이해
[위로올라가기](#강좌3)


#### 수정 전
```js
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function() {
    const myChoice = this.textContent;
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    
    ...생략
});
```
> this의 에러 : `'this' implicitly has type 'any' because it does not have a type annotation.ts(2683)` <br>


#### 수정 후
```js
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) {
    const myChoice = this.textContent; 
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    
    ...생략
});
```

> `btn.addEventListener('click', function(e: event) {` <br>
>> this를 사용할 경우에는 첫 번째 매개변수를 `e: event`가 아니라 `this: HTMLButtonElement` 를 사용해야 한다. <br>
>>  **`this: HTMLButtonElement`를 첫 번째 매겨변수에 넣어주기!!**


#### this.textContent 타입 범위 좁혀주기 
```js
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) {
    const myChoice = this.textContent as keyof RSP; 
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    
    ...생략
});
```
> 타입스크립트에서 `this.textContent`를 사용하면 **string | null**이 나온다. <br>
>>  string | null를 범위 줄이기 위해서 **keyof**를 사용해준다. <br>

#### imgCoords 타입 범위 좁혀주기
```js
// 수정 전
let imgCoords = '0'; // 이거 숫자형으로 되어있는데 문자열이 되어야함.. 잘 못 적어줬음.. 

// 수정 후
let imgCoords: RSP[keyof RSP] = '0';
```
> `Argument of type 'number' is not assignable to parameter of type '"0" | "-142px" | "-284px"'.ts(2345)` <br>
>> 해결하면 `let imgCoords: "0" | "-142px" | "-284px"` 이와 같이 나온다.

#### 범위 생각하기
```js
let imgCoords: RSP[keyof RSP] = '0'; // 이거를 좁은 범위로 표현하면 된다.

...생략

// 위에 let imgCoords랑 같이 해주는 방법이 있다. 또 다른 방법도 있다(밑에)
function computerChoice(imgCoords: RSP[keyof RSP] ) :keyof RSP {
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}

// imgCoords를 string으로 해주어도 괜찮다.
function computerChoice(imgCoords: string ) :keyof RSP { // imgCoords를 넒은 범위로 생각하면 된다.
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}
```

> 이제부터 tsc를 실행할 때에는 **npx tsc -w** 를 사용해준다.
```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext", "DOM"]
  },
  "exclude": [".js"],
  "include": ["rsp.ts"],
}
```
include를 추가해준다.


## 가위바위보 완성하기
[위로올라가기](#강좌3)

#### 타입스크립트 에러
```js
... 생략

let interval: number;
function intervalMaker() {
  interval = setInterval(function () {
    if (imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if (imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }
    document.querySelector('#computer').style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
  }, 100);
}
```
> document.querySelector를 사용하면 `Object is possibly 'null'.ts(2531)`가 나온다. <br>
>> 타입스크립트는 HTML을 인식을 못해서 null의 가능성이 있다. <br>

#### 에러 해결하기 1 (document.querySelector)
```js
// !(느낌표)를 사용하면, 에러 해결가능한데 프로그래밍의 에러 가능성이 있어서 잘 안 사용하는게 좋다.
document.querySelector('#computer')!.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;

// !(느낌표)를 대체하는 방법
if (document.querySelector('#computer')) {
  document.querySelector('#computer').style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
}
```

#### 에러 해결하기 2 (document.querySelector OR style)
```js
// lib.dom.d.ts에 자세히 들여다보면,
// querySelector<E extends Element = Element>(selectors: string): E | null;
// 제너레이터가 나오는데 제너레이터의 해결방법이 있는데, 나중에 제너레이터를 사용해서 일단 생략한다.
if (document.querySelector('#computer')) {
  (document.querySelector('#computer') as HTMLDivElement).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
}

```
> `Property 'style' does not exist on type 'Element'.ts(2339)` <br>
>> Element의 style이 존재하지 않는다라는 의미다. <br>
>> `document.querySelector`을 `as HTMLDivElement`로 **타입캐스팅**을 해준다. <br>
>> 즉, 위의 의미를 해석해본다면 Element에는 style이 없고, HTMLDivElement에는 style이 있다.

#### 에러 해결하기 2 (document.querySelector OR style) -  변수로 따로 설정
```js
const computer = document.querySelector('#computer');
if (computer) {
  (computer as HTMLDivElement).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
}
```

#### 코드 추가 및 수정
```js
...생략

let interval: number; // 위로 올려주기
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) {
    clearInterval(interval); // clearInterval 추가하기
    setTimeout(intervalMaker, 2000); // setTimeout 추가하기
    const myChoice = this.textContent as keyof RSP; 
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;

    if (diff === 0 ) {
      console.log('비겼습니다.');
    } else if ( [-1, 2].includes(diff) ) { // indexOf -> includes로 바꿔주기
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

intervalMaker(); // 함수 호출
```

