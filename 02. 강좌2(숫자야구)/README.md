# 강좌2(숫자야구)

  - [tsconfig파일 다뤄보기](#tsconfig파일-다뤄보기)

## tsconfig파일 다뤄보기

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