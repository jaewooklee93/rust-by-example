## 부분 이동

[구조 분해] 내에서 단일 변수의 경우, `by-move` 와 `by-reference` 패턴 바인딩을 동시에 사용할 수 있습니다. 이를 통해 변수의 _부분 이동_이 발생하며, 이는 변수의 일부만 이동되고 나머지는 유지되는 것을 의미합니다. 이 경우, 부모 변수는 전체로 다시 사용할 수 없지만, 참조(이동되지 않음)만 하는 부분은 여전히 사용할 수 있습니다.

```rust,editable
fn main() {
    #[derive(Debug)]
    struct Person {
        name: String,
        age: Box<u8>,
    }

    let person = Person {
        name: String::from("Alice"),
        age: Box::new(20),
    };

    // `name`은 `person`에서 이동되지만 `age`는 참조됩니다
    let Person { name, ref age } = person;

    println!("The person's age is {}", age);

    println!("The person's name is {}", name);

    // 오류! 부분 이동된 값의 대여: `person` 부분 이동 발생
    //println!("The person struct is {:?}", person);

    // `person`은 사용할 수 없지만 `person.age`는 이동되지 않았기 때문에 사용할 수 있습니다
    println!("The person's age from person struct is {}", person.age);
}
```
(이 예제에서는 `age` 변수를 힙에 저장하여 부분 이동을 설명합니다. 위 코드에서 `ref`를 삭제하면 `person.age`의 소유권이 `age` 변수로 이동되므로 오류가 발생합니다. `Person.age`가 스택에 저장된다면 `ref`가 필요하지 않으며, `age` 정의는 `person.age`에서 데이터를 복사하여 이동시키지 않고 사용합니다.)

### 참조:
[구조 분해][destructuring]

[destructuring]: ../../flow_control/match/destructuring.md
