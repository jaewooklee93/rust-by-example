## `?` 도입

때때로 `unwrap`의 간결함을 원하지만 `panic`의 가능성 없이 사용하고 싶을 때가 있습니다.  지금까지 `unwrap`은 깊이 쌓여 있는 코드를 강요했는데, 실제로는 변수를 *밖으로* 가져오고 싶었습니다. 이것이 바로 `?`의 목적입니다.

`Err`를 발견하면 두 가지 유효한 조치를 취할 수 있습니다.

1. `panic!` 이전에 시도했던 것처럼 피하고 싶은 경우
2. `Err`은 처리할 수 없음을 의미하므로 `return`

`?`는 `unwrap`과 *거의* 동일[^†]하며 `Err`에 대해 `return`하는 대신 `panic`합니다. 이전에 사용했던 조합기를 사용하는 예제를 간소화하는 방법을 살펴보겠습니다.

```rust,editable
use std::num::ParseIntError;

fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = first_number_str.parse::<i32>()?;
    let second_number = second_number_str.parse::<i32>()?;

    Ok(first_number * second_number)
}

fn print(result: Result<i32, ParseIntError>) {
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

## `try!` 매크로

`?`가 있기 전까지는 `try!` 매크로로 동일한 기능을 달성했습니다. `?` 연산자는 이제 권장되지만, `try!`를 사용하는 것을 볼 수 있습니다.

이전 예제의 `multiply` 함수는 `try!`를 사용하면 다음과 같습니다.

```rust,editable,edition2015
// 이 예제를 오류 없이 컴파일하고 실행하려면 Cargo를 사용하는 경우 `Cargo.toml` 파일의 `[package]` 섹션에서 `edition` 필드의 값을 "2015"로 변경해야 합니다.

use std::num::ParseIntError;

fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = try!(first_number_str.parse::<i32>());
    let second_number = try!(second_number_str.parse::<i32>());

    Ok(first_number * second_number)
}

fn print(result: Result<i32, ParseIntError>) {
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


[^†]: [re-enter ?][re_enter_?]를 참조하세요.

[re_enter_?]: ../multiple_error_types/reenter_question_mark.md
