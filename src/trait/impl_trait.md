## `impl Trait`

`impl Trait`는 두 가지 위치에서 사용할 수 있습니다.

1. 인수 유형으로
2. 반환 유형으로

## 인수 유형으로

함수가 추상형을 통해 일반화되어 있지만 구체적인 유형에 신경 쓰지 않으면 `impl Trait`를 인수 유형으로 사용하여 함수 선언을 간소화할 수 있습니다.

예를 들어 다음 코드를 살펴보세요.

```rust,editable
fn parse_csv_document<R: std::io::BufRead>(src: R) -> std::io::Result<Vec<Vec<String>>> {
    src.lines()
        .map(|line| {
            // source의 각 줄에 대해
            line.map(|line| {
                // 줄이 성공적으로 읽혔다면 처리하고, 아니면 오류를 반환합니다.
                line.split(',') // 쉼표로 구분된 줄 분리
                    .map(|entry| String::from(entry.trim())) // 앞뒤 공백 제거
                    .collect() // 모든 문자열을 행으로 Vec<String>에 수집
            })
        })
        .collect() // 모든 줄을 Vec<Vec<String>>에 수집
}
```

`parse_csv_document`는 `BufRead`를 구현하는 모든 유형을 허용하는 일반화된 함수입니다. 예를 들어 `BufReader<File>` 또는 `[u8]`와 같습니다.
하지만 `R`의 유형은 중요하지 않으며, `R`은 `src`의 유형을 선언하는 데만 사용되므로 함수는 다음과 같이 작성할 수도 있습니다.

```rust,editable
fn parse_csv_document(src: impl std::io::BufRead) -> std::io::Result<Vec<Vec<String>>> {
    src.lines()
        .map(|line| {
            // source의 각 줄에 대해
            line.map(|line| {
                // 줄이 성공적으로 읽혔다면 처리하고, 아니면 오류를 반환합니다.
                line.split(',') // 쉼표로 구분된 줄 분리
                    .map(|entry| String::from(entry.trim())) // 앞뒤 공백 제거
                    .collect() // 모든 문자열을 행으로 Vec<String>에 수집
            })
        })
        .collect() // 모든 줄을 Vec<Vec<String>>에 수집
}
```

`impl Trait`를 인수 유형으로 사용하면 함수 사용의 구체적인 형태를 명시할 수 없다는 점에 유의하세요. 예를 들어 `parse_csv_document::<std::io::Empty>(std::io::empty())`은 두 번째 예제에서 작동하지 않습니다.


## 반환 유형으로

함수가 `MyTrait`를 구현하는 유형을 반환하는 경우 반환 유형을 `-> impl MyTrait`로 작성할 수 있습니다. 이는 유형 서명을 크게 간소화하는 데 도움이 될 수 있습니다!

```rust,editable
use std::iter;
use std::vec::IntoIter;

// 이 함수는 두 `Vec<i32>`를 결합하고 이에 대한 이터레이터를 반환합니다.
// 반환 유형이 얼마나 복잡한지 살펴보세요!
fn combine_vecs_explicit_return_type(
    v: Vec<i32>,
    u: Vec<i32>,
) -> iter::Cycle<iter::Chain<IntoIter<i32>, IntoIter<i32>>> {
    v.into_iter().chain(u.into_iter()).cycle()
}

// 이것은 `impl Trait`를 사용하여 반환 유형을 간소화한 정확히 같은 함수입니다.
// 얼마나 간단한지 확인해보세요!
fn combine_vecs(
    v: Vec<i32>,
    u: Vec<i32>,
) -> impl Iterator<Item=i32> {
    v.into_iter().chain(u.into_iter()).cycle()
}

fn main() {
    let v1 = vec![1, 2, 3];
    let v2 = vec![4, 5];
    let mut v3 = combine_vecs(v1, v2);
    assert_eq!(Some(1), v3.next());
    assert_eq!(Some(2), v3.next());
    assert_eq!(Some(3), v3.next());
    assert_eq!(Some(4), v3.next());
    assert_eq!(Some(5), v3.next());
    println!("all done");
}
```

더 중요한 것은 일부 Rust 유형은 작성할 수 없습니다. 예를 들어, 모든
클로저는 고유한 이름 없는 구체적인 유형을 가지고 있습니다. `impl Trait` 문법이 없었다면, 반환 클로저를 위해 힙에 할당해야 했습니다. 하지만 이제는 모든
것을 정적으로 할 수 있습니다.

```rust,editable
```rust
// 입력에 `y`를 더하는 함수를 반환합니다
fn make_adder_function(y: i32) -> impl Fn(i32) -> i32 {
    let closure = move |x: i32| { x + y };
    closure
}

fn main() {
    let plus_one = make_adder_function(1);
    assert_eq!(plus_one(2), 3);
}
```

`impl Trait`를 사용하여 `map` 또는 `filter` 콜로저를 사용하는 이터레이터를 반환할 수도 있습니다. 이는 `map`과 `filter`를 사용하는 것을 더 쉽게 만듭니다. 콜로저 유형에는 이름이 없기 때문에 함수가 콜로저를 사용하는 이터레이터를 반환하는 경우 명시적인 반환 유형을 작성할 수 없습니다. 하지만 `impl Trait`를 사용하면 쉽게 할 수 있습니다.

```rust,editable
fn double_positives<'a>(numbers: &'a Vec<i32>) -> impl Iterator<Item = i32> + 'a {
    numbers
        .iter()
        .filter(|x| x > &&0)
        .map(|x| x * 2)
}

fn main() {
    let singles = vec![-3, -2, 2, 3];
    let doubles = double_positives(&singles);
    assert_eq!(doubles.collect::<Vec<i32>>(), vec![4, 6]);
}
```
