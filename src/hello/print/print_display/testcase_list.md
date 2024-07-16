## 테스트 케이스: 리스트

`fmt::Display`를 구조체에 구현하는 것은 각 요소를 순차적으로 처리해야 하므로 어려울 수 있습니다. 문제는 각 `write!`가 `fmt::Result`를 생성하기 때문입니다. 올바른 처리를 위해 모든 `Result`를 다루어야 합니다. Rust는 이를 위해 `?` 연산자를 제공합니다.

`?`를 `write!`에 사용하는 방법은 다음과 같습니다.

```rust,ignore
// `write!`를 시도하여 오류가 있는지 확인합니다. 오류가 발생하면 오류를 반환합니다. 그렇지 않으면 계속합니다.
write!(f, "{}", value)?;
```

`?`를 사용하면 `Vec`에 대한 `fmt::Display` 구현이 간단해집니다.

```rust,editable
use std::fmt; // `fmt` 모듈을 가져옵니다.

// `List`라는 구조체를 정의하여 `Vec`를 포함합니다.
struct List(Vec<i32>);

impl fmt::Display for List {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // 튜플 인덱싱을 사용하여 값을 추출하고 `vec`에 대한 참조를 만듭니다.
        let vec = &self.0;

        write!(f, "[")?;

        // `vec`의 `v`를 반복하면서 반복 횟수를 `count`에 나타냅니다.
        for (count, v) in vec.iter().enumerate() {
            // 첫 번째 요소를 제외한 모든 요소에 대해 쉼표를 추가합니다.
            // 오류가 발생하면 `?` 연산자를 사용하여 반환합니다.
            if count != 0 { write!(f, ", ")?; }
            write!(f, "{}", v)?;
        }

        // 열린 괄호를 닫고 `fmt::Result` 값을 반환합니다.
        write!(f, "]")
    }
}

fn main() {
    let v = List(vec![1, 2, 3]);
    println!("{}", v);
}
```

### 활동

프로그램을 변경하여 벡터의 각 요소의 인덱스도 출력하도록 하세요. 새로운 출력은 다음과 같습니다.

```rust,ignore
[0: 1, 1: 2, 2: 3]
```

### 참조

[`for`][for], [`ref`][ref], [`Result`][result], [`struct`][struct],
[`?`][q_mark], and [`vec!`][vec]

[for]: ../../../flow_control/for.md
[result]: ../../../std/result.md
[ref]: ../../../scope/borrow/ref.md
[struct]: ../../../custom_types/structs.md
[q_mark]: ../../../std/result/question_mark.md
[vec]: ../../../std/vec.md
