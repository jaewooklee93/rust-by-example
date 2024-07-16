## `Result`의 별칭

특정 `Result` 유형을 여러 번 재사용하고 싶을 때 어떻게 해야 할까요?
Rust가 [별칭][typealias]을 만들 수 있다는 것을 기억하세요. 편리하게,
우리는 질문에 대한 특정 `Result`에 대한 별칭을 정의할 수 있습니다.

모듈 수준에서 별칭을 만들면 특히 유용합니다. 특정 모듈에서 발견되는 오류는
종종 동일한 `Err` 유형을 가지므로 하나의 별칭은 *모든* 관련 `Result`를 간결하게 정의할 수 있습니다.
이렇게 유용해서 `std` 라이브러리는 이미 하나를 제공하고 있습니다: [`io::Result`][io_result]!

다음은 구문을 보여주는 간단한 예입니다.

```rust,editable
use std::num::ParseIntError;

// `ParseIntError` 오류 유형을 가진 `Result`에 대한 일반 별칭을 정의합니다.
type AliasedResult<T> = Result<T, ParseIntError>;

// 위 별칭을 사용하여 특정 `Result` 유형을 참조합니다.
fn multiply(first_number_str: &str, second_number_str: &str) -> AliasedResult<i32> {
    first_number_str.parse::<i32>().and_then(|first_number| {
        second_number_str.parse::<i32>().map(|second_number| first_number * second_number)
    })
}

// 여기서 별칭은 다시 공간을 절약하는 데 도움이 됩니다.
fn print(result: AliasedResult<i32>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    print(multiply("10", "2"));
    print(multiply("t", "2"));
}
```

### 참조:

[`io::Result`][io_result]

[typealias]: ../../types/alias.md
[io_result]: https://doc.rust-lang.org/std/io/type.Result.html
