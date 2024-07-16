## `Option`에서 `Result` 추출하기

다양한 오류 유형을 처리하는 가장 기본적인 방법은 서로에 삽입하는 것입니다.

```rust,editable
use std::num::ParseIntError;

fn double_first(vec: Vec<&str>) -> Option<Result<i32, ParseIntError>> {
    vec.first().map(|first| {
        first.parse::<i32>().map(|n| 2 * n)
    })
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    println!("The first doubled is {:?}", double_first(numbers));

    println!("The first doubled is {:?}", double_first(empty));
    // 오류 1: 입력 벡터가 비어 있습니다.

    println!("The first doubled is {:?}", double_first(strings));
    // 오류 2: 요소가 숫자로 변환되지 않습니다.
}
```

`?` [enter_question_mark] 와 같이 오류 발생 시 처리를 중단하고 싶지만, `Option`이 `None`일 때는 계속 진행하고 싶을 때가 있습니다. `transpose` 함수는 `Result`와 `Option`을 교환하는 데 유용합니다.

```rust,editable
use std::num::ParseIntError;

fn double_first(vec: Vec<&str>) -> Result<Option<i32>, ParseIntError> {
    let opt = vec.first().map(|first| {
        first.parse::<i32>().map(|n| 2 * n)
    });

    opt.transpose()
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    println!("The first doubled is {:?}", double_first(numbers));
    println!("The first doubled is {:?}", double_first(empty));
    println!("The first doubled is {:?}", double_first(strings));
}
```

[enter_question_mark]: ../result/enter_question_mark.md
