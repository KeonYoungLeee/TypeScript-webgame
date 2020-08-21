# 강좌4

  - [자스스톤 소개와 strictNullChecks](#자스스톤-소개와-strictNullChecks)
  - [Class 타이핑](#Class-타이핑)
  - [제네릭 generic](#제네릭-generic)
  - [제네릭 extends, 타입 추론](#제네릭-extends,-타입-추론)





## 자스스톤 소개와 strictNullChecks
[위로올라가기](#강좌4)

#### tsconfig.json
```js
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true, // ture라면 undefined랑 null을 구분한다.
    "lib": ["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext", "DOM"]
  },
  "exclude": [".js"],
  "include": ["jsStone.ts"],
}
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
```

## Class 타이핑
[위로올라가기](#강좌4)

#### jsStone.ts

```js
interface ICard {
  att? : number;
  hp? : number;
}

class Card implements ICard{
  public att?: number;
  public hp?: number;
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
```

## 제네릭 generic
[위로올라가기](#강좌4)

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
```

## 제네릭 extends, 타입 추론
[위로올라가기](#강좌4)

코드 없음
