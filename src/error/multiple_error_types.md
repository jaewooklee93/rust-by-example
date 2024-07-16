## 여러 종류의 오류

이전 예제는 항상 매우 편리했습니다. `Result`는 다른 `Result`와 상호 작용하고 `Option`은 다른 `Option`과 상호 작용합니다.

때때로 `Option`이 `Result`와 상호 작용하거나 `Result<T, Error1>`이 `Result<T, Error2>`와 상호 작용해야 할 수도 있습니다. 그런 경우, 조립 가능하고 쉽게 상호 작용할 수 있도록 다양한 오류 유형을 관리하고 싶습니다.

다음 코드에서 두 개의 `unwrap` 인스턴스는 다른 오류 유형을 생성합니다. `Vec::first`는 `Option`을 반환하고 `parse::<i32>`는 `Result<i32, ParseIntError>`를 반환합니다.

```rust,editable,ignore,mdbook-runnable
fn double_first(vec: Vec<&str>) -> i32 {
    let first = vec.first().unwrap(); // 오류 1 발생
    2 * first.parse::<i32>().unwrap() // 오류 2 발생
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    println!("The first doubled is {}", double_first(numbers));

    println!("The first doubled is {}", double_first(empty));
    // 오류 1: 입력 벡터가 비어 있습니다.

    println!("The first doubled is {}", double_first(strings));
    // 오류 2: 요소가 숫자로 변환되지 않습니다.
}
```

다음 섹션에서는 이러한 유형의 문제를 처리하는 데 사용할 수 있는 여러 가지 전략을 살펴보겠습니다.
