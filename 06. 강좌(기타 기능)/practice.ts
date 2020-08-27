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


function readonlyProperty(target: any, key: any, index: number) {
  console.log(target, key, index);
}

function readonly(target: any, key: any, descriptor: PropertyDescriptor) { 
  console.log(target, key, descriptor);
  descriptor.writable = false;
}

@makeGender 
class Person2 {
  @validate title: string; 
  age = 27;
  constructor() {
    this.title = name;
  }
  setTitle(@readonlyProperty title: string) {
    this.title = title;
  }
  @readonly 
  sayTitle(): any {
    return this.title;
  }
}