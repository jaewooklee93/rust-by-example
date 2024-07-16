## `Result`를 반복하는 방법

`Iter::map` 연산이 실패할 수 있습니다. 예를 들어,

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let numbers: Vec<_> = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("Results: {:?}", numbers);
}
```

이를 처리하는 전략에 대해 살펴보겠습니다.

## `filter_map()`으로 실패한 항목 무시하기

`filter_map`는 함수를 호출하고 `None`인 결과를 필터링합니다.

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let numbers: Vec<_> = strings
        .into_iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();
    println!("Results: {:?}", numbers);
}
```

## `map_err()`와 `filter_map()`으로 실패한 항목 수집하기

`map_err`는 오류와 함께 함수를 호출하므로, 이전의 `filter_map` 솔루션에 추가하여 측면에 저장할 수 있습니다.

```rust,editable
fn main() {
    let strings = vec!["42", "tofu", "93", "999", "18"];
    let mut errors = vec![];
    let numbers: Vec<_> = strings
        .into_iter()
        .map(|s| s.parse::<u8>())
        .filter_map(|r| r.map_err(|e| errors.push(e)).ok())
        .collect();
    println!("Numbers: {:?}", numbers);
    println!("Errors: {:?}", errors);
}
```

## `collect()`로 전체 작업 실패하기

`Result`는 `FromIterator`를 구현하여 결과의 벡터 (`Vec<Result<T, E>>`)를 결과로 변환할 수 있습니다 (`Result<Vec<T>, E>`). `Result::Err`가 발견되면 반복이 종료됩니다.

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let numbers: Result<Vec<_>, _> = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("Results: {:?}", numbers);
}
```

이와 같은 기술은 `Option`과 함께 사용할 수 있습니다.

## `partition()`으로 모든 유효한 값과 오류 수집하기

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let (numbers, errors): (Vec<_>, Vec<_>) = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .partition(Result::is_ok);
    println!("Numbers: {:?}", numbers);
    println!("Errors: {:?}", errors);
}
```

결과를 살펴보면 모든 것이 여전히 `Result`로 감싸여 있는 것을 알 수 있습니다. 이 방법에는 약간 더 많은 boilerplate 코드가 필요합니다.

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let (numbers, errors): (Vec<_>, Vec<_>) = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .partition(Result::is_ok);
    let numbers: Vec<_> = numbers.into_iter().map(Result::unwrap).collect();
    let errors: Vec<_> = errors.into_iter().map(Result::unwrap_err).collect();
    println!("Numbers: {:?}", numbers);
    println!("Errors: {:?}", errors);
}
```
