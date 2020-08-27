# 강좌6

  - [intersection & call, apply](#intersection-&-call,-apply)
  - [TS 유틸리티](#TS-유틸리티)




## intersection & call, apply
[위로올라가기](#강좌6)

### intersection
```js
type A = string & number; ( &를 인터셉션이라고 부른다. )
```
```js
interface A {
  hello: true,
}
interface B {
  bye: true,
}
const a: A = {
  hello: true,
}
const b: B = {
  bye: true,
}

type C = {
  h1: false,
}

const c: A & B & C = { // 셋 다 만족을 해야하는 인터셉션이 있다. 
  hello: true,
  bye: true,
  he: false,
}

const d: A & B & C = { // union인 경우에는 A, B, C 하나만 만족해도 된다.
  hello: true,
  bye: true,
  he: false,
}
```
> 무조건 인터페이스뿐만 아니라, type alias에도 사용할 수 있다. <br>
> 인터셉션이 나온 이유는 재사용 할 수 있기 위해서이다. (중복을 막기위해서) <br>

### call, apply
```js
const result = Array.prototype.map.call([1, 2, 3], (item) => {
  return item.toFixed(1);
});

// result: ['1.0', '2.0', '3.0']
```

> call을 보면 제네릭부분에서 제네릭을 사용해서 타입추론을 원할하게 해줘야한다. <br>
> item도 any가 나온다 <br>
> 타입추론이 잘 되는 것은 제네릭을 사용한다. <br>

> 이 부분을 tsconfig에서 수정을 해서 더 엄격하게 할 수가 있다. <br>

```js
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictBindCallApply": true, // 여기에서 타입 체크를 해준다.
    "lib": ["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext", "DOM"],
    "typeRoots": ["./types", "./node_modules/@types"],
    "declaration": true,
    "declarationDir": "./types"
  },
  "exclude": [".js"]
}
```
> 타입이 엄격해지면, 타입핑이 더 어려워져서, 이해를 해야한다. <br>

```js
const result = Array.prototype.map.call([1, 2, 3], (item) => {
  return item.toFixed(1);
});
// result: ['1.0', '2.0', '3.0']

// ***********************************************************************

// result의 정확한 타이핑
const result = Array.prototype.map.call<number[], [(item: number) => string], string[]>([1, 2, 3], (item) => {
  return item.toFixed(1);
});
// result: ['1.0', '2.0', '3.0']

// ***********************************************************************

// call을 보면
call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R; // 이런식으로 되어잇다.
```
> 여기서 this는 실제 매개변수가 아니라 타입핑하기 위한 매개변수이다. (일단 this는 신경 안 써도된다. )<br>
> 실제 매개변수는 `thisArg: T, ...args`이다. <br>

> `thisArg`: [1, 2, 3]의 배열 <br>
> ``...args: A`는 `(item) => {  return item.toFixed(1); }`` <br>
> `(this: T, ...args: A) => R`는 `map`을 뜻하는 것이다. <br>


## TS 유틸리티
[위로올라가기](#강좌6)

사이트 : https://typescript-kr.github.io/pages/utility-types.html (한글번역) <br>


> `Partial<T>, Readonly<T>, Pick<T,K>, Omit<T,K>, Exclude<T,U>, Extract<T,U>, ReturnType<T>, Required<T>, OmitThisParameter ThisType<T>` <br>
> 특히 많이 사용되는 것이다. <br>

> TS 유틸리티가 있는 이유는 타입핑할 때 편해진다. <br>

### Partial
Partial는 일부분만 바꿔 줄 수 있게 해준다. <br>
```js
interface A {
  a: 'b',
  c: true,
  d: 123, 
}

const a: A {
  a: 'b',
  c: true,
  d: 123, 
}

const b: Partial<A> = {
  c: true,
  d: 123, 
} // -> 원래 a가 없으면 에러가 나는데, a가 없어도 에러가 안 나온다. 
```

### Readonly
```js
interface A {
  a: 'b',
  c: true,
  d: 123, 
}

const a: A {
  a: 'b',
  c: true,
  d: 123, 
}

const b: Readonly<A> = {
  c: true,
  d: 123, 
} 
```
> 간단하게 설명하자면, b가 전부 Readonly 된다. <br>
> TS 유틸리티에 다양한 기능이 있으니까, 나중에 사용하면 된다. <br>
>> TS 유틸리티를 잘 활용하면 중복되는 인터페이서, 타이핑을 막을 수 있게 된다. <br>

