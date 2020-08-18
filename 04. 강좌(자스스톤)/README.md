# 강좌4

  - [자스스톤 소개와 strictNullChecks](#자스스톤-소개와-strictNullChecks)





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