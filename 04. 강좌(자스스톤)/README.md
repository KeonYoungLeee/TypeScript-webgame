# 강좌4

  - [자스스톤 소개와 strictNullChecks](#자스스톤-소개와-strictNullChecks)
  - [Class 타이핑](#Class-타이핑)





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

