# 강좌6

  - [intersection & call, apply](#intersection-&-call,-apply)
  - [TS 유틸리티](#TS-유틸리티)
  - [테코레이터](#테코레이터)
  - [질문 및 정리](#질문-및-정리)




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

## 데코레이터
[위로올라가기](#강좌6)

**데코레이터**는 영어로 장식하다의미이다. <br>
데코레이터는 클래스의 property, method등을 장식할 수 있다. <br>

#### 클래스 선언
```js
class Person {
  title: string;
  age: 27;
  constructor() {
    this.title = this.name;
  }
  setTitle(title: string) {

  }
  sayTitle(): any {
    retrn this.title;
  }
}
```
> 실제로 꾸미는게 아니라, 기능을 수정하는 것이다. <br>
> 기능을 왜 굳이 데코레이터로 수정을 하는가? 직접 코드를 수정하는게 낫지않을까?  \<br>
>> 이것도 중복을 막기위해서 데코레이터를 사용하는 것이다. <br>

#### 데코레이터 선언
```js
// 함수선언
function makeGender(target: typeof Person) { // Person의 대한 타입을 타겟 지정한다.
  return class extends target {
    // 여기서 꾸며 줄 작업을 한다.
    gender = 'male';
    sayGender() {
      return this.gender;
    }
  }
}

@makeGender // 데코레이트 선언
class Person {
  title: string;
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { 
    this.title = title;
  }
  sayTitle(): any {
    return this.title;
  }
}

@makeGender // 데코레이트 선언
class Person2 {
  title: string;
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { 
    this.title = title;
  }
  sayTitle(): any {
    return this.title;
  }
}
```
> 데코레이트는 함수뿐만아니라 다양하게 만들 수가 있다.. <br>
> 하지만 에러가 나올 것이다. <br>
>> `Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.ts(1219)`


#### tsconfig.js
```js
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictBindCallApply": true,
    "lib": ["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext", "DOM"],
    "typeRoots": ["./types", "./node_modules/@types"],
    "experimentalDecorators": true, // 데코레이터를 사용하기 위해서 이 기능을 true로 해줘야한다.
  },
  "exclude": [".js"]
}
```

#### 데코레이터 설명
```js
function makeGender(target: typeof Person) {
  return class extends target {
    gender = 'male';
    sayGender() {
      return this.gender;
    }
  }
}

@makeGender // 클래스 데코레이터
class Person {
  @validate title: string; // 프로퍼티 데코레이터
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { // 여기에다가 @붙이면 파라미터 데코레이터
    this.title = title;
  }

  @readonly // 메소드 데코레이터
  sayTitle(): any {
    return this.title;
  }
}

function readonly(target: any, key: any) {

}

@makeGender // 위에 선언하면 아랫 줄을 꾸며줄 수가 있다.
class Person2 {
  @validate title: string; // 이런식으로 데코레이터를 사용할 수가 있다. 
  // @validate title: string; // 여기에서는 title을 꾸며주는 것이다.
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { 
    this.title = title;
  }
  @readonly 
  sayTitle(): any {
    return this.title;
  }
}
```
> ***데코레이터 자체가는 TS가 아니라 JS 개념이다.*** <br>

### 함수형 데코레이터 (세 번쨰 인수는 특별하다)
```js
...생략

function readonly(target: any, key: any, descriptor: PropertyDescriptor) { 
  console.log(target, key, descriptor);
  descriptor.writable = false;
  descriptor.configurable = false; 
  descriptor.enumerable = false;
}

@makeGender 
class Person2 {
  @validate title: string; 
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { 
    this.title = title;
  }
  @readonly 
  sayTitle(): any {
    return this.title;
  }
}

const Lee = new Persion('Lee');
```

> 데코레이터는 직접구현하는 것은 힘들기 때문에 바벨, Typescript로 이용해서 구현하는게 편하다. <br>
> 데코레이터 만들어 주었는데 readonly데코레이터를 보면 **매겨변수가 3개**가 있다. <br>
> **첫 번째 매겨변수는 target, 두 번쨰 매개변수는 key, 세번 쨰 매개변수는 descriptor** <br>
>> descriptor에서는 ***`writable: 수정 가능 여부, configurable: 설정 가능 여부, enumerable: 반복 가능 여부`***가 있다. <br>

## 질문 및 정리
[위로올라가기](#강좌6)


타입스크립를 사용하면 퍼포먼스에서도 향상이 가능할까? <br>
> 성능 향상에는 거의 없다. 타입스크립트에서는 타입이 명확해지기떄문에, 어이없는 실수를 막아준다. <br>
> 자바스크립트 에러 순위를 보면, 어이없는 실수가 많다. 그것을 타입스크립트가 막아준다. <br>
> 대신에, 코드가 길어지고, 제네릭을 사용해지면 가독성이 떨어질 떄가 있다. <br>
> 또한, 빌드 시간이 오래걸린다. 실행시간은 차이가 없다. <br>

#### 파리미터 데코레이터 (세 번쨰 인수는 index)
```js
...생략
function readonlyProperty(target: any, key: any, index: number) { // 세번 쨰인수는 index
  console.log(target, key, index);
}

function readonly(target: any, key: any, descriptor: PropertyDescriptor) { 
  console.log(target, key, descriptor);
  descriptor.writable = false;
}

@makeGender 
class Person2 {
  @validate title: string; 
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(@readonlyProperty title: string) { // 파라미터 데코레이터
    this.title = title;
  }
  @readonly 
  sayTitle(): any {
    return this.title;
  }
}

const Lee = new Persion('Lee');
```
> 파라미터 데코레이터는 세번 쨰 인수가 descriptor가 아닌 index이다. <br>
> 데코레이터를 잘 사용하기 위해서는 `reflect-metadata`, `proxy`를 사용하는 것이 좋다. <br>
> `reflect-metadata`, `proxy` 나중에 사용할 때 자기 스스로 공부해보기 <br>

> 데코레이터는 클래스, 프로퍼티, 메소드, 파라미터를 꾸며준다. <br> 
>> 꾸며주다 의미는 기능을 추가 수정을 하는 것이다. <br>
>> 장점은 중복을 줄여주는 역할을 할 수가 있다. 같은 역할은 데코레이터에 작성해주는 것이 좋다. <br>
>> 즉, 자바스크립트에서 코딩(클래스형 프로그래밍)을 할 떄 데코레이터로 사용해서 중복을 제거할 수 있다. <br>

