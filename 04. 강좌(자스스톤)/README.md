# 강좌4

  - [자스스톤 소개와 strictNullChecks](#자스스톤-소개와-strictNullChecks)
  - [Class 타이핑](#Class-타이핑)
  - [제네릭 generic](#제네릭-generic)
  - [제네릭 extends, 타입 추론](#제네릭-extends,-타입-추론)
  - [자스스톤 만들며 복습하기](#자스스톤-만들며-복습하기)
  - [타입 가드](#타입-가드)




## 자스스톤 소개와 strictNullChecks
[위로올라가기](#강좌4)

#### jsStone.ts
```js
const opponent = {
  hero: document.getElementById('rival-hero'),
  deck: document.getElementById('rival-deck'),
  field: document.getElementById('rival-cards'),
  cost: document.getElementById('rival-cost'),
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const me = {
  hero: document.getElementById('my-hero'),
  deck: document.getElementById('my-deck'),
  field: document.getElementById('my-cards'),
  cost: document.getElementById('my-cost'),
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

// opponent, me라는 객체를 만들었다. 
// 공통된 부분이 있어서 인터페이스로 만들어줄 것이다.
interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData: Card | null,
  fieldData: Card[], 
  chosenCardData: Card | null,
  chosenCard: Card[] | null
}

// Card는 선언을 안해줘서 에러가 난다.
// Card가 class로 만들 것이다. Card는 나중에 만들 것이다.
```

#### tsconfig.json
```js
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": false, // ture라면 undefined랑 null을 구분한다. (나중에 true로 변경한다.)
    "lib": ["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext", "DOM"]
  },
  "exclude": [".js"],
  "include": ["jsStone.ts"],
}
```
> ***strictNullChecks가 undefined, null을 구분한다.***

#### jsStone.ts(strictNullChecks가 false인 경우)
```js
interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData: Card[],
  fieldData: Card[], 
  chosenCardData: Card[],
  chosenCard: Card[]
}
```

> strictNullChecks가 false라면 null을 해줄필요가 없다. <br>

#### jsStone.ts(strictNullChecks가 false인 경우)
```js
interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData?: Card[],
  fieldData: Card[], 
  chosenCardData?: Card[],
  chosenCard: Card[]
}
```
> undefined를 포함할려면 ?를 해준다. <br>


#### jsStone.ts(strictNullChecks가 ture인 경우)
```js
interface Player {
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
```
> 위에 strictNullChecks가 ture되게해서 null을 되게할려면 적어줘야한다. <br>
> 빈 값을 의도록적으로 넣었음을 알리기 위해 null을 사용한다. <br>
>> strictNullChecks가 ture, false랑 뭐 달라진게 없는데 true를 하는 이유는 타입스크립트하는 효과를 극대화하게 위해서이다. <br>

### 총정리
```js
// strictNullChecks가 true인 경우
heroData: Card // null사용불가능, undefined사용불가능
heroData: Card | null // null을 사용가능하게 할려면 반드시 null을 적어줘야한다. (null가능)

heroData?: Card[] // undefined까지만 사용가능. null은 사용불가능.
heroData?: Card[] | null // undefined, null 전부 가능하게 해준다.

// 둘이 같은 의미이다.
heroData?: Card[] 
heroData: Card[] | undefined, 
```

#### jsStone.ts
```js
interface Player {
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

interface Card {
  att: number,
  hp: number,
  cost: number,
}

const opponent : Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement, // as HTMLDivElement안해주면 에러가 나온다.
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
};
```

## Class 타이핑
[위로올라가기](#강좌4)

#### jsStone.ts(interface를 class로 표현하기)
```js
interface Card {
  new (mine: boolean);
}
```
> 인터페이스도 이런식으로 클래스 표현이 가능하다.

#### jsStone.ts(class에서 생성자 생성)
```js
// 기존 Class
class Card {
  att: number;
  hp: number;
  cost: number,
}

// 자바스크립트에서 class할 때 constructor를 만든다.
// 생성자를 만들면 new Card()를 공장처럼 만들어 낸다.
class Card { // constructor(생성자 추가)
  constructor(hero, mine) {
    // 소스코드
  }
}

new Card(true, ture);
```

> class를 typescript로 정의 해볼 것이다..

#### jsStone.ts(pricate, protected, public 사용해보기)
```js
class Card {
  private att: number;
  protected hp: number;
  public cost: number,
  constructor(hero: boolean, mine: boolean) { // type 선언해준다.
    if (hero) {
      this.att = Math.ceil(Math.random() * 2);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.mine = mine;
      this.field = true;
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.cost = Math.floor((this.att + this.hp) / 2);
      this.field = true;
    }
    if (mine) {
      this.mine = true;
    }
    
  }
}
```
> private, protected, public 키워드를 제공해준다.

#### jsStone.ts(private, protected, public 적용)
```js
class Card {
  protected att: number;
  protected hp: number;
  protected cost: number,
  constructor(hero: boolean, mine: boolean) {
    if (hero) {
      return new Hero(mine); // Hero로 리턴해준다.
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mine) {
      this.mine = true;
    }
    
  }
}

class Hero extends Card { // Hero가 Card를 상속받기
  constructor(mine: boolean) { 
    super(true, mine); // super를 안해주면 에러가 나온다.
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = mine;
    this.field = true;
  } 
}

new Card(true, false); // 카드 생성
new Card(true, false); // 카드 생성
```

> 위에 형식처럼 선언을 할 수가 있다. (일단 에러가 나오긴하지만 형태만 만들었다.)
>> 처음에는 private를 해주고, 조금 씩 권한을 올려주는 식으로 해준다. (prviate -> protected -> public)

#### jsStone.ts( ?로 존재여부 에러 해결 )
```js
class Card {
  protected att: number;
  protected hp: number;
  protected cost?: number; 
  // ?를 해준이유는 원래는 att, hp는 Hero, Card에 존재하는데
  // if문 안에 넣어주면 존재하는지 존재안하는지 모르기때문에 에러가 나온다.
  // Property 'att' has no initializer and is not definitely assigned in the constructor.ts(2564)
  // 위 에러를 해결할려면 ?를 붙여준다.
  private mine?: boolean;
  constructor(hero: boolean, mine: boolean) {
    if (hero) {
      return new Hero(mine);
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mine) {
      this.mine = true;
    }
    
  }
}

class Hero extends Card {
  private hero: boolean;
  private field: boolean;
  constructor(mine: boolean) {
    super(true, mine);
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = mine;
    this.field = true;
  } 
}

```

#### jsStone.ts(implements를 적용하기)
```js
interface ICard {

  att: number;  // 변경 전
  // att에 number를 적용했지만 에러가 나온다.
  // Property 'att' in type 'Card' is not assignable to the same property in base type 'ICard'.
  // Type 'number | undefined' is not assignable to type 'number'.
  // Type 'undefined' is not assignable to type 'number'.ts(2416)
  // 에러의 이유는 범위의 문제이다. 
  // class에 Card의 att는 number OR undefined이고, 인터페이스에서의 ICard는 number로 되어져서 범위가 어긋난다.

  // 해결방법 (똑같이 만들어서 줘서 범위를 같게 하는 방법)
  att? : number; // // 변경 후
}

class Card implements ICard{
  // interfacte는 public만 된다.
  public att?: number; // public이 나올 것같다 싶어서 interface를 적용해주었다.
  protected hp?: number;
  protected cost?: number;
  private mine?: boolean;
  constructor(hero: boolean, mine: boolean) {
    if (hero) {
      return new Hero(mine);
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mine) {
      this.mine = true;
    }
    
  }
}

...생략
```

> interface는 실제로 사용하지 않고, 형태만 만들어준다. <br>
> interface에서는 protected, private는 사용할 수가 없다. <br>
> 안 쓰는 인터페이스를 만드는 이유는? <br>
>> public가 나오는 경우에 강제로 나오겠다는 것이다. <br>
> class는 new로 통해서 공장처럼 만들어주는 것이다. <br>


## 제네릭 generic
[위로올라가기](#강좌4)

여기서 게임설계 내용인데, <br>
Card는 조상클래스 <br>
Hero(영웅), Sub(부하카드)는 상속클래스로 만들 것이다. <br>

```js
interface Card {
  att: number;
  hp: number;
  mine: boolean;
  cost?: number;
  field?: boolean;
}

class Hero implements Card {
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

class Sub implements Card {
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
> 여기서 extends가 아니라 **implements**를 사용하는 이유는 ? <br>
>> new Card를 사용하지 않기 때문이다. <br>
>> **실제로 사용하면 class의 extends를 사용하고, 구현만 할려면 implements를 사용한다.** <br>
> implements는 보통 객체에서 사용하는데, 객체 뿐만 아니라 다른데에도 사용한다. <br>

#### implements를 함수일 경우
```js
// implements를 객체뿐만 아니라 함수에 사용할 때
interface Example { // 모양, 형태는 함수이다
  new (a: number, b: number): number
}

const ex: Example = (a, b) => a + b;
```
> 하지만, interface는 객체에서 많이 사용한다. 함수타입에 잘 사용하지 않는다. <br>

#### implements를 객체일 경우
```js
// // implements를 객체일 경우
const ex: Example = {
  add: (a, b) => {
    return a + b;
  }
}
```

### 제네릭(generic)

#### 제네릭을 사용 전
```js
// 문자열을 더할 때에는 
function add(a: string, b: string) {
  return a + b; 
}

 // 숫자를 더할 때에는
function add(a: number, b: number) {
  return a + b; 
}

// 역으로, 숫자랑 문자열을 함께 더 하고 싶을 때에는 에러가 나온다.
function add(a: number | string, b: number | string): string | number {
  return a + b; 
}
// Operator '+' cannot be applied to types 'string | number' and 'string | number'.ts(2365)

add(1, 'abc'); // 하지만 여기서는 에러가 안 나온다.
add(1, 2); // 숫자끼리 더한다.
add('abc', 'def'); // 문자끼리 더한다

```
> 숫자끼리 문자끼리 더하는 대신에 숫자, 문자같이 더하지않게 막아주는 장치가 필요하다. <br>
> 하지만 위의 함수 선언으로 할 수가 없다. 그러기 위해서 **제너릭**이 있다. <br>

#### 제네릭을 사용 후
> T는 이름 마음대로 지어도 괜찮다. <br>
> 임의의 T로 타입선언을 하는 것이다. <br>
```js

interface obj<T> {
  add: (a: T, b: T) => T;
}

const a: obj<number> = {
  add: (a, b) => a + b,
}
const b: obj<string> = {
  add: (a, b) => a + b,
}

a.add(1, 2);
a.add('1', '2'); // error
b.add('1', '2');
b.add(1, 2); // error

// **********************************************************
// **********************************************************

interface obj {
  add: (a: string| number, b: string | number) => string | number;
}

const a: obj<number> = {
  add: (a, b) => a + b, // error
}
const b: obj<string> = {
  add: (a, b) => a + b,  // error
}

a.add(1, 2);
a.add('1', '2'); // no error
b.add('1', '2');
b.add(1, 2); // no error

```
> **단순 함수로서는 제네릭이 적용이 힘들어** <br>
> **겍체의 메서드로 예제를 변경한다.** <br>
> T라는 것을 제네릭을 하고 interface를 사용할 때 타입을 정한다. <br>
>> 선언은 타입을 맞추면 되는 것이다. <br>

#### <>를 좀 더 이해하기
```js
// 이런식으로도 사용할 수가 있다.
document.addEventListener<'submit'>('submit', () => {

});

// addEventListener를 go to definition하면
// lim.dom.d.ts에 보면 이하와 같이 선언되어 있다.
addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
// 2개가 있다.

// ***************************************************************************
// ***************************************************************************

addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
// k가 submit이 되는 것이다. ( <>에 있는 K )
// extends는 나중에 알려준다. 일단 제한하는 것으로만 알아도 된다.

// 여기서 <submit>을 사용 안해도 잘만 되는데??.
// 그 이유 DocumentEventMap안에 있는 GlobalEventHandlersEventMap가 submit를 가지고 있기때문이다. 
// 그래서 <submit>을 안해줘도 되는 것이다.


// 만약 submit이 아니라 submitaaa가 들어오면 위에 없다는 것을 인식하고 밑에 선언 되어있는 addEventListener를 찾아본다. 
addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

```

## 제네릭 extends, 타입 추론
[위로올라가기](#강좌4)

위에 배웠던 내용에서 제네릭 extends에 대해서 알아보겠다.
위에 언급했던 내용에서 K는 아무타입이 될수가 있다.

```js

interface obj<T> {
  add: (a: T, b: T) => T;
}

const a: obj<number> = {
  add: (a, b) => a + b,
}
const b: obj<string> = {
  add: (a, b) => a + b,
}
const c: obj<boolean> = {

}
const d: obj<object> = {
  
}

```
> T를 제약하지 않아서, number, string, boolean, object등과 같이 아무거나 넣을 수가 있다.
>> 하지만 제약을 걸고 싶을 때에는 **extends**를 사용한다.
```js
interface obj<T extends string> {
  add: (a: T, b: T) => T;
}

const a: obj<number> = { // number error
  add: (a, b) => a + b,
}
const b: obj<string> = {
  add: (a, b) => a + b,
}
const c: obj<boolean> = { // boolean error

}

```
> 제네릭에서는 extends란 ? **타입제한**이라고 보면 된다.

#### 제네릭을 이용해서 함수 만들어보기
```js


function forEacth<T>(arr: T[]), callback: (item: T) => void): void { // arr에 무슨 배열이 될 지 몰라서 임의의 T를 사용했다
  for (let i: number = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

foreach<string>([], () => { }) // 배열에 문자열만 허용된다.
foreach<number>([], () => { }) // 배열에 숫자만 허용된다.

```
> 타입 추론 되는거는 모두 제네릭으로 만들어져 있다.

## 자스스톤 만들며 복습하기
[위로올라가기](#강좌4)

#### jsStone.ts

```js
...생략

// 턴 바꾸기
const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; // true면 내 턴, false면 상대 턴

// 초기화
function initate() {
  [opponent, me].forEach((item) => {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });


  heroDeck();
  heroDeck();
  redrawScreen();
  redrawScreen();
}

// 위 아래 차이는 코드를 처음 봤을 때 객체를 사용하면 알기 쉽고, 
// 매개변수에 2개가 아니라 10개이면 각각의 뭐가 사용하되는지 알기 쉽기 때문에
 
createDeck({ mine: false, count: 5});
createDeck(false, 5);


//createDeck에 선언은
function createDeck({mine, count}: {mine: boolean, count: number}) {

}
```

#### jsStone.ts
```js
... 생략

function createHero({ mine }: {mine: boolean}) {
  const player = mine ? me : opponent; // 나인지 상대인지 판별
  player.heroData = new Hero(mine); // 영웅 정보 만들어주기
  connectCardDom({ data: player.heroData, DOM: player.hero, hero: true});
}

interface A { // 이렇게 인터페이스로 별도로 만들어줘도 된다. 이름은 자기맘대로 설정
  data: Card,
  DOM: HTMLDivElement,
  hero?: boolean,
}

function connectCardDom({ data, DOM, hero = false }: A ) {
  
}
```

#### jsStone.ts
```js
...생략

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; 

function initiate() {
  [opponent, me].forEach((item) => {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });
  createDeck({ mine: false, count: 5 });
  createDeck({ mine: true, count: 5 });
  redrawScreen({ mine: true });
  redrawScreen({ mine: false });
}

initiate();

function createDeck({ mine, count }: {mine: boolean, count: number }) {

}

function createHero({ mine }: {mine: boolean}) {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDom({ data: player.heroData, DOM: player.hero, hero: true});
}

interface A {
  data: Card,
  DOM: HTMLDivElement,
  hero?: boolean,
}

function connectCardDom({ data, DOM, hero = false}: A) {
  const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
  cardEl.querySelector('.card-att')!.textContent = String(data.att); // querySelector를 사용하면 거의 형 변환은 화게 된다.
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
  if (hero) {
    (cardEl.querySelector('.card-const') as HTMLDivElement ).style.display = 'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  }
  DOM.appendChild(cardEl);
}

function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

function redrawHero(target: Player) {
  if (!target.heroData) {
    throw new Error('heroData가 없습니다.')
  }
  target.hero.innerHTML = '';
  connectCardDom({ data: target.heroData, DOM: target.hero, hero: true });
}

```

#### jsStone.ts
```js
interface Card {
  att: number;
  hp: number;
  mine: boolean;
  cost?: number;
  field?: boolean;
}

class Hero implements Card {
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

class Sub implements Card {
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

interface Player {
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

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; 

function initiate() {
  [opponent, me].forEach(function (item) {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });
  createDeck({ mine: false, count: 5 }); // 상대 덱 생성
  createDeck({ mine: true, count: 5 }); // 내 덱 생성
  createHero({ mine: false }); // 상대 영웅 그리기
  createHero({ mine: true }); // 내 영웅 그리기
  redrawScreen({ mine: false }); // 상대화면
  redrawScreen({ mine: true }); // 내화면
}

initiate(); // 진입점

function createDeck({ mine, count }: { mine: boolean; count: number }) { // 쫄병 생성
  const player = mine ? me : opponent;
  for (let i = 0; i < count; i++) {
    player.deckData.push(new Sub(mine));
  }
  redrawDeck(player);
}

function createHero({ mine }: {mine: boolean}) {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDom({ data: player.heroData, DOM: player.hero, hero: true});
}

interface A {
  data: Card,
  DOM: HTMLDivElement,
  hero?: boolean,
}

function connectCardDom({ data, DOM, hero = false}: A) {
  const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
  cardEl.querySelector('.card-att')!.textContent = String(data.att); // querySelector를 사용하면 거의 형 변환은 화게 된다.
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
  if (hero) {
    (cardEl.querySelector('.card-const') as HTMLDivElement ).style.display = 'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
  
  }
  DOM.appendChild(cardEl);
}

function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

function redrawHero(target: Player) {
  if (!target.heroData) {
    throw new Error('heroData가 없습니다.')
  }
  target.hero.innerHTML = '';
  connectCardDom({ data: target.heroData, DOM: target.hero, hero: true });
}

function redrawDeck(target: Player) {
  if (!target.heroData) {
    throw new Error('heroData가 없습니다.')
  }
  target.deck.innerHTML = '';
  target.deckData.forEach((data) => {
    connectCardDom({ data, DOM: target.deck });
  })
}
```

> 실행하면 잘 못된 부분이 있을 것이다. 하지만 여기서는 타입스크립트 강좌라서 미구현상태이다. <br>

## 타입 가드
[위로올라가기](#강좌4)

