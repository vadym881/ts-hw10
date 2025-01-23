interface IPropertyDescriptor<K> {
  value: K;
  writable: boolean;
  enumerable: boolean;
  configurable: boolean
}

interface IBook {
  title: string;
  price: number;
}

interface IBankCard {
  bank: string;
  type: "visa" | "mastercard";
}

interface ICrypto {
  title: 'btc' | 'eth' | 'ltc'
  rate: number
}

class User {
  name: string;
  age: number;
  bankCards: IBankCard[] = [];
  cryptos?: ICrypto[] = [];
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user: User = {
  name: "John",
  age: 42,
  bankCards: [
    { bank: "monobank", type: "visa" },
    { bank: "privatbank", type: "mastercard" },
  ],
};

//Завдання #1: Доповнити функцію sortArray з минулого завдання
const books: IBook[] = [{ title: '2 brothers', price: 200 }, { title: 'Friday', price: 150 }, { title: 'Cloud atlas', price: 250 }];
function compareByKey<T extends object>(key: keyof T) {
  return (a: T, b: T) => {
      return Number(b[key]) - Number(a[key]);
  };
}
function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  return arr.toSorted(compareFn as (a: T, b: T) => number);
}

console.log(sortArray<IBook>(books, compareByKey<IBook>('price')))

//Завдання #2: DeepReadonly
const rUser: Readonly<User> = new User('igor', 27)
//rUser.bankCards = user.bankCards;
rUser.bankCards.push(...user.bankCards)
type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ? Readonly<T[P]> : T[P] };
const drUser: DeepReadonly<User> = new User('sergey', 28);
drUser.bankCards.push({ bank: "pumb", type: "visa" });

//Завдання #3: DeepRequireReadonly
type DeepRequiredReadonly<T> = {
  readonly [P in keyof T]-?: T[P] extends object ? Readonly<T[P]> : T[P]
};
const drrUser: DeepRequiredReadonly<User> = { ...user, cryptos: [{ title: 'btc', rate: 100000 }] }
//drrUser.cryptos.push({title: 'btc', rate: 100000}) //did not work
drrUser.bankCards.push({ bank: "pumb", type: "visa" });

//Завдання #4: PartialByKeys
type PartialByKeys<T, K extends keyof T> = Omit<T, K>;
const pUser: PartialByKeys<User, 'age'> = {
  name: "Semen",
  bankCards: []
};

//Завдання #5: ReadonlyByKeys
type ReadonlyByKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
} & {
  readonly [P in keyof T as P extends K ? P : never]: T[P]
}
const readonlyByKeysUser: ReadonlyByKeys<User, 'name'> = { ...user };
readonlyByKeysUser.name = 'Oleg';

//Завдання #6:
type MutabaleByKeys<T, K extends keyof T> = {
  -readonly [P in keyof T as P extends K ? P : never]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}
const mutableByKeysUser: MutabaleByKeys<User, 'name'> = { ...readonlyByKeysUser };
mutableByKeysUser.name = 'Oleg';

//Завдання #7: UpperCaseKeys
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};
const upperCaseUser: UpperCaseKeys<User> = {
  NAME: "Anton",
  AGE: 42,
  BANKCARDS: [],
};

//Завдання #8: ObjectToPropertyDescriptor
type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: IPropertyDescriptor<T>
};
const descriptedUser: ObjectToPropertyDescriptor<User> = getObjectDescriptors<User>(user);
console.log(descriptedUser);

function getObjectDescriptors<T>(obj: T) {
  let res: any = {};
  for (const key in obj) {
    res[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return res;
}
