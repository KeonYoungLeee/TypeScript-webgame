# 강좌5

  - [JS 모듈 시스템](#JS-모듈-시스템)




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
export default hello();

```
```js
import hello from './module';
```

### import에 *가 있는 경우
```js
module.exports = hello ();
```
```js
import * from hi from './module';
```
> 두개 다 신경쓰고 싶지않으면, tsconfig에서 **esModuleInterop: true**를 해준다. <br>
> 하지만, 별로 추천을 안해주고 싶다. <br>


