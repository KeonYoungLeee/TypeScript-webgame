# 강좌5

  - [JS 모듈 시스템](#JS-모듈-시스템)
  - [TS 모듈 시스템 주의사항](#TS-모듈-시스템-주의사항)
  - [남의 패키지 사용하기(Redux, Axios)](#남의-패키지-사용하기(Redux,-Axios))
  - [Definitely Typed](#Definitely-Typed)




## JS 모듈 시스템
[위로올라가기](#강좌5)

소스 없음

## TS 모듈 시스템 주의사항
[위로올라가기](#강좌5)

#### types.ts
```js
export interface Card {
  att: number;
  hp: number;
  mine: boolean;
  cost?: number;
  field?: boolean;
}
export interface Player {
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

export class Sub implements Card {
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
import { Card, Player, Hero, Sub } from './types';

function isSub(data: Card): data is Sub {
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
  createDeck({ mine: false, count: 5 });
  createDeck({ mine: true, count: 5 });
  createHero({ mine: false });
  createHero({ mine: true });
  redrawScreen({ mine: false });
  redrawScreen({ mine: true });
}

initiate();

function createDeck({ mine, count }: { mine: boolean; count: number }) {
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
  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
  if (hero) {
    (cardEl.querySelector('.card-const') as HTMLDivElement ).style.display = 'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
  
  }
  cardEl.addEventListener('click', () => {
    if (isSub(data) && data.mine === true && !data.field ) {
      if(!decktoFeild({ data })) {
        createDeck({ mine: true, count: 1});
      }
    } else {

    }
  });
  DOM.appendChild(cardEl);
}
function decktoFeild({ data }: { data: Sub }): boolean {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);
  if ( currentCost < data.cost ) {
    alert('코스트가 모자릅니다.');
    return true
  } 
  data.field = true;
  const idx = target.deckData.indexOf(data);
  target.deckData.splice(idx, 1);
  target.fieldData.push(data);
  redrawDeck(target);
  redrawField(target);
  target.cost.textContent = String(currentCost - data.cost)
  return false;
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

function redrawField(target: Player) {
  if (!target.heroData) {
    throw new Error('heroData가 없습니다.')
  }
  target.field.innerHTML = '';
  target.fieldData.forEach((data) => {
    connectCardDom({ data, DOM: target.field });
  })
}
```

## 남의 패키지 사용하기(Redux, Axios)
[위로올라가기](#강좌5)

소스코드 없음

## Definitely Typed
[위로올라가기](#강좌5)

소스코드 없음