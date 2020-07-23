# 강좌2

  - [tsconfig파일 다뤄보기](#tsconfig파일-다뤄보기)
  - [target, module, 기타옵션](#target,-module,-기타옵션)
  - [기본 타입, 배열, 튜플](#기본-타입,-배열,-튜플)
  - [상수, enum, 함수, 객체 타입](#상수,-enum,-함수,-객체-타입)
  - [never, any, 타입 캐스팅](#never,-any,-타입-캐스팅)
  - [숫자야구 만들기](#숫자야구-만들기)
  - [질문](#질문)

## tsconfig파일 다뤄보기
[위로올라가기](#강좌2)

지난 시간에 js파일과 ts파일을 동시에 사용하면 ts 파일에서 에러가 나온다. 그 이유는 <br>
**tsconfig.json**이 없어서 에러가 난다.
하지만 tsconfig.json에서 설정이 필요하다.

https://www.typescriptlang.org/docs/handbook/compiler-options.html
위 링크에 tsconfig설정옵션 링크가 있다. 나중에 참고

설정이 너무 많아서 자주쓰는 것을 소개하겠다.
- allowJs : boolean
  - Js파일을 컴파일을 할 수있게 한다. js파일도 버전이 나눠져있다. 더 옛날버전으로 바꿔 줄수가 있다. 그리고 타입스크립트 파일은 ts파일만 허용한다. 하지만, js파일도 접근하기 위해서 allowJs가 있다.
- baseUrl : string
  - 기본 경로를 설정한다.
- charset : utf-8 (기본값)
- declaration : boolean
  - 옵션을 설정하면, d.ts파일이 생긴다. d.ts파일은 나만의 타입을 정하는 곳이다.
  - d.ts파일을 만들고 싶으면 true하면 된다.
- esModuleInterop : boolean
  - 예로들면, `import React from 'react';`, `import * as React from 'react';`과 엄청 다르다(후자가 알맞은 문법이다.). 하지만, 에러를 없애주기 위해서 esModuleInterop를 true해주지만 엄청 위험하다. 
- lib : string[]
  - 내가 쓰는 ES문법을 설정한다. esNext는 가장 최신문법
  - "lib" : [ES2015, ES2016, ES2017, esNext]
- outDir
  - ts파일과 js파일을 같은 경로에 생성하는데 다른 경로에 설정하고 싶으면 outDir를 사용한다.

## target, module, 기타옵션
[위로올라가기](#강좌2)

- target
  - target이 중요한데, 기본적으로 타입스크립트는 es3(기본값)로 변환시켜준다. 
  - babel이 es5까지부터 지원하는데 진짜 옛날 버전 지원하고 싶으면 target을 사용한다.
  - `"target" : "es5"`와 같이 설정해준다.
- types, typesRoots
- strict~~ : boolean
- noImplicit~~~ : boolean
  - strict, noImplicit로 시작하는 시리즈는 다 true로 해줘야한다.
  - false를 하면 자바스크립트로 되기 때문에 true로 해준다.
- module : string
  - common.js, ES6로 되어있는데, 대부분 common.js로 한다.
  - 하지만 common.js를 할 경우에 이 부분 `import React from 'react';`, `import * as React from 'react';`에서 주의를 해야한다.
- watch
  - typescript를 감시하는 역할

### tsconfig.json 예시
```js
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES6","ES2020"]
  },
  "include": ["파일1.ts"], // 어떤 파일을 컴파일할 것인지 정해준다.
  // 예시) `파일1.ts`만 컴파일 하겠다

  "exclude": ["*.js"], 
  // `js파일`을 컴파일 하지 않겠다는 의미

  "extends": "" 
  // tsconfing를 다른 쪽에서 확장을 할 수 있다.
  // leture라는 폴더가 있는데, 그 안에 타입스크립트 프로젝트가 여러 개 있을 때
  // 공통된 tsconfig를 하나 만들어두고, 세부 프로젝트마다 tsconfig가 다른 경우에 사용한다
  // tsconfig를 조금 씩 다르게 처리할 떄 사용한다.
}
```

공식문서 읽을 때 기본적인 Handbook을 다 읽어보고, <br>
그 다음에는 타입스크립트의 업데이트 역사를 보는게 좋을 것이다. <br>

## 기본 타입, 배열, 튜플
[위로올라가기](#강좌2)

### 타입 지정하기 (number, string, boolean)
```js
// number, string, boolean
let num: number = 3 // number라는 타입을 설정해준다.
let str: string;
let bool: boolean;

// 배열 설정하기 (표기법이 2개가 있다.)
let arr: number[] = [1, 2, 3];
let arr: Array<number> = [1, 2, 3];
```
### 타입 지정하기 (Object) - 1
```js
const obj: object = { a: 'b' }; // 안 하는 이유는 범위가 광범위해져서 안한다.

// a, b를 다 넣어줘야한다.
const obj: { a: string, b: number } = { a: 'b', b: 3 }; // 직접 내부에 타입을 설정해준다.
```

### 타입 지정하기 (Object) - 2
```js
// 여기에 보면 b에는 ?가 있다.
// ? : 있을지 없을지 
const obj: { a: string, b?: number } = { a: 'b'}; 
```
> 하지만, 중복된 느낌이 되어서, 인터페이스로 해주는 경우가 있다.

### 타입 바꿔보기
```js
let num: number;
let str: string = num.toString(); // 숫자 형 타입을 문자형으로 바꿔준다.
```

### 잘못 된 타입
```js
// 잘못 된 타입
let num: Number;
let str: String;
let bool: Boolean;

// 올바른 타입
let num: number;
let str: string;
let bool: boolean;
```
> 여기서 주의 할 것이 타입스크립트에 대문자를 넣어주면 안 된다. <br>
> 타입스크립트의 타입은 **소문자**이다. 대문자랑 다르다. <br>
> 대문자는 타입설정아니라 객체이다. <br>
> 항상 조심하도록 해야한다. <br>

### 배열에서 다른 타입도 입력할 경우
```js
// string, number, boolean만 들어갈 수 있도록 설정해주었다.
let arr: (string | number | boolean)[] = [true, 2, 'hello'];


// 좀 더 엄격하게 할 경우도 있다.
let arr: [boolean, number, string] = [true, 2, '3']; // Tuple이라고 부른다.
// arr[0] => boolean타입만 가능
// arr[1] => number타입만 가능
// arr[2] => string타입만 가능

// 전자의 arr설정보다 후자의 arr처럼 엄격하게 설정해주는 것이좋다

let arr: [boolean, 2, string] = [true, 2, '3'];
// 위 처럼 2를 넣으면 2만 들어갈 수 있다. 
```
> 단, tuple에 push하는 행위는 막지 못한다.

## 상수, enum, 함수, 객체 타입
[위로올라가기](#강좌2)

### 상수
```js
// 상수는 타입스크립트 전용 문법
let arr = [true, 2, '3'] as const;
// arr가 상수가 된다.(readonly)

// 여기에서 객체에서 사용할 때 엄청 좋아진다.
// 예로들면
const obj = { a: 'b' };
obj.a = 'c'; // 바꿔줄 수가 있다.

const obj = { a: 'b' } as const;
obj.a = 'c'; // 내부 값들을 바꿔줄 수가 없다. 에러가 나온다

```

### enum
#### numberbaseball.ts
```js
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```
를 작성해준 다음에 `tsc numberbaseball.ts`를 하면, `numberbaseball.js`파일이 생긴다. <br>
#### numberbaseball.js
```js
// enum Color { Red, Green, Blue }
// let c: Color = Color.Green;

var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;

// 위에 의미는 밑처럼 되어진다.
// Color[0] === 'Red';
// Color['Red'] === 0;
// Color[1] === 'Green';
// Color['Green'] === 1;
// Color[2] === 'Blue';
// Color['Blue'] === 2;
```

### 함수
```js
const n = null; // null이 된다
const n = undefined; // undefined가 된다

// 리턴이 없을 경우
function notReturn(): void {
  // sourece code
}

// 리턴이 있을 경우 (타입을 명시해서 함수를 작성하는 방법)
function add(a: number, b: number): number {
  // a: number, b: number는 매개변수
  // number는 return

  return a + b;
}

// 고차 함수 일 경우 1
function add(a: number, b: number): (c: string) => number {
  return (c: string) => {
    return 3;
  }
}

// 고차 함수 일 경우 2
function add(a: number, b: number): (c: string) => (d: string) => boolean) {
  return (c: string) => {
    return (d: string) => {
      return false;
    }
  }
}
```

### 객체 타입
```js
const obj2 = { a: (b: number) => string } = {
  a(b: number) {
    return 'hello'
  }
}

const obj2 = { a: (b: number, c?: string) => string } = { // 여기에서 ?가 오버로딩의 일종이 될 수가 있다.
  a(b: number, c?: string) { // 여기에서 ?가 오버로딩의 일종이 될 수가 있다.
    return 'hello'
  }
}


```
> 타입스크립트에서는 오버로딩을 명확하게 제시를 할 수가 있다. <br>

## never, any, 타입 캐스팅
[위로올라가기](#강좌2)

### never
```js
const arr2: [] = [];
arr2.push(3); // Argument of type '3' is not assignable to parameter of type 'never'.ts(2345)

// 해결방안
const arr2: number[] = [];
arr2.push(3);

```
> 잘못 만들어서 never가 나타난다. <br>
> 대부분 배열을 잘 못 만든경우에 never가 나온다. <br>

### any
```js
const h1: any = [];
```
> 뭐든지 다 선언이 가능하다. <br>
> 하지만, 되도록이면 사용하지 않도록하자. <br>
> 타입 정의할 때 너무 복잡해서 못 만들겠을 경우 any를 사용한다. <br>

### 타입 캐스팅
```js
// 타입 캐스팅
const hello: number = 0; // 숫자형 타입
const strHello = hello as unknown as string; // 숫자형 타입 -> 문자열 타입 (강제로 바꿔주었다.)
// 강제 타입해줄 때 unknown을 사용해주어야 한다.
// unknown을 사용하지 않으면 밑에와 같이 에러가 나온다.
// Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.ts(2352)

// 타입 캐스팅
const div = document.createElement('div');
const a = div as HTMLElement; // 인터페이스를 활용하여서 바꾸어주었다.
const a = div as unknown as string; // div타입 -> string타입 (강제로 바꿔주었다.)
```

## 숫자야구 만들기
[위로올라가기](#강좌2)

```js
const { body } = document;
let candidate: number[];
let array: number[] = []; // number[]를 안해주면 never가 나온다.
const arr: [number, number] = [1,2];

function chooseNumber(): void {
  candidate = [1,2,3,4,5,6,7,8,9];
  array = [];
  for (let i: number = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
}

chooseNumber();
console.log(array);

const result = document.createElement('h1');
body.append(result);
const form = document.createElement('form');
document.body.append(form);
const input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
const button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

let wrongCount = 0;
form.addEventListener('submit', (event :Event) => {
  event.preventDefault();
  const answer = input.value;
  if (answer === array.join('')) { // 답이 맞으면
      result.textContent = '홈런';
      input.value = '';
      input.focus();
      chooseNumber();
      wrongCount = 0;
  } else { // 답이 틀리면
    const answerArray = answer.split('');
    let strike = 0;
    let ball = 0;
    wrongCount += 1;
    if (wrongCount > 10) { // 10번 넘게 틀린 경우
        result.textContent = `10번 넘게 틀려서 실패! 답은 ${array.join(',')} 였습니다!`;
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
    } else { // 10번 미만으로 틀린 경우
      console.log('답이 틀리면', answerArray);
      for (let i: number = 0; i <= 3; i += 1) {
        if (Number(answerArray[i]) === array[i]) { // 같은 자리인지 확인
          console.log('같은 자리?');
          strike += 1;
        } else if (array.indexOf(Number(answerArray[i])) > -1) { // 같은 자리는 아니지만, 숫자가 겹치는지 확인
          console.log('겹치는 숫자?');
          ball += 1;
        }
      }
      result.textContent = `${strike}스트라이크 ${ball}볼입니다.`;
      input.value = '';
      input.focus();
    }
  }
});
```

> **남이 만든 거는 타입 추론을 한다**. (업데이트하면 바꿔지기 때문에 추론으로 한다.) <br>
>> 그러면 코드가 꼬여지기 때문에 남이 만든 거는 잘 건들지 않는다. <br>

> 내가 만든 거는 타입을 만든다. <br>

## 질문
[위로올라가기](#강좌2)

#### 타입스크립트에도 js하는 방법
```js
{
  "compilerOptions": {
    "strict": true,
    "allowJs" : true,
    "checkJs" : true,
  },
  "exclude": [".js"],
}
```
