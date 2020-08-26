# 강좌5

  - [JS 모듈 시스템](#JS-모듈-시스템)
  - [TS 모듈 시스템 주의사항](#TS-모듈-시스템-주의사항)
  - [남의 패키지 사용하기(Redux, Axios)](#남의-패키지-사용하기(Redux,-Axios))
  - [Definitely Typed](#Definitely-Typed)




## JS 모듈 시스템
[위로올라가기](#강좌5)

그 전에 Node.js의 모듈 시스템을 **common.js**라고 부른다. <br>
타입스크립트 모듈 시스템 자바스크립트 모듈 시스템 ES2015를 그대로 계승 했다. <br><br>

common.js랑 ES2015 2개의 차이점을 잘 알아두면 된다. <br>

module.js, run.js을 생성하겠다. <br>

#### module.js
```js
// HTML을 사용할 떄 여기에서 사용하는 것은 script이다.
<script src="module.js"></script>

// 자바스크립트 파일이 모듈이 될 수가 있다.
const hello = 'module';
module.export = hello; // 이렇게 하는 순간 모듈이 된다.

// ************************************************************

// 객체 속성으로 모듈 값을 넣어준다.
// 첫 번째 방법 (exports는 하나만 사용해야한다.)
exports.a = 'b';
exports.b = false;
// 두 번째 방법 (exports는 하나만 사용해야한다.)
module.exports = {
  a: 'b'
  b: false,
}
```

#### run.js
```js
const hello = require('./module'); // 경로를 결정해서 hello를 가져올 수 있다.

// ************************************************************

const { a, b } = require('./module'); // 객체 속성 값을 불러올 떄 구조분해로 해줘야한다.
```
> moudle.exports는 하나만 사용해야한다. <br>

> 타입스크립트가 es2015문법도 지원하지만, common.js를 위한 문법도 지원을 해준다. <br>
>> es2015문법, common.js문법의 차이가 있다. (동적, 정정의 형태가 다르다.) <br> 
> es2015에는 default라는 개념을 도입을 하였다. <br>

#### module.js
```js
const a = 'b'
const b = false;

export { a }
export { b }
```

#### run.js
```js
import { a, b } from './module'; // 이런식으로 불러 올수가 있다.

// ******************************************

export const a = 'b' // 바로 export로 할 수 있다.

// ******************************************

export default function() {} // 새로운 default가 생겼다.
module.exports = function () {} // 위와 이것은 서로 다른 것이다.

```

### import에 *가 없는 경우
```js
export default hello(); // default가 있다.

```
```js
import hello from './module';
```

### import에 *가 있는 경우
```js
module.exports = hello();
```
```js
import * from hi from './module';
```
> 두개 다 신경쓰고 싶지않으면, tsconfig에서 **esModuleInterop: true**를 해준다. <br>
> 하지만, 별로 추천을 안해주고 싶다. <br>


## TS 모듈 시스템 주의사항
[위로올라가기](#강좌5)

TS 모듈을 실전에 적용해보겠다. <br>
지난 시간에 했던 자스스톤 소스를 들고오겠다. <br>

```js
export interface Card {
  att: number;
  hp: number;
  mine: boolean;
  cost?: number;
  field?: boolean;
}

export class Hero implements Card {
  public att: number;
  public hp: number;
  public mine: boolean;
  public field: boolean;
  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.mine = mine;
    this.field = true;
  }
}

```
> 파일 중에 import, export가 들어있으면 모듈이 된다. <br> 
> 반대로 없으면, 스크립트가 된다. <br>

#### types.ts
```js
export interface Card { // export 적용
  att: number;
  hp: number;
  mine: boolean;
  cost?: number;
  field?: boolean;
}
export interface Player { // export 적용
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData?: Card | null,
  fieldData: Card[], 
  chosenCardData?: Card | null,
  chosenCard?: Card[] | null
}

export class Hero implements Card { // export 적용
  public att: number;
  public hp: number;
  public mine: boolean;
  public field: boolean;
  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.mine = mine;
    this.field = true;
  }
}

export class Sub implements Card { // export 적용
  public att: number;
  public hp: number;
  public field: boolean;
  public cost: number;
  public mine: boolean;
  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
    this.mine = mine;
    this.field = false;
  }
}
```

#### practice.ts
```js
import { Card, Player, Hero, Sub } from './types'; // 모듈을 불러올 수가 있다.

function isSub(data: Card): data is Sub { // Sub는 types에 라는 모듈에서 들고온다.
  if ( data.cost ) {
    return true;
  } else {
    return false;
  }
}


const opponent : Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const me: Player = {
  hero: document.getElementById('my-hero') as HTMLDivElement,
  deck: document.getElementById('my-deck') as HTMLDivElement,
  field: document.getElementById('my-cards') as HTMLDivElement,
  cost: document.getElementById('my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

...생략
...생략

```

> 주의할 점이 common.js, es2015가 다르다는 것이다. <br>
> 몇 가지 주의할 사항이 있다. namespace, common를 위한 import다. <br>

**common.ts, common.d.ts**를 파일을 생성한다.
#### common.d.ts
```js
// common.d.ts.는 `export =` 라고 적힌다.
declare function a() {}
export = a;
// export default a; // 이렇게 적지 않는다.
```
> **d.ts는 보통 내 프로젝트가 라이브러리일 때 사용한다.** <br>
> `export = a`라고 있는데 import는 어떻게 할까? <br>
```js
import a = require('./common'); // d.ts를 imporot 하는 방법
// 하지만 require하는 방법은 잘 못봤는데? 이하와 같이 해줘도 상관없다.
import * as A from './common'; // * as로 대신 사용할 수 가 있다.

```
> <strong>*</strong>가 거기에 해당하는 모든 것을 가져온다는 의미이다. 그 해당하는 모듈을 A라는 곳에 다 담아온다. <br>
> `import a = require('./common');`랑 `import * as A from './common';`의 의미는 같다. <br>
>> common.js 모듈을 다룰 때에는 항상 `* as`가 원칙이다. <br>

## 남의 패키지 사용하기(Redux, Axios)
[위로올라가기](#강좌5)

남의 라이브러리 중점적으로 보겠다. <br>
예로들어서 Redux에 간다. typescript가 거의 대부분(80%)구성으로 되어있다. <br>

**declare**는 타입이 없는 것을 새로 타입을 선언할 떄 사용한다. <br> 
redux의 패키지를 보면 `export default`가 없다. <br>
```js
export default // default가 없다
import { combineReducers } from 'redux'; // 객체형식, 즉 구조분해 형식으로 파일을 가져온다.
```

d.ts에 보면 `/// <reference types="sybol-observable" />`가 있다. <br>
> 의미는 sybol-observable의 타입을 참조하고 있는 것이다. <br>
> 다른 패키지에 있는 타입을 참조하고 있다. <br>
> 직접 코딩에는 사용하지 않지만, d.ts파일을 분석할 때 사용한다. <br><br>

axios라이브러리를 보면 자바스크립트 90퍼 이상을 차지하고 있고, 타입스크립트 4.5퍼 들어가있다. <br>
> 타입스크립트가 들어 있으면 가장 확인 해봐야할 것이 **d.ts**파일이다. <br>
> axios도보면 d.ts파일이 들어있다. <br>
>> 결국에는, d.ts파일이 없으면, 내가 직접 필요한 것을 만들어줘야한다. <br>



## Definitely Typed
[위로올라가기](#강좌5)

다음 라이브러리는 React를 볼 것이다. <br>
React를 보면, index.d.ts파일이 없다. <br>
다른 라이브러리 jQuery도 보면, index.d.ts.파일이 없다. <br>
> 그러면, 타입선언이 안되어있어서 불안하지 않나? <br>
>> 프로그래밍은 개인 혼자서 만든 것이 아니라, 수 백명 이상이 만들어서 남이 만들어놓은 그 중하나가 **Definitely Typed**라는 것이다. <br>
>> **Definitely Typed안에 엄청 많은 타입들이 많고, index.d.ts가 정의 되어어져있다.** <br>

Definitely Typed에는 jQuery, React 다양한 라이브러리 있다는 것을 확인할 수 있다. <br>
하지만, 다른 라이브러리 대표적으로 vue같은 경우에는 vue자체에서 타입을 지원한다. <br>
타입스크립트를 지원하면 Definitely Typed에 라이브러리가 들어있지 않는다. <br>

### @types의 의미 
<pre><code>npm i @types/jquery</code></pre>

> 위와 같이 설치를 한다면, jquery와 @types/jquery가 함께 설치가 된다. <br>
> **@types/jquery의미는 Definitely Typed에 있는 라이브러리(jquery 등)를 참조한다.** <br>
> 자체적으로 types을 지원하지 않는다면, `@types/`를 해주는 것이 좋다. <br>
> 그러면 `node_modules`에 파일을 보면 `types`파일이 생긴다. <br>
>> 즉, Definitely Typed를 사용할 때에는 `@types/라이브러리명` 해주는 것이 좋다 <br><br>

### namespace
`React.componet, React.selct` 와 같이 사용할 수 있는 이유는 <br>
> React에 **namespace**가 정의되어져 있기 때문에 사용할 수가 있다. <br>

