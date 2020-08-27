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