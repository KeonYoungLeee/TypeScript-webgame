# 강좌2

  - [tsconfig파일 다뤄보기](#tsconfig파일-다뤄보기)
  - [target, module, 기타옵션](#target,-module,-기타옵션)

## tsconfig파일 다뤄보기
[위로올라가기](#강좌2)

지난 시간에 js파일과 ts파일을 동시에 사용하면 ts 파일에서 에러가 나온다. 그 이유는 <br>
**tsconfig.json**이 없어서 에러가 난다.
하지만 tsconfig.json에서 설정이 필요하다.

https://www.typescriptlang.org/docs/handbook/compiler-options.html
위 링크에 tsconfig설정옵션 링크가 있다. 나중에 참고

설정이 너무 많아서 자주쓰는 것을 소개하겠다.
- allowJs : boolean
  - Js파일을 컴파일을 할 수있게 한다. js파일도 버전이 나눠져있다. 더 옛날버전으로 바꿔 줄수가 있다. 그리고 타입스크립트 파일은 ts파일만 허용한다. 하지만, js파일도 접근하기 위해서 allowJs가 있다.
- baseUrl : string
  - 기본 경로를 설정한다.
- charset : utf-8 (기본값)
- declaration : boolean
  - 옵션을 설정하면, d.ts파일이 생긴다. d.ts파일은 나만의 타입을 정하는 곳이다.
  - d.ts파일을 만들고 싶으면 true하면 된다.
- esModuleInterop : boolean
  - 예로들면, `import React from 'react';`, `import * as React from 'react';`과 엄청 다르다(후자가 알맞은 문법이다.). 하지만, 에러를 없애주기 위해서 esModuleInterop를 true해주지만 엄청 위험하다. 
- lib : string[]
  - 내가 쓰는 ES문법을 설정한다. esNext는 가장 최신문법
  - "lib" : [ES2015, ES2016, ES2017, esNext]
- outDir
  - ts파일과 js파일을 같은 경로에 생성하는데 다른 경로에 설정하고 싶으면 outDir를 사용한다.

## target, module, 기타옵션
[위로올라가기](#강좌2)

- target
  - target이 중요한데, 기본적으로 타입스크립트는 es3(기본값)로 변환시켜준다. 
  - babel이 es5까지부터 지원하는데 진짜 옛날 버전 지원하고 싶으면 target을 사용한다.
  - `"target" : "es5"`와 같이 설정해준다.
- types, typesRoots
- strict~~ : boolean
- noImplicit~~~ : boolean
  - strict, noImplicit로 시작하는 시리즈는 다 true로 해줘야한다.
  - false를 하면 자바스크립트로 되기 때문에 true로 해준다.
- module : string
  - common.js, ES6로 되어있는데, 대부분 common.js로 한다.
  - 하지만 common.js를 할 경우에 이 부분 `import React from 'react';`, `import * as React from 'react';`에서 주의를 해야한다.
- watch
  - typescript를 감시하는 역할

### tsconfig.json 예시
```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES6","ES2020"]
  },
  "include": ["파일1.ts"], // 어떤 파일을 컴파일할 것인지 정해준다.
  // 예시) `파일1.ts`만 컴파일 하겠다

  "exclude": ["*.js"], 
  // `js파일`을 컴파일 하지 않겠다는 의미

  "extends": "" 
  // tsconfing를 다른 쪽에서 확장을 할 수 있다.
  // leture라는 폴더가 있는데, 그 안에 타입스크립트 프로젝트가 여러 개 있을 때
  // 공통된 tsconfig를 하나 만들어두고, 세부 프로젝트마다 tsconfig가 다른 경우에 사용한다
  // tsconfig를 조금 씩 다르게 처리할 떄 사용한다.
}
```

공식문서 읽을 때 기본적인 Handbook을 다 읽어보고, <br>
그 다음에는 타입스크립트의 업데이트 역사를 보는게 좋을 것이다. <br>
