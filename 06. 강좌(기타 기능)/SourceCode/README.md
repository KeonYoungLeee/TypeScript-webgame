# 강좌6

  - [intersection & call, apply](#intersection-&-call,-apply)
  - [TS 유틸리티](#TS-유틸리티)
  - [테코레이터](#테코레이터)




## intersection & call, apply
[위로올라가기](#강좌6)

코드 없음

## TS 유틸리티
[위로올라가기](#강좌6)

코드 없음

## 데코레이터
[위로올라가기](#강좌6)

```js
function makeGender(target: typeof Person) {
  return class extends target {
    gender = 'male';
  }
}

@makeGender
class Person {
  title: string;
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { 
    this.title = title;
  }
  sayTitle(): any {
    return this.title;
  }
}

@makeGender
class Person2 {
  title: string;
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(title: string) { 
    this.title = title;
  }
  sayTitle(): any {
    return this.title;
  }
}
```