# 구구단

+ [TypeScript 소개](#TypeScript-소개)
+ [vs code와 폴더 구조 세팅](#vs-code와-폴더-구조-세팅)
+ [tse 사용하기](#tse-사용하기)
+ [watch와 구구단](#watch와-구구단)
+ [구구단 완성하기](#구구단-완성하기)

## TypeScript 소개

### TypeScript란 ? 
<strong>TypeScript</strong>는 JavaScript의 superset이라고 한다. 자바스크립트의 모든 시스템을 가지고있는데, 타입이 있다. <br>
.js -> .ts 로 바꾼다. 하지만 반대는 되긴하지만 많은 고생이 있다. <br>

> 한 마디로, JavaScript의 변수, 함수의 매개변수, 함수의 리턴 값이 명시적으로 붙어있다. <br>

자바스크립트 실행기 -> 브라우저, Node가 있다. (Node는 서버가 아니다, 자바스크리트 실행기이다) <br>
그러면, 타입스크립트는? <br>
타입스크립트도 언어이다. 하지만 실행기가 있나? `deno`라고 있다 <br>
`deno`가 아직 개발단계라서 라이브러리가 있다. <br>
타입스크립트는 라이브러리식으로 개발되어져있는데 속도는 빠르는데, 에러가 있을 경우가 있다.  <br>


## vs code와 폴더 구조 세팅

<pre><code>npm i typescript 

+ typescript@^3.7.5
</code></pre>

```html
<script src="gugudan.ts"></script>
```
이렇게 실행하면 안된다. 그래서 브라우저에서 자바스크립트 실행할 때에는 타입스크립트가 아니라 자바스크립를 이용해야한다.<br>
다음 내용부터 바꾸는 방법을 자세히 알려준다.


## tse 사용하기

tsc의 의미는 <strong>typescript compile(타입스크립트 컴파일)</strong> 이다.<br>

<pre><code>npm i -g typescript
</code></pre>
경로 실수 하지말아야 한다.

CMD에서 `tsc gugudan.ts` 를 하면 `gugudan.js`가 나온다. <br>
<strong>tsc</strong>를 통해서 ts파일을 js파일로 바꾼다. 그리고 브라우저는 js를 실행한다. HTML은 항상 .js를 연결한다. 


## watch와 구구단

자꾸 타입스크립트 저장하고 tsc gugudan.ts하는게 슬슬 귀찮아 쯤에 tsc gugudan.ts -w를 해볼 것이다.<br>

`tsc gugudan.ts -w` 에서 <strong>-w</strong>를 추가를 해본다. <br>

왜냐하면 gugudan.ts에서 코드를 수정하면 코드 수정한 만큼 `tsc gugudan.ts` 해줘야하기 때문에 <br>
-w (watch옵션) 를 넣고 저장하는 순간,  gugudan.ts감시하고 그 순간순간마다 컴파일을 바로해주기 때문에 편하다. `tsc gugudan.ts` 일일히 안해줘도 된다!!!. <br>
에러도 같이 나오면 검증도 바로해주는게 편한다. <br>


## 구구단 완성하기

```ts
let numberOne = Math.ceil(Math.random() * 9);
let numberTwo = Math.ceil(Math.random() * 9);
let result = numberOne * numberTwo;

const wordNumber = document.createElement('div');
wordNumber.textContent = `${numberOne} 곱하기 ${numberTwo}는?`;
document.body.append(wordNumber);

const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
input.type = 'number';
form.append(input);

const button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

const resultDiv = document.createElement('div');
document.body.append(resultDiv);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (result === Number(input.value)) { // 정답 맞춘 경우
    resultDiv.textContent = '딩동댕';
    numberOne = Math.ceil(Math.random() * 9);
    numberTwo = Math.ceil(Math.random() * 9);
    result = numberOne * numberTwo;
    wordNumber.textContent = `${numberOne} 곱하기 ${numberTwo}는?`;
    input.value = '';
    input.focus();
  } else { // 틀린 경우
    resultDiv.textContent = '땡';
    input.value = '';
    input.minLength;
    input.focus();
  }
});
```

`const input = document.createElement('input');` <br>
여기에서 <br>
`input.name` 하면 에러가 나온다. <br>
에러 내용이 `Property 'name' does not exist on type 'void'` 나온다. <br>

`result === input.value`의 간단한 에러가 있다. 특히 형변환을 해줘야한다. <br> 
안 해주면 계속 에러가 나온다.<br>
`result === Number(input.value)` Number로 숫자형 타입으로 해주었다. <br> 

사실 타입스크립트 코드는 없는데 파일확장자는 ts이다. <br> 
> ts파일과 ts파일 같이 띄워놓으면 에러 표시가 뜬다. 그래서 js파일을 꺼야한다. <br> 

완성하였으면 `tsc gugudan.ts` 를 해준다
