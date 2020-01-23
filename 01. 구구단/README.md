# 구구단

+ [TypeScript 소개](#TypeScript-소개)
+ [vs code와 폴더 구조 세팅](#vs-code와-폴더-구조-세팅)

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
이렇게 실행하면 안된다. 그래서 브라우저에서 자바스크립트 실행할 때에는 타입스크립트가 아니라 자바스크립를 이용해야한다.
다음 내용부터 바꾸는 방법을 자세히 알려준다.