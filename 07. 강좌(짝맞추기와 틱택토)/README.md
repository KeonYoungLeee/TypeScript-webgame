# 강좌7

  - [짝맞추기 게임](#짝맞추기-게임)





## 짝맞추기 게임
[위로올라가기](#강좌7)

#### 화면 그려주기
```js
const horizontal: number = 4; // 가로
const vertical: number = 3; // 세로
const colors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink']; // 카드 색깔

let colorCandiate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;
let clickCard: HTMLDivElement[] = []; // 눌렀던 카드
let completedCard: HTMLDivElement[] = []; // 뒤집었던 카드가 짝이 맞았을 때
let startTime: Date;

function shuffle(): void { // 카드 섞어주기
  for ( let i:number = 0; colorCandiate.length > 0; i+=1 ) { // 섞는 알로리즘 : 피셔 예이츠 셔플
    color = color.concat(colorCandiate.splice(Math.floor(Math.random() * colorCandiate.length), 1));
    // 섞었던 카드를 새로운 배열에 넣어준다.
  }
}

function setCard(horizontal: number, vertical: number) { // 카드 만들어주기
  clickFlag = false; // 카드를 눌렀는지 여부
  for ( let i: number = 0; i < horizontal * vertical; i++ ) { // 12장 카드를 화면에 그려줄 것이다.
    const card: HTMLDivElement = document.createElement('div'); 
    card.className = 'card';
    const cardInner: HTMLDivElement = document.createElement('div'); // 카드 내부
    cardInner.className = 'card-inner';
    const cardFront: HTMLDivElement = document.createElement('div'); // 카드 앞면
    cardFront.className = 'card-front';
    const cardBack: HTMLDivElement = document.createElement('div'); // 카드 뒷면
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card); // 타입 캐스팅
  }


}

shuffle(); // 카드 섞어주기
setCard(horizontal, vertical); // 카드 세팅
```

#### 카드 뒤집어 주기 (setTimeout 적용)
```js
const horizontal: number = 4;
const vertical: number = 3;
const colors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];

let colorCandiate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;
let clickCard: HTMLDivElement[] = [];
let completedCard: HTMLDivElement[] = [];
let startTime: Date;

function shuffle(): void {
  for ( let i:number = 0; colorCandiate.length > 0; i+=1 ) {
    color = color.concat(colorCandiate.splice(Math.floor(Math.random() * colorCandiate.length), 1));
  }
}

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    const card: HTMLDivElement = document.createElement('div'); 
    card.className = 'card';
    const cardInner: HTMLDivElement = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront: HTMLDivElement = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack: HTMLDivElement = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }
  // call의 함수는 타입추론을 해야한다. (제네릭)
  Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => { // 5초 뒤에 카드를 감춰주는 역할
    Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    startTime = new Date(); // 시간측정
  }, 5000);
}

shuffle();
setCard(horizontal, vertical);

```

#### 카드 클릭이벤트
```js
...생략
...생략

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    ...생략
    ...생략


    // EventListenr을 만들 것이다.
    card.addEventListener('click', function (this: HTMLDivElement) { // 카드를 클릭할 때
      if (clickFlag && !completedCard.includes(this)) { // 클릭이 가능 And 짝을 맞춘 가드가 아닌 경우
        this.classList.toggle('flipped');
        clickCard.push(this);
        if ( clickCard.length == 2 ) { // 2개를 뒤집었을 경우
          // querySelector는 타입 캐스팅
          const firstBackgrond: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          const secondBackgrond: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          if (firstBackgrond === secondBackgrond) { // 2개의 카드 색이 같은 경우
            completedCard.push(clickCard[0]); // 완성된 카드 데이터에 넣어주기 
            completedCard.push(clickCard[1]); // 완성된 카드 데이터에 넣어주기
            clickCard = []; // 초기화
          } else { // 2개의 카드 색이 다른 경우

          }
        }
      }
    });
    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }
  ...생략
  ...생략
}
shuffle();
setCard(horizontal, vertical);
```

#### 카드게임이 끝났을 경우(12개 전부 맞췄을 떄), 카드 클릭했을 떄 2개의 카드가 다를 경우
```js
...생략
...생략

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    ...생략
    ...생략

    card.addEventListener('click', function (this: HTMLDivElement) {
      if (clickFlag && !completedCard.includes(this)) {
        this.classList.toggle('flipped');
        clickCard.push(this);
        if ( clickCard.length == 2 ) {
          const firstBackgrond: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          const secondBackgrond: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          if (firstBackgrond === secondBackgrond) {
            completedCard.push(clickCard[0]);
            completedCard.push(clickCard[1]);
            clickCard = [];

            if ( completedCard.length === horizontal * vertical ) { // 카드의 짝이 다 맞췄을 경우
              const endTime: number = new Date().getTime();
              alert(`축하합니다 ${((endTime - startTime.getTime()) / 1000)}초 걸렸습니다.`)
            } 

          } else { // 2개의 카드 색이 다른 경우
            clickFlag = false; // 잠깐 클릭 할 수 없게 만든다.
            setTimeout(() => {
              clickCard[0].classList.remove('flipped');
              clickCard[1].classList.remove('flipped');
              clickFlag = true; // 1초 후에 클릭할 수 있도록 한다.
              clickCard = [];
            }, 1000)
          }
        }
      }
    });


    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }

  ...생략
  ...생략
}

shuffle();
setCard(horizontal, vertical);
```

#### 카드게임이 끝났을 때 초기화 - 수정, ?의 의미
```js
...생략
let completedCard: HTMLDivElement[] = [];
let startTime: Date | null = null; // null부분 추가

function shuffle(): void {
  for ( let i:number = 0; colorCandiate.length > 0; i+=1 ) {
    color = color.concat(colorCandiate.splice(Math.floor(Math.random() * colorCandiate.length), 1));
  }
}

function setCard(horizontal: number, vertical: number) {
  clickFlag = false;
  for ( let i: number = 0; i < horizontal * vertical; i++ ) {
    ...생략

    card.addEventListener('click', function (this: HTMLDivElement) {
      if (clickFlag && !completedCard.includes(this)) {
        this.classList.toggle('flipped');
        clickCard.push(this);
        if ( clickCard.length == 2 ) {
          const firstBackgrond: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          const secondBackgrond: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor
          if (firstBackgrond === secondBackgrond) {
            completedCard.push(clickCard[0]);
            completedCard.push(clickCard[1]);
            clickCard = [];

            if ( completedCard.length === horizontal * vertical ) { // 카드의 짝이 다 맞췄을 경우
              const endTime: number = new Date().getTime();
              alert(`축하합니다 ${((endTime - startTime!.getTime()) / 1000)}초 걸렸습니다.`); // 여기서도 또 에러가 나온다. 그래서 확신을 갖고 !를 넣어준다.
              // document.querySelector('#wrapper')?.innerHTML; 
              (document.querySelector('#wrapper') as HTMLDivElement).innerHTML = '';
              colorCandiate = colors.slice();
              color = [];
              completedCard = [];
              startTime = null; // startTime이 null이 되니까 startTime 선언한 부분에도 null을 입력해줘야햐한다.
              shuffle();
              setCard(horizontal, vertical);
            } 
          } else { // 2개의 카드 색이 다른 경우
            clickFlag = false; // 잠깐 클릭 할 수 없게 만든다.
            setTimeout(() => {
              clickCard[0].classList.remove('flipped');
              clickCard[1].classList.remove('flipped');
              clickFlag = true; // 1초 후에 클릭할 수 있도록 한다.
              clickCard = [];
            }, 1000)
          }
        }
      }
    });
    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }

  ...생략

shuffle();
setCard(horizontal, vertical);

```

> `document.querySelector('#wrapper')?.innerHTML;` 이 부분에서 ***`?`***의 의미는? <br>
> ***`?`***는 확신을 못 가질 떄 사용한다. <br>
> wrapper가 존재하면 innerHTML, 존재하지않으면 undefined이다. <br>