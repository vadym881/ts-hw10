interface IBankCard {
  bank: string;
  type: "visa" | "mastercard";
}

const user = {
  name: "John",
  age: 42,
  bankCards: [
    <IBankCard>{ bank: "monobank", type: "visa" },
    <IBankCard>{ bank: "privatbank", type: "mastercard" },
  ],
};

//Завдання #1: Доповнити функцію sortArray з минулого завдання
function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    return arr.toSorted(compareFn);
  }

//Завдання #2: DeepReadonly
//type ReadonlyUserType = Readonly<typeof user>;
// const readonlyUser: ReadonlyUserType = user;
// readonlyUser.bankCards.push({ bank: "aval", type: "mastercard" });
// console.log(readonlyUser);

// type DeepReadonlyUserType<T> = { readonly [P in keyof T]: T[P] };
// const deepReadonlyUser: DeepReadonlyUserType<typeof user> = user;
// deepReadonlyUser.bankCards.push({ bank: "pumb", type: "visa" });
// console.log(deepReadonlyUser)

//Завдання #3: DeepRequireReadonly

//Завдання #4: PartialByKeys
type PartialByKeys = Omit<typeof user, keyof typeof user>;
const partialUser: PartialByKeys = {
  name: "Joe",
  bankCards: [],
};
console.log(partialUser);

//Завдання #5: ReadonlyByKeys
type readonlyKeysType = 'name' | 'age';
type p1 = Readonly<Pick<typeof user, readonlyKeysType>>;
type p2 = Exclude<keyof typeof user, readonlyKeysType>
type ReadonlyByKeys = p1 | p2;
const readonlyByKeysUser: ReadonlyByKeys = {
  name: "Igor",
  age: 33,  
  bankCards: []
};
readonlyByKeysUser.name = 'hello'

console.log(readonlyByKeysUser);

//Завдання #6: MutableByKeys
type MutableByKeys = Partial<Pick<typeof user, keyof typeof user>>;
const mutableByKeysUser: MutableByKeys = {
  ...readonlyByKeysUser,
  name: "Ivan",
  bankCards: [],
};
delete mutableByKeysUser.age;
console.log(mutableByKeysUser);
console.log(readonlyByKeysUser);

//Завдання #7: UpperCaseKeys
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};
const upperCaseUser: UpperCaseKeys<typeof user> = {
  NAME: "Anton",
  AGE: 42,
  BANKCARDS: [],
};
console.log(upperCaseUser);

//Завдання #8: ObjectToPropertyDescriptor
